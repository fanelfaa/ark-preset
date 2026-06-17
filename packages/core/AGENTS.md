# PACKAGES/CORE KNOWLEDGE

**Generated:** 2026-06-17
**Branch:** main

## OVERVIEW

Styling primitives (@fan-ui/core). 47 tailwind-variants recipes, zero framework dependencies.

## WHERE TO LOOK

| Task                          | Location       | Notes                                                |
| ----------------------------- | -------------- | ---------------------------------------------------- |
| Add new component recipe      | src/recipes/   | Create *.ts file with tv() slots and variants        |
| Update core barrel            | src/index.ts   | Export new recipe + type (47/48 currently exported)  |
| Update build entries          | tsup.config.ts | Add new recipe to entry list                         |
| Update theme CSS              | src/theme.css  | Tailwind v4 @theme directive with CSS custom props   |

## CONVENTIONS

- Recipe file: `src/recipes/<component>.ts` exports `<component>Variants` (tv()) + type `<component>Variants`
- Use tailwind-variants tv() function — never CSS direct
- Dual-format build: ESM + CJS via tsup
- Recipes export ONLY styling — no logic, no framework imports
- After adding recipe, update 3 places: recipe file → src/index.ts → tsup.config.ts

## ANTI-PATTERNS (THIS DIRECTORY)

- `time-picker.ts` is in tsup.config.ts but NOT in src/index.ts — unreachable via barrel
- Deep imports (`@fan-ui/core/recipes/button`) not exposed in package.json exports
- Build script pipes through `grep` filtering ('⚡️|error'), suppressing tsup warnings
- No test infrastructure

## COMMANDS

```bash
moon run core:build    # Build (tsup, dual CJS/ESM)
moon run core:dev      # Watch mode
moon run core:typecheck
```
