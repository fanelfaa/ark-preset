# Changelog

## 0.1.3 (2026-07-18)

### Features

- **docs**: Add TanStack Form integration with live demo, Zod validation, and docs page
- **docs**: Add E2E test suite with Playwright
- **test**: Add full Vitest + solid-testing-library test suite for overlay, form, display, toggle, layout, and interactive components
- **dev**: Add lefthook pre-commit hooks for lint and fmt

### Fixes

- **ScrollArea**: Route class prop to viewport so height constraints work; add `h-full` to Root for sidebar/dropdown scrolling
- **Select**: Match dropdown width and gap with trigger control; stabilize positioning ref with `mergeProps`
- **Combobox**: Wrap list with ScrollArea; fix content slot max-height
- **DatePicker**: Stack label above control, stretch input, fix clear button crash
- **RatingGroup**: Fix label line-height and stacking in form demos
- **RadioGroup**: Put label on right of radio control; wrap with fieldset in form demos
- **SegmentGroup**: Stretch items equally and wrap with fieldset
- **PasswordInput**: Simplify composite API and fix full-width rendering
- **TagsInput / Textarea**: Full-width styling matching input padding
- **iOS**: Prevent auto-zoom on form inputs via `text-base` on mobile
- **TanStack Form**: Extract Zod issue message from error objects correctly

### Refactors

- **solid**: Extract inline SVG icons into named components in Select
- **docs**: Rename `getDocsComponents` to `getRecipeDocsComponents`

### Chores

- Update TanStack dependencies in lockfile
- Clean up unused imports

---

## 0.1.2

Initial public release.
