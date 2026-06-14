# Plan: <ComponentName>

**Pattern:** E (Namespace base with separate entry points)
**Reference:** `packages/solid/src/segment-group/`
**Status:** Planning

## Component Overview

<!-- Brief description from Ark UI docs -->

### Ark UI Parts

| Part         | Has tv() variants? | Notes                        |
| ------------ | ------------------ | ---------------------------- |
| Root         | Yes/No             | Main container               |
| RootProvider | Yes/No             | For machine-controlled usage |
| ...          |                    |                              |

### Variants

<!-- List the variants this component's recipe defines -->

- **variant**: types...
- **orientation**: horizontal/vertical (if applicable)
- **other**...

## Artifact Checklist

### 1. Recipe: `packages/core/src/recipes/<name>.ts`

- [ ] Create tv() with slots for each Ark UI part
- [ ] Define variants (variant, orientation, etc.)
- [ ] Export `<name>Variants` + type

### 2. Core Index: `packages/core/src/index.ts`

- [ ] Add `export { <name>Variants } from "./recipes/<name>"`
- [ ] Add `export type { <name>Variants } from "./recipes/<name>"`

### 3. Tsup Entry: `packages/core/tsup.config.ts`

- [ ] Add `"src/recipes/<name>.ts"` to entry list

### 4. Base File: `packages/solid/src/<name>/<name>.base.tsx`

- [ ] Import Ark UI parts from `@ark-ui/solid/<name>`
- [ ] Create variant context (if variants exist)
- [ ] Wrap each part with tv() styling (splitProps `["class"]` or `["class", "variant", ...]`)
- [ ] Export single namespace: `export const <Name> = { Root, RootProvider, ... }`
- [ ] Export context/hooks separately

### 5. Index File: `packages/solid/src/<name>/index.tsx`

- [ ] Import namespace as `{ <Name> as <Name>Base }`
- [ ] Create composite named exports (e.g., `<Name>`, `<Name>Item`)
- [ ] **No** `export *` from base (Pattern E rule)
- [ ] Export base namespace: `export { <Name> as <Name>Base }`
- [ ] Re-export variants from `@fan-ui/core`

### 6. Solid Barrel: `packages/solid/src/index.ts`

- [ ] Add `export * from "./<name>"` (alphabetical order)

### 7. Demos: `apps/docs/src/components/<name>-demo/`

- [ ] Create `{Name}BasicDemo.tsx` — single basic example only (not multiple variants bundled)
- [ ] Must import only named composites from `@fan-ui/solid`, **never** `.base.tsx` or `<Name>Base`
- [ ] Create ONE separate demo file per usage variant:
  - `{Name}ControlledDemo.tsx` — controlled value variant
  - `{Name}DisabledDemo.tsx` — disabled variant
  - `{Name}HalfStarDemo.tsx` — half-star variant (for rating-group)
  - `{Name}RootProviderDemo.tsx` — machine-controlled via @ark-ui hooks
  - Other variants as needed

### 8. Sidebar: `apps/docs/src/layouts/DocsLayout.astro`

- [ ] Add `{ href: "/docs/components/<name>", label: "<Name>" }` to `sidebarLinks` array in alphabetical order

### 9. Docs: `apps/docs/src/content/docs/components/<name>.mdx`

- [ ] Create MDX page with title, description, category
- [ ] Import ALL demo files at the top
- [ ] Render `{Name}BasicDemo client:load` right after the description
- [ ] Add Installation section (CLI + Manual with recipe/code blocks)
- [ ] Add Usage section with:
  - Basic import + minimal code example
  - Common variants as sub-sections (`### Controlled`, `### Disabled`, etc.)
  - Each variant sub-section gets `<{Name}XxxDemo client:load />` + code block
  - All usage examples use composite named exports from `index.tsx`, **never** `ComponentBase`
- [ ] Add Advanced Usage section **only** for RootProvider Pattern (machine-level API)
  - Includes `<{Name}RootProviderDemo client:load />` + code block
- [ ] Add API Reference section linking to Ark UI

## Pattern E Specifics

- Base exports **single namespace**, not individual parts
- Index.tsx **does NOT** re-export from base via `export *`
- Raw parts accessible only via `~/components/<name>/<name>.base`
- Composite named exports for all parts used in basic demo
- Context providers stay internal to base

## Reference: segment-group Architecture

```
packages/solid/src/segment-group/
├── segment-group.base.tsx   # Namespace: { Root, RootProvider, Label, Item, ItemText, ItemControl, ItemHiddenInput, Indicator }
└── index.tsx                # Composite: SegmentGroup, SegmentGroupItem + exports { SegmentGroupBase }
```
