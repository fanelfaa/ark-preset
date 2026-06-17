/**
 * generate-installation.ts — Standalone installation docs generator
 *
 * ## Purpose
 *
 * Reads recipe files from packages/core/src/recipes/ and component source
 * files from packages/solid/src/, then writes installation.gen.mdx for
 * each component under apps/docs-spa/src/content/docs/<component>/.
 *
 * ## Relationship to installation-watcher (Vite plugin)
 *
 * This script and the Vite plugin (src/plugins/installation-watcher.ts)
 * share the same core generation logic but serve different purposes:
 *
 *   ┌─────────────────────────┬──────────────────────────────────────┐
 *   │ This script             │ Vite plugin                          │
 *   ├─────────────────────────┼──────────────────────────────────────┤
 *   │ Ad-hoc / CLI invocation │ Runs automatically in dev & build    │
 *   │ One-shot generation     │ Continuous watcher (dev) + buildHook │
 *   │ Used in CI / fresh repo │ Used in daily development            │
 *   │ Can target one component│ Always generates for all components  │
 *   └─────────────────────────┴──────────────────────────────────────┘
 *
 * ## When to use this script
 *
 *   • After cloning the repo — generate installation files for the first time
 *     before starting the dev server.
 *   • In CI — regenerate installation docs before building the docs site
 *     to ensure they reflect the published source even if the Vite plugin
 *     wasn't active.
 *   • Debugging a single component — pass the component name as an argument
 *     to see warnings/errors without spinning up the full dev server.
 *
 * ## Usage
 *
 *   pnpm generate-installation              # All components with docs
 *   pnpm generate-installation button       # Single component
 *   pnpm generate-installation button input accordion  # Multiple
 *
 * ## Arguments
 *
 *   Zero arguments → auto-discover all components that have both a docs
 *   directory AND a recipe file.
 *   One or more arguments → only those component names (must match recipe
 *   filenames exactly).
 *
 * ## Data flow
 *
 *   packages/core/src/recipes/<component>.ts  ──┐
 *                                                 ├──▶ installation.gen.mdx
 *   packages/solid/src/<component>/**.tsx     ──┘
 *
 * ## Notes for agents
 *
 *   - The script exits with code 1 if no valid components are found.
 *   - Multi-file components (e.g. .base.tsx + index.tsx) are detected
 *     automatically and rendered with a terser heading.
 *   - Flat .tsx files at packages/solid/src/<name>.tsx are also supported
 *     (legacy pattern — prefer directories).
 *   - The Tailwind CSS variables note is appended to every generated file.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from "node:fs";
import { resolve, relative, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// ── Paths ──────────────────────────────────────────────────────────────
// Resolved relative to this file at apps/docs-spa/scripts/.
// PROJECT_ROOT is 3 levels up (scripts → apps/docs-spa → apps → repo root).

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PROJECT_ROOT = resolve(__dirname, "../../..");
const CORE_RECIPES_DIR = resolve(PROJECT_ROOT, "packages/core/src/recipes");
const SOLID_COMPONENTS_DIR = resolve(PROJECT_ROOT, "packages/solid/src");
const DOCS_DIR = resolve(PROJECT_ROOT, "apps/docs-spa/src/content/docs");

// ── Discovery ──────────────────────────────────────────────────────────
// Unlike the Vite plugin's getDocsComponents() which scans all docs dirs,
// this version also checks that a matching recipe file exists — no recipe,
// no installation page.

/** Discover components that have docs dirs AND a recipe file in packages/core. */
function discoverComponents(): string[] {
  if (!existsSync(DOCS_DIR)) return [];
  return readdirSync(DOCS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((name) => name !== "node_modules" && name !== ".git")
    .filter((name) => existsSync(resolve(CORE_RECIPES_DIR, `${name}.ts`)));
}

/** Resolve component names from CLI args, or auto-discover if none given. */
function getComponents(args: string[]): string[] {
  if (args.length === 0) return discoverComponents();
  return args;
}

// ── File reading helpers ───────────────────────────────────────────────

function readFileSafe(filePath: string): string | null {
  try {
    return readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

/**
 * Read all source files for a component from packages/solid/src/.
 *
 * Supports two layouts:
 *   1. Directory-based: packages/solid/src/<component>/*.tsx
 *   2. Flat file (legacy): packages/solid/src/<component>.tsx
 *
 * Sorting: index.tsx always comes last so the entry point appears at the
 * bottom of the docs page, after any .base.tsx or helper files.
 */
function getComponentSourceFiles(component: string): { filePath: string; label: string; content: string }[] {
  const dirPath = resolve(SOLID_COMPONENTS_DIR, component);

  if (!existsSync(dirPath)) {
    // Try flat file (legacy pattern)
    const flatPath = resolve(SOLID_COMPONENTS_DIR, `${component}.tsx`);
    if (existsSync(flatPath)) {
      const content = readFileSync(flatPath, "utf-8");
      return [{ filePath: flatPath, label: `src/components/${component}.tsx`, content }];
    }
    return [];
  }

  const entries = readdirSync(dirPath, { withFileTypes: true });
  const tsxFiles = entries
    .filter((e) => e.isFile() && e.name.endsWith(".tsx"))
    .sort((a, b) => {
      // index.tsx last, everything else alphabetical
      if (a.name === "index.tsx") return 1;
      if (b.name === "index.tsx") return -1;
      return a.name.localeCompare(b.name);
    });

  if (tsxFiles.length === 0) return [];

  return tsxFiles.map((entry) => {
    const content = readFileSync(resolve(dirPath, entry.name), "utf-8");
    return {
      filePath: resolve(dirPath, entry.name),
      label: `src/components/${component}/${entry.name}`,
      content,
    };
  });
}

// ── Markdown generation ────────────────────────────────────────────────

/**
 * Generate the full installation.gen.mdx content for one component.
 *
 * Sections:
 *   1. Installation heading
 *   2. CLI command block (npx @fan-ui/cli)
 *   3. Manual install heading
 *   4. Recipe code block (from packages/core/src/recipes/)
 *   5. Component source code block(s) (from packages/solid/src/)
 *   6. Tailwind CSS variables reminder note
 *
 * Returns null if the recipe or component source can't be found.
 */
function generateInstallationContent(component: string): string | null {
  // Step 1: Read recipe file — required, fail if missing
  const recipePath = resolve(CORE_RECIPES_DIR, `${component}.ts`);
  const recipeContent = readFileSafe(recipePath);
  if (!recipeContent) {
    console.error(`  ⚠ No recipe file found at ${recipePath}`);
    return null;
  }

  // Step 2: Read component source files — required, fail if missing
  const componentFiles = getComponentSourceFiles(component);
  if (componentFiles.length === 0) {
    console.error(`  ⚠ No component source files found for "${component}"`);
    return null;
  }

  // Step 3: Build the markdown sections
  const sections: string[] = [];

  // ── CLI ────────────────────────────────────────────────────────────
  sections.push("## Installation\n");
  sections.push("### CLI\n");
  sections.push("Run the following command to add the component to your project:\n");
  sections.push("```bash");
  sections.push(`npx @fan-ui/cli@latest add ${component}`);
  sections.push("```\n");

  // ── Manual ─────────────────────────────────────────────────────────
  sections.push("### Manual\n");

  // Recipe code block
  sections.push(`Create the recipe file at \`src/components/recipes/${component}.ts\`:\n`);
  sections.push("```ts");
  sections.push(recipeContent.trimEnd());
  sections.push("```\n");

  // Component code block(s)
  if (componentFiles.length === 1) {
    const file = componentFiles[0];
    sections.push(`Create the component file at \`${file.label}\`:\n`);
    const ext = extname(file.label);
    sections.push("```" + ext.slice(1));
    sections.push(file.content.trimEnd());
    sections.push("```\n");
  } else {
    // Multi-file: detect the .base.tsx + index.tsx pattern for terser headings
    const hasBaseAndIndex = componentFiles.some((f) => f.label.endsWith(".base.tsx")) &&
      componentFiles.some((f) => f.label.endsWith("index.tsx"));

    if (hasBaseAndIndex) {
      sections.push("Create the component directory and files.\n");
    }

    for (const file of componentFiles) {
      if (hasBaseAndIndex) {
        sections.push(`\`${file.label}\`:\n`);
      } else {
        sections.push(`Create the component file at \`${file.label}\`:\n`);
      }
      const ext = extname(file.label);
      sections.push("```" + ext.slice(1));
      sections.push(file.content.trimEnd());
      sections.push("```\n");
    }
  }

  // ── Tailwind reminder ──────────────────────────────────────────────
  sections.push("> **Note:** Make sure your project has the Tailwind CSS theme variables set up (`--background`, `--foreground`, `--ring`, `--border`, etc.) or override the utility classes to match your design system.\n");

  return sections.join("\n");
}

// ── Entry point ────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const components = getComponents(args);

  if (components.length === 0) {
    console.log("No valid components specified. Available: " + discoverComponents().join(", "));
    console.log("Tip: run without arguments to generate all components.");
    process.exit(1);
  }

  console.log(`Generating installation docs for: ${components.join(", ")}`);

  for (const component of components) {
    const content = generateInstallationContent(component);
    if (!content) {
      console.error(`  ✗ Failed to generate for "${component}"`);
      continue;
    }

    const outDir = resolve(DOCS_DIR, component);
    const outPath = resolve(outDir, "installation.gen.mdx");

    // Ensure output directory exists before writing
    if (!existsSync(outDir)) {
      console.log(`  Creating directory: ${relative(PROJECT_ROOT, outDir)}`);
      mkdirSync(outDir, { recursive: true });
    }

    writeFileSync(outPath, content, "utf-8");
    console.log(`  ✓ Generated: ${relative(PROJECT_ROOT, outPath)}`);
  }

  console.log("\nDone.");
}

main();
