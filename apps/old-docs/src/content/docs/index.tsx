import type { Component } from "solid-js";

/**
 * Auto-discovered component doc modules.
 *
 * Each component under src/content/docs/<name>/index.tsx is loaded eagerly
 * and registered by its directory name. Adding a new component doc only
 * requires creating the directory and index.tsx — no manual import needed.
 *
 * When a hyphenated directory is encountered (e.g. "alert-dialog"),
 * the key in the `docs` record uses the same directory name as-is.
 */
const modules = import.meta.glob<{ default: Component }>("./*/index.tsx", {
  eager: true,
});

export const docs: Record<string, Component> = {};

for (const [path, mod] of Object.entries(modules)) {
  // path looks like "./accordion/index.tsx"
  const name = path.match(/\.\/([^/]+)\//)?.[1];
  if (name && mod.default) {
    docs[name] = mod.default;
  }
}
