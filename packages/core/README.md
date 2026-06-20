# `@ark-preset/core` — Styling Recipes

Tailwind-variants (`tv()`) styling recipes for Ark UI primitives.

## What It Does

Defines the visual design tokens for every component — colors, sizes, variants, slots — using [tailwind-variants](https://www.tailwind-variants.org/). These recipes are consumed by framework-specific wrapper packages (e.g. `@ark-preset/solid`) to style Ark UI primitives.

## Usage

```ts
import { buttonVariants } from "@ark-preset/core";

// Use directly in a Solid.js component or any framework
<button class={buttonVariants({ size: "md", variant: "primary" })} />
```

## Contents

47 recipe files in `src/recipes/`, each exporting a `tv()` variants object and its TypeScript type:

`accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`, `button`, `card`, `carousel`, `checkbox`, `collapsible`, `color-picker`, `combobox`, `date-picker`, `dialog`, `drawer`, `hover-card`, `input`, `label`, `listbox`, `menu`, `number-input`, `pagination`, `password-input`, `pin-input`, `popover`, `progress`, `radio-group`, `rating-group`, `scroll-area`, `segment-group`, `select`, `separator`, `skeleton`, `slider`, `spinner`, `switch`, `table`, `tabs`, `tags-input`, `textarea`, `toast`, `toggle`, `toggle-group`, `tooltip`, `typography`.

