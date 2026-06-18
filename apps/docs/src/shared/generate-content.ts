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

/** Convert camelCase to kebab-case (e.g., "datePicker" → "date-picker"). */
function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Find cross-component dependencies from component source files.
 *
 * Scans for:
 *   - Named imports from @ark-preset/core that are other components' recipes
 *     (e.g., `buttonVariants` → "button", `labelVariants` → "label")
 *   - Relative imports to other component directories
 *     (e.g., `from "../scroll-area"` → "scroll-area")
 *
 * Filters out the component's own recipe imports (self-references).
 */
export function findDependencies(
  component: string,
  files: { content: string }[],
): string[] {
  const deps = new Set<string>();

  for (const file of files) {
    const content = file.content;

    // 1. Named imports from @ark-preset/core
    const coreImportRe = /import(?:\s+type)?\s*\{([^}]+)\}\s*from\s+["']@ark-preset\/core["']/g;
    let match: RegExpExecArray | null;
    while ((match = coreImportRe.exec(content)) !== null) {
      const names = match[1].split(",").map((s) => s.trim());
      for (const name of names) {
        const cleanName = name.replace(/^type\s+/, "").trim();
        const recipeMatch = cleanName.match(/^(.+?)Variants$/);
        if (recipeMatch) {
          const dep = camelToKebab(recipeMatch[1]);
          if (dep !== component && dep !== "") {
            deps.add(dep);
          }
        }
      }
    }

    // 2. Relative imports to sibling component dirs
    const relImportRe = /from\s+["']\.\.\/([^\/"']+)["']/g;
    while ((match = relImportRe.exec(content)) !== null) {
      deps.add(match[1]);
    }
  }

  return [...deps].sort();
}

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

  // Component code block(s) — skip for recipe-only components (no Solid source)
  if (componentFiles.length === 1) {
    const file = componentFiles[0];
    sections.push(`Create the component file at \`${file.label}\`:\n`);
    const ext = extname(file.label);
    sections.push("```" + ext.slice(1));
    sections.push(file.content.trimEnd());
    sections.push("```\n");
  } else if (componentFiles.length > 1) {
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

  // ── Dependencies (bottom of manual section) ────────────────────────
  const deps = findDependencies(component, componentFiles);
  if (deps.length > 0) {
    const depLinks = deps
      .filter((d) => existsSync(resolve(DOCS_DIR, d)))
      .map((d) => `[${d}](/docs/components/${d})`)
      .join(", ");
    if (depLinks) {
      sections.push(
        "> **Dependencies:** This component imports shared recipes or sub-components from other packages. Make sure the following are also installed: " +
          depLinks +
          ".\n",
      );
    }
  }

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
