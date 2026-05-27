# Packages/Core/Recipes Knowledge

**Generated:** 2026-05-27 02:47:19 UTC
**Commit:** f3d6548f
**Branch:** main

## OVERVIEW

Individual component recipes using tailwind-variants tv() function.

## STRUCTURE

```
packages/core/src/recipes/
├── accordion.ts
├── avatar.ts
├── badge.ts
├── button.ts
├── card.ts
├── carousel.ts
├── checkbox.ts
├── collapsible.ts
├── combobox.ts
├── date-picker.ts
├── dialog.ts
├── drawer.ts
├── input.ts
├── menu.ts
├── number-input.ts
├── password-input.ts
├── pin-input.ts
├── popover.ts
├── progress.ts
├── radio-group.ts
├── select.ts
├── separator.ts
├── skeleton.ts
├── slider.ts
├── spinner.ts
├── switch.ts
├── tabs.ts
├── textarea.ts
├── toast.ts
├── toggle-group.ts
├── toggle.ts
├── tooltip.ts
├── typography.ts
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
- Each recipe must be added to tsup.config.ts entry list
- Each recipe must be re-exported from ../index.ts
