# docs

SolidJS + Vite + TanStack Router documentation site for the @ark-preset component library.

## Architecture

Component docs live under `src/content/docs/<component>/` as a directory of files:

```
src/content/docs/
├── index.tsx              ← Collector: exports all component doc modules
├── accordion/
│   ├── index.tsx          ← Combines all section files in order
│   ├── intro.mdx          ← Title, description, live demo
│   ├── installation.gen.mdx  ← AUTO-GENERATED (CLI + Manual)
│   ├── usage.mdx          ← Usage + sub-sections
│   └── api.mdx            ← API reference table
├── alert/
│   └── ...
└── button/
    └── ...
```

Each component directory has:

- `index.tsx` — imports every section `.mdx` and renders them sequentially
- `installation.gen.mdx` — **auto-generated** by reading the actual recipe + component source
- Hand-written section `.mdx` files — one per section (intro, usage, api, etc.)
- Sub-sections (e.g. Multiple, Controlled, Disabled) are nested under Usage as `###` headings

## Auto-Generated Installation

The `installation.gen.mdx` file is generated from the actual source code:

| Source         | Location                                        |
| -------------- | ----------------------------------------------- |
| Recipe code    | `packages/core/src/recipes/<name>.ts`           |
| Component code | `packages/solid/src/<name>/` (all `.tsx` files) |

### Generation Script

```bash
pnpm generate-installation              # All components with docs
pnpm generate-installation accordion    # Specific component(s)
```

The script at `scripts/generate-installation.ts`:

1. Reads the recipe file from `packages/core/src/recipes/<name>.ts`
2. Reads all `.tsx` files from `packages/solid/src/<name>/`
3. Generates `## Installation` section with CLI command + recipe code + component code
4. Writes to `src/content/docs/<name>/installation.gen.mdx`

Generated files are committed to git.

### Dev-Mode Auto-Watch (Vite Plugin)

The plugin at `src/plugins/installation-watcher.ts` watches source files during `pnpm dev`:

- **Recipe changes** (`packages/core/src/recipes/`) — regenerates on `.ts` change
- **Component changes** (`packages/solid/src/<name>/`) — regenerates on `.tsx` change

Uses `fs.watch` on each directory individually (no `recursive: true`, for Linux compatibility).

## Adding a New Component Documentation

### Step 1: Create the docs directory

```
src/content/docs/<name>/
├── index.tsx
├── intro.mdx
├── usage.mdx
└── api.mdx
```

The `index.tsx` imports section files in order:

```tsx
import Intro from "./intro.mdx";
import Installation from "./installation.gen.mdx";
import Usage from "./usage.mdx";
import Api from "./api.mdx";
import type { Component } from "solid-js";

const NameDoc: Component = () => (
  <>
    <Intro />
    <Installation />
    <Usage />
    <Api />
  </>
);
export default NameDoc;
```

### Step 2: Write section files

- `intro.mdx` — `# Title` + description + `<DocsLink>` + live demo
- `usage.mdx` — `## Usage` with import examples and sub-sections as `###`
- `api.mdx` — `## API Reference` with prop table

Each `.mdx` file can import components directly:

```mdx
import { DocsLink } from "../../../components/DocsLink";
import { Button } from "@ark-preset/solid";
```

> Relative imports from `src/content/docs/<name>/` to `src/components/` need `../../../components/` (3 levels up from the nested directory).

### Step 3: Generate the installation file

```bash
pnpm generate-installation <name>
```

This creates `installation.gen.mdx` from the recipe + component source.

### Step 4: Register in the collector

Add to `src/content/docs/index.tsx`:

```tsx
import NameDoc from "./<name>/index";
// ...
export const docs: Record<string, Component> = {
  // ...
  "<name>": NameDoc,
};
```

### Step 5: Add to the watcher (optional)

If you want dev-mode auto-regeneration, add the component name to the `POC` set in:

- `scripts/generate-installation.ts`
- `src/plugins/installation-watcher.ts`

### Future: Auto-Discovery

Currently component names are hardcoded in POC lists. The planned improvement is auto-discovery: scanning `packages/core/src/recipes/` for recipe files and checking if a corresponding `content/docs/<name>/` directory exists, eliminating step 4 and 5.

## Dev Commands

```bash
pnpm dev                  # Start dev server (port 4173)
pnpm build                # Production build
pnpm typecheck            # TypeScript check
pnpm generate-routes      # Regenerate TanStack Router route tree
pnpm generate-installation # Regenerate all installation.gen.mdx files
```

## Styling

- Tailwind CSS v4 via `@tailwindcss/vite`
- Prose styles via `@tailwindcss/typography`
- MDX rendered via `vite-plugin-solid-marked` with custom provider at `src/mdx-provider.tsx`
- Component demos at `src/components/demos/<name>-demo/`
