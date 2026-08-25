/**
 * installation-watcher.ts — Vite plugin for auto-generating installation docs
 *
 * ## What it does
 *
 * The docs site has an installation section on every component page that shows
 * the recipe and component source code. This plugin keeps those sections in
 * sync with the actual source files in the monorepo packages.
 *
 * - **buildStart** runs on both `astro dev` and `astro build` — regenerates
 *   all installation docs from current source.
 * - **handleHotUpdate** fires when Vite detects a source file change in
 *   packages/core/src/recipes/ or packages/solid/src/ — regenerates only the
 *   affected component.
 *
 * ## New components
 *
 * When adding a new component, create its docs directory and restart the dev
 * server. The watcher discovers components by scanning the docs directory on
 * startup; new dirs are picked up on the next server start.
 *
 * ## Shared logic
 *
 * The generation logic lives in src/shared/generate-content.ts (shared with
 * the CLI script scripts/generate-installation.ts).
 */

import { resolve } from "node:path";
import { type Plugin } from "vite";
import {
  generateInstallationContent,
  DOCS_DIR,
  discoverComponents,
} from "../shared/generate-content";
import { writeFileSync, existsSync, mkdirSync } from "node:fs";

export function installationWatcherPlugin(): Plugin {
  return {
    name: "vite-plugin-installation-watcher",

    buildStart() {
      const components = discoverComponents();
      let count = 0;
      for (const component of components) {
        const content = generateInstallationContent(component);
        if (content) {
          const compDir = resolve(DOCS_DIR, component);
          if (!existsSync(compDir)) mkdirSync(compDir, { recursive: true });
          writeFileSync(resolve(compDir, "installation.mdx"), content, "utf-8");
          count++;
        }
      }
      console.log(`[installation-watcher] Generated docs for ${count} components`);
    },

    handleHotUpdate({ file, server }) {
      if (!file.includes("packages/core/src/recipes") && !file.includes("packages/solid/src")) {
        return;
      }

      let componentName = "";
      if (file.includes("packages/core/src/recipes/")) {
        const match = file.match(/packages\/core\/src\/recipes\/([^.]+)\.ts/);
        if (match) componentName = match[1];
      } else if (file.includes("packages/solid/src/")) {
        const match = file.match(/packages\/solid\/src\/([^/]+)/);
        if (match) {
          componentName = match[1];
          if (componentName.endsWith(".tsx")) componentName = componentName.replace(".tsx", "");
        }
      }

      if (!componentName) return;

      const content = generateInstallationContent(componentName);
      if (content) {
        const compDir = resolve(DOCS_DIR, componentName);
        if (!existsSync(compDir)) mkdirSync(compDir, { recursive: true });
        writeFileSync(resolve(compDir, "installation.mdx"), content, "utf-8");
        server.ws.send({ type: "full-reload", path: "*" });
        console.log(`[installation-watcher] Regenerated docs for ${componentName}`);
      }
    },
  };
}
