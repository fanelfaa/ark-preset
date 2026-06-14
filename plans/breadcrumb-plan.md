# Plan: Breadcrumb

**Pattern:** shadcn (Pure HTML/CSS — no Ark UI)
**Reference:** `packages/solid/src/card/` (Card pattern for shadcn components)
**Status:** Planning

## Component Overview

A navigation component showing the current page location within a hierarchy. Pure HTML/CSS component — wraps native HTML elements with `ark.*` factory — no Ark UI primitives.

### Parts

| Part                | Has tv() slots? | Notes                                                   |
| ------------------- | --------------- | ------------------------------------------------------- |
| Breadcrumb          | No              | Semantic `<nav>` wrapper with `aria-label="breadcrumb"` |
| BreadcrumbList      | Yes             | `<ol>` ordered list container                           |
| BreadcrumbItem      | Yes             | `<li>` list item                                        |
| BreadcrumbLink      | Yes             | `<a>` link element                                      |
| BreadcrumbPage      | Yes             | `<span>` current page indicator (not a link)            |
| BreadcrumbSeparator | Yes             | `<li>` separator between items (icon or text)           |
| BreadcrumbEllipsis  | Yes             | `<span>` collapsed items indicator                      |

### Variants

No visual variants — breadcrumb does not have semantic visual variants. The recipe defines only styling slots without a `variants` object.

## Artifact Checklist

### 1. Recipe: `packages/core/src/recipes/breadcrumb.ts`

- [ ] Create tv() with slots for each part:
  - **list**: `"flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5"` — flex row
  - **item**: `"inline-flex items-center gap-1.5"` — inline flex item
  - **link**: `"transition-colors hover:text-foreground"` — styled link
  - **page**: `"font-normal text-foreground"` — current page, not a link
  - **separator**: `"[&>svg]:size-3.5"` — icon container
  - **ellipsis**: `"flex size-9 items-center justify-center"` — icon or text
- [ ] No variants (shadcn breadcrumb has no variants)
- [ ] Module-level: `const styles = breadcrumbVariants();`
- [ ] Export `breadcrumbVariants` + type `BreadcrumbVariants`

### 2. Core Index: `packages/core/src/index.ts`

- [ ] Add `export { breadcrumbVariants } from "./recipes/breadcrumb"`
- [ ] Add `export type { BreadcrumbVariants } from "./recipes/breadcrumb"`
- [ ] Insert in alphabetical order after `avatar`/`badge` area

### 3. Tsup Entry: `packages/core/tsup.config.ts`

- [ ] Add `"src/recipes/breadcrumb.ts"` to entry list (alphabetical order, after `badge.ts`/`button.ts`)

### 4. Solid Component: `packages/solid/src/breadcrumb/index.tsx`

- [ ] Import `breadcrumbVariants` from `@fan-ui/core`
- [ ] Import `ark, type HTMLArkProps` from `@ark-ui/solid/factory`
- [ ] Module-level: `const styles = breadcrumbVariants();`
- [ ] Create flat component file (no base/ directory needed) — same pattern as Card/Badge:
  - **Breadcrumb**: `<nav>` with `aria-label="breadcrumb"` — passes `class` to wrapper div, spreads others
  - **BreadcrumbList**: `<ol>` — `splitProps(props, ["class"])` + `styles.list({ class: local.class })`
  - **BreadcrumbItem**: `<li>` — `splitProps(props, ["class"])` + `styles.item({ class: local.class })`
  - **BreadcrumbLink**: `<a>` — `splitProps(props, ["class"])` + `styles.link({ class: local.class })`
  - **BreadcrumbPage**: `<span>` — `splitProps(props, ["class"])` + `styles.page({ class: local.class })`
  - **BreadcrumbSeparator**: `<li>` — `splitProps(props, ["class"])` + `styles.separator({ class: local.class })`. Default children: `>` arrow SVG
  - **BreadcrumbEllipsis**: `<span>` — `splitProps(props, ["class"])` + `styles.ellipsis({ class: local.class })`. Default children: `...` or SVG icon
- [ ] Export all named components + `breadcrumbVariants`

### 5. Solid Barrel: `packages/solid/src/index.ts`

- [ ] Add `export * from "./breadcrumb"` in alphabetical order (after `avatar`, before `button`)

### 6. Demo: `apps/docs/src/components/breadcrumb-demo/BreadcrumbBasicDemo.tsx`

- [ ] Create BasicDemo importing named composites from `@fan-ui/solid` only — no base imports
- [ ] Imports: `import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "@fan-ui/solid"`
- [ ] Usage:
  ```tsx
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/components">Components</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
  ```
- [ ] Wrap in `not-prose` border container (same pattern as CardBasicDemo)
- [ ] Add long-path demo showing collapsed ellipsis behavior

### 7. Docs: `apps/docs/src/content/docs/components/breadcrumb.mdx`

- [ ] Create MDX page with frontmatter:
  ```yaml
  title: Breadcrumb
  description: A navigation component that displays the current page location within a hierarchy.
  category: Navigation
  updatedDate: 2026-06-06
  ```
- [ ] Import `BreadcrumbBasicDemo` and render `<BreadcrumbBasicDemo client:load />`
- [ ] Add Installation section (CLI + Manual with recipe/code blocks)
- [ ] Add Usage section with:
  - Basic import + code example
  - Collapsed variant showing `BreadcrumbEllipsis`
  - Links vs current page pattern
- [ ] Add API Reference section (parts table with props)

## Reference: Card Architecture (shadcn pattern)

```
packages/solid/src/card/
└── index.tsx           # Flat file: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
```
