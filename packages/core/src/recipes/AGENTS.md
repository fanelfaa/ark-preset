# Packages/Core/Recipes Knowledge

**Generated:** 2026-05-14 04:58:13 UTC
**Commit:** 3fcc19f
**Branch:** main

## OVERVIEW

Individual component recipes using tailwind-variants tv() function.

## STRUCTURE

```
packages/core/src/recipes/
├── button.ts
├── input.ts
├── dialog.ts
├── select.ts
├── toast.ts
├── switch.ts
├── checkbox.ts
├── tabs.ts
├── accordion.ts
├── radio-group.ts
├── tooltip.ts
├── date-picker.ts
├── popover.ts
└── slider.ts
```

## WHERE TO LOOK

| Task                | Location              | Notes                                          |
| ------------------- | --------------------- | ---------------------------------------------- |
| Add new recipe      | Current directory     | Create \*.ts file with tv() slots and variants |
| View recipe pattern | Any existing .ts file | See tv() usage with slots and variants         |

## CONVENTIONS

- Use tailwind-variants tv() function
- Define slots for each stylable part of the component
- Define variants for each visual state (e.g., disabled, invalid, size, etc.)
- Export the variants variable and a TypeScript type for the variants
