# Plan: TagsInput

**Pattern:** E (Namespace base with separate entry points)
**Reference:** `packages/solid/src/segment-group/`
**Status:** Planning

## Component Overview

The Tags Input component allows entering multiple tags/values in a text input field, commonly used for adding keywords, categories, or labels. Each entered value becomes a removable tag element displayed within the input control area.

### Ark UI Parts

| Part | Has tv() variants? | Notes |
|------|--------------------|-------|
| Root | Yes | Main container, passes `orientation` from ark default (not a recipe variant) |
| RootProvider | Yes | For machine-controlled usage |
| Label | Yes | Label element for the input |
| Control | Yes | Container for tags + input, handles data-invalid and data-disabled styling |
| Input | Yes | Free-text input for adding new tags |
| ClearTrigger | Yes | Button to clear all tags |
| Item | Yes | Individual tag item wrapper, uses context for variant fallback |
| ItemPreview | Yes | Preview wrapper for a tag (shows text + delete button) |
| ItemText | Yes | Tag display text |
| ItemInput | Yes | Edit-mode input for inline tag editing |
| ItemDeleteTrigger | Yes | Delete button per tag |
| Context | No | Ark UI render prop for accessing machine API — passthrough only |
| HiddenInput | No | Hidden form input — passthrough only |

### Variants

- **error**: `true | false` — Applies destructive styling to control when the input is invalid (for `invalid` prop on Root)
- **disabled**: `true | false` — Reduced opacity for disabled state (optional, data-[disabled] may suffice)

## Artifact Checklist

### 1. Recipe: `packages/core/src/recipes/tags-input.ts`
- [ ] Create tv() with slots for each Ark UI part that needs styling
- [ ] Define slots: `root`, `label`, `control`, `input`, `clearTrigger`, `item`, `itemPreview`, `itemText`, `itemInput`, `itemDeleteTrigger`
- [ ] Define variants: `error` (true/false) applying border-destructive styling to `control`, `input`
- [ ] Export `tagsInputVariants` + type `TagsInputVariants`

Slots reference:
- `root`: flex flex-col gap, based on existing component patterns
- `label`: text-sm font-medium text-foreground
- `control`: flex flex-wrap items-center gap-1, border, rounded, focus-within styling, data-[invalid] and data-[disabled] states
- `input`: flex-1, no border (inside control), placeholder styling
- `clearTrigger`: absolute positioned icon button, hover state
- `item`: inline-flex items-center
- `itemPreview`: inline-flex items-center gap-1, bg-muted, rounded, data-[highlighted] styling
- `itemText`: font-medium text-sm
- `itemInput`: editing input overlaid on item
- `itemDeleteTrigger`: icon button, hover state

### 2. Core Index: `packages/core/src/index.ts`
- [ ] Add `export { tagsInputVariants } from "./recipes/tags-input"`
- [ ] Add `export type { TagsInputVariants } from "./recipes/tags-input"`

### 3. Tsup Entry: `packages/core/tsup.config.ts`
- [ ] Add `"src/recipes/tags-input.ts"` to entry list (alphabetical order, after `"src/recipes/tabs.ts"`)

### 4. Base File: `packages/solid/src/tags-input/tags-input.base.tsx`
- [ ] Import Ark UI parts from `@ark-ui/solid/tags-input`: `{ TagsInput as ArkTagsInput }`
- [ ] Import `splitProps`, `type Component` from `solid-js`
- [ ] Import `tagsInputVariants`, `type TagsInputVariants` from `@ui/core`
- [ ] Create variant context (for error/disabled propagation to children)
- [ ] Create module-level styles: `const styles = tagsInputVariants();`
- [ ] Wrap each Ark UI part with tv() styling:
  - **Root**: `Component<ArkTagsInput.RootProps & TagsInputVariants>` — splitProps `["class", "error", "disabled"]`, pass to tv(), wrap in context Provider
  - **RootProvider**: Same as Root but for `ArkTagsInput.RootProviderProps`
  - **Label**: `Component<ArkTagsInput.LabelProps>` — splitProps `["class"]`
  - **Control**: `Component<ArkTagsInput.ControlProps & { error?: boolean }>` — splitProps `["class", "error"]`, use context fallback for error
  - **Input**: `Component<ArkTagsInput.InputProps>` — splitProps `["class"]`
  - **ClearTrigger**: `Component<ArkTagsInput.ClearTriggerProps>` — splitProps `["class"]`
  - **Item**: `Component<ArkTagsInput.ItemProps & TagsInputVariants>` — splitProps `["class", "error", "disabled"]`, use context fallback
  - **ItemPreview**: `Component<ArkTagsInput.ItemPreviewProps>` — splitProps `["class"]`
  - **ItemText**: `Component<ArkTagsInput.ItemTextProps>` — splitProps `["class"]`
  - **ItemInput**: `Component<ArkTagsInput.ItemInputProps>` — splitProps `["class"]`
  - **ItemDeleteTrigger**: `Component<ArkTagsInput.ItemDeleteTriggerProps>` — splitProps `["class"]`
  - **Context**: Direct passthrough: `export const TagsInputContext = ArkTagsInput.Context`
  - **HiddenInput**: Direct passthrough: `export const TagsInputHiddenInput = ArkTagsInput.HiddenInput`
- [ ] Export single namespace: `export const TagsInput = { Root, RootProvider, Label, Control, Input, ClearTrigger, Item, ItemPreview, ItemText, ItemInput, ItemDeleteTrigger, Context, HiddenInput }`
- [ ] Export context/hooks separately: `TagsInputVariantContext`, `useTagsInputVariant`

### 5. Index File: `packages/solid/src/tags-input/index.tsx`
- [ ] Import namespace as `{ TagsInput as TagsInputBase }` from `./tags-input.base`
- [ ] Import `ArkTagsInput` from `@ark-ui/solid/tags-input`
- [ ] Import `splitProps`, `type Component`, `Index`, `createMemo` or inline from `solid-js`
- [ ] Create composite `TagsInput` component:
  ```tsx
  const TagsInput: Component<ArkTagsInput.RootProps & TagsInputVariants> = (props) => {
    const [local, others] = splitProps(props, ["variant", "orientation", "children", "error", "disabled"]);
    return (
      <TagsInputBase.Root variant={local.variant} orientation={local.orientation} error={local.error} disabled={local.disabled} {...others}>
        <TagsInputBase.Context>
          {(api) => (
            <>
              {local.children}
              <TagsInputBase.Control>
                <Index each={api().value}>
                  {(value, index) => (
                    <TagsInputItem index={index} value={value()} />
                  )}
                </Index>
                <TagsInputBase.Input />
              </TagsInputBase.Control>
            </>
          )}
        </TagsInputBase.Context>
        <TagsInputBase.HiddenInput />
      </TagsInputBase.Root>
    );
  };
  ```
- [ ] Create composite `TagsInputItem` component with automatic parts:
  ```tsx
  const TagsInputItem: Component<ArkTagsInput.ItemProps & TagsInputVariants> = (props) => {
    const [local, others] = splitProps(props, ["children"]);
    return (
      <TagsInputBase.Item {...others}>
        <TagsInputBase.ItemPreview>
          <TagsInputBase.ItemText>{local.children}</TagsInputBase.ItemText>
          <TagsInputBase.ItemDeleteTrigger />
        </TagsInputBase.ItemPreview>
        <TagsInputBase.ItemInput />
      </TagsInputBase.Item>
    );
  };
  ```
- [ ] **No** `export *` from base (Pattern E rule)
- [ ] Export base namespace: `export { TagsInput as TagsInputBase }`
- [ ] Export composite named exports: `TagsInput`, `TagsInputItem`
- [ ] Re-export variants from `@ui/core`: `export { tagsInputVariants, type TagsInputVariants } from "@ui/core"`

### 6. Solid Barrel: `packages/solid/src/index.ts`
- [ ] Add `export * from "./tags-input"` (alphabetical order, after `"./tabs"` and before `"./toast"`)

### 7. Demo: `apps/docs/src/components/tags-input-demo/TagsInputBasicDemo.tsx`
- [ ] Create directory: `tags-input-demo/`
- [ ] Create BasicDemo importing only named composites from `@ui/solid`: `import { TagsInput, TagsInputItem } from "@ui/solid"`
- [ ] Must NOT import `.base.tsx` or `TagsInputBase`
- [ ] Basic demo structure:
  ```tsx
  import { Index } from "solid-js";
  import { TagsInput, TagsInputItem } from "@ui/solid";

  export default function TagsInputBasicDemo() {
    return (
      <div class="rounded-lg border border-border p-6 space-y-6">
        <div>
          <p class="text-sm text-muted-foreground mb-2">Basic tags input</p>
          <TagsInput defaultValue={["React", "Solid"]}>
            <TagsInput.Label>Frameworks</TagsInput.Label>
          </TagsInput>
        </div>
      </div>
    );
  }
  ```
- [ ] Add additional demos as needed:
  - `TagsInputControlledDemo.tsx` — controlled value via `value` + `onValueChange`
  - `TagsInputDisabledDemo.tsx` — disabled state
  - `TagsInputInvalidDemo.tsx` — invalid/error state
  - `TagsInputRootProviderDemo.tsx` — RootProvider pattern with `useTagsInput`

### 8. Docs: `apps/docs/src/content/docs/components/tags-input.mdx`
- [ ] Create MDX page with frontmatter: `title: Tags Input`, `description: ...`, `category: Form & Input`, `updatedDate: YYYY-MM-DD`
- [ ] Import and render BasicDemo with `<TagsInputBasicDemo client:load />`
- [ ] Usage code block showing import and basic usage:
  ```tsx
  import { TagsInput, TagsInputItem } from "~/components/tags-input";
  ```
- [ ] Add Installation section:
  - CLI: `npx solidui-cli@latest add tags-input`
  - Manual: recipe, base, index code blocks (same structure as segment-group docs)
- [ ] Add Usage section with basic code examples (basic, controlled, disabled, invalid)
- [ ] Add Advanced Usage section covering:
  - RootProvider pattern
  - Raw parts via `TagsInputBase`
  - Validation / `validate` callback
  - Delimiter customization
- [ ] Add API Reference section linking to Ark UI documentation

## Pattern E Specifics

- Base exports **single namespace**, not individual parts
- Index.tsx **does NOT** re-export from base via `export *`
- Raw parts accessible only via `~/components/tags-input/tags-input.base`
- Composite named exports for all parts used in basic demo: `TagsInput`, `TagsInputItem`
- Context providers stay internal to base
- `TagsInputBase` namespace exported from index for advanced use (RootProvider, etc.)

## Reference: segment-group Architecture

```
packages/solid/src/segment-group/
├── segment-group.base.tsx   # Namespace: { Root, RootProvider, Label, Item, ItemText, ItemControl, ItemHiddenInput, Indicator }
└── index.tsx                # Composite: SegmentGroup, SegmentGroupItem + exports { SegmentGroupBase }
```

## tags-input Implementation Structure

```
packages/core/src/recipes/
└── tags-input.ts                        # tv() slots recipe

packages/solid/src/tags-input/
├── tags-input.base.tsx                  # Namespace with all parts wrapped
└── index.tsx                            # Composite: TagsInput, TagsInputItem + exports { TagsInputBase }

apps/docs/src/components/tags-input-demo/
├── TagsInputBasicDemo.tsx               # Basic usage demo
├── TagsInputControlledDemo.tsx           # Controlled demo
├── TagsInputDisabledDemo.tsx             # Disabled demo
├── TagsInputInvalidDemo.tsx              # Invalid/error demo
└── TagsInputRootProviderDemo.tsx        # RootProvider demo

apps/docs/src/content/docs/components/
└── tags-input.mdx                       # Documentation page
```

## Notes

- `TagsInputItem` composite auto-wraps `ItemPreview` + `ItemText` + `ItemInput` + `ItemDeleteTrigger`. Users do not need to compose these manually for basic use.
- The basic demo does NOT need `TagsInputItem` directly because the composite `TagsInput` already iterates over `api().value` internally. `TagsInputItem` is exported for advanced usage where users need custom tag rendering (e.g., custom delete icon).
- For the `TagsInput` composite, children are rendered inside the `TagsInput.Context` alongside the `Control` block, so users can add `Label` as a child.
- `Context` and `HiddenInput` are passthrough parts in base (no tv() styling needed).
