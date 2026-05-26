# Component Directory Architecture

## Scope

Applies when creating new components or refactoring existing flat-file components to the directory-based pattern in `packages/solid/src/`.

## Directory Structure

Every component lives in its own directory:
```
packages/solid/src/<component>/
├── <component>.base.tsx   # Ark UI primitive wrappers (one per sub-part)
└── index.tsx              # Composite component + re-exports
```

### Recipe File (separate, in core)

```
packages/core/src/recipes/<component>.ts  # tv() slots + variants
```

## Pattern A — Simple Re-export (no composite inner structure)

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

## Pattern B — With InnerComponent (composite with inline SVGs)

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
      <PartB>{/* SVG icons inline */}</PartB>
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

## Pattern C — With Portal (composite wrapping content in Portal)

Use when the inner content needs a Portal from `solid-js/web`.

**Example: dialog**

Same as Pattern B but wraps the inner content in `<Portal>` from `solid-js/web`.

## Conventions

### Styling
| Rule                   | Detail                                                           |
| ---------------------- | ---------------------------------------------------------------- |
| Module-level styles    | `const styles = <component>Variants();` at module scope          |
| No `createMemo`        | Call `styles.slotName({ class: local.class })` directly in JSX   |
| Class application      | Always: `class={styles.slotName({ class: local.class })}`        |
| tv() variant props     | Accept variant prop in component + pass to tv() in class call    |

### splitProps Rules
| Location                              | Split                                       |
| ------------------------------------- | ------------------------------------------- |
| Base components                       | `["class"]` only (rest via `{...others}`)   |
| Base components with tv() variants    | `["class", "variantName"]`                  |
| Composite `index.tsx`                 | `["class", "label", "children", "disabled", "error"]` |

### Props Typing
| Location             | Type                                                |
| -------------------- | --------------------------------------------------- |
| Base components      | `ArkComponentName.PartProps` directly               |
| Custom HTML wrappers | `HTMLProps<"div">` from `@ark-ui/solid`             |
| Composite            | `ArkComponentName.RootProps & { label?, class?, error? }` |

### Exports
| Artifact               | From                     | Pattern                                                |
| ---------------------- | ------------------------ | ------------------------------------------------------ |
| All base parts         | `<component>.base.tsx`   | Named exports only                                     |
| Composite component    | `index.tsx`              | Named export                                           |
| Recipe variants        | `@ui/core`               | `export { vars, type Vars } from "@ui/core"`            |
| Re-export base         | `index.tsx`              | `export * from "./<component>.base"`                    |

### Variant Handling

When recipe defines tv() variant overrides (e.g., `variants: { error: { true: { input: "border-destructive..." } } }`):

1. Base component accepts the variant as a prop:
   ```tsx
   export const InputField: Component<ArkField.InputProps & { error?: boolean }> = (props) => {
     const [local, others] = splitProps(props, ["class", "error"]);
     return <ArkField.Input class={styles.input({ class: local.class, error: local.error })} {...others} />;
   };
   ```
2. Composite computes and passes the variant:
   ```tsx
   <InputField error={!!local.error} {...others} />
   ```

### RootProvider Alias
When both Root and RootProvider are exported, alias the import in index.tsx:
```tsx
import { ComponentRootProvider as BaseRootProvider } from "./<component>.base";
```

## Folder Export Resolution

When refactoring from flat file to directory, `packages/solid/src/index.ts` already has:
```ts
export * from "./<component>";
```
This resolves to `./<component>/index.tsx` automatically after deleting the old flat file. No index.ts change needed.
