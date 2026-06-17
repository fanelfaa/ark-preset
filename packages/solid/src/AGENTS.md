# PACKAGES/SOLID/SRC KNOWLEDGE

**Generated:** 2026-06-17
**Commit:** 4c03836b
**Branch:** main

## OVERVIEW

Solid.js component source — 46 directory-based components wrapping Ark UI primitives. Detailed component architecture documentation below.

## WHERE TO LOOK

| Task                       | Location             | Notes                                          |
| -------------------------- | -------------------- | ---------------------------------------------- |
| Add new Solid.js component | src/<component>/     | Create directory with .base.tsx + index.tsx    |
| Add recipe                 | ../core/src/recipes/ | Create *.ts file with tv() slots and variants |
| Update component index     | index.ts             | Add `export * from "./<component>"`             |
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
- Exposing raw base parts through the barrel would be confusing
- The component has context providers that should stay internal to base

**When NOT to use Pattern E:**
- Component is a simple re-export (use Pattern A)
- All users need is the composite component (use Pattern A)

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

```mdx
---
title: ComponentName
description: ...
category: Layout
updatedDate: YYYY-MM-DD
---

import DocsLink from "@components/DocsLink.tsx";
import NameBasicDemo from "@components/name-demo/NameBasicDemo.tsx";

# ComponentName

Brief description.

<DocsLink href="https://ark-ui.com/docs/components/<name>" />

<NameBasicDemo client:load />

import { Name } from "~/components/name"

## Installation

### CLI

```bash
npx @fan-ui/cli@latest add <name>
```

### Manual

Recipe + base + index code blocks.

## Usage

Simple import + examples using `<Name>` only.

## Advanced Usage

Link to Manual section for primitive parts.

## API Reference

See the [Ark UI Name](https://ark-ui.com/docs/components/<name>) documentation.
```

### Imports Convention

| Context | Import path |
|---------|-------------|
| MDX top (live demo) | `@fan-ui/solid` |
| User-facing code blocks | `~/components/<name>` |

### Basic Demo Import Constraint

Basic demo MUST NOT import from `.base.tsx` or `<ComponentBase>`. It must only import **named composite exports** from `index.tsx`.

**When is `ComponentBase` allowed?**
- Only in RootProvider demos (advanced usage)
- Never in basic demo code blocks

## CONVENTIONS

### Styling
| Rule | Detail |
|------|--------|
| **Module-level styles** | `const styles = <component>Variants();` — declared at module scope, NOT inside a component |
| **No `createMemo`** | Call `styles.slotName({ class: local.class })` directly in JSX, never wrap in `createMemo` |
| **Class application** | Always: `class={styles.slotName({ class: local.class })}` |
| **tv() variants** | When recipe has variants (e.g., `error`, `disabled`), the base component extends props to accept them |

### `splitProps` Rules
| Location | Split | Reason |
|----------|-------|--------|
| Base components | `["class"]` only | All other props (events, ARIA, children) pass through via `{...others}` |
| Base components with variants | `["class", "variantName"]` | Only variant props needed by tv() |
| Composite `index.tsx` | `["class", "label", "children", "disabled", "error"]` | Composite owns children + custom props |

### Exports
| Export | Source | Pattern |
|--------|--------|---------|
| Base parts (Pattern A-D) | `<component>.base.tsx` | Individual named exports (`export const Part`) |
| Base parts (Pattern E) | `<component>.base.tsx` | Single namespace (`export { Component }`) |
| Composite component | `index.tsx` | Named export |
| Recipe variants | `@fan-ui/core` | `export { variants, type variants } from "@fan-ui/core"` |
| Re-export base (Pattern A-D) | `index.tsx` | `export * from "./<component>.base"` |
| Base namespace (Pattern E) | `index.tsx` | `export { Component as ComponentBase }` |

### Folder -> Export Resolution
When a component is refactored from flat file to directory:
```ts
export * from "./<component>";
// resolves to ./<component>/index.tsx automatically
```

## VARIANT HANDLING

When a recipe defines tv() variant overrides (e.g., `variants: { error: { true: { input: "border-destructive..." } } }`):

1. Base component accepts variant as prop
2. Variant passed to tv() in class expression
3. Composite computes variant from its props and passes down

## NOTES

- No flat .tsx files remain — all 46 components are directory-based (combobox, select, drawer refactored)
- `createToaster` is re-exported from @ark-ui/solid/toast via toast/index.tsx
- Variant contexts used in 5 components: segment-group, tags-input, pagination, listbox, rating-group
- Known cross-component deps: button→spinner, select→scroll-area, alert-dialog→button, date-picker→button, menu→button, hover-card→button, popover→button, dialog→button, drawer→button, tooltip→button
- `label` recipe exists in core but has NO Solid wrapper — only gap
