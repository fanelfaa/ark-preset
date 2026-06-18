/**
 * installation-watcher.ts — Vite plugin for docs
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
 * directory at apps/docs/src/content/docs/<component>/. The watcher
 * auto-discovers it on next restart, and the build hook picks it up.
 *
 * ## Shared logic
 *
 * The generation logic lives in src/shared/generate-content.ts and is
 * shared with the CLI script (scripts/generate-installation.ts).
 * Changes to the output format should be made there, not in this file.
 */

import type { Plugin } from "vite";
import { watch, existsSync, readdirSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, basename } from "node:path";
import {
  generateInstallationContent,
  CORE_RECIPES_DIR,
  SOLID_COMPONENTS_DIR,
  DOCS_DIR,
} from "../shared/generate-content";

// ── Watcher state helpers ──────────────────────────────────────────────
// Wrapped in a factory so each plugin instance gets its own isolated state.

interface WatcherState {
  watchers: ReturnType<typeof watch>[];
  debounceTimers: Map<string, ReturnType<typeof setTimeout>>;
}

function createWatcherState(): WatcherState {
  return { watchers: [], debounceTimers: new Map() };
}

// ── Dev-mode watchers ─────────────────────────────────────────────────

/**
 * Discover components that have docs directories under content/docs/.
 */
function getDocsComponents(): string[] {
  if (!existsSync(DOCS_DIR)) return [];
  return readdirSync(DOCS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
}

/** Read current source for `component`, generate the mdx content, and write it to disk. */
function regenerateWatcherFile(component: string) {
  const content = generateInstallationContent(component);
  if (!content) return;
  const outDir = resolve(DOCS_DIR, component);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "installation.gen.mdx"), content, "utf-8");
}

/**
 * Debounced wrapper around regenerateWatcherFile.
 * Fires at most once per component per 150ms window.
 */
function debouncedRegenerate(component: string, state: WatcherState) {
  const existing = state.debounceTimers.get(component);
  if (existing) clearTimeout(existing);
  state.debounceTimers.set(
    component,
    setTimeout(() => {
      state.debounceTimers.delete(component);
      regenerateWatcherFile(component);
    }, 150),
  );
}

/** Close all existing watchers and re-initialise against the current set of docs components. */
function restartWatchers(state: WatcherState, logger: { info: (m: string) => void }) {
  for (const w of state.watchers) w.close();
  state.watchers = [];

  const components = getDocsComponents();
  const componentSet = new Set(components);

  // ── Recipe watcher ────────────────────────────────────────────────
  // Listens for any .ts file change in packages/core/src/recipes/.
  // The filename (minus .ts) must match a docs component dir name.
  if (existsSync(CORE_RECIPES_DIR)) {
    state.watchers.push(
      watch(CORE_RECIPES_DIR, (_event, filename) => {
        if (!filename || !filename.endsWith(".ts")) return;
        const c = basename(filename, ".ts");
        if (!componentSet.has(c)) return;
        logger.info(`[iw] recipe changed: ${filename}`);
        debouncedRegenerate(c, state);
      }),
    );
    logger.info(`[iw] watching ${CORE_RECIPES_DIR}`);
  }

  // ── Component source watchers ─────────────────────────────────────
  // One watcher per component directory. Each watches for .tsx changes.
  for (const c of components) {
    const dir = resolve(SOLID_COMPONENTS_DIR, c);
    if (!existsSync(dir)) continue;
    state.watchers.push(
      watch(dir, (_event, filename) => {
        if (!filename || !filename.endsWith(".tsx")) return;
        logger.info(`[iw] component changed: ${c}/${filename}`);
        debouncedRegenerate(c, state);
      }),
    );
    logger.info(`[iw] watching ${dir}`);
  }
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
  const state = createWatcherState();

  return {
    name: "installation-watcher",

    configureServer(server) {
      restartWatchers(state, server.config.logger);
    },

    buildStart() {
      const components = getDocsComponents();
      let count = 0;
      for (const c of components) {
        const content = generateInstallationContent(c);
        if (!content) {
          this.warn(`[iw] ✗ ${c} — generation failed (missing recipe or component source)`);
          continue;
        }
        const outDir = resolve(DOCS_DIR, c);
        mkdirSync(outDir, { recursive: true });
        writeFileSync(resolve(outDir, "installation.gen.mdx"), content, "utf-8");
        count++;
      }
      // Use console.log for informational messages during build,
      // since this.warn is reserved for actual warnings.
      console.log(`[iw] ✓ regenerated ${count} installation files`);
    },

    closeBundle() {
      // Clean up watchers and debounce timers
      for (const w of state.watchers) w.close();
      state.watchers = [];
      for (const [, timer] of state.debounceTimers) {
        clearTimeout(timer);
      }
      state.debounceTimers.clear();
    },
  };
}
