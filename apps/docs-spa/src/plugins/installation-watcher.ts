/**
 * installation-watcher.ts — Vite plugin for docs-spa
 *
 * ## Purpose
 *
 * The docs site has a "Manual" install section on every component page that
 * shows the raw recipe (tailwind-variants) and Solid.js component source
 * code. This plugin keeps those code blocks in sync with the actual source
 * files in the monorepo packages.
 *
 * Without it, a developer editing packages/core/src/recipes/button.ts would
 * need to manually copy their change into the docs page. This plugin
 * automates that — it reads the source files and regenerates
 * installation.gen.mdx whenever they change, or at build time.
 *
 * ## Two modes
 *
 * 1. **Dev (serve)** — Watches recipe/component source directories with
 *    fs.watch and regenerates the affected installation file immediately.
 *    No chokidar dependency, uses inotify on Linux.
 *
 * 2. **Build** — On vite buildStart, regenerates ALL installation files
 *    so the production bundle always reflects the current source, even
 *    if the dev watcher was never active.
 *
 * ## Data flow
 *
 *   packages/core/src/recipes/<component>.ts  ──┐
 *                                                 ├──▶ installation.gen.mdx
 *   packages/solid/src/<component>/**.tsx     ──┘
 *
 * ## When to add a new component
 *
 * When you add a new component recipe + solid wrapper, create its docs
 * directory at apps/docs-spa/src/content/docs/<component>/. The watcher
 * auto-discovers it on next restart, and the build hook picks it up.
 */

import type { Plugin } from "vite";
import { watch, existsSync, readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, basename, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// ── Paths ──────────────────────────────────────────────────────────────
// All resolved relative to this file's location in apps/docs-spa/src/plugins/.
// PROJECT_ROOT lands at the monorepo root (4 levels up from __dirname).

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = resolve(__dirname, "../../../..");
const CORE_RECIPES_DIR = resolve(PROJECT_ROOT, "packages/core/src/recipes");
const SOLID_COMPONENTS_DIR = resolve(PROJECT_ROOT, "packages/solid/src");
const DOCS_DIR = resolve(PROJECT_ROOT, "apps/docs-spa/src/content/docs");

// ── Discovery ──────────────────────────────────────────────────────────
// Scans DOCS_DIR for subdirectories — each one is a component with docs.
// The watcher uses this list to know which recipe/component changes matter.

/** Discover components that have docs directories under content/docs/. */
function getDocsComponents(): string[] {
  if (!existsSync(DOCS_DIR)) return [];
  return readdirSync(DOCS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
}

// ── Dev-mode watchers ─────────────────────────────────────────────────
// Two sets of watchers:
//   • One on CORE_RECIPES_DIR — fires when any *.ts file changes
//   • One per component directory under SOLID_COMPONENTS_DIR — *.tsx only
//
// fs.watch is used without `recursive: true` (the directories are flat).
// On Linux this delegates to inotify for near-instant notification.
//
// When a file changes, regenerateWatcherFile reads the latest source and
// writes a fresh installation.gen.mdx for that component.

// eslint-disable-next-line prefer-const
let _watchers: ReturnType<typeof watch>[] = [];

/** Close all existing watchers and re-initialise against the current set of docs components. */
function restartWatchers(logger: any) {
  for (const w of _watchers) w.close();
  _watchers = [];

  const components = getDocsComponents();
  const componentSet = new Set(components);

  // ── Recipe watcher ────────────────────────────────────────────────
  // Listens for any .ts file change in packages/core/src/recipes/.
  // The filename (minus .ts) must match a docs component dir name.
  if (existsSync(CORE_RECIPES_DIR)) {
    _watchers.push(watch(CORE_RECIPES_DIR, (_event, filename) => {
      if (!filename || !filename.endsWith(".ts")) return;
      const c = basename(filename, ".ts");
      if (!componentSet.has(c)) return;
      logger.info(`[iw] recipe changed: ${filename}`);
      regenerateWatcherFile(c, logger);
    }));
    logger.info(`[iw] watching ${CORE_RECIPES_DIR}`);
  }

  // ── Component source watchers ─────────────────────────────────────
  // One watcher per component directory. Each watches for .tsx changes.
  for (const c of components) {
    const dir = resolve(SOLID_COMPONENTS_DIR, c);
    if (!existsSync(dir)) continue;
    _watchers.push(watch(dir, (_event, filename) => {
      if (!filename || !filename.endsWith(".tsx")) return;
      logger.info(`[iw] component changed: ${c}/${filename}`);
      regenerateWatcherFile(c, logger);
    }));
    logger.info(`[iw] watching ${dir}`);
  }
}

/** Read current source for `component`, generate the mdx content, and write it to disk. */
function regenerateWatcherFile(component: string, logger: any) {
  const content = generateContent(component);
  if (!content) { logger.warn(`[iw] ✗ ${component} — generation failed`); return; }
  const outDir = resolve(DOCS_DIR, component);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "installation.gen.mdx"), content, "utf-8");
  logger.info(`[iw] ✓ ${component}/installation.gen.mdx`);
}

// ── Helpers ────────────────────────────────────────────────────────────

/** Read a file, returning null if it doesn't exist or can't be read. */
function readFileSafe(fp: string): string | null {
  try { return readFileSync(fp, "utf-8"); } catch { return null; }
}

/**
 * Read all .tsx files in a component's solid source directory.
 *
 * Sorting: index.tsx always comes last, so in multi-file components
 * the "entry point" appears at the bottom of the docs page.
 *
 * Returns an array of { label, content } where label is a human-readable
 * path like "src/components/button/index.tsx".
 */
function getComponentFiles(c: string): { label: string; content: string }[] {
  const d = resolve(SOLID_COMPONENTS_DIR, c);
  if (!existsSync(d)) return [];
  return readdirSync(d, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith(".tsx"))
    .sort((a, b) => {
      if (a.name === "index.tsx") return 1;
      if (b.name === "index.tsx") return -1;
      return a.name.localeCompare(b.name);
    })
    .map((e) => ({
      label: `src/components/${c}/${e.name}`,
      content: readFileSync(resolve(d, e.name), "utf-8"),
    }));
}

/**
 * Build the full markdown content for a component's installation page.
 *
 * Sections: CLI command → recipe code block → component source code block(s)
 * → Tailwind CSS variables reminder note.
 *
 * Returns null if the component has no recipe file (required) or no
 * component source files (required).
 */
function generateContent(component: string): string | null {
  const recipe = readFileSafe(resolve(CORE_RECIPES_DIR, `${component}.ts`));
  if (!recipe) return null;
  const files = getComponentFiles(component);
  if (!files.length) return null;

  const out: string[] = [];
  out.push("## Installation\n");
  out.push("### CLI\n");
  out.push("Run the following command to add the component to your project:\n");
  out.push("```bash");
  out.push(`npx @fan-ui/cli@latest add ${component}`);
  out.push("```\n");
  out.push("### Manual\n");
  out.push(`Create the recipe file at \`src/components/recipes/${component}.ts\`:\n`);
  out.push("```ts");
  out.push(recipe.trimEnd());
  out.push("```\n");

  if (files.length === 1) {
    const f = files[0];
    out.push(`Create the component file at \`${f.label}\`:\n`);
    out.push("```" + extname(f.label).slice(1));
    out.push(f.content.trimEnd());
    out.push("```\n");
  } else {
    // Multi-file component: detect if it follows the .base.tsx + index.tsx pattern.
    // If so, use a terser heading ("Create the component directory and files.")
    // instead of repeating the full path for every file.
    const hasBoth = files.some((f) => f.label.endsWith(".base.tsx")) && files.some((f) => f.label.endsWith("index.tsx"));
    if (hasBoth) out.push("Create the component directory and files.\n");
    for (const f of files) {
      out.push(hasBoth ? `\`${f.label}\`:\n` : `Create the component file at \`${f.label}\`:\n`);
      out.push("```" + extname(f.label).slice(1));
      out.push(f.content.trimEnd());
      out.push("```\n");
    }
  }

  out.push("> **Note:** Make sure your project has the Tailwind CSS theme variables set up (`--background`, `--foreground`, `--ring`, `--border`, etc.) or override the utility classes to match your design system.\n");
  return out.join("\n");
}

/** Regenerate installation files for every docs component. Used during build. */
function generateAll(logger: { info: (m: string) => void; warn: (m: string) => void }) {
  const components = getDocsComponents();
  let count = 0;
  for (const c of components) {
    const content = generateContent(c);
    if (!content) { logger.warn(`[iw] ✗ ${c} — generation failed`); continue; }
    const outDir = resolve(DOCS_DIR, c);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, "installation.gen.mdx"), content, "utf-8");
    count++;
  }
  logger.info(`[iw] ✓ regenerated ${count} installation files`);
}

// ── Plugin definition ─────────────────────────────────────────────────
//
// No `apply: "serve"` — this plugin runs in both dev and build modes:
//
//   Dev mode  → configureServer() sets up fs.watch on source directories.
//               Incoming changes re-generate the affected installation file
//               instantly. Vite HMR then reloads the page with fresh content.
//
//   Build mode → buildStart() generates ALL installation files fresh from
//                current source, ensuring the production bundle is never stale.
//

export function installationWatcher(): Plugin {
  return {
    name: "installation-watcher",

    configureServer(server) {
      restartWatchers(server.config.logger);
    },

    buildStart() {
      generateAll({
        info: (m) => this.warn(m),
        warn: (m) => this.warn(m),
      });
    },
  };
}
