/**
 * demo-code.ts — Vite plugin for docs
 *
 * ## Purpose
 *
 * The unified `ComponentPreview` demo card shows the live component AND its
 * source code in one block. This plugin powers the `?code` import suffix:
 *
 *   import AccordionBasicDemoCode from "@demos/accordion-demo/AccordionBasicDemo.tsx?code";
 *
 * It reads the demo file's source and exports it as a default-exported string,
 * with light transformations applied so the snippet is copy-paste-ready for
 * users:
 *
 *   1. `@ark-preset/solid`   → `~/components/<component>`  (user-facing import)
 *
 * Everything else — component names, props, JSX — is the real source, so the
 * displayed code can never drift from the rendered demo.
 */

import type { Plugin } from "vite";
import { readFileSync } from "node:fs";

const CODE_QUERY = "?code";

/** Derive the user-facing component name from the demo file path. */
function componentFromPath(filePath: string): string {
  // .../src/components/demos/<component>-demo/XxxDemo.tsx
  // or .../src/components/demos/<component>/XxxDemo.tsx
  const m = filePath.match(/demos\/([^/]+)\//);
  return m ? m[1].replace(/-demo$/, "") : "";
}

/** Rewrite the raw demo source for display inside a code block. */
export function rewriteDemoSource(source: string, component: string): string {
  let out = source;

  // `@ark-preset/solid` → `~/components/<component>`
  out = out.replace(/from\s+["']@ark-preset\/solid["']/g, `from "~/components/${component}"`);

  return out.trim();
}

export function demoCodePlugin(): Plugin {
  return {
    name: "demo-code",
    enforce: "pre",
    load(id) {
      if (!id.includes(CODE_QUERY)) return null;
      const filePath = id.split(CODE_QUERY)[0];
      const component = componentFromPath(filePath);
      try {
        const source = readFileSync(filePath, "utf-8");
        // Re-extract on demo file changes in dev
        this.addWatchFile(filePath);
        return `export default ${JSON.stringify(rewriteDemoSource(source, component))};`;
      } catch (e) {
        this.error(`[demo-code] failed to read ${filePath}: ${e}`);
      }
    },
  };
}
