# Plan: Pagination

**Pattern:** E (Namespace base with separate entry points)
**Reference:** `packages/solid/src/segment-group/`
**Status:** Planning

## Component Overview

A navigation component for moving between pages of content. Built on Ark UI's `@ark-ui/solid/pagination` — supports controlled/uncontrolled modes, custom page sizes, and link-based navigation.

### Ark UI Parts

| Part         | Has tv() variants? | Notes                                                          |
| ------------ | ------------------ | -------------------------------------------------------------- |
| Root         | Yes (size)         | `<nav>` main container                                         |
| RootProvider | Yes (size)         | For `usePagination()` machine-controlled usage                 |
| Ellipsis     | No                 | `...` indicator between page ranges (render prop with `index`) |
| FirstTrigger | Yes                | First page button                                              |
| Item         | Yes                | Individual page button (requires `type="page"` + `value`)      |
| LastTrigger  | Yes                | Last page button                                               |
| NextTrigger  | Yes                | Next page button                                               |
| PrevTrigger  | Yes                | Previous page button                                           |

### Variants

- **size**: `"sm" | "md" | "lg"` (default: "md") — controls button sizing and icon spacing

## Artifact Checklist

### 1. Recipe: `packages/core/src/recipes/pagination.ts`

- [ ] Create tv() with slots for each stylable part:
  - **root**: `"mx-auto flex w-full justify-center"` — centered nav container
  - **trigger**: common button styles with size variants:
    - `"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"`
  - **item**: extends trigger with page-specific sizing:
    - base trigger + `"h-10 w-10"` (md), `"h-9 w-9"` (sm), `"h-11 w-11"` (lg)
    - active state: `"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"`
  - **ellipsis**: `"flex h-10 w-10 items-center justify-center text-sm"` (size-aware)
- [ ] Variants:
  - **size**: `"sm" | "md" | "lg"` (default: "md") — controls dimensions
- [ ] Module-level: `const styles = paginationVariants();`
- [ ] Export `paginationVariants` + type `PaginationVariants`

### 2. Core Index: `packages/core/src/index.ts`

- [ ] Add `export { paginationVariants } from "./recipes/pagination"`
- [ ] Add `export type { PaginationVariants } from "./recipes/pagination"`
- [ ] Insert in alphabetical order (after `popover`, before `password-input` or near other `p*` entries)

### 3. Tsup Entry: `packages/core/tsup.config.ts`

- [ ] Add `"src/recipes/pagination.ts"` to entry list (alphabetical order, after `popover.ts`)

### 4. Base File: `packages/solid/src/pagination/pagination.base.tsx`

- [ ] Import Ark UI parts from `@ark-ui/solid/pagination`
  - `Pagination as ArkPagination, type PaginationProps as ArkPaginationProps` (or use namespace imports)
- [ ] Import `paginationVariants`, `type PaginationVariants` from `@fan-ui/core`
- [ ] Import `splitProps, type Component, createContext, useContext` from "solid-js"
- [ ] Create `PaginationVariantContext` for size propagation (same pattern as segment-group variant context)
- [ ] Module-level: `const styles = paginationVariants();`
- [ ] Create parts — each with tv() styling and splitProps:
  - **Root**: `Component<ArkPagination.RootProps & PaginationVariants>` — split `["class", "size"]`, pass size to variant context, apply `styles.root()`
  - **RootProvider**: `Component<ArkPagination.RootProviderProps & PaginationVariants>` — same as Root but with `value` prop
  - **Ellipsis**: `Component<ArkPagination.EllipsisProps>` — no tv() styling, direct spread (render prop, inline)
  - **FirstTrigger**: `Component<ArkPagination.FirstTriggerProps>` — split `["class"]`, apply `styles.trigger()`
  - **Item**: `Component<ArkPagination.ItemProps & { active?: boolean }>` — split `["class", "active"]`, apply `styles.item({ class: local.class, active: local.active })` — receives `type` and `value` from Ark
  - **LastTrigger**: `Component<ArkPagination.LastTriggerProps>` — split `["class"]`, apply `styles.trigger()`
  - **NextTrigger**: `Component<ArkPagination.NextTriggerProps>` — split `["class"]`, apply `styles.trigger()`
  - **PrevTrigger**: `Component<ArkPagination.PrevTriggerProps>` — split `["class"]`, apply `styles.trigger()`
- [ ] Export single namespace:
  ```tsx
  export const Pagination = {
    Root,
    RootProvider,
    Ellipsis,
    FirstTrigger,
    Item,
    LastTrigger,
    NextTrigger,
    PrevTrigger,
  };
  ```
- [ ] Export `PaginationVariantContext` separately for advanced use (same as segment-group)

### 5. Index File: `packages/solid/src/pagination/index.tsx`

- [ ] Import namespace as `{ Pagination as PaginationBase }` from `./pagination.base`
- [ ] Import Ark types from `@ark-ui/solid/pagination`
- [ ] Import `PaginationVariants` type from `@fan-ui/core`
- [ ] Import `Index, For, type Component` from "solid-js" for rendering page items
- [ ] **No** `export *` from base (Pattern E rule)
- [ ] Create composite named exports:

  **Pagination**: composite root that auto-renders page structure:

  ```tsx
  const Pagination: Component<ArkPagination.RootProps & PaginationVariants> = (props) => {
    const [local, others] = splitProps(props, ["class", "size", "children"]);
    return (
      <PaginationBase.Root class={local.class} size={local.size} {...others}>
        {local.children ?? (
          <>
            <PaginationBase.FirstTrigger>
              <DoubleLeftArrowIcon />
            </PaginationBase.FirstTrigger>
            <PaginationBase.PrevTrigger>
              <LeftArrowIcon />
            </PaginationBase.PrevTrigger>
            <For each={/* pages array from context */}>{/* render Item, Ellipsis */}</For>
            <PaginationBase.NextTrigger>
              <RightArrowIcon />
            </PaginationBase.NextTrigger>
            <PaginationBase.LastTrigger>
              <DoubleRightArrowIcon />
            </PaginationBase.LastTrigger>
          </>
        )}
      </PaginationBase.Root>
    );
  };
  ```

  **Note**: The composite Pagination needs access to the Ark UI context (pages array, current page) to auto-render items. This requires reading from Ark's pagination context. The "children"-based approach renders nothing by default and lets users compose manually (simpler, more flexible).

  Better approach — **minimal composite** with manual composition encouraged:
  - **`Pagination`** — alias for `PaginationBase.Root` with default children that renders all triggers + page items
  - **`PaginationRoot`** — alias for `PaginationBase.Root`
  - **`PaginationItem`** — composite that auto-applies active style based on current page
  - **`PaginationPrevTrigger`**, **`PaginationNextTrigger`**, **`PaginationFirstTrigger`**, **`PaginationLastTrigger`** — aliases for base triggers
  - **`PaginationEllipsis`** — alias for base ellipsis

  Actually, looking at how Pagination works in Ark UI — Page items are rendered using `For` over `context().pages` which includes `type: "page" | "ellipsis"`. The simplest composite approach:

  ```tsx
  // index.tsx — composite exports
  export const Pagination = PaginationBase.Root;
  export const PaginationRoot = PaginationBase.Root;
  export const PaginationPrevTrigger = PaginationBase.PrevTrigger;
  export const PaginationNextTrigger = PaginationBase.NextTrigger;
  export const PaginationFirstTrigger = PaginationBase.FirstTrigger;
  export const PaginationLastTrigger = PaginationBase.LastTrigger;
  export const PaginationEllipsis = PaginationBase.Ellipsis;

  // PaginationItem — composite that applies active styling
  const PaginationItem: Component<ArkPagination.ItemProps> = (props) => {
    const [local, others] = splitProps(props, ["class"]);
    return <PaginationBase.Item class={local.class} {...others} />;
  };
  ```

  The composite Pagination component (Root with default children rendering all triggers + pages) is more complex and can be a separate higher-level export. Let's keep it simple with re-exported aliases.

- [ ] Export base namespace: `export { Pagination as PaginationBase }`
- [ ] Re-export variants: `export { paginationVariants, type PaginationVariants } from "@fan-ui/core"`

### 6. Solid Barrel: `packages/solid/src/index.ts`

- [ ] Add `export * from "./pagination"` in alphabetical order (near `p*` entries, after `popover`)

### 7. Demo: `apps/docs/src/components/pagination-demo/`

- [ ] Create `PaginationBasicDemo.tsx` — basic usage with default page items
- [ ] Must import only named composites from `@fan-ui/solid`, never `.base.tsx` or `PaginationBase`
- [ ] Imports: `import { Pagination, PaginationItem, PaginationPrevTrigger, PaginationNextTrigger, PaginationFirstTrigger, PaginationLastTrigger, PaginationEllipsis } from "@fan-ui/solid"`
- [ ] Basic usage:

  ```tsx
  import { Index } from "solid-js";
  import { Pagination, ... } from "@fan-ui/solid";

  <Pagination count={100} pageSize={10}>
    <PaginationFirstTrigger>
      <svg>...</svg>
    </PaginationFirstTrigger>
    <PaginationPrevTrigger>
      <svg>...</svg>
    </PaginationPrevTrigger>
    <Index each={/* need context().pages */}>
      ...
    </Index>
    <PaginationNextTrigger>
      <svg>...</svg>
    </PaginationNextTrigger>
    <PaginationLastTrigger>
      <svg>...</svg>
    </PaginationLastTrigger>
  </Pagination>
  ```

  - **Note**: Page items require accessing Ark UI context (pages array). The demo must use Ark's pagination context to render items. This may require the demo to also import from a context hook (which would come from the base file).

  **Alternative approach**: Create a `PaginationPageList` composite that auto-renders page items + ellipsis, so the demo is clean:

  ```tsx
  // In index.tsx
  import { usePaginationContext } from "@ark-ui/solid/pagination";
  import { Index } from "solid-js";

  const PaginationPageList: Component = () => {
    const pagination = usePaginationContext();
    return (
      <Index each={pagination().pages}>
        {(page) =>
          page().type === "page" ? (
            <PaginationBase.Item {...page()}>{page().value}</PaginationBase.Item>
          ) : (
            <PaginationBase.Ellipsis index={page().index}>...</PaginationBase.Ellipsis>
          )
        }
      </Index>
    );
  };
  ```

  Export this alongside other composites for clean demo code.

- [ ] Add additional demos:
  - **Sizes**: `PaginationSizesDemo.tsx` — showing sm/md/lg variants
  - **Controlled**: `PaginationControlledDemo.tsx` — controlled `page` + `onPageChange`
  - **RootProvider**: `PaginationRootProviderDemo.tsx` — advanced machine-controlled via `usePagination()` hook

### 8. Docs: `apps/docs/src/content/docs/components/pagination.mdx`

- [ ] Create MDX page with frontmatter:
  ```yaml
  title: Pagination
  description: A navigation component for moving between pages of content.
  category: Navigation
  updatedDate: 2026-06-06
  ```
- [ ] Import ALL demo files at the top
- [ ] Render `<PaginationBasicDemo client:load />` right after description
- [ ] Import `DocsLink` from `@components/DocsLink.astro`
- [ ] Link to Ark UI: `https://ark-ui.com/docs/components/pagination`
- [ ] Add Installation section (CLI + Manual with recipe/code blocks)
- [ ] Add Usage section with:
  - Basic import + minimal code example using named composites from `index.tsx`
  - `### Sizes` with `<PaginationSizesDemo client:load />` + code block
  - `### Controlled` with `<PaginationControlledDemo client:load />` + code block
  - All usage examples use composite named exports, never `ComponentBase`
- [ ] Add Advanced Usage section for RootProvider Pattern:
  - `<PaginationRootProviderDemo client:load />` + code block
- [ ] Add API Reference section linking to Ark UI

## Pattern E Specifics

- Base exports **single namespace** (`Pagination`), not individual parts
- Index.tsx **does NOT** re-export from base via `export *`
- Raw parts accessible only via `~/components/pagination/pagination.base`
- Composite named exports for basic demo usage: `Pagination`, `PaginationItem`, `PaginationPrevTrigger`, etc.
- Context providers stay internal to base (RootProvider exported via namespace only)
- Uses Ark UI's `usePaginationContext` internally in composite `PaginationPageList` for auto-rendering page items

## Reference: segment-group Architecture

```
packages/solid/src/segment-group/
├── segment-group.base.tsx   # Namespace: { Root, RootProvider, Label, Item, ItemText, ItemControl, ItemHiddenInput, Indicator }
└── index.tsx                # Composite: SegmentGroup, SegmentGroupItem + exports { SegmentGroupBase }
```
