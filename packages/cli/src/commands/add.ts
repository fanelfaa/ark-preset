import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

/**
 * usage: npx @fan-ui/cli add {component_name}
 *
 * Reads from component-manifest.json (generated at build time) to find
 * component source files and recipes, copies them to the user's project,
 * and updates index files.
 *
 * Manifest schema:
 * {
 *   "version": "1",
 *   "<framework>": {
 *     "<component>": {
 *       "files": ["<framework>/<component>/index.tsx", ...],
 *       "recipes": ["<component>.ts"],
 *       "recipeDependencies": ["<other-component>"],
 *       "componentDependencies": ["<other-component>"]
 *     }
 *   }
 * }
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Package root is one level up from dist/ (or from src/ during dev)
// const packageRoot = path.resolve(__dirname, "..");

// In dev (src/commands/add.ts), package root is packages/cli/
// In prod (dist/add-*.js),  package root is packages/cli/dist/.. == packages/cli/
// We resolve from __dirname upward until we find component-manifest.json
function findPackageRoot(): string {
  let dir = __dirname;
  while (true) {
    if (fs.existsSync(path.join(dir, "component-manifest.json"))) {
      return dir;
    }
    const parent = path.resolve(dir, "..");
    if (parent === dir) break;
    dir = parent;
  }
  console.error(
    "❌ component-manifest.json not found. Run the build script first:\n" +
      "  moon run @fan-ui/cli:generate-manifest",
  );
  process.exit(1);
}

const PACKAGE_ROOT = findPackageRoot();
const MANIFEST_PATH = path.join(PACKAGE_ROOT, "component-manifest.json");
const TEMPLATES_DIR = path.join(PACKAGE_ROOT, "templates");

// ── Manifest Loading ───────────────────────────────────────────

interface ComponentEntry {
  files: string[];
  recipes: string[];
  recipeDependencies: string[];
  componentDependencies: string[];
}

interface Manifest {
  version: string;
  [framework: string]: Record<string, ComponentEntry> | string;
}

let _manifest: Manifest | null = null;

function loadManifest(): Manifest {
  if (_manifest) return _manifest;

  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error(
      `❌ component-manifest.json not found at ${MANIFEST_PATH}\n` +
        "  Run the build script first: moon run @fan-ui/cli:generate-manifest\n" +
        "  Or reinstall the CLI package.",
    );
    process.exit(1);
  }

  try {
    _manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8")) as Manifest;
    return _manifest;
  } catch (err) {
    console.error(`❌ Failed to parse component-manifest.json: ${err}`);
    process.exit(1);
  }
}

function getFrameworkManifest(
  manifest: Manifest,
  framework: string,
): Record<string, ComponentEntry> | null {
  const fw = manifest[framework];
  if (!fw || typeof fw === "string") return null;
  return fw as Record<string, ComponentEntry>;
}

function getComponentEntry(
  manifest: Manifest,
  framework: string,
  component: string,
): ComponentEntry | null {
  const fw = getFrameworkManifest(manifest, framework);
  if (!fw) return null;
  return fw[component] ?? null;
}

function listComponents(manifest: Manifest, framework: string): string[] {
  const fw = getFrameworkManifest(manifest, framework);
  if (!fw) return [];
  return Object.keys(fw).sort();
}

// ── Dependency Resolution ──────────────────────────────────────

/** Collect all files + recipes for a component, including its dependencies */
function resolveWithDependencies(
  manifest: Manifest,
  framework: string,
  component: string,
  resolved: Set<string> = new Set(),
): { files: string[]; recipes: string[] } {
  if (resolved.has(component)) return { files: [], recipes: [] };
  resolved.add(component);

  const entry = getComponentEntry(manifest, framework, component);
  if (!entry) {
    console.warn(`  ⚠ Component "${component}" not found in manifest for framework "${framework}"`);
    return { files: [], recipes: [] };
  }

  const files = [...entry.files];
  const recipes = [...entry.recipes];

  // Resolve component dependencies (other Solid components)
  for (const dep of entry.componentDependencies) {
    const depResult = resolveWithDependencies(manifest, framework, dep, resolved);
    files.push(...depResult.files);
    recipes.push(...depResult.recipes);
  }

  // Resolve recipe dependencies (recipes from other components)
  for (const dep of entry.recipeDependencies) {
    if (!resolved.has(`${dep}-recipe`)) {
      resolved.add(`${dep}-recipe`);
      const depEntry = getComponentEntry(manifest, framework, dep);
      if (depEntry) {
        recipes.push(...depEntry.recipes);
      } else {
        // Recipe dependency might be a bare recipe file
        const recipeFile = `${dep}.ts`;
        const recipePath = path.join(TEMPLATES_DIR, "recipes", recipeFile);
        if (fs.existsSync(recipePath)) {
          recipes.push(recipeFile);
        } else {
          console.warn(`  ⚠ Recipe dependency "${dep}" not found`);
        }
      }
    }
  }

  return {
    files: [...new Set(files)], // deduplicate
    recipes: [...new Set(recipes)],
  };
}

// ── File Operations ────────────────────────────────────────────

async function copyWithImportRewrite(
  templatePath: string,
  targetPath: string,
  recipeDir: string,
): Promise<void> {
  let content = await fs.readFile(templatePath, "utf-8");
  // Compute relative path from the target file to the recipe directory
  const relPath = path.relative(path.dirname(targetPath), recipeDir);
  const importPath = relPath.startsWith(".") ? relPath : `./${relPath}`;
  content = content.replace(/from\s+['"]@fan-ui\/core['"]/g, `from '${importPath}'`);
  await fs.writeFile(targetPath, content, "utf-8");
}

async function updateIndexFile(indexFile: string, exportLine: string): Promise<void> {
  if (await fs.pathExists(indexFile)) {
    const content = await fs.readFile(indexFile, "utf-8");
    if (!content.includes(exportLine)) {
      await fs.appendFile(indexFile, `\n${exportLine}\n`, "utf-8");
      console.log(`  ✓ Updated ${indexFile}`);
    }
  } else {
    await fs.ensureDir(path.dirname(indexFile));
    await fs.writeFile(indexFile, `${exportLine}\n`, "utf-8");
    console.log(`  ✓ Created ${indexFile}`);
  }
}

// ── Public API ─────────────────────────────────────────────────

export async function addComponent(
  componentName: string,
  outputDir: string,
  framework: string = "solid",
) {
  const component = componentName.toLowerCase();
  const fw = framework.toLowerCase();

  // Load manifest
  const manifest = loadManifest();

  // Validate framework
  const fwManifest = getFrameworkManifest(manifest, fw);
  if (!fwManifest) {
    console.error(`❌ Unknown framework: "${fw}"`);
    const available = Object.keys(manifest)
      .filter((k) => k !== "version")
      .sort();
    console.log(`  Available frameworks: ${available.join(", ")}`);
    process.exit(1);
  }

  // Validate component
  const entry = getComponentEntry(manifest, fw, component);
  if (!entry) {
    console.error(`❌ Unknown component: "${component}"`);
    const available = listComponents(manifest, fw);
    console.log(`  Available components: ${available.join(", ")}`);
    process.exit(1);
  }

  console.log(`\n📦 Adding "${component}" (framework: ${fw})...\n`);

  // Resolve dependencies
  const resolved = resolveWithDependencies(manifest, fw, component);

  if (resolved.files.length === 0 && resolved.recipes.length === 0) {
    console.error(`❌ No files found for component "${component}"`);
    process.exit(1);
  }

  const compTargetDir = path.resolve(outputDir);
  const recipeTargetDir = path.join(path.dirname(compTargetDir), "recipes");

  const writtenFiles: string[] = [];

  try {
    // ── Copy component files ──────────────────────────────────
    for (const file of resolved.files) {
      const templatePath = path.join(TEMPLATES_DIR, file);
      // Determine output path: preserve the relative structure within the component
      // file pattern: "<framework>/<component>/<filename>" → "<component>/<filename>"
      const relativeToFramework = file.split("/").slice(1).join("/"); // remove framework prefix
      const targetPath = path.join(compTargetDir, relativeToFramework);

      if (!fs.existsSync(templatePath)) {
        console.warn(`  ⚠ Template not found: ${templatePath}`);
        continue;
      }

      await fs.ensureDir(path.dirname(targetPath));
      await copyWithImportRewrite(templatePath, targetPath, recipeTargetDir);
      writtenFiles.push(targetPath);
      console.log(`  ✓ Copied: ${relativeToFramework}`);
    }

    // ── Copy recipe files ─────────────────────────────────────
    for (const recipe of resolved.recipes) {
      const templatePath = path.join(TEMPLATES_DIR, "recipes", recipe);
      const targetPath = path.join(recipeTargetDir, recipe);

      if (!fs.existsSync(templatePath)) {
        console.warn(`  ⚠ Recipe template not found: ${templatePath}`);
        continue;
      }

      await fs.ensureDir(recipeTargetDir);
      await fs.copy(templatePath, targetPath);
      writtenFiles.push(targetPath);
      console.log(`  ✓ Copied recipe: ${recipe}`);
    }

    // ── Update index files ────────────────────────────────────
    const compIndexFile = path.join(compTargetDir, "index.ts");
    const recipeIndexFile = path.join(recipeTargetDir, "index.ts");

    // Extract unique component directory names from files
    const componentDirs = new Set(
      resolved.files.map((f) => {
        // file pattern: "<framework>/<component>/<filename>" → extract <component>
        const parts = f.split("/");
        return parts.length >= 2 ? parts[1] : component;
      }),
    );

    // Also add the primary component
    componentDirs.add(component);

    for (const dir of componentDirs) {
      await updateIndexFile(compIndexFile, `export * from './${dir}'`);
    }

    for (const recipe of resolved.recipes) {
      const recipeName = recipe.replace(/\.ts$/, "");
      await updateIndexFile(recipeIndexFile, `export * from './${recipeName}'`);
    }

    // ── Copy theme.css (only if not exists) ───────────────────
    const themeTemplate = path.join(TEMPLATES_DIR, "theme.css");
    const themeTarget = path.join(compTargetDir, "theme.css");

    if (fs.existsSync(themeTemplate) && !(await fs.pathExists(themeTarget))) {
      await fs.copy(themeTemplate, themeTarget);
      console.log(`  ✓ Copied theme.css`);
    }

    console.log(`\n✅ "${component}" added successfully.\n`);
  } catch (err) {
    // Rollback: remove all written files on failure
    console.error(`\n❌ Failed to add component: ${err}`);
    for (const file of writtenFiles) {
      try {
        await fs.remove(file);
      } catch {
        /* ignore cleanup errors */
      }
    }
    process.exit(1);
  }
}
