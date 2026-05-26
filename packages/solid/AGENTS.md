# Packages/Solid Knowledge

**Generated:** 2026-05-14 04:58:13 UTC
**Commit:** 3fcc19f
**Branch:** main

## OVERVIEW

Solid.js component library wrapping Ark UI primitives.

## STRUCTURE

```
packages/solid/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── dist/          # Compiled JS
└── src/           # Source components
    └── *.tsx      # Individual Solid.js components
```

## WHERE TO LOOK

| Task               | Location     | Notes                                               |
| ------------------ | ------------ | --------------------------------------------------- |
| Add new component  | src/         | Create \*.tsx wrapper around Ark UI Solid component |
| Update exports     | package.json | Add new component to exports map                    |
| Update solid index | src/index.ts | Export new component                                |

## CONVENTIONS

- Use Ark UI Solid components as base
- Wrap with minimal props, delegate to Ark UI
- Use inline SVG icons to avoid extra dependencies
- Export components from src/index.ts

## ANTI-PATTERNS

- Not exporting the new component in src/index.ts
- Over-complicating the wrapper; keep it minimal and delegate to Ark UI
