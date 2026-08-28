# Solid Component + Tailwind Variants Conventions

## Class Props & Variants Consumption Pattern

### 1. Always `splitProps` for `class`

Extract `class` (and other local props) from remaining props before passing to element/component:

```tsx
const [local, others] = splitProps(props, ["class", "error", "children"]);
```

### 2. Variants with Reactive Props → `createMemo`

If variants depend on reactive props (`error`, `variant`, `size`, etc.), wrap with `createMemo`:

```tsx
// ✅ Reactive-dependent variants → createMemo
const styles = createMemo(() => selectVariants({ error: !!local.error }));
const rootClass = createMemo(() => styles().root({ class: local.class }));
```

### 3. Static Variants (no Props) → no `createMemo`

If `variants()` takes no arguments or has no reactive dependencies, call directly:

```tsx
// ✅ Static variants, no createMemo needed
const styles = selectVariants();
```

### 3b. Data Attributes (alternative to reactive variants)

When a variant only controls a visual state (e.g. `error`) and can be expressed as a CSS data-attribute selector, prefer setting a `data-*` attribute on the element and using `data-[attr]:` classes in the recipe. This avoids `createMemo` and keeps the recipe self-contained:

```tsx
// ✅ Recipe uses data- attribute selectors
export const comboboxVariants = tv({
  slots: {
    root: "grid gap-1.5 w-full group/combobox",
    control:
      "... group-data-[error]/combobox:border-destructive group-data-[error]/combobox:focus-within:ring-destructive",
  },
});

// ✅ Component sets data attribute, no createMemo needed
const Root: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ["class", "error"]);
  return (
    <ArkRoot
      class={styles.root({ class: local.class })}
      data-error={local.error ? "" : undefined}
      {...others}
    />
  );
};
```

Use this pattern when:

- The variant maps cleanly to a CSS selector (`data-[state=...]`, `data-[error]`, etc.)
- The recipe can express all styling via data-attribute selectors without needing the variant value passed in
- You want to avoid `createMemo` and keep the variant call static

Fall back to reactive variants + `createMemo` when:

- The variant value affects multiple slots differently
- The recipe needs the actual value (not just presence/absence) to compute styles

### 4. Class Merging via Variants

Use `{ class: local.class }` to merge user-supplied class with built-in variant classes:

```tsx
// ✅ Merge user class with variant styles
const controlClass = createMemo(() => styles.control({ class: local.class }));
```

Never spread `{...props}` before `class={}` — it can override variant classes:

```tsx
// ❌ CAN OVERRIDE variant class
<ArkDialog.Title class={styles.title()} {...props} />

// ✅ Class merged via variants
const titleClass = createMemo(() => styles.title({ class: local.class }))
<ArkDialog.Title class={titleClass()} {...others} />
```

### 5. Merged Slot → Dedicated `createMemo`

Every slot that uses `{ class: local.class }` must have its own `createMemo`:

```tsx
const styles = createMemo(() => inputVariants({ error: !!local.error }));
const rootClass = createMemo(() => styles().root({ class: local.class })); // ✅ slot memo
```

Slots without class merging can use `styles.slot()` directly:

```tsx
<Field.Label class={styles().label()} />    // ✅ direct
<Field.Input class={styles().input()} />     // ✅ direct
```

### 6. Reference Examples

| File                                            | Component     | Type                                         |
| ----------------------------------------------- | ------------- | -------------------------------------------- |
| `packages/solid/src/input.tsx`                  | Input         | Reactive variants (`error`) + slot memo      |
| `packages/solid/src/button.tsx`                 | Button        | Reactive variants (`variant`, `size`)        |
| `packages/solid/src/select.tsx`                 | SelectRoot    | Reactive variants (`error`) + slot memo      |
| `packages/solid/src/select.tsx`                 | SelectLabel   | Static variants, no memo                     |
| `packages/solid/src/select.tsx`                 | SelectControl | Static variants + slot memo (`controlClass`) |
| `packages/solid/src/dialog.tsx`                 | DialogContent | Static variants + slot memo (`contentClass`) |
| `packages/solid/src/combobox/combobox.base.tsx` | ComboboxRoot  | Data-attribute pattern (`data-error`)        |

### 7. Rule Summary

```
splitProps + createMemo + classMerge
│              │               │
│              │               └── styles.slot({ class: local.class })
│              │
│              ├── Yes, if variants have reactive dependencies
│              └── No, if variants are static
│
└── Always extract 'class' from props
    spread remaining props ({...others}) on element
```
