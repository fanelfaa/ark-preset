# `@ark-preset/solid` — Solid.js Components

Solid.js component library — [Ark UI](https://ark-ui.com/) primitives styled with `@ark-preset/core` recipes.

## What It Is

A set of pre-styled Solid.js UI components built on top of Ark UI headless primitives. Each component wraps an Ark UI primitive and applies a `@ark-preset/core` styling recipe, giving you production-ready components with zero additional styling effort.

## Usage

```tsx
import { Button } from "@ark-preset/solid";

function App() {
  return <Button variant="primary" size="md">Click me</Button>;
}
```

## Components

46 components available:

`accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`, `button`, `card`, `carousel`, `checkbox`, `collapsible`, `color-picker`, `combobox`, `date-picker`, `dialog`, `drawer`, `hover-card`, `input`, `listbox`, `menu`, `number-input`, `pagination`, `password-input`, `pin-input`, `popover`, `progress`, `radio-group`, `rating-group`, `scroll-area`, `segment-group`, `select`, `separator`, `skeleton`, `slider`, `spinner`, `switch`, `table`, `tabs`, `tags-input`, `textarea`, `toast`, `toggle`, `toggle-group`, `tooltip`, `typography`.

## Peer Dependencies

- `solid-js` ^1.9.0
- `tailwindcss` ^4.0.0

