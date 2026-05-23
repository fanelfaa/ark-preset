# Learnings - solid-ark-ui-phase1

## Task 12 - Component Demos

### Build/Dev Fixes

- `tsup` with esbuild produces `React.createElement` for JSX by default. To fix for Solid.js: add `esbuildOptions(options) { options.jsx = 'automatic'; options.jsxImportSource = 'solid-js' }` to tsup config.
- For Vite monorepo dev: use `resolve.conditions: ['development', 'module', 'import', 'resolve']` in vite.config.ts + add `"development": "./src/index.ts"` to exports in package.json to resolve workspace deps from source instead of built dist.
- Missing dependency: `tailwind-merge` is needed as runtime dep when `createTV({ twMerge: true })` is used in tailwind-variants.

### Component APIs

- All 5 components importable from `@ui/solid` barrel export (index.ts)
- `<Button>`: props include `variant` (default/destructive/outline/secondary/ghost/link), `size` (sm/md/lg/icon), `class`, disabled + all button HTML attrs
- `<Input>`: props include `label`, `description`, `error`, `class` + all input HTML attrs. Error shows red border + error text.
- `<Dialog>`: Uses `DialogRoot` (re-export of ArkDialog.Root) with `open`/`onOpenChange` for controlled state. `DialogTrigger` wraps button to open. `DialogContent` includes backdrop + positioner + content + close trigger (X icon) via Portal.
- `<Select>`: Uses `createListCollection({ items: [...] })` for options. `SelectRoot` needs `collection`, `value`, `onValueChange`. `SelectContent` needs `items` prop separately.
- `<Toast>`: Uses `createToaster({ placement })` to create toaster, `toaster.create({ title, description, type })` to trigger. `type` maps to variant prop in toastVariants. `<Toaster toaster={toaster} />` renders toasts.

### Interactive Demo Notes

- DialogTrigger creates a nested button issue (trigger button wraps Button component → 2 nested buttons). Works functionally but invalid HTML. Should use `asChild` pattern or make DialogTrigger render children without wrapping.
- Toast auto-dismisses quickly (~4000ms default). Test capture needs immediate snapshot after click.
- Select onChange provides `details.value` (string[]) and `details.items` (Item[]).
