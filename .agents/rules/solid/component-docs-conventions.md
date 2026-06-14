# Component Documentation Conventions

## Scope

Applies when creating or editing documentation for UI components under `apps/docs/src/content/docs/components/*.mdx`.

## Source of Truth

| Artifact                          | Source Path                                                |
| --------------------------------- | ---------------------------------------------------------- |
| Recipe (styling primitives)       | `packages/core/src/recipes/<component>.ts`                 |
| Component (Solid.js wrapper)      | `packages/solid/src/<component>.tsx`                       |
| Demo wrappers (context-dependent) | `apps/docs/src/components/<component>-demo/<DemoName>.tsx` |
| Documentation                     | `apps/docs/src/content/docs/components/<component>.mdx`    |

## Docs Site Architecture

The docs site uses **Astro with Solid.js islands**. Key implications:

- Solid.js components render client-side via `client:load` directive
- Inline JSX in MDX works for simple components (Strategy A)
- Compound components need `.tsx` demo wrappers rendered with `client:load` (Strategy B)
- Global styles via `apps/docs/src/styles/global.css` (Tailwind v4 + `@ui/core` theme)
- Path aliases: `@components/*` → `src/components/*`, `@layouts/*` → `src/layouts/*`

## MDX Structure

Component docs follow this section order. Sections marked (optional) are included only if the component exposes that feature:

```
1. Frontmatter (title, description, category, updatedDate)          [required]
2. Import statement(s) + H1 title                                   [required]
3. External link to Ark UI docs                                     [required]
4. Live demo block (interactive preview)                            [required]
5. Installation (CLI + Manual)                                      [required]
6. Usage (import + code examples)                                   [required]
7. Variants section                                                 [optional — if variant prop exists]
8. Sizes section                                                    [optional — if size prop exists]
9. Additional sections (Disabled, Loading, Multiple, etc.)          [optional — component-specific]
10. API Reference table(s)                                          [required]
```

## MDX Sections — Required vs Optional

| Section                                       | Required?                              |
| --------------------------------------------- | -------------------------------------- |
| Frontmatter                                   | Yes                                    |
| Import(s) + H1                                | Yes                                    |
| Ark UI external link                          | Yes                                    |
| Live demo block                               | Yes                                    |
| Installation (CLI + Manual)                   | Yes                                    |
| Usage                                         | Yes                                    |
| Variants                                      | Only if component has a `variant` prop |
| Sizes                                         | Only if component has a `size` prop    |
| Additional sections (Disabled, Loading, etc.) | Only if component exposes that feature |
| API Reference                                 | Yes                                    |

## Frontmatter

```yaml
---
title: <ComponentName>
description: <One-sentence description of the component.>
category: <Category name>
updatedDate: YYYY-MM-DD
---
```

## Import Statements

### Two Import Domains

There are **two distinct import domains** that must never be mixed:

| Domain          | Import Path                | Used In                                                                  |
| --------------- | -------------------------- | ------------------------------------------------------------------------ |
| **Live demo**   | `@ui/solid`                | Top-level MDX import for inline JSX, or inside demo wrapper `.tsx` files |
| **Code blocks** | `~/components/<component>` | All fenced code blocks (`tsx ... `) shown to the user                    |

**DO NOT** use `@ui/solid` inside any fenced code block. It is only for the docs site's own rendering.

### Live Demo Import — Two Strategies

Choose one based on whether the component relies on Solid.js context (Ark UI compound components).

#### Strategy A: Inline JSX (no context dependency)

For simple components like Button, Checkbox, Switch — components that render without needing a parent provider context:

```tsx
import { Button } from "@ui/solid";
```

Then use JSX directly in the MDX:

````mdx
<div class="rounded-lg border border-border p-6">
  <div class="flex flex-wrap gap-4">
    <Button>Default</Button>
    <Button variant="secondary">Secondary</Button>
  </div>
```tsx
// code block follows...
````

</div>
```

#### Strategy B: Client-side wrapper (context dependency)

For compound components like Accordion, Dialog, Select, Menu — components where Ark UI sub-components (`Item`, `ItemTrigger`, `ItemContent`, etc.) rely on Solid.js context and **crash during Astro SSR** with `ContextError: useXxxContext returned undefined`:

1. Create demo wrapper files at `apps/docs/src/components/<component>-demo/<DemoName>.tsx`:

```tsx
// apps/docs/src/components/accordion-demo/AccordionBasicDemo.tsx
import {
  Accordion,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
  AccordionItemIndicator,
} from "@ui/solid";

export default function AccordionBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <Accordion defaultValue={["item-1"]}>
        <AccordionItem value="item-1">
          <AccordionItemTrigger>
            Is it accessible?
            <AccordionItemIndicator>
              <ChevronDownIcon />
            </AccordionItemIndicator>
          </AccordionItemTrigger>
          <AccordionItemContent>
            <div class="pb-4 text-sm text-foreground">
              Yes. It adheres to the WAI-ARIA design pattern.
            </div>
          </AccordionItemContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
```

2. Import and render in MDX with `client:load`:

```tsx
import AccordionBasicDemo from "@components/accordion-demo/AccordionBasicDemo.tsx";
import AccordionMultipleDemo from "@components/accordion-demo/AccordionMultipleDemo.tsx";
```

````mdx
<AccordionBasicDemo client:load />

```tsx
// code block with ~/components/accordion import...
```
````

````

**Demo wrapper rules:**
- **Only create `<component>-demo/` when the component needs Solid.js context** — i.e. compound components like Accordion, Select, Dialog, Menu, Tabs, Radio Group, Combobox, Date Picker, etc. where sub-components (`Item`, `ItemTrigger`, `ItemContent`, etc.) rely on a parent provider and crash during Astro SSR with `ContextError: useXxxContext returned undefined`.
- **DO NOT create `<component>-demo/` for simple components** — single-element components like Button, Checkbox, Switch, Slider, Input, Tooltip, Toast, etc. that render fine with inline JSX (Strategy A).
- File location: `apps/docs/src/components/<component>-demo/<DemoName>.tsx`
- Import from `@ui/solid` (the monorepo package)
- Default export a function component
- Wrap content in `<div class="rounded-lg border border-border p-6">` for visual consistency
- Each distinct demo (basic, multiple, collapsible, disabled, etc.) gets its own file
- Render in MDX with `client:load` directive (not `client:only`)
- Import in MDX via the `@components/*` alias: `import DemoName from '@components/<component>-demo/<DemoName>.tsx'`

### Code Block Imports

All fenced code blocks use the `~/components/...` alias:

```tsx
import { Button } from "~/components/button"
````

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
  AccordionItemIndicator,
} from "~/components/accordion";
```

**This alias import (`~/components/...`) MUST be used in:**

- All fenced code blocks under Installation → Manual
- All fenced code blocks under Usage
- All fenced code blocks under Variants, Sizes, and additional sections

## Installation Section

### CLI

````markdown
### CLI

Run the following command to add the component to your project:

```bash
npx @fan-ui/cli@latest add <component>
```
````

````

The CLI command performs **five operations** automatically:
1. Copies component file from `packages/solid/src/<component>.tsx` → `src/components/<component>.tsx`
2. Rewrites `@ui/core` imports to `../recipes` in the copied component
3. Copies recipe file from `packages/core/src/recipes/<component>.ts` → `src/recipes/<component>.ts`
4. Updates (or creates) `src/components/index.ts` with the new export
5. Updates (or creates) `src/recipes/index.ts` with the new export
6. Copies `theme.css` to `src/components/` if not already present

Available components: `accordion`, `button`, `checkbox`, `collapsible`, `date-picker`, `dialog`, `drawer`, `input`, `menu`, `number-input`, `popover`, `radio-group`, `select`, `slider`, `switch`, `tabs`, `toast`, `tooltip`.

### Manual

The manual section contains **two or three code blocks**, each wrapped in `<div class="space-y-3">`:

1. **Dependency install** (if needed):
   ```bash
   npm install tailwind-variants
````

2. **Recipe file** — copy from `packages/core/src/recipes/<component>.ts`:
   - File path: `src/components/recipes/<component>.ts`
   - Import: `import { tv } from 'tailwind-variants'` (or `import { tv, type VariantProps }`)
   - Paste the full recipe content verbatim
   - Recipe files may export a type: `export type ComponentVariants = VariantProps<typeof componentVariants>`

3. **Component file** — copy from `packages/solid/src/<component>.tsx`:
   - File path: `src/components/<component>.tsx`
   - **Import changes required:**
     - `import { ... } from '@ui/core'` → `import { ... } from '../recipes/<component>'`
     - Ark UI imports may use **two patterns**:
       - Named import: `import { Component } from '@ark-ui/solid/<component>'`
       - Factory import: `import { ark, HTMLArkProps } from '@ark-ui/solid/factory'`
     - Both remain unchanged in the manual copy
   - Paste the adapted component content

4. **Theme variables note** (if recipe uses CSS variables like `--primary`, `--ring`):
   ```markdown
   > **Note:** Make sure your project has the Tailwind CSS theme variables set up (`--primary`, `--destructive`, `--ring`, etc.) or override the utility classes to match your design system.
   ```

## Usage Section

````markdown
## Usage

Import the component:

```tsx
import { Component } from "~/components/<component>";
```
````

Basic usage:

```tsx
<Component>...</Component>
```

With <feature>:

```tsx
<Component<props>>...</Component>
```

````

Each usage example is a standalone fenced code block with a short descriptive heading.

## Variants / Sizes / Additional Sections

### Simple components (inline JSX)

For components that support Strategy A (no context dependency):

```markdown
## Variants

Use the `variant` prop to change the visual style.

<div class="flex flex-wrap gap-4">
  <Component variant="...">...</Component>
  ...
</div>
````

### Additional feature sections

Components may expose additional features beyond variants and sizes. Document each with:

1. Brief description of the prop/feature
2. Live demo (inline JSX for Strategy A, or `<DemoName client:load />` for Strategy B)
3. Follow-up code block showing the usage pattern

Common additional sections:

- **Loading** — spinner overlay, auto-disables interaction (e.g. Button with `loading` prop)
- **Disabled** — interaction disabled on component or sub-component
- **Multiple** — multiple selection/expansion allowed
- **Collapsible** — can be closed after being opened
- **Controlled** — using `value`/`onValueChange` for programmatic control
- **Link / asChild** — rendering as different element while keeping styles

### Compound components (client:load wrappers)

For components that require Strategy B (context dependency), each additional section gets:

1. Brief description of the prop/feature
2. Live demo via `<DemoName client:load />`
3. Follow-up code block showing the usage pattern

````markdown
## Multiple

Use the `multiple` prop to allow more than one item to be expanded at the same time.

<AccordionMultipleDemo client:load />

```tsx
<Accordion multiple defaultValue={["item-1", "item-2"]}>
  <AccordionItem value="item-1">...</AccordionItem>
</Accordion>
```
````

````

## API Reference

Table at the bottom listing all props:

### Simple components — single table

```markdown
## API Reference

| Prop | Type | Default |
|------|------|---------|
| propName | type | default |
````

### Compound components — multiple sub-tables

For compound components with multiple sub-components, create a sub-table for each:

```markdown
## API Reference

### Accordion (Root)

| Prop         | Type       | Default | Description                    |
| ------------ | ---------- | ------- | ------------------------------ |
| defaultValue | `string[]` | `[]`    | Initial expanded items.        |
| multiple     | `boolean`  | `false` | Allow multiple items expanded. |

### AccordionItem

| Prop     | Type      | Default | Description                      |
| -------- | --------- | ------- | -------------------------------- |
| value    | `string`  | —       | Unique identifier. **Required.** |
| disabled | `boolean` | `false` | Whether this item is disabled.   |

### AccordionItemTrigger

| Prop  | Type     | Default | Description       |
| ----- | -------- | ------- | ----------------- |
| class | `string` | —       | Custom CSS class. |
```

Include only props explicitly defined or meaningfully overridden by the component. Do NOT list every inherited HTML attribute. Document whatever props the component actually exposes — variant/size props, boolean flags, `class` overrides, `asChild`, or anything else.

## Recipe-to-Doc Code Block Rules

When copying recipe code into the Manual installation section:

1. **Copy verbatim** — do not modify the `tv()` call or variant definitions
2. **File path** in the doc must match: `src/components/recipes/<component>.ts`
3. **Import** in the recipe code block: `import { tv } from 'tailwind-variants'` (no `@ui/core`)

## Component-to-Doc Code Block Rules

When copying component code into the Manual installation section:

1. **Change recipe import**:
   ```diff
   - import { componentVariants } from '@ui/core'
   + import { componentVariants } from '../recipes/<component>'
   ```
2. **Keep Ark UI imports** unchanged — components use **two patterns**:
   - **Named import**: `import { Component } from '@ark-ui/solid/<component>'`
   - **Factory import**: `import { ark, HTMLArkProps } from '@ark-ui/solid/factory'`
     - When using factory, the component renders `<ark.element>` instead of `<Component>`
     - Props type changes from `JSX.ElementHTMLAttributes` to `HTMLArkProps<'element'>`
3. **Keep all Solid.js imports** unchanged (`solid-js`, `tailwind-variants` types)
4. **File path** in the doc must match: `src/components/<component>.tsx`
5. **Export** must include both component and variants: `export { Component, componentVariants }`

## Ark UI External Link

Every component doc includes a link to the official Ark UI documentation:

```markdown
<a href="https://ark-ui.com/docs/components/<component>" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors">
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
  Docs
</a>
```

Use the appropriate Ark UI docs URL for the component. For non-component pages (e.g. composition guide), use the relevant path.
