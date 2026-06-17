/**
 * generate-content.ts — Shared installation docs generation logic
 *
 * Used by both the CLI script (scripts/generate-installation.ts) and the
 * Vite plugin (src/plugins/installation-watcher.ts) so the output format
 * stays consistent and changes only need to be made in one place.
 *
 * ## Data flow
 *
 *   packages/core/src/recipes/<component>.ts  ──┐
 *                                                 ├──▶ installation.gen.mdx
 *   packages/solid/src/<component>/**.tsx     ──┘
 *
 * ## Usage
 *
 *   import { generateInstallationContent } from "../shared/generate-content";
 *   const content = generateInstallationContent("button");
 *   if (content) writeFileSync(path, content);
 */

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// ── Paths ──────────────────────────────────────────────────────────────
// Resolved relative to this file's location in apps/docs/src/shared/.
// PROJECT_ROOT lands at the monorepo root (4 levels up).

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const PROJECT_ROOT = resolve(__dirname, "../../../..");
export const CORE_RECIPES_DIR = resolve(PROJECT_ROOT, "packages/core/src/recipes");
export const SOLID_COMPONENTS_DIR = resolve(PROJECT_ROOT, "packages/solid/src");
export const DOCS_DIR = resolve(PROJECT_ROOT, "apps/docs/src/content/docs");

// ── Helpers ────────────────────────────────────────────────────────────

/** Read a file, returning null if it doesn't exist or can't be read. */
export function readFileSafe(filePath: string): string | null {
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
export function getComponentSourceFiles(
  component: string,
): { filePath: string; label: string; content: string }[] {
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
 *   2. CLI command block (npx @ark-preset/cli)
 *   3. Manual install heading
 *   4. Recipe code block (from packages/core/src/recipes/)
 *   5. Component source code block(s) (from packages/solid/src/)
 *   6. Tailwind CSS variables reminder note
 *
 * Returns null if the recipe or component source can't be found.
 */
export function generateInstallationContent(component: string): string | null {
  const recipePath = resolve(CORE_RECIPES_DIR, `${component}.ts`);
  const recipeContent = readFileSafe(recipePath);
  if (!recipeContent) return null;

  const componentFiles = getComponentSourceFiles(component);
  if (componentFiles.length === 0) return null;

  const sections: string[] = [];

  // ── CLI ────────────────────────────────────────────────────────────
  sections.push("## Installation\n");
  sections.push("### CLI\n");
  sections.push("Run the following command to add the component to your project:\n");
  sections.push("```bash");
  sections.push(`npx @ark-preset/cli@latest add ${component}`);
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
    const hasBaseAndIndex =
      componentFiles.some((f) => f.label.endsWith(".base.tsx")) &&
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
  sections.push(
    "> **Note:** Make sure your project has the Tailwind CSS theme variables set up " +
      "(`--background`, `--foreground`, `--ring`, `--border`, etc.) or override the " +
      "utility classes to match your design system.\n",
  );

  return sections.join("\n");
}

/**
 * Discover components that have docs dirs AND a recipe file in packages/core.
 */
export function discoverComponents(): string[] {
  if (!existsSync(DOCS_DIR)) return [];
  return readdirSync(DOCS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((name) => name !== "node_modules" && name !== ".git")
    .filter((name) => existsSync(resolve(CORE_RECIPES_DIR, `${name}.ts`)));
}
