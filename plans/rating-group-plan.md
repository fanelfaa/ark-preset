# Plan: RatingGroup

**Pattern:** E (Namespace base with separate entry points)
**Reference:** `packages/solid/src/segment-group/`
**Status:** Planning

## Component Overview

Star-based rating input component supporting controlled/uncontrolled modes, half-star ratings, and disabled/readonly states.

### Ark UI Parts

| Part         | Has tv() variants?      | Notes                                  |
| ------------ | ----------------------- | -------------------------------------- |
| Root         | Yes (size, orientation) | Main container                         |
| RootProvider | Yes (size, orientation) | For `useRatingGroup()`                 |
| Label        | Yes (class only)        | Label text                             |
| Control      | Yes (class only)        | Flex container for star items          |
| Item         | Yes (class only)        | Individual star slot                   |
| ItemContext  | No                      | Render prop for highlighted/half state |
| Context      | No                      | Render prop providing items array      |
| HiddenInput  | No                      | Hidden form input                      |

### Variants

- **size**: `"sm" | "md" | "lg"` (default: "md")
- **orientation**: `"horizontal" | "vertical"` (default: "horizontal")

## Artifact Checklist

### 1. Recipe: `packages/core/src/recipes/rating-group.ts`

- [ ] tv() slots: `root`, `label`, `control`, `item`, `itemIndicator`
- [ ] Variants: `size` (sm/md/lg), `orientation` (horizontal/vertical)
- [ ] `itemIndicator` handles overlapping SVG stars with clip-path

### 2. Core Index: `packages/core/src/index.ts`

- [ ] `export { ratingGroupVariants } from "./recipes/rating-group"`
- [ ] `export type { RatingGroupVariants } from "./recipes/rating-group"`

### 3. Tsup Entry: `packages/core/tsup.config.ts`

- [ ] Add `"src/recipes/rating-group.ts"` to entry list

### 4. Base File: `packages/solid/src/rating-group/rating-group.base.tsx`

- [ ] `RatingGroupVariantContext` for size + orientation propagation
- [ ] Namespace: `{ Root, RootProvider, Label, Control, Item, ItemContext, Context, HiddenInput }`
- [ ] Parts without tv(): `ItemContext`, `Context`, `HiddenInput` — direct spread

### 5. Index File: `packages/solid/src/rating-group/index.tsx`

- [ ] Composites: `RatingGroup`, `RatingGroupItem` (auto-renders ItemContext + SVG star icons), `RatingGroupLabel`, `RatingGroupControl`, `RatingGroupContext`, `RatingGroupHiddenInput`
- [ ] Stars use inline SVG (bg unfilled + fg filled) with `data-highlighted` and `data-half` clip-path styling
- [ ] **No** `export *` from base
- [ ] Export `RatingGroupBase`

### 6. Solid Barrel: `packages/solid/src/index.ts`

- [ ] `export * from "./rating-group"`

### 7. Demo: `apps/docs/src/components/rating-group-demo/RatingGroupBasicDemo.tsx`

- [ ] Only named composites from `@fan-ui/solid`, no `.base.tsx`
- [ ] Uses `Index` over `context().items`

### 8. Docs: `apps/docs/src/content/docs/components/rating-group.mdx`

- [ ] MDX with Installation, Usage, Advanced Usage (controlled, half-star, disabled, RootProvider), API Reference

## Pattern E Specifics

- Base exports **single namespace**, not individual parts
- Index.tsx **does NOT** re-export from base via `export *`
- Context providers stay internal to base

## Reference

```
packages/solid/src/segment-group/
├── segment-group.base.tsx   # Namespace: { Root, RootProvider, Label, Item, ItemText, ItemControl, ItemHiddenInput, Indicator }
└── index.tsx                # Composite: SegmentGroup, SegmentGroupItem + exports { SegmentGroupBase }
```
