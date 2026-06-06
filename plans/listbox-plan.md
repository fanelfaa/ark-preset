# Plan: Listbox

**Pattern:** E (Namespace base with separate entry points)
**Reference:** `packages/solid/src/segment-group/`
**Status:** Planning

## Component Overview

The Listbox component provides a list of selectable options with keyboard navigation, typeahead, grouping, and orientation support. Uses `createListCollection()` to define items.

### Ark UI Parts

| Part | Has tv() variants? | Notes |
|------|--------------------|-------|
| Root | Yes | Main container, passes orientation to context |
| RootProvider | Yes | For machine-controlled `useListbox()` |
| Label | Yes | Label text above list |
| Content | Yes | Scrollable list area wrapping items |
| Item | Yes | Individual selectable row, inherits orientation |
| ItemText | Yes | Text label inside each item |
| ItemIndicator | Yes | Checkmark icon for selected state |
| ItemGroup | No | Group container for categorized items |
| ItemGroupLabel | No | Label for item group |
| ValueText | No | Text showing selected values |
| Input | No | Hidden input for form integration |
| Empty | No | Shown when no items match |

### Variants

- **orientation**: `"vertical"` (default) | `"horizontal"` — layout direction

## Artifact Checklist

### 1. Recipe: `packages/core/src/recipes/listbox.ts`
- [ ] tv() slots: `root`, `label`, `content`, `item`, `itemText`, `itemIndicator`
- [ ] Variant: `orientation` (horizontal/vertical)
- [ ] Export `listboxVariants` + type

### 2. Core Index: `packages/core/src/index.ts`
- [ ] `export { listboxVariants } from "./recipes/listbox"`
- [ ] `export type { ListboxVariants } from "./recipes/listbox"`

### 3. Tsup Entry: `packages/core/tsup.config.ts`
- [ ] Add `"src/recipes/listbox.ts"` to entry list

### 4. Base File: `packages/solid/src/listbox/listbox.base.tsx`
- [ ] `ListboxVariantContext` for orientation propagation
- [ ] Namespace: `{ Root, RootProvider, Label, Content, Item, ItemText, ItemIndicator, Empty, ItemGroup, ItemGroupLabel, ValueText, Input }`
- [ ] Parts without tv(): `Empty`, `ItemGroup`, `ItemGroupLabel`, `ValueText`, `Input` — direct spread

### 5. Index File: `packages/solid/src/listbox/index.tsx`
- [ ] Composites: `Listbox`, `ListboxLabel`, `ListboxContent`, `ListboxItem` (auto-renders ItemText + ItemIndicator with SVG check icon)
- [ ] **No** `export *` from base
- [ ] Export `ListboxBase`

### 6. Solid Barrel: `packages/solid/src/index.ts`
- [ ] `export * from "./listbox"`

### 7. Demo: `apps/docs/src/components/listbox-demo/ListboxBasicDemo.tsx`
- [ ] Only named composites from `@ui/solid`, no `.base.tsx`
- [ ] Uses `createListCollection` + `Index`

### 8. Docs: `apps/docs/src/content/docs/components/listbox.mdx`
- [ ] MDX with Installation, Usage, Advanced Usage, API Reference

## Pattern E Specifics
- Base exports **single namespace**, not individual parts
- Index.tsx **does NOT** re-export from base via `export *`
- Raw parts accessible only via `~/components/listbox/listbox.base`
- `ListboxItem` composite auto-renders `ItemText` + `ItemIndicator` with inline SVG check icon

## Reference
```
packages/solid/src/segment-group/
├── segment-group.base.tsx   # Namespace: { Root, RootProvider, Label, Item, ItemText, ItemControl, ItemHiddenInput, Indicator }
└── index.tsx                # Composite: SegmentGroup, SegmentGroupItem + exports { SegmentGroupBase }
```
