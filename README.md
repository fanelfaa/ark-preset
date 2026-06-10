# ui

Pre-styled Ark UI components. Recipe-first, framework-optional.

**Current target:** Solid.js  
**Planned:** React, Vue, Svelte — anything [Ark UI](https://ark-ui.com) supports.

Heavily inspired by [shadcn/ui](https://ui.shadcn.com) and [solid-ui](https://www.solid-ui.com).

---

## What this is

Ark UI gives you headless, accessible primitives. This project adds the styling layer: Tailwind CSS variants (via `tailwind-variants`) wrapped into drop-in components that look good out of the box.

The architecture is **recipe-first**:

```
recipe (tailwind-variants) → framework wrapper (Solid/React/Vue/Svelte) → your app
```

You can use just the recipes to style your own Ark UI components, or take the full framework wrapper for a ready-to-use component.

## What this is NOT

- Not a component library you install and consume from npm (yet)
- Not a design system — it's a style preset for Ark UI
- Not a replacement for Ark UI — it's a layer *on top*

---

## Packages

| Package | What |
|---|---|
| `@ui/core` | Tailwind-variants recipes — one per component. Pure styling, no framework deps. |
| `@ui/solid` | Solid.js wrappers around `@ark-ui/solid`. Delegates to Ark UI, applies recipe styles. |
| `create-ui` | CLI to scaffold new components (not ready). |

### `@ui/core` — recipes

Each component has a recipe file in `packages/core/src/recipes/`. A recipe uses `tv()` to define slots and variants.

```ts
// packages/core/src/recipes/button.ts
export const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium ...",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      sm: "h-8 px-2.5",
      md: "h-9 px-3 py-1.5",
      lg: "h-10 px-6",
      icon: "size-8",
    },
  },
  defaultVariants: { variant: "default", size: "sm" },
});
```

Multi-slot recipes (e.g., accordion, dialog, card) use `tv({ slots: { ... } })` for per-part styling.

**48 recipes** as of last count. Each exports a `*Variants` value + `*Variants` type.

### `@ui/solid` — Solid.js wrappers

Wraps Ark UI Solid primitives with the recipe styles. Components are minimal — they delegate most props to Ark UI.

```tsx
// packages/solid/src/button/index.tsx
const Button: Component<ButtonProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant", "size", "loading", "disabled", "children"]);
  return (
    <ark.button
      class={buttonVariants({ variant: local.variant, size: local.size, class: local.class })}
      disabled={local.loading || local.disabled}
      {...others}
    >
      <Show when={local.loading}><Spinner size="sm" /></Show>
      {resolvedChildren()}
    </ark.button>
  );
};
```

**~45 Solid.js components** implemented. See [COMPONENT_TODOS.md](./COMPONENT_TODOS.md) for the full status.

#### Two levels per component

Every component ships two entry points — a **composite** (high-level) and a **base** (primitive):

| Level | File | What |
|---|---|---|
| Composite | `index.tsx` | Ready-to-use component — handles labels, errors, layout for you |
| Base | `<component>.base.tsx` | Raw Ark UI part wrappers — for custom composition |

```tsx
// Composite — auto-wires label, description, error text
<Input label="Name" placeholder="Enter your name" />
<Input label="Email" type="email" error="Invalid address" />

// Base — manual composition when you need full control
import { Input as InputBase } from "@ui/solid";

<InputBase.Root>
  <InputBase.Label>Custom Label</InputBase.Label>
  <InputBase.Field placeholder="Raw field, no wrappers" />
</InputBase.Root>
```

Both are exported from `@ui/solid`. Use the composite for 80% of cases, drop to `*Base` when you need custom structure.

### `create-ui` — CLI (not ready)

Scaffolds a new component (recipe + framework wrapper + docs boilerplate).

⚠️ Still being built. Does not work yet.

---

## Commands

```bash
# Build everything
pnpm build

# Package-specific builds
moon run core:build
moon run solid:build
moon run create-ui:build

# Development (watch mode)
moon run solid:dev

# Type checking
pnpm typecheck

# Lint & format
pnpm lint
pnpm fmt
```

Uses [Moonrepo](https://moonrepo.dev) for task orchestration — `moon run` handles dependency ordering automatically.

---

## Project structure

```
.
├── packages/
│   ├── core/          # 48 styling recipes (tv())
│   │   ├── src/
│   │   │   ├── recipes/    # One *.ts per component
│   │   │   └── index.ts    # Re-exports all recipes
│   │   └── tsup.config.ts  # Entry list — add new recipes here
│   ├── solid/         # ~45 Solid.js components
│   │   ├── src/
│   │   │   ├── <component>/   # Directory per component
│   │   │   │   ├── index.tsx           # Composite component
│   │   │   │   └── <component>.base.tsx # Ark UI primitive wrappers
│   │   │   └── index.ts      # Re-exports all components
│   │   └── vite.config.ts
│   └── cli/           # Component scaffolding CLI
│       └── src/index.ts
├── COMPONENT_TODOS.md  # Implementation progress tracker
└── .moon/              # Moonrepo configuration
```

---

## Why recipe-first?

Separating styling (recipes) from framework wrappers means:
- **You can use the recipes without Solid.js** — drop them into any Ark UI framework
- **Framework packages are thin** — just wiring + minimal composition
- **Future React/Vue/Svelte packages** only need to write wrappers, not restyle everything

When React, Vue, and Svelte wrappers are added, they'll all share the same `@ui/core` recipes. One styling source of truth, multiple framework targets.
