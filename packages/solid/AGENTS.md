# PACKAGES/SOLID KNOWLEDGE

**Generated:** 2026-06-17
**Branch:** main

## OVERVIEW

Solid.js component library (@fan-ui/solid). 46 directory-based components wrapping Ark UI primitives with recipe styles from @fan-ui/core.

## STRUCTURE

```
packages/solid/
├── package.json       # Exports "." only, peer deps on solid-js + tailwindcss
├── tsconfig.json      # Extends base, adds composite + jsx: preserve + jsxImportSource: solid-js
├── vite.config.ts     # Library mode, ES + CJS, externals: solid-js, @ark-ui/solid, @fan-ui/core
├── dist/              # Compiled output
└── src/
    ├── index.ts       # Barrel: 46 directory re-exports (export *)
    └── <component>/   # Directory per component (index.tsx + <component>.base.tsx)
```

## WHERE TO LOOK

| Task               | Location          | Notes                                               |
| ------------------ | ----------------- | --------------------------------------------------- |
| Add new component  | src/<component>/  | Create dir with index.tsx + <component>.base.tsx    |
| Update barrel      | src/index.ts      | Add `export * from "./<component>"`                  |
| Update exports     | package.json      | If adding new entry point                           |
| Recipe source      | @fan-ui/core      | Import `<component>Variants` from core              |

## CONVENTIONS

- 5 component patterns (A-E): Simple re-export, With InnerComponent, With Portal, Composite auto-parts, Namespace base
- Composite index.tsx for 80% use, .base.tsx for raw primitives
- Module-level styles: `const styles = <component>Variants();` (not inside component)
- splitProps rules: base splits `["class"]` only, composite splits custom props
- Inline SVG icons to avoid extra dependencies
- Ark UI imports aliased: `import { X as ArkX }` pattern

## ANTI-PATTERNS

- `export *` barrel creates shared namespace — fragile if names collide across components
- `label` recipe exists in core but has NO Solid wrapper (only recipe-to-component gap)
- No test infrastructure
