#!/usr/bin/env node
/**
 * generate-manifest.ts
 *
 * Build-time script that:
 * 1. Scans packages/{framework}/src/ for component files
 * 2. Scans packages/core/src/recipes/ for recipe files
 * 3. Detects cross-dependencies (recipeDependencies, componentDependencies)
 * 4. Copies template files into packages/cli/templates/
 * 5. Generates component-manifest.json for the CLI to consume at runtime
 *
 * Run via: moon run @ark-preset/cli:build (wired as pre-build step)
 */

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cliRoot = path.resolve(__dirname, "../..");
const repoRoot = path.resolve(cliRoot, "../..");

// ── Configuration ─────────────────────────────────────────────
const FRAMEWORKS = ["solid"] as const;

/** Read component names from packages/<framework>/src/index.ts exports */
function discoverComponents(framework: string): string[] {
  const indexPath = path.join(repoRoot, `packages/${framework}/src/index.ts`);
  if (!fs.existsSync(indexPath)) {
    console.error(`  ⚠ Cannot discover components: ${indexPath} not found`);
    return [];
  }
  const content = fs.readFileSync(indexPath, "utf-8");
  const components: string[] = [];
  const regex = /export\s+\*\s+from\s+['"]\.\/([^'"]+)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const name = match[1];
    if (!name.startsWith(".") && !name.includes("/")) {
      components.push(name);
    }
  }
  return components.sort();
}

const RECIPE_SOURCE_BASE = "packages/core/src/recipes";
const THEME_SOURCE = "packages/core/src/theme.css";
const TEMPLATES_DIR = path.join(cliRoot, "templates");
const MANIFEST_FILE = path.join(cliRoot, "component-manifest.json");
const SOLID_SOURCE_BASE = "packages/solid/src";

// ── Manifest type ──────────────────────────────────────────────

interface ComponentEntry {
  /** Source files relative to templates/{framework}/ */
  files: string[];
  /** Recipe filenames relative to templates/recipes/ */
  recipes: string[];
  /** Other component recipes this component imports from @ark-preset/core */
  recipeDependencies: string[];
  /** Other framework components this component imports via relative import */
  componentDependencies: string[];
}

interface Manifest {
  version: string;
  solid: Record<string, ComponentEntry>;
}

// ── Helpers ────────────────────────────────────────────────────

/** Convert camelCase to kebab-case (e.g. scrollArea → scroll-area) */
function camelToKebab(name: string): string {
  return name.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

/** Scan imports in a source file to detect cross-dependencies */
function detectDependencies(
  filePath: string,
  ownComponent?: string,
): {
  recipeDependencies: string[];
  componentDependencies: string[];
} {
  const recipeDeps = new Set<string>();
  const componentDeps = new Set<string>();

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n");

    for (const line of lines) {
      // Detect recipe dependencies: import { *Variants } from "@ark-preset/core"
      // Maps Variants name → recipe file name (e.g., buttonVariants → button)
      const uiCoreMatch = line.match(/from\s+['"]@ark-preset\/core['"]/);
      if (uiCoreMatch) {
        // Extract all imported identifiers
        const imports = line.match(/\{[^}]+\}/);
        if (imports) {
          const names = imports[0]
            .replace(/[{}]/g, "")
            .split(",")
            .map((s) => s.trim());

          for (const name of names) {
            // Skip `type` keyword and non-variant imports
            const cleanName = name.replace(/^type\s+/, "").trim();
            // If it ends with "Variants", it references another component's recipe
            if (/Variants$/i.test(cleanName) && cleanName !== "Variants") {
              // buttonVariants → button,  ButtonVariants → button
              let compName = cleanName
                .replace(/Variants$/i, "")
                .replace(/^[A-Z]/, (c) => c.toLowerCase());
              compName = camelToKebab(compName);
              // Skip self-references (own component importing its own variants)
              if (compName !== ownComponent) {
                recipeDeps.add(compName);
              }
            }
          }
        }
      }

      // Detect component dependencies: import { ... } from "../<component>"
      const relImportMatch = line.match(/from\s+['"]\.\.\/([^'"/]+)['"]/);
      if (relImportMatch) {
        const compName = relImportMatch[1];
        // Only add if it's a different component, not a utility or shared helper
        if (!compName.startsWith("_") && !compName.includes(".")) {
          componentDeps.add(compName);
        }
      }
    }
  } catch {
    // File doesn't exist or can't be read — skip
  }

  return {
    recipeDependencies: [...recipeDeps].sort(),
    componentDependencies: [...componentDeps].sort(),
  };
}

/** Copy source files to templates directory */
function copyComponentSource(framework: string, component: string): string[] {
  const sourceDir = path.join(repoRoot, `${SOLID_SOURCE_BASE}/${component}`);
  const targetDir = path.join(TEMPLATES_DIR, framework, component);
  const copiedFiles: string[] = [];

  if (!fs.existsSync(sourceDir)) {
    console.warn(`  ⚠ Source directory not found: ${sourceDir}`);
    return copiedFiles;
  }

  fs.ensureDirSync(targetDir);

  // Copy all .tsx files from the component directory
  const entries = fs.readdirSync(sourceDir);
  for (const entry of entries) {
    if (entry.endsWith(".tsx")) {
      const srcPath = path.join(sourceDir, entry);
      const dstPath = path.join(targetDir, entry);
      fs.copyFileSync(srcPath, dstPath);
      copiedFiles.push(`${framework}/${component}/${entry}`);
      console.log(`  ✓ Copied template: ${framework}/${component}/${entry}`);
    }
  }

  return copiedFiles;
}

/** Copy recipe files to templates directory */
function copyRecipe(component: string): boolean {
  const recipeFile = `${component}.ts`;
  const sourcePath = path.join(repoRoot, RECIPE_SOURCE_BASE, recipeFile);
  const targetPath = path.join(TEMPLATES_DIR, "recipes", recipeFile);

  if (!fs.existsSync(sourcePath)) {
    console.warn(`  ⚠ Recipe not found: ${sourcePath}`);
    return false;
  }

  fs.ensureDirSync(path.join(TEMPLATES_DIR, "recipes"));
  fs.copyFileSync(sourcePath, targetPath);
  console.log(`  ✓ Copied recipe: recipes/${recipeFile}`);
  return true;
}

// ── Main ────────────────────────────────────────────────────────

async function main() {
  console.log("\n📦 Generating component manifest and templates...\n");

  // Clean previous output
  if (fs.existsSync(TEMPLATES_DIR)) {
    fs.rmSync(TEMPLATES_DIR, { recursive: true });
  }
  fs.ensureDirSync(TEMPLATES_DIR);

  const manifest: Manifest = {
    version: "1",
    solid: {},
  };

  // Process each framework
  for (const framework of FRAMEWORKS) {
    const components = discoverComponents(framework);
    console.log(`\n🔧 Framework: ${framework}`);

    for (const component of components) {
      console.log(`\n  Component: ${component}`);

      // Copy source files
      const files = copyComponentSource(framework, component);

      // Copy recipe
      const recipes: string[] = [];
      if (copyRecipe(component)) {
        recipes.push(`${component}.ts`);
      }

      // Detect dependencies by scanning ALL copied source files
      const allDeps = {
        recipeDependencies: new Set<string>(),
        componentDependencies: new Set<string>(),
      };
      for (const file of files) {
        const templatePath = path.join(TEMPLATES_DIR, file);
        if (fs.existsSync(templatePath)) {
          const deps = detectDependencies(templatePath, component);
          deps.recipeDependencies.forEach((d) => allDeps.recipeDependencies.add(d));
          deps.componentDependencies.forEach((d) => allDeps.componentDependencies.add(d));
        }
      }

      // Also scan the recipe file for dependencies
      const recipePath = path.join(TEMPLATES_DIR, "recipes", `${component}.ts`);
      if (fs.existsSync(recipePath)) {
        const recipeDeps = detectDependencies(recipePath, component);
        recipeDeps.recipeDependencies.forEach((d) => allDeps.recipeDependencies.add(d));
        recipeDeps.componentDependencies.forEach((d) => allDeps.componentDependencies.add(d));
      }

      manifest[framework][component] = {
        files,
        recipes,
        recipeDependencies: [...allDeps.recipeDependencies].sort(),
        componentDependencies: [...allDeps.componentDependencies].sort(),
      };
    }
  }

  // If any componentDependencies reference components not yet in the template set,
  // warn about it (they'll be missing at CLI runtime)
  for (const framework of FRAMEWORKS) {
    for (const [comp, entry] of Object.entries(manifest[framework])) {
      for (const dep of entry.componentDependencies) {
        if (!manifest[framework][dep]) {
          console.warn(`  ⚠ ${comp} depends on "${dep}" which is not in the current manifest set`);
        }
      }
    }
  }

  // Copy theme.css
  const themeSourcePath = path.join(repoRoot, THEME_SOURCE);
  if (fs.existsSync(themeSourcePath)) {
    fs.copyFileSync(themeSourcePath, path.join(TEMPLATES_DIR, "theme.css"));
    console.log("\n  ✓ Copied theme.css");
  } else {
    console.warn(`\n  ⚠ theme.css not found: ${themeSourcePath}`);
  }

  // Write manifest
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2), "utf-8");
  console.log(`\n📄 Wrote manifest: ${MANIFEST_FILE}`);

  // Summary
  const totalComponents = Object.keys(manifest.solid).length;
  const totalFiles = fs
    .readdirSync(TEMPLATES_DIR, { recursive: true })
    .filter(
      (f) => typeof f === "string" && fs.statSync(path.join(TEMPLATES_DIR, f as string)).isFile(),
    ).length;

  console.log(
    `\n✅ Done! ${totalComponents} components, ${totalFiles} template files generated.\n`,
  );
}

main().catch((err) => {
  console.error("❌ Manifest generation failed:", err);
  process.exit(1);
});
