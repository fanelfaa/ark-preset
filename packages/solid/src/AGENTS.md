# PROJECT KNOWLEDGE BASE

**Generated:** 2026-05-24
**Commit:** 3fcc19f
**Branch:** main

## OVERVIEW

Solid.js component library wrapping Ark UI primitives. Components follow a recipe-first, directory-based architecture.

## WHERE TO LOOK

| Task                       | Location              | Notes                                              |
| -------------------------- | --------------------- | -------------------------------------------------- |
| Add new Solid.js component | src/<component>/      | Create directory with .base.tsx + index.tsx         |
| Add recipe                 | ../core/src/recipes/  | Create \*.ts file with tv() slots and variants      |
| Update component index     | index.ts              | Add `export * from "./<component>"`                 |
| Update core index          | ../core/src/index.ts  | Export new recipe variants + types                  |

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
import { <component>Variants } from "@ui/core";

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

export { <component>Variants, type <component>Variants } from "@ui/core";
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

export { <component>Variants, type <component>Variants } from "@ui/core";
```

### Pattern C — With Portal (composite wrapping content in Portal)

Use when the inner content needs a Portal from `solid-js/web`.

**Example: dialog**

Similar to Pattern B but wraps content in `<Portal>` from `solid-js/web`.

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
| All base parts | `<component>.base.tsx` | Named exports only, no defaults |
| Composite component | `index.tsx` | Named export |
| Recipe variants | `@ui/core` | `export { <component>Variants, type <component>Variants } from "@ui/core"` |
| Re-export base | `index.tsx` | `export * from "./<component>.base"` |

### Folder -> Export Resolution
When a component is refactored from flat file to directory, `packages/solid/src/index.ts` already has:
```ts
export * from "./<component>";
```
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
  return <ArkField.Input class={styles.input({ class: local.class, error: local.error })} {...others} />;
};

// index.tsx
<InputField error={!!local.error} {...others} />
```

## NOTES

- Components that are self-contained (render their own controls/triggers) use **Pattern B** — users just pass props, no manual composition needed
- Simple wrapper components (no extra UI beyond what Ark provides) use **Pattern A**
- When both Root and RootProvider variants exist, export both. Alias the RootProvider import in index.tsx: `import { ComponentRootProvider as BaseRootProvider } from "./<component>.base"`
- Inline SVG icons are used to avoid extra icon dependencies
- See the root AGENTS.md for project-wide information
