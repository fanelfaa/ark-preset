/**
 * generate-installation.ts — Standalone installation docs generator
 *
 * ## Purpose
 *
 * Reads recipe files from packages/core/src/recipes/ and component source
 * files from packages/solid/src/, then writes installation.gen.mdx for
 * each component under apps/docs/src/content/docs/<component>/.
 *
 * ## Relationship to installation-watcher (Vite plugin)
 *
 * This script and the Vite plugin (src/plugins/installation-watcher.ts)
 * share the same core generation logic (src/shared/generate-content.ts)
 * but serve different purposes:
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
 * ## Notes for agents
 *
 *   - The script exits with code 1 if no valid components are found.
 *   - Multi-file components (e.g. .base.tsx + index.tsx) are detected
 *     automatically and rendered with a terser heading.
 *   - Flat .tsx files at packages/solid/src/<name>.tsx are also supported
 *     (legacy pattern — prefer directories).
 *   - The Tailwind CSS variables note is appended to every generated file.
 *   - Generation logic lives in src/shared/generate-content.ts — changes
 *     to the output format should be made there, not in this file.
 */

import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, relative } from "node:path";
import {
  generateInstallationContent,
  discoverComponents,
  DOCS_DIR,
  PROJECT_ROOT,
} from "../src/shared/generate-content";

// ── Discovery ──────────────────────────────────────────────────────────

/** Resolve component names from CLI args, or auto-discover if none given. */
function getComponents(args: string[]): string[] {
  if (args.length === 0) return discoverComponents();
  return args;
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
