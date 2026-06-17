# `@ark-preset/cli` — UI Component CLI

Generate UI components into your project from pre-built templates.

```bash
npx @ark-preset/cli add button --solid
```

## Architecture

```
Build time:                          Runtime:
packages/solid/src/  ──  generate   ──  templates/ + component-manifest.json
packages/core/       ──  manifest   ──       ↓
                                         add.ts reads manifest
                                         copies files to user project
                                         rewrites @ark-preset/core → ../recipes
```

The CLI no longer reads directly from monorepo source files at runtime. Instead:

1. **Build script** (`src/scripts/generate-manifest.ts`) scans framework packages and generates:
   - `component-manifest.json` — a registry index mapping components to their files + dependencies
   - `templates/` — bundled source files organized per framework
2. **CLI** (`src/commands/add.ts`) reads the manifest at runtime and copies from the bundled templates.

This makes the CLI self-contained (no monorepo access needed at runtime) and ready for multi-framework support (`solid`, `react`, `vue`).

## Usage

```bash
# Generate manifest + templates (required before first use)
npm run generate-manifest

# Full build (generate-manifest + tsup + copy to dist)
npm run build

# Add a component (from source, no build needed)
npx tsx src/index.ts add button

# Add a component (from dist after build)
node dist/index.js add badge --solid

# Specify output directory
node dist/index.js add card -o ./src/components/ui

# Specify framework (for future React/Vue support)
node dist/index.js add button --framework solid
```

## Commands

| Command                  | Description                                               |
| ------------------------ | --------------------------------------------------------- |
| `add <component>`        | Add a UI component to your project                        |
| `-o, --output <path>`    | Output directory (default: `./src/components/ui`)         |
| `-f, --framework <type>` | Framework: `solid` \| `react` \| `vue` (default: `solid`) |

## Output Structure

```
./src/components/
├── ui/
│   ├── button/index.tsx   # Component source (@ark-preset/core → ../recipes)
│   ├── index.ts           # Barrel: export * from './button'
│   └── theme.css          # Base theme styles (copied once)
└── recipes/
    ├── button.ts          # tv() recipe (styling primitives)
    └── index.ts           # Barrel: export * from './button'
```

## Commands

```bash
npm run generate-manifest    # Generate templates + manifest
npm run build                # Full build pipeline
npm run dev                  # Watch mode (tsup)
npm run typecheck            # Type checking
```

## Manifest Schema

The generated `component-manifest.json` follows this schema:

```json
{
  "version": "1",
  "solid": {
    "<component>": {
      "files": ["solid/<component>/index.tsx"],
      "recipes": ["<component>.ts"],
      "recipeDependencies": ["<other-component>"],
      "componentDependencies": ["<other-component>"]
    }
  }
}
```

Dependencies are auto-detected by the build script:

- **recipeDependencies** — detected via `import { *Variants } from "@ark-preset/core"` (cross-recipe references)
- **componentDependencies** — detected via `import { ... } from "../<component>"` (cross-component references)

Known cross-dependencies: `button → spinner`, `select → scroll-area`, `alert-dialog → button`, `date-picker → button`, `menu → button`.

## Adding a New Framework

1. Add the framework package to the monorepo (e.g., `packages/react/src/`)
2. Add it to `FRAMEWORKS` and `COMPONENTS` in `src/scripts/generate-manifest.ts`
3. Run `npm run generate-manifest` — it scans the new package and generates templates

## Development

```bash
# Install dependencies
npm install

# Generate manifest and build
npm run build

# Watch mode for CLI code
npm run dev

# Test locally
node dist/index.js add button -o /tmp/test-output
```
