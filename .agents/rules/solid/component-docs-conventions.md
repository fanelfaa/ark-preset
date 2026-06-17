# Component Documentation Conventions

## Scope

Applies when creating or editing documentation for UI components under `apps/docs/src/content/docs/<name>/`.

## Source of Truth

| Artifact                          | Source Path                                              |
| --------------------------------- | -------------------------------------------------------- |
| Recipe (styling primitives)       | `packages/core/src/recipes/<component>.ts`               |
| Component (Solid.js wrapper)      | `packages/solid/src/<component>/` (directory per comp)   |
| Demo wrapper (interactive)        | `apps/docs/src/components/demos/<component>-demo/`       |
| Documentation (section files)     | `apps/docs/src/content/docs/<component>/` (dir per comp) |

## Docs Site Architecture

The docs site is a **Solid.js SPA with TanStack Router** (NOT Astro). Key implications:

- **No `client:load` directive** — components render directly in MDX, no Astro island wrapping needed
- **All components work inline** — no SSR context crash (Solid.js renders everything client-side)
- **Demo wrappers are optional** — extract to a separate file only when the component is complex enough to warrant its own demo file (reused in multiple sections, has complex internal state)
- **Path aliases**: `@demos/*` → `src/components/demos/*` (in tsconfig)
- **MDX rendering** via `vite-plugin-solid-marked` with custom provider at `src/mdx-provider.tsx`
- **Code blocks** rendered via `<CodeBlock>` component (highlight.js + copy button + overflow expand)
- **Styles**: Tailwind CSS v4 via `@tailwindcss/vite`, prose via `@tailwindcss/typography`
- **Theme**: `@fan-ui/core/src/theme.css` imported via `../styles.css`

## Doc Directory Structure

Each component has its own directory under `src/content/docs/<name>/`:

```
src/content/docs/<name>/
├── index.tsx              # Imports section files in order, exports as default
├── intro.mdx              # Title + description + live demo + usage code block
├── installation.gen.mdx   # AUTO-GENERATED (CLI + Manual with recipe + component source)
├── usage.mdx              # Usage patterns, sub-sections, advanced usage
└── api.mdx                # API Reference (link to Ark UI docs)
```

### `index.tsx` pattern

```tsx
import Intro from "./intro.mdx";
import Usage from "./usage.mdx";
import Api from "./api.mdx";
import type { Component } from "solid-js";

const ComponentDoc: Component = () => (
  <>
    <Intro />
    <Usage />
    <Api />
  </>
);
export default ComponentDoc;
```

## Adding a New Component Documentation

### Step 1: Create the docs directory

```
src/content/docs/<name>/
├── index.tsx
├── intro.mdx
├── usage.mdx
└── api.mdx
```

### Step 2: Write section files

- `intro.mdx` — `# Title` + description + `<DocsLink>` + live demo + basic usage code block
- `usage.mdx` — `## Usage` with import examples, sub-sections as `###`, anatomy table
- `api.mdx` — `## API Reference` linking to Ark UI docs

### Step 3: Generate the installation file

```bash
pnpm generate-installation <name>
```

Creates `installation.gen.mdx` from `packages/core/src/recipes/<name>.ts` + `packages/solid/src/<name>/` files.

> `installation.gen.mdx` is **auto-generated from source** and **stays in sync automatically**:
> - **Vite dev** — `installation-watcher` plugin watches `packages/core/src/recipes/` (`.ts`) and `packages/solid/src/` (`.tsx`) via `fs.watch`; any source edit triggers regeneration of the affected component's `installation.gen.mdx` in real time
> - **Vite build** — `installation-watcher` plugin's `buildStart` hook regenerates ALL `installation.gen.mdx` files from current source, guaranteeing the production bundle is never stale
> - **Manual** — `pnpm generate-installation <name>` regenerates a single component's file on demand
>
> **Never edit `installation.gen.mdx` by hand** — changes to recipes or component source automatically propagate to the docs.

### Step 4: Create optional demo files

If the component benefits from extracted demo components:
```
src/components/demos/<name>-demo/<Name>BasicDemo.tsx
src/components/demos/<name>-demo/<Name>SecondaryDemo.tsx
```

### Step 5: Update sidebar navigation

Add the component to `src/sidebar-nav.ts` in the appropriate category.

### Step 6: Add to watcher (optional)

Add component name to the `POC` set in:
- `scripts/generate-installation.ts`
- `src/plugins/installation-watcher.ts`

## Import Domains

| Context            | Import Path                  | Example                                                   |
| ------------------ | ---------------------------- | --------------------------------------------------------- |
| **Demo files**     | `@fan-ui/solid`              | `import { Button } from "@fan-ui/solid"`                  |
| **MDX top-level**  | `../../../components/X`      | `import { DocsLink } from "../../../components/DocsLink"` |
| **MDX demo import**| `@demos/<name>-demo/X`       | `import Demo from "@demos/accordion-demo/AccordionDemo"`  |
| **Code blocks**    | `@fan-ui/solid` or `~/components/<name>` | Both used in docs, see below              |

### Code block import convention

| Context                                    | Import Path                |
| ------------------------------------------ | -------------------------- |
| Usage code block (recommended reader path) | `@fan-ui/solid`            |
| Advanced/RootProvider examples             | `~/components/<name>`      |
| Manual install code blocks (auto-gen)      | `@fan-ui/core` + `@ark-ui/solid` (source verbatim) |

## MDX Section Details

### `intro.mdx` — Title, Demo, Basic Usage

```mdx
import { DocsLink } from "../../../components/DocsLink";
import NameBasicDemo from "@demos/<name>-demo/NameBasicDemo.tsx";

# ComponentName

Brief description.

<DocsLink href="https://ark-ui.com/docs/components/<name>" />

<NameBasicDemo />

```tsx
import { ComponentName } from "@fan-ui/solid";

<ComponentName>...</ComponentName>
```
```

Rules:
- No YAML frontmatter — start with `# Title`
- Description is at least one sentence
- `<DocsLink>` uses the `ArrowRightUp` icon component internally
- Demo components render directly (`<DemoName />` — no `client:load` needed)
- Usage code block shows simplest import + usage from `@fan-ui/solid`

### `usage.mdx` — Full Usage Reference

```mdx
import { InlineCode } from "@fan-ui/solid";
import NameSecondaryDemo from "@demos/<name>-demo/NameSecondaryDemo.tsx";

## Usage

Import the components:

```tsx
import { ComponentName } from "@fan-ui/solid";
```

Basic usage:

```tsx
<ComponentName>...</ComponentName>
```

### Feature Name (sub-section)

<NameSecondaryDemo />

```tsx
// Usage with feature
...
```

### Anatomy (optional)

| Part | Element | Description |
|------|---------|-------------|
| `<ComponentName>` | — | Manages state |
| `<ComponentNamePart>` | `button` | Description |
```

Rules:
- Import `{ InlineCode }` from `@fan-ui/solid` for inline references
- Demo imports use `@demos/<name>-demo/` alias
- Sub-sections as `###` heading within Usage

### `api.mdx` — API Reference

```mdx
import { InlineCode } from "@fan-ui/solid";

## API Reference

See the [Ark UI ComponentName](https://ark-ui.com/docs/components/<name>) documentation.

Optional additional notes specific to @fan-ui wrapper behavior.
```

Rules:
- API Reference links to Ark UI docs — do NOT duplicate full Ark UI prop tables
- Only add notes for wrapper-specific behavior (e.g., "AlertDialog sets role=alertdialog")

### `installation.gen.mdx` — Auto-Generated from Source

**Never edit by hand.** This file is regenerated whenever the source recipes or component files change. It is the **live reflection** of `packages/core/src/recipes/<name>.ts` and `packages/solid/src/<name>/` in the docs.

Generated by `generateInstallationContent()` in `src/shared/generate-content.ts`:

```
## Installation

### CLI

npx @fan-ui/cli@latest add <name>

### Manual

- Recipe code block (from packages/core/src/recipes/<name>.ts)
- Component source code blocks (from packages/solid/src/<name>/)
- Tailwind CSS variables reminder note
```

The manual section copies source verbatim from the recipe + component files. If the component has `.base.tsx` + `index.tsx` pattern, both are shown with appropriate headings.

**Regeneration triggers** (any of these keeps the file in sync):
| Trigger | Mechanism | Scope |
|---------|-----------|-------|
| `vite dev` (source file change) | `installation-watcher` plugin `configureServer` — `fs.watch` on recipe `.ts` + component `.tsx` dirs | Single component (real-time) |
| `vite build` | `installation-watcher` plugin `buildStart` — iterates all docs components | All components (every build) |
| `pnpm generate-installation` | CLI script `scripts/generate-installation.ts` | One or all components (manual) |

The watcher plugin watches each recipe and component directory individually (no `recursive: true` for Linux compat). On change, it reads the source files and writes the updated `installation.gen.mdx` — no server restart needed.

## Demo Components

### When to create a demo file

Create a demo directory under `src/components/demos/<name>-demo/` when:
- The component has complex sub-structure (compound components like Accordion, Dialog, Select)
- The demo is reused across multiple sections (basic + multiple + controlled)
- The demo has its own state/event handling that would clutter the MDX

**Otherwise, inline JSX directly in the MDX is fine** — all components work in Solid.js SPA context.

### Demo file pattern

```tsx
// src/components/demos/accordion-demo/AccordionBasicDemo.tsx
import { Accordion, AccordionItem, AccordionItemTrigger, AccordionItemContent } from "@fan-ui/solid";

export default function AccordionBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <Accordion defaultValue={["item-1"]}>
        <AccordionItem value="item-1">
          <AccordionItemTrigger>
            Title
            <AccordionItemIndicator>↓</AccordionItemIndicator>
          </AccordionItemTrigger>
          <AccordionItemContent>Content</AccordionItemContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
```

Rules:
- Import from `@fan-ui/solid` (not relative paths)
- Default export a function (not named export)
- Wrap in `<div class="rounded-lg border border-border p-6">` for visual consistency
- Each distinct feature (basic, multiple, controlled, etc.) gets its own file
- Import in MDX via `@demos/<name>-demo/<DemoName>.tsx` alias

## MDX Rendering

Markdown is rendered by `vite-plugin-solid-marked` with a custom provider at `src/mdx-provider.tsx`. Builtin elements are mapped to component equivalents:

| Markdown     | Rendered as                  |
| ------------ | ---------------------------- |
| `#` / `##`  | `<H1>` / `<H2>` from @fan-ui/solid typography |
| Paragraph    | `<P>` from @fan-ui/solid     |
| Inline `code` | `<InlineCode>` from @fan-ui/solid |
| Code block   | `<CodeBlock>` (highlight.js + copy + expand) |
| Blockquote   | `<Blockquote>` from @fan-ui/solid |
| Table        | Styled table with border     |
| Link         | Styled `<a>` with underline  |

All lowercase HTML elements (div, span, p, a, etc.) pass through as native. Uppercase custom components must be imported directly in the `.md` file or registered in the components map.

## CodeBlock Component

Code blocks are rendered by `src/components/CodeBlock.tsx` which provides:
- **Syntax highlighting** via highlight.js (registered: typescript, javascript, xml, css, bash)
- **Language mapping**: tsx→javascript, ts→typescript, sh/bash→bash, json→javascript
- **Copy button** in top-right corner (click to copy, shows checkmark for 1.5s)
- **Overflow expand** for blocks >200px (shows gradient + "Show more" button)
- **Dedent/normalize** — strips common leading whitespace

Code blocks in MDX are auto-detected by the marked parser. No special markup needed.

## Sidebar Navigation

Sidebar config is in `src/sidebar-nav.ts`. Categories and entries are hardcoded:

```ts
export const sidebarNav: SidebarCategory[] = [
  {
    category: "Form & Input",
    links: [
      { href: "/docs/components/button", label: "Button" },
      // ...
    ],
  },
  // ...
];
```

When adding a new component doc, add its entry to the appropriate category. Route format: `/docs/components/<name>`.

## Content Discovery

The `src/content/docs/index.tsx` auto-discovers doc modules via `import.meta.glob`:

```ts
const modules = import.meta.glob<{ default: Component }>("./*/index.tsx", { eager: true });
```

No manual registration needed — creating `content/docs/<name>/index.tsx` auto-registers it.

## Components Importable in MDX

The following components from `src/components/` are available for use in `.mdx` files:

| Component    | Import path                                            | Purpose                    |
| ------------ | ------------------------------------------------------ | -------------------------- |
| `DocsLink`   | `../../../components/DocsLink`                         | Link to Ark UI docs        |
| `CodeBlock`  | (auto by marked)                                       | Rendered code blocks       |
| `InlineCode` | `@fan-ui/solid`                                        | Inline code reference      |
| `DocsLayout` | (auto by route)                                        | Page layout wrapper        |

## Notes

- The `Apps/docs/AGENTS.md` file at project root has a higher-level overview of the docs site
- Generating `installation.gen.mdx` requires the component to exist in both `packages/core/src/recipes/` AND `packages/solid/src/`
- The `router.tsx` file at `src/router.tsx` is dead code — do not use it, do not import it
- TypeScript v6 (packages use v5), Vite v8 (packages use v6)
