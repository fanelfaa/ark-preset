# Adding RootProvider to a Component

## Summary of Changes (Accordion)

### Files Changed

| File                                                                    | Action      | Purpose                                                      |
| ----------------------------------------------------------------------- | ----------- | ------------------------------------------------------------ |
| `packages/solid/src/accordion.tsx`                                      | Edited      | Added `AccordionRootProvider` wrapper + export               |
| `apps/docs/src/components/accordion-demo/AccordionRootProviderDemo.tsx` | **Created** | Live demo using `useAccordion` + `AccordionRootProvider`     |
| `apps/docs/src/content/docs/components/accordion.mdx`                   | Edited      | Added Root Provider section, imports, API ref                |
| `apps/docs/package.json`                                                | Edited      | Added `@ark-ui/solid` dep for `useAccordion` import in demos |
| `pnpm-lock.yaml`                                                        | Auto        | Lockfile update                                              |

### What Was Added

1. **`AccordionRootProvider` component** — wraps `ArkAccordion.RootProvider` with the same styling as `AccordionRoot`, accepting `RootProviderProps` instead of `RootProps`
2. **Export** — `AccordionRootProvider` added alongside the existing `AccordionRoot as Accordion` export
3. **Docs: Root Provider section** — explains the `useAccordion` + `AccordionRootProvider` pattern with live demo + code example + comparison table
4. **Docs: API Reference** — `AccordionRootProvider` table with `value` (required context) and `class` props
5. **Demo component** — interactive live example (matches existing demo patterns: border wrapper, inline SVG icons, imports from `@ui/solid`)

---

## Step-by-Step Tutorial: Add RootProvider to Any Component

This guide teaches you how to add a `RootProvider` variant to any Ark UI-based component in this project.

### Why RootProvider?

Ark UI components come in two root variants:

- **`Root`** — manages its own state internally. Simple, self-contained usage.
- **`RootProvider`** — accepts a pre-created context via a `use*` hook. Use when you need to read or control component state **outside** the component tree.

### Prerequisites

- The component already exists in `packages/solid/src/` with a `Root` wrapper
- The component uses an Ark UI primitive that exposes both `Root` and `RootProvider` (e.g., `Accordion.Root` + `Accordion.RootProvider`)

---

### Step 1: Add the RootProvider Wrapper

In the component file (`packages/solid/src/<component>.tsx`), add a `RootProvider` wrapper next to the existing `Root` wrapper.

**Before:**

```tsx
const ComponentRoot: Component<ArkComponent.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return <ArkComponent.Root class={rootClass()} {...others} />;
};
```

**After:**

```tsx
const ComponentRoot: Component<ArkComponent.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return <ArkComponent.Root class={rootClass()} {...others} />;
};

const ComponentRootProvider: Component<ArkComponent.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return <ArkComponent.RootProvider class={rootClass()} {...others} />;
};
```

**Key differences from Root:**

- Uses `RootProviderProps` instead of `RootProps`
- Renders `ArkComponent.RootProvider` instead of `ArkComponent.Root`

### Step 2: Export RootProvider

Add `ComponentRootProvider` to the export block.

**Before:**

```tsx
export {
  ComponentRoot as Component,
  ComponentItem,
  // ...
};
```

**After:**

```tsx
export {
  ComponentRoot as Component,
  ComponentRootProvider,
  ComponentItem,
  // ...
};
```

### Step 3: Update Docs — Import Statements

In `apps/docs/src/content/docs/components/<component>.mdx`, add `ComponentRootProvider` to every import code block.

```tsx
import {
  Component, // ComponentRoot
  ComponentRootProvider, // ← add this
  ComponentItem,
  ComponentItemTrigger,
  ComponentItemContent,
} from "~/components/<component>";
```

### Step 4: Update Docs — Manual Installation Code

In the manual installation section of the mdx, add the `ComponentRootProvider` wrapper and export it.

**Add the component wrapper:**

```tsx
const ComponentRootProvider: Component<ArkComponent.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return <ArkComponent.RootProvider class={rootClass()} {...others} />;
};
```

**Update the export:**

```tsx
export {
  ComponentRoot as Component,
  ComponentRootProvider, // ← add this
  ComponentItem,
  // ...
};
```

### Step 5: Add Root Provider Docs Section

Insert a new `## Root Provider` section. Follow this template:

````mdx
## Root Provider

Use `ComponentRootProvider` when you need to access the component state outside of the component tree. This pattern uses the `use<Component>` hook from Ark UI to create a shared context that both the component and external elements can reference.

<ComponentRootProviderDemo client:load />

```tsx
import { use<Component> } from "@ark-ui/solid/<component>"
import {
  ComponentItem,
  ComponentItemTrigger,
  ComponentItemContent,
  ComponentRootProvider,
} from "~/components/<component>"

export function ExternalControlExample() {
  const context = use<Component>({ /* options */ })

  return (
    <div>
      {/* Access state outside the tree */}
      <output>Value: {JSON.stringify(context().value)}</output>

      <ComponentRootProvider value={context}>
        <ComponentItem value="item-1">
          {/* ... */}
        </ComponentItem>
      </ComponentRootProvider>
    </div>
  )
}
```

The key difference:

- **`Component` (Root)** — manages its own state internally. Use for simple, self-contained usage.
- **`ComponentRootProvider`** — accepts a pre-created context via `use<Component>`. Use when you need to read or control the component state from outside the component tree.
````

### Step 6: Create the Demo Component

Create `apps/docs/src/components/<component>-demo/ComponentRootProviderDemo.tsx`.

Follow the existing demo pattern:

```tsx
import { use<Component> } from '@ark-ui/solid/<component>'
import {
  ComponentItem,
  ComponentItemTrigger,
  ComponentItemContent,
  ComponentRootProvider,
} from '@ui/solid'

export default function ComponentRootProviderDemo() {
  const context = use<Component>({ /* default options */ })

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <output class="block text-sm text-muted-foreground">
        Value: {JSON.stringify(context().value)}
      </output>

      <ComponentRootProvider value={context}>
        <ComponentItem value="item-1">
          <ComponentItemTrigger>
            Question?
            <ComponentItemIndicator>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </ComponentItemIndicator>
          </ComponentItemTrigger>
          <ComponentItemContent>
            <div class="pb-4 text-sm text-foreground">
              Explanation text.
            </div>
          </ComponentItemContent>
        </ComponentItem>
      </ComponentRootProvider>
    </div>
  )
}
```

**Pattern rules:**

- `default export` function component
- Wrap in `<div class="rounded-lg border border-border p-6">`
- Import `@ui/solid` for components, `@ark-ui/solid/<component>` for the `use*` hook
- Use inline SVG chevron icons (same as other demos)
- Use `text-foreground` / `text-muted-foreground` for text colors

### Step 7: Import the Demo in the MDX

At the top of the mdx file, add the import:

```mdx
import ComponentRootProviderDemo from "@components/<component>-demo/ComponentRootProviderDemo.tsx";
```

### Step 8: Add to API Reference

Add a new subsection in the API Reference:

```mdx
### ComponentRootProvider

| Prop  | Type               | Default | Description                                           |
| ----- | ------------------ | ------- | ----------------------------------------------------- |
| value | `ComponentContext` | —       | Context returned by `use<Component>()`. **Required.** |
| class | `string`           | —       | Custom CSS class.                                     |
```

### Step 9: Ensure Dependency (Docs)

If the demo imports the `use*` hook from `@ark-ui/solid/<component>`, make sure `@ark-ui/solid` is a dependency of the docs app. Check `apps/docs/package.json`:

```json
"dependencies": {
  "@ark-ui/solid": "^5.36.2",
  // ...
}
```

---

## Verification Checklist

After implementing, verify:

- [ ] `ComponentRootProvider` compiles and exports correctly — check `lsp_diagnostics`
- [ ] Live demo renders in the docs dev server
- [ ] Code examples use correct import paths (`~/components/` for user code, `@ui/solid` for demos)
- [ ] API Reference table has correct prop types
- [ ] Manual installation code mirrors the actual component implementation
- [ ] Doc site builds without errors (`pnpm build` in `apps/docs`)
