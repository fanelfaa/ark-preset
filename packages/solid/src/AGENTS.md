# PROJECT KNOWLEDGE BASE

**Generated:** 2026-05-27 02:47:19 UTC
**Commit:** f3d6548f
**Branch:** main

## OVERVIEW

Solid.js component library wrapping Ark UI primitives. Components follow a recipe-first, directory-based architecture.

## WHERE TO LOOK

| Task                       | Location             | Notes                                          |
| -------------------------- | -------------------- | ---------------------------------------------- |
| Add new Solid.js component | src/<component>/     | Create directory with .base.tsx + index.tsx    |
| Add recipe                 | ../core/src/recipes/ | Create \*.ts file with tv() slots and variants |
| Update component index     | index.ts             | Add `export * from "./<component>"`            |
| Update core index          | ../core/src/index.ts | Export new recipe variants + types             |

## COMPONENT ARCHITECTURE

### Directory Structure

```
packages/solid/src/<component>/
├── <component>.base.tsx   # Ark UI primitive wrappers (one per sub-part)
└── index.tsx              # Composite component + re-exports
```

Each component has a corresponding recipe in `packages/core/src/recipes/<component>.ts`.

### Pattern A — Simple Re-export (no composite inner structure)

Use when the component just wraps the Ark UI Root and re-exports parts.

**Example: pin-input, accordion, collapsible**

`<component>.base.tsx`:

```tsx
import { ComponentName as ArkComponentName } from "@ark-ui/solid/<package>";
import { splitProps, type Component } from "solid-js";
import { <component>Variants } from "@fan-ui/core";

const styles = <component>Variants();

export const ComponentPart: Component<ArkComponentName.PartProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkComponentName.Part class={styles.slotName({ class: local.class })} {...others} />;
};
```

`index.tsx`:

```tsx
import { ComponentRoot } from "./<component>.base";

export const Component = ComponentRoot;

export * from "./<component>.base";

export { <component>Variants, type <component>Variants } from "@fan-ui/core";
```

### Pattern B — With InnerComponent (composite with inline SVGs)

Use when the component composes sub-parts into a fixed internal structure with inline SVG icons.

**Example: checkbox, number-input, password-input**

`<component>.base.tsx`: Same as Pattern A — wraps each Ark UI part individually.

`index.tsx`:

```tsx
import { ComponentName as ArkComponentName } from "@ark-ui/solid/<package>";
import { splitProps, type Component } from "solid-js";
import {
  PartA,
  PartB,
  ComponentRoot,
  ComponentRootProvider as BaseRootProvider,
} from "./<component>.base";

const InnerComponent = () => (
  <>
    <PartA>
      <PartB>
        {/* SVG icons inline */}
      </PartB>
    </PartA>
  </>
);

export const Component: Component<ArkComponentName.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "label", "children", "disabled", "error"]);
  return (
    <ComponentRoot class={local.class} {...others}>
      {local.label && <ComponentLabel>{local.label}</ComponentLabel>}
      <InnerComponent />
    </ComponentRoot>
  );
};

export * from "./<component>.base";

export { <component>Variants, type <component>Variants } from "@fan-ui/core";
```

### Pattern C — With Portal (composite wrapping content in Portal)

Use when the inner content needs a Portal from `solid-js/web`.

**Example: dialog**

Similar to Pattern B but wraps content in `<Portal>` from `solid-js/web`.

### Pattern D — Composite with automatic parts

Use when component should work out-of-the-box without manual sub-part composition. Composite `index.tsx` wraps children in Viewport/Content, adds Scrollbar/Thumb/Corner internally. Orientation prop drives scrollbar. Primitives still exported for advanced use.

**Example: scroll-area**

`<component>.base.tsx`:

```tsx
import { ComponentName as ArkComponentName } from "@ark-ui/solid/<package>";
import { splitProps, type Component } from "solid-js";
import { <component>Variants } from "@fan-ui/core";

const styles = <component>Variants();

// Parts consuming tv() variants — keep splitProps
// Parts without tv() — spread props directly, no splitProps

export const ScrollAreaViewport: Component<ArkComponentName.ViewportProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkComponentName.Viewport class={styles.viewport({ class: local.class })} {...others} />;
};

// Parts without tv() — direct spread
export const ScrollAreaRoot: Component<ArkComponentName.RootProps> = (props) => (
  <ArkComponentName.Root {...props} />
);
```

`index.tsx`:

```tsx
import { splitProps, type Component } from "solid-js";
import {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from "./<component>.base";
import { ComponentName as ArkComponentName } from "@ark-ui/solid/<package>";

type ScrollAreaProps = ArkComponentName.RootProps & {
  orientation?: "vertical" | "horizontal";
};

const ScrollArea: Component<ScrollAreaProps> = (props) => {
  const [local, others] = splitProps(props, ["orientation", "children"]);
  return (
    <ScrollAreaRoot {...others}>
      <ScrollAreaViewport>
        <ScrollAreaContent>
          {local.children}
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation={local.orientation ?? "vertical"}>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  );
};

export { ScrollArea };

export * from "./<component>.base";
export { <component>Variants, type <component>Variants } from "@fan-ui/core";
```

Usage:

```tsx
<ScrollArea class="h-[200px]" orientation="vertical">
  content
</ScrollArea>
```

For advanced use, import primitives:

```tsx
import { ScrollAreaViewport, ScrollAreaScrollbar, ... } from "~/components/scroll-area";
```

### Pattern E — Namespace base with separate entry points

Use when composite `index.tsx` should NOT expose raw base parts, keeping two clean entry points: composite vs raw.

**Example: segment-group**

`<component>.base.tsx`:

```tsx
import { ComponentName as ArkComponentName } from "@ark-ui/solid/<package>";
import { createContext, useContext, splitProps, type Component } from "solid-js";
import { <component>Variants, type <component>Variants } from "../recipes/<component>";

type VariantContextValue = Pick<ComponentVariants, "variant" | "orientation">;

const VariantContext = createContext<VariantContextValue>();
const useVariant = () => useContext(VariantContext);

const styles = <component>Variants();

// Local parts — NOT exported individually
const Root: Component<ArkComponentName.RootProps & ComponentVariants> = (props) => { ... };
const Label: Component<ArkComponentName.LabelProps> = (props) => { ... };
const Item: Component<ArkComponentName.ItemProps & ComponentVariants> = (props) => { ... };
// ...etc

// Single namespace export
const Component = { Root, Label, Item, /* ... */ };
export { Component };
// Context/hooks exported separately for advanced use
export { VariantContext, useVariant };
```

`index.tsx`:

```tsx
import { splitProps, type Component } from "solid-js";
import { Component as ComponentBase } from "./<component>.base";
import { ComponentName as ArkComponentName } from "@ark-ui/solid/<package>";
import type { ComponentVariants } from "@fan-ui/core";

// Import namespace as alias
// Uses ComponentBase.Root, ComponentBase.Indicator, etc. in JSX

const CompositeComponent: Component<ArkComponentName.RootProps & ComponentVariants> = (props) => {
  const [local, others] = splitProps(props, ["variant", "orientation", "children"]);
  return (
    <ComponentBase.Root ...>
      <ComponentBase.Indicator />
      {local.children}
    </ComponentBase.Root>
  );
};

export { CompositeComponent, ComponentBase };

// Also export composed sub-parts
export const CompositeItem: Component<ArkComponentName.ItemProps & ComponentVariants> = (props) => {
  // wraps ComponentBase.Item with auto ItemText/ItemControl/ItemHiddenInput
};

export { <component>Variants, type <component>Variants } from "@fan-ui/core";
```

**Key differences from Pattern A/B/C/D:**

| Aspect                  | Patterns A-D                                   | Pattern E                                                    |
| ----------------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| Base exports            | Individual named exports (`export const Part`) | Single namespace (`export { Component }`)                    |
| Index re-exports        | `export * from "./<component>.base"`           | **NO** re-export from base                                   |
| Raw parts access        | Via barrel: `~/components/<name>`              | Only via base path: `~/components/<name>/<name>.base`        |
| Base namespace import   | Not needed                                     | Imported with alias: `import { Component as ComponentBase }` |
| Context/hooks in barrel | Yes (via `export *`)                           | No — must import from base file directly                     |

**When to use Pattern E:**

- Composite component has automatic parts wrapping (e.g., `SegmentGroupItem` auto-adds `ItemText`/`ItemControl`/`ItemHiddenInput`)
- Exposing raw base parts through the barrel would be confusing (users might mix composite and raw parts)
- The component has context providers that should stay internal to base

**When NOT to use Pattern E:**

- Component is a simple re-export (use Pattern A)
- All users need is the composite component (use Pattern A)
- Raw parts are commonly used alongside composite (use Pattern B/CD and keep `export *`)

## DOCS PATTERN

Each component needs a docs page + demo.

### Structure

```
apps/docs/
├── src/content/docs/components/<name>.mdx    # Docs page
└── src/components/<name>-demo/              # Demo component
    └── <Name>BasicDemo.tsx
```

### MDX Page Layout

````mdx
---
title: ComponentName
description: ...
category: Layout
updatedDate: YYYY-MM-DD
---

import DocsLink from "@components/DocsLink.astro";
import NameBasicDemo from "@components/name-demo/NameBasicDemo.tsx";

# ComponentName

Brief description.

<DocsLink href="https://ark-ui.com/docs/components/<name>" />

<NameBasicDemo client:load />

<-- Inline code block using simple import: import { Name } from "~/components/name" -->

## Installation

### CLI

```bash
npx @fan-ui/cli@latest add <name>
```
````

### Manual

Recipe + base + index code blocks.

## Usage

Simple import + examples using `<Name>` only.

## Advanced Usage

Link to Manual section for primitive parts.

## API Reference

See the [Ark UI Name](https://ark-ui.com/docs/components/<name>) documentation.

````

### Imports Convention

| Context | Import path |
|---------|-------------|
| MDX top (live demo) | `@fan-ui/solid` |
| User-facing code blocks | `~/components/<name>` |

### ⚠️ Critical Rule: Basic Demo Import Constraint

**Basic demo MUST NOT import from `.base.tsx` or `<ComponentBase>`.**
It must only import **named composite exports** from `index.tsx`.

```
// ❌ WRONG — basic demo imports ComponentBase
import { Dialog, DialogContent, DialogBase } from "@fan-ui/solid";
// then uses DialogBase.Trigger, DialogBase.Header, etc.

// ✅ CORRECT — basic demo imports named composites only
import { SegmentGroup, SegmentGroupItem } from "@fan-ui/solid";
```

**How to satisfy this rule**: If the basic demo needs a part (e.g., Trigger, Header, Title, Description, Footer), `index.tsx` **must export a composite version** of that part — a named export that internally uses the base namespace. Never force the basic demo to reach for `ComponentBase.*`.

**Example** — segment-group pattern:

```tsx
// index.tsx — composite named exports for basic use
const SegmentGroup: Component<...> = (props) => (
  <SegmentGroupBase.Root ...>
    <SegmentGroupBase.Indicator />
    {local.children}
  </SegmentGroupBase.Root>
);

const SegmentGroupItem: Component<...> = (props) => (
  <SegmentGroupBase.Item {...others}>
    <SegmentGroupBase.ItemText>{local.children}</SegmentGroupBase.ItemText>
    <SegmentGroupBase.ItemControl />
    <SegmentGroupBase.ItemHiddenInput />
  </SegmentGroupBase.Item>
);

export { SegmentGroup, SegmentGroupItem };
export { SegmentGroupBase }; // Only exported for advanced use (RootProvider)
```

**When is `ComponentBase` allowed?**

- Only in **RootProvider demos** (advanced usage)
- Only for accessing base parts that don't have composite wrappers (rare)
- Never in basic demo code blocks in docs

## CONVENTIONS

### Styling
| Rule | Detail |
|------|--------|
| **Module-level styles** | `const styles = <component>Variants();` — declared at module scope, NOT inside a component |
| **No `createMemo`** | Call `styles.slotName({ class: local.class })` directly in JSX, never wrap in `createMemo` |
| **Class application** | Always: `class={styles.slotName({ class: local.class })}` |
| **tv() variants** | When recipe has variants (e.g., `error`, `disabled`), the base component extends props to accept them: `Component<ArkField.InputProps & { error?: boolean }>` and passes to tv: `styles.input({ class: local.class, error: local.error })` |

### `splitProps` Rules
| Location | Split | Reason |
|----------|-------|--------|
| Base components | `["class"]` only | All other props (events, ARIA, children) pass through via `{...others}` |
| Base components with variants | `["class", "variantName"]` | Only variant props needed by tv() |
| Composite `index.tsx` | `["class", "label", "children", "disabled", "error"]` | Composite owns children + custom props |

### Props Typing
| Location | Type |
|----------|------|
| Base components | Direct Ark UI prop type: `ArkComponentName.PartProps` |
| Custom HTML wrappers | `HTMLProps<"div">` from `@ark-ui/solid` |
| Composite (optional) | `ArkComponentName.RootProps & { label?, class?, error? }` |

### Exports
| Export | Source | Pattern |
|--------|--------|---------|
| Base parts (Pattern A-D) | `<component>.base.tsx` | Individual named exports (`export const Part`) |
| Base parts (Pattern E) | `<component>.base.tsx` | Single namespace (`export { Component }`) |
| Composite component | `index.tsx` | Named export |
| Recipe variants | `@fan-ui/core` | `export { <component>Variants, type <component>Variants } from "@fan-ui/core"` |
| Re-export base (Pattern A-D) | `index.tsx` | `export * from "./<component>.base"` |
| Re-export base (Pattern E) | `index.tsx` | **None** — raw parts not exposed via barrel |
| Base namespace (Pattern E) | `index.tsx` | `export { Component as ComponentBase }` |

### Folder -> Export Resolution
When a component is refactored from flat file to directory, `packages/solid/src/index.ts` already has:
```ts
export * from "./<component>";
````

This resolves to `./<component>/index.tsx` automatically. No index.ts change needed.

## VARIANT HANDLING

When a recipe defines tv() variant overrides (e.g., `variants: { error: { true: { input: "border-destructive..." } } }`):

1. The base component must accept the variant as a prop
2. The variant is passed to the tv() call in the class expression
3. The composite component computes the variant value from its props and passes it down

**Example** (input with error variant):

```tsx
// base.tsx
export const InputField: Component<ArkField.InputProps & { error?: boolean }> = (props) => {
  const [local, others] = splitProps(props, ["class", "error"]);
  return (
    <ArkField.Input class={styles.input({ class: local.class, error: local.error })} {...others} />
  );
};

// index.tsx
<InputField error={!!local.error} {...others} />;
```

## NOTES

- Components that are self-contained (render their own controls/triggers) use **Pattern B** — users just pass props, no manual composition needed
- Simple wrapper components (no extra UI beyond what Ark provides) use **Pattern A**
- When both Root and RootProvider variants exist, export both. Alias the RootProvider import in index.tsx: `import { ComponentRootProvider as BaseRootProvider } from "./<component>.base"`
- Inline SVG icons are used to avoid extra icon dependencies
- **Pattern E** (namespace base): Use when composite auto-wraps parts and exposing raw parts via barrel would cause confusion. Raw parts are only accessible via `~/components/<name>/<name>.base`, not from the barrel
- In Pattern E, the namespace object is also exported from `index.tsx` as `ComponentBase` (e.g., `SegmentGroupBase`) so users who need raw parts can import from the barrel if they prefer, but the primary entry point for composite usage stays clean
- See the root AGENTS.md for project-wide information
