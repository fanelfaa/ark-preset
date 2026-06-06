# Plan: HoverCard

**Pattern:** E (Namespace base with separate entry points)
**Reference:** `packages/solid/src/segment-group/`
**Status:** Planning

## Component Overview

The HoverCard component shows a popup card on hover/trigger interaction. It opens when the user hovers over the trigger element, displays content after `openDelay` (default 600ms), and closes after `closeDelay` (default 300ms) when the mouse leaves.

### Ark UI Parts

| Part | Has tv() variants? | Notes |
|------|--------------------|-------|
| Root | No | Context provider; manages open/close state, delays, positioning |
| RootProvider | No | For machine-controlled usage via `useHoverCard` |
| Trigger | Yes | Inline trigger button; styled with tv() |
| Positioner | Yes | Fixed position container; styled with tv() |
| Content | Yes | Popup card; styled with tv() |
| Arrow | Yes | Arrow connector element; styled with tv() |
| ArrowTip | Yes | Arrow tip element; styled with tv() |

### Variants

No visual variants — hover-card does not have semantic visual variants. The recipe defines only styling slots without a `variants` object (same pattern as tooltip).

## Artifact Checklist

### 1. Recipe: `packages/core/src/recipes/hover-card.ts`
- [ ] Create tv() with slots for each Ark UI part
  - **Slots**: root, trigger, positioner, content, arrow, arrowTip
- [ ] No variants (same as tooltip pattern)
- [ ] Slot classes based on tooltip + popover patterns:
  - **root**: `"inline-flex"` — inline wrapper
  - **trigger**: tooltip-like inline-flex trigger with focus styles
  - **positioner**: `"z-50"` — fixed position layer
  - **content**: popover-style card with border, shadow, animation classes
  - **arrow**: `""` — empty, serves as CSS variable host
  - **arrowTip**: popover-style rotated square
- [ ] Export `hoverCardVariants` + type `HoverCardVariants`
- [ ] Module-level `const styles = hoverCardVariants();` call pattern (module scope, not inside components)

### 2. Core Index: `packages/core/src/index.ts`
- [ ] Add `export { hoverCardVariants } from "./recipes/hover-card"`
- [ ] Add `export type { HoverCardVariants } from "./recipes/hover-card"`
- [ ] Insert in alphabetical order between `editable` (not yet) and `input` (or after `accordion` area near `date-picker`/`tooltip`)

### 3. Tsup Entry: `packages/core/tsup.config.ts`
- [ ] Add `"src/recipes/hover-card.ts"` to entry list (alphabetical position after `date-picker`/`editable` or near `tooltip`)

### 4. Base File: `packages/solid/src/hover-card/hover-card.base.tsx`
- [ ] Import Ark UI parts from `@ark-ui/solid/hover-card`
- [ ] Import `hoverCardVariants`, `type HoverCardVariants` from `@ui/core`
- [ ] Module-level: `const styles = hoverCardVariants();`
- [ ] No variant context needed (no variants)
- [ ] Wrap each part with tv() styling using `splitProps(props, ["class"])`:
  - **Root**: `ArkHoverCard.Root` — no tv() styling, spread directly (same as tooltip Root)
  - **RootProvider**: `ArkHoverCard.RootProvider` — no tv() styling, spread directly
  - **Trigger**: `Component<ArkHoverCard.TriggerProps>` — splitProps `["class"]`, apply `styles.trigger()`
  - **Positioner**: `Component<ArkHoverCard.PositionerProps>` — splitProps `["class"]`, apply `styles.positioner()`
  - **Content**: `Component<ArkHoverCard.ContentProps>` — splitProps `["class", "style"]`, apply `styles.content()`, pass `style` for CSS variable
  - **Arrow**: `Component<ArkHoverCard.ArrowProps>` — splitProps `["class"]`, apply `styles.arrow()`
  - **ArrowTip**: `Component<ArkHoverCard.ArrowTipProps>` — splitProps `["class"]`, apply `styles.arrowTip()`
- [ ] Export single namespace: `export const HoverCard = { Root, RootProvider, Trigger, Positioner, Content, Arrow, ArrowTip }`
- [ ] No separate context export (no variant context needed)

### 5. Index File: `packages/solid/src/hover-card/index.tsx`
- [ ] Import namespace as `{ HoverCard as HoverCardBase }` from `./hover-card.base`
- [ ] Import Ark types from `@ark-ui/solid/hover-card`
- [ ] **No** `export *` from base (Pattern E rule)
- [ ] Create composite named exports:
  - **`HoverCard`** — alias for `HoverCardBase.Root` (same as tooltip)
  - **`HoverCardTrigger`** — alias for `HoverCardBase.Trigger`
  - **`HoverCardContent`** — composite component that wraps `Positioner + Content + optional Arrow/ArrowTip` (same composite pattern as `TooltipContent` in tooltip)
    - Props: `ArkHoverCard.ContentProps & { useArrow?: boolean }`
    - Renders: `<HoverCardBase.Positioner><HoverCardBase.Content ...>{local.useArrow && (...)}</HoverCardBase.Content></HoverCardBase.Positioner>`
- [ ] Export base namespace: `export { HoverCard as HoverCardBase }`
- [ ] Re-export variants: `export { hoverCardVariants, type HoverCardVariants } from "@ui/core"`

### 6. Solid Barrel: `packages/solid/src/index.ts`
- [ ] Add `export * from "./hover-card"` in alphabetical order
- [ ] Placement: between `"highlight"` (not yet) and `"input"`, or near `"accordion"`/`"checkbox"` section

### 7. Demo: `apps/docs/src/components/hover-card-demo/HoverCardBasicDemo.tsx`
- [ ] Create BasicDemo importing only named composites from `@ui/solid`
- [ ] Must NOT import `.base.tsx` or `HoverCardBase`
- [ ] Imports: `import { HoverCard, HoverCardTrigger, HoverCardContent } from "@ui/solid"`
- [ ] Usage:
  ```tsx
  <HoverCard>
    <HoverCardTrigger>Hover me</HoverCardTrigger>
    <HoverCardContent useArrow>
      <div>Content displayed on hover</div>
    </HoverCardContent>
  </HoverCard>
  ```
- [ ] Add additional demos:
  - **Controlled**: Controlled open state with `open`/`onOpenChange` and a button
  - **Delay**: Custom `openDelay`/`closeDelay` props
  - **Positioning**: Custom `positioning` prop (e.g., positioning at different sides)
  - **RootProvider**: Advanced usage with `useHoverCard` machine hook

### 8. Docs: `apps/docs/src/content/docs/components/hover-card.mdx`
- [ ] Create MDX page with title, description, category
- [ ] Frontmatter:
  ```yaml
  title: Hover Card
  description: A popup card that appears when the user hovers over a trigger element.
  category: Overlay
  updatedDate: 2026-06-05
  ```
- [ ] Import and render BasicDemo
- [ ] Import `DocsLink` from `@components/DocsLink.astro`
- [ ] Link to Ark UI: `https://ark-ui.com/docs/components/hover-card`
- [ ] Add Installation section (CLI + Manual with recipe/code blocks)
- [ ] Add Usage section with basic code examples using `HoverCard`, `HoverCardTrigger`, `HoverCardContent`
- [ ] Add Advanced Usage section (RootProvider, controlled, positioning, delay customization)
- [ ] Add API Reference section linking to Ark UI

## Pattern E Specifics

- Base exports **single namespace** (`HoverCard`), not individual parts
- Index.tsx **does NOT** re-export from base via `export *`
- Raw parts accessible only via `~/components/hover-card/hover-card.base`
- Composite named exports for all parts used in basic demo: `HoverCard`, `HoverCardTrigger`, `HoverCardContent`
- Context providers stay internal to base (RootProvider exported via namespace only)

## Reference: segment-group Architecture

```
packages/solid/src/segment-group/
├── segment-group.base.tsx   # Namespace: { Root, RootProvider, Label, Item, ItemText, ItemControl, ItemHiddenInput, Indicator }
└── index.tsx                # Composite: SegmentGroup, SegmentGroupItem + exports { SegmentGroupBase }
```
