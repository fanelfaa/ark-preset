# Plan: Table (shadcn)

**Pattern:** shadcn (Pure HTML/CSS — no Ark UI)
**Reference:** `packages/solid/src/card/` (Card pattern for shadcn components)
**Status:** Planning

## Component Overview

A responsive data table component with accessible markup. Pure HTML/CSS component — wraps native HTML elements with `ark.*` factory — no Ark UI primitives.

### Parts

| Part         | Has tv() slots? | Notes                         |
| ------------ | --------------- | ----------------------------- |
| Table        | Yes             | `<table>` root element        |
| TableHeader  | Yes             | `<thead>` header group        |
| TableBody    | Yes             | `<tbody>` body group          |
| TableRow     | Yes             | `<tr>` row                    |
| TableHead    | Yes             | `<th>` header cell            |
| TableCell    | Yes             | `<td>` data cell              |
| TableCaption | Yes             | `<caption>` table description |

### Variants

No visual variants — table does not have semantic visual variants. The recipe defines only styling slots without a `variants` object.

## Artifact Checklist

### 1. Recipe: `packages/core/src/recipes/table.ts`

- [ ] Create tv() with slots for each part:
  - **table**: `"w-full caption-bottom text-sm"` — full width table
  - **header**: `"[&_tr]:border-b"` — header row border
  - **body**: `"[&_tr:last-child]:border-0"` — body rows
  - **row**: `"border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"` — row with hover + selected state
  - **head**: `"h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"` — header cell
  - **cell**: `"p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"` — data cell
  - **caption**: `"mt-4 text-sm text-muted-foreground"` — caption
- [ ] No variants
- [ ] Module-level: `const styles = tableVariants();`
- [ ] Export `tableVariants` + type `TableVariants`

### 2. Core Index: `packages/core/src/index.ts`

- [ ] Add `export { tableVariants } from "./recipes/table"`
- [ ] Add `export type { TableVariants } from "./recipes/table"`
- [ ] Insert in alphabetical order (after `switch`/`tabs` area)

### 3. Tsup Entry: `packages/core/tsup.config.ts`

- [ ] Add `"src/recipes/table.ts"` to entry list (alphabetical order, after `switch.ts`/`tabs.ts`)

### 4. Solid Component: `packages/solid/src/table/index.tsx`

- [ ] Import `tableVariants` from `@fan-ui/core`
- [ ] Import `ark, type HTMLArkProps` from `@ark-ui/solid/factory`
- [ ] Module-level: `const styles = tableVariants();`
- [ ] Create flat component file (no base/ directory needed) — same pattern as Card:
  - **Table**: `<ark.table>` — `splitProps(props, ["class"])` + `styles.table({ class: local.class })`
  - **TableHeader**: `<ark.thead>` — `splitProps(props, ["class"])` + `styles.header({ class: local.class })`
  - **TableBody**: `<ark.tbody>` — `splitProps(props, ["class"])` + `styles.body({ class: local.class })`
  - **TableRow**: `<ark.tr>` — `splitProps(props, ["class"])` + `styles.row({ class: local.class })`
  - **TableHead**: `<ark.th>` — `splitProps(props, ["class"])` + `styles.head({ class: local.class })`
  - **TableCell**: `<ark.td>` — `splitProps(props, ["class"])` + `styles.cell({ class: local.class })`
  - **TableCaption**: `<ark.caption>` — `splitProps(props, ["class"])` + `styles.caption({ class: local.class })`
- [ ] Export all named components + `tableVariants`

### 5. Solid Barrel: `packages/solid/src/index.ts`

- [ ] Add `export * from "./table"` in alphabetical order (after `switch`, before `tabs`)

### 6. Demo: `apps/docs/src/components/table-demo/TableBasicDemo.tsx`

- [ ] Create BasicDemo importing named composites from `@fan-ui/solid` only
- [ ] Imports: `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "@fan-ui/solid"`
- [ ] Basic usage:
  ```tsx
  <Table>
    <TableCaption>A list of recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Invoice</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead class="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell class="font-medium">INV001</TableCell>
        <TableCell>Paid</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell class="text-right">$250.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell class="font-medium">INV002</TableCell>
        <TableCell>Pending</TableCell>
        <TableCell>PayPal</TableCell>
        <TableCell class="text-right">$150.00</TableCell>
      </TableRow>
    </TableBody>
  </Table>
  ```
- [ ] Wrap in `not-prose` border container

### 7. Docs: `apps/docs/src/content/docs/components/table.mdx`

- [ ] Create MDX page with frontmatter:
  ```yaml
  title: Table
  description: A responsive data table component with accessible markup.
  category: Data Display
  updatedDate: 2026-06-06
  ```
- [ ] Import `TableBasicDemo` and render `<TableBasicDemo client:load />`
- [ ] Add Installation section (CLI + Manual with recipe/code blocks)
- [ ] Add Usage section with:
  - Basic import + code example
  - Column alignment (text-right on header/cell)
- [ ] Add API Reference section

## Reference: Card Architecture (shadcn pattern)

```
packages/solid/src/card/
└── index.tsx           # Flat file: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
```
