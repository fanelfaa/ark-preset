# PACKAGES/CORE/RECIPES KNOWLEDGE

**Generated:** 2026-06-17
**Branch:** main

## OVERVIEW

47 individual component recipes using tailwind-variants tv() function. Flat structure, one file per component.

## STRUCTURE

```
packages/core/src/recipes/
├── accordion.ts
├── alert.ts
├── alert-dialog.ts
├── aspect-ratio.ts
├── avatar.ts
├── badge.ts
├── breadcrumb.ts
├── button.ts
├── card.ts
├── carousel.ts
├── checkbox.ts
├── collapsible.ts
├── color-picker.ts
├── combobox.ts
├── date-picker.ts
├── dialog.ts
├── drawer.ts
├── hover-card.ts
├── input.ts
├── label.ts
├── listbox.ts
├── menu.ts
├── number-input.ts
├── pagination.ts
├── password-input.ts
├── pin-input.ts
├── popover.ts
├── progress.ts
├── radio-group.ts
├── rating-group.ts
├── scroll-area.ts
├── segment-group.ts
├── select.ts
├── separator.ts
├── skeleton.ts
├── slider.ts
├── spinner.ts
├── switch.ts
├── table.ts
├── tabs.ts
├── tags-input.ts
├── textarea.ts
├── time-picker.ts  # orphan — not in barrel or package.json exports
├── toast.ts
├── toggle.ts
├── toggle-group.ts
├── tooltip.ts
└── typography.ts
```

## WHERE TO LOOK

| Task                | Location          | Notes                                          |
| ------------------- | ----------------- | ---------------------------------------------- |
| Add new recipe      | Current directory | Create *.ts file with tv() slots and variants  |
| View recipe pattern | button.ts or card.ts | Good examples of tv() with/without slots     |

## CONVENTIONS

- Use tailwind-variants tv() function
- Slots for multi-part components (accordion, card, dialog), single tv() for simple (button, badge)
- Export both `*Variants` variable and `type *Variants` type
- Each recipe must be added to: src/index.ts (barrel) + tsup.config.ts (entry)
- No framework imports — pure styling only

## ANTI-PATTERNS (THIS DIRECTORY)

- time-picker.ts exists but not in barrel — orphan
- Adding recipe but forgetting tsup.config.ts or src/index.ts
