# Refactor: Remove `ui` Prefix from Theme CSS Variables

## TL;DR

> **Quick Summary**: Remove the `ui` segment from all CSS custom property names (`--color-ui-*` → `--color-*`, `--ui-*` → `--*`) across theme definitions and every Tailwind utility class that references them. This is a mechanical rename affecting 15 files across 3 packages.
>
> **Deliverables**:
>
> - Both `theme.css` files updated with unprefixed variables
> - All 12 recipe files updated with unprefixed Tailwind classes
> - `apps/docs/src/App.tsx` updated with unprefixed classes
> - Build passes cleanly
>
> **Estimated Effort**: Quick
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: theme.css updates → recipe/App.tsx updates → build verification

---

## Context

### Original Request

> "refactor core/theme.css remove prefix ui, ensure every related class updated too"

### Interview Summary

**Key Decisions**:

- Update **both** `packages/core/src/theme.css` and `packages/solid/src/theme.css`
- **Skip** adding missing `popover`/`popover-foreground` CSS variables (tooltip references them but they were never defined — unchanged behavior)
- **Build check** as the sole verification step

**Research Findings**:

- 15 files total need updating (2 CSS, 12 recipes, 1 App.tsx)
- 14 solid component wrappers use variants indirectly — no direct class strings, no changes needed
- No `var(--ui-*)` references exist in any `.ts`/`.tsx` files outside CSS
- No `dark:` variant classes with `ui-` prefix found
- `date-picker.ts` already mixes prefixed (`bg-ui-background`) and unprefixed (`border-border`) — inconsistent today, refactor normalizes it

### Metis Review

**Identified Gaps** (addressed):

- **JS/TS inline style refs**: Searched — zero `var(--ui-*)` references outside CSS files. Safe.
- **Dark mode variants**: Searched — zero `dark:bg-ui-*` or `dark:text-ui-*` references. Safe.
- **Rollback**: All files in git. Revert with `git checkout -- <files>` or `git revert`.
- **Exact build command**: `pnpm -r run build` (root monorepo build)

---

## Work Objectives

### Core Objective

Remove the `ui` prefix from all CSS custom properties and Tailwind utility classes that reference the theme tokens — a mechanical rename with zero behavior change.

### Concrete Deliverables

- `packages/core/src/theme.css` — vars renamed
- `packages/solid/src/theme.css` — vars renamed
- 12 recipe files in `packages/core/src/recipes/` — classes renamed
- `apps/docs/src/App.tsx` — classes renamed

### Definition of Done

- [ ] `pnpm -r run build` exits with code 0
- [ ] `grep -r '\bui-' packages/core/src/ packages/solid/src/ apps/docs/src/` returns zero matches (excluding `@ui/` package import paths in ts/tsx)

### Must Have

- Every `--color-ui-*` → `--color-*` in `@theme` blocks
- Every `--ui-*` → `--*` in `:root` blocks
- Every `var(--ui-*` → `var(--*` in CSS values
- Every `bg-ui-*` → `bg-*`, `text-ui-*` → `text-*`, `border-ui-*` → `border-*`, `ring-ui-*` → `ring-*`, `ring-offset-ui-*` → `ring-offset-*`, `placeholder:text-ui-*` → `placeholder:text-*` in class strings
- Every variant form: `hover:bg-ui-*`, `hover:text-ui-*`, `focus:bg-ui-*`, `focus-visible:ring-ui-*`, `focus-within:ring-ui-*`, `data-[highlighted]:bg-ui-*`, `data-selected:bg-ui-*`, `data-selected:text-ui-*` → same pattern

### Must NOT Have (Guardrails)

- Do NOT touch `@ui/core`, `@ui/solid` package import paths (they contain `ui` but not `ui-` prefix)
- Do NOT add missing `popover`/`popover-foreground` CSS variables (user decision to skip — they were never defined, tooltip `bg-popover`/`text-popover-foreground` will remain unresolved)
- Do NOT modify `.tsx` component files in `packages/solid/src/` — they use variants indirectly
- Do NOT modify any CSS variables outside the `ui-` prefixed ones

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed.

### Test Decision

- **Automated tests**: None (refactoring only — behavior preserved)
- **Verification method**: Build check + grep audit

### QA Policy

Every task includes agent-executed verification. The final verification wave runs the full monorepo build plus a comprehensive grep to confirm zero `ui-` prefixed tokens remain.

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — theme.css updates):
├── Task 1: Update packages/core/src/theme.css
├── Task 2: Update packages/solid/src/theme.css
│
Wave 2 (Consumers — all independent, max parallel):
├── Task 3: packages/core/src/recipes/button.ts
├── Task 4: packages/core/src/recipes/input.ts
├── Task 5: packages/core/src/recipes/dialog.ts
├── Task 6: packages/core/src/recipes/select.ts
├── Task 7: packages/core/src/recipes/accordion.ts
├── Task 8: packages/core/src/recipes/checkbox.ts
├── Task 9: packages/core/src/recipes/radio-group.ts
├── Task 10: packages/core/src/recipes/switch.ts
├── Task 11: packages/core/src/recipes/tabs.ts
├── Task 12: packages/core/src/recipes/toast.ts
├── Task 13: packages/core/src/recipes/tooltip.ts
├── Task 14: packages/core/src/recipes/date-picker.ts
├── Task 15: apps/docs/src/App.tsx
│
Wave FINAL (Verification):
├── Task F1: Build verification + grep audit
```

Critical Path: Task 1 → Task 3-15 → Task F1
Max Concurrent: 14 (Wave 2 — all independent)

---

## TODOs

- [x] 1. Update `packages/core/src/theme.css`

  **What to do**:
  Replace all `ui-` prefixed CSS custom properties with their unprefixed equivalents:

  **`@theme` block** (lines 2-16):
  - `--color-ui-background` → `--color-background`
  - `--color-ui-foreground` → `--color-foreground`
  - `--color-ui-primary` → `--color-primary`
  - `--color-ui-primary-foreground` → `--color-primary-foreground`
  - `--color-ui-secondary` → `--color-secondary`
  - `--color-ui-secondary-foreground` → `--color-secondary-foreground`
  - `--color-ui-destructive` → `--color-destructive`
  - `--color-ui-destructive-foreground` → `--color-destructive-foreground`
  - `--color-ui-muted` → `--color-muted`
  - `--color-ui-muted-foreground` → `--color-muted-foreground`
  - `--color-ui-accent` → `--color-accent`
  - `--color-ui-accent-foreground` → `--color-accent-foreground`
  - `--color-ui-border` → `--color-border`
  - `--color-ui-input` → `--color-input`
  - `--color-ui-ring` → `--color-ring`

  **`:root` block** (lines 19-35):
  - `--ui-background` → `--background` (and same pattern for all 15 vars)
  - `var(--ui-background)` → `var(--background)` (inside `hsl(var(--ui-*))` calls)
  - `--ui-radius` → `--radius`

  **Method**: Use 2 Edit calls — one for the `@theme` block, one for the `:root` block. Replace each `--color-ui-` with `--color-` and each `--ui-` with `--` (being careful with `var(--ui-` → `var(--`).

  **Must NOT do**:
  - Do NOT touch the `[data-scope=toast]` block (lines 38-46) — unrelated

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple find-and-replace across a single small file (46 lines)
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 2)
  - **Parallel Group**: Wave 1 (with Task 2)
  - **Blocks**: Tasks 3-15
  - **Blocked By**: None

  **References**:
  - Read the file first: `packages/core/src/theme.css` (already read)
  - Mapping table in `.sisyphus/plans/theme-css-remove-ui-prefix.md` Context section

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: Verify all `ui-` prefixed variable references removed from file
    Tool: Bash
    Preconditions: File has been edited
    Steps:
      1. `grep -c '\-\-color-ui-' packages/core/src/theme.css` → 0
      2. `grep -c '\-\-ui-' packages/core/src/theme.css` → 0 (should be 0; note: `--ui` might match parts of other tokens)
      3. `grep -c '\-\-color-background' packages/core/src/theme.css` → should be 15 (or exact count)
    Expected Result: Zero `ui-` prefixes remain in CSS variable names
    Evidence: .sisyphus/evidence/task-1-ui-removed.txt

  Scenario: Verify file is syntactically valid CSS (still has `@theme` and `:root` blocks)
    Tool: Bash
    Steps:
      1. `grep -c '@theme' packages/core/src/theme.css` → 1
      2. `grep -c ':root' packages/core/src/theme.css` → 1
    Expected Result: Structure preserved
    Evidence: .sisyphus/evidence/task-1-structure.txt
  ```

  **Commit**: YES
  - Message: `refactor(core): remove ui prefix from theme CSS variables`
  - Files: `packages/core/src/theme.css`
  - Pre-commit: `grep -c '\-\-color-ui-' packages/core/src/theme.css` → 0

---

- [x] 2. Update `packages/solid/src/theme.css`

  **What to do**:
  Apply the exact same changes as Task 1 to `packages/solid/src/theme.css`. The file is byte-for-byte identical to `packages/core/src/theme.css`.

  **Must NOT do**:
  - Do NOT touch the `[data-scope=toast]` block

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 1)
  - **Parallel Group**: Wave 1
  - **Blocks**: Tasks 3-15
  - **Blocked By**: None

  **References**:
  - Apply same edits as Task 1
  - Read file: `packages/solid/src/theme.css`

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: Verify all `ui-` prefixed variable references removed from file
    Tool: Bash
    Steps:
      1. `grep -c '\-\-color-ui-' packages/solid/src/theme.css` → 0
      2. `grep -c '\-\-color-background' packages/solid/src/theme.css` → 1
    Expected Result: Zero `ui-` prefixes remain
    Evidence: .sisyphus/evidence/task-2-ui-removed.txt
  ```

  **Commit**: YES (groups with 1)
  - Message: `refactor(core): remove ui prefix from theme CSS variables`
  - Files: `packages/core/src/theme.css packages/solid/src/theme.css`
  - Pre-commit: grep assertions as above

---

- [x] 3. Update `packages/core/src/recipes/button.ts`

  **What to do**:
  Replace all `ui-` prefixed Tailwind utility classes with unprefixed versions:

  Line 5: `ring-ui-ring` → `ring-ring`
  Line 8: `bg-ui-primary` → `bg-primary`, `text-ui-primary-foreground` → `text-primary-foreground`, `hover:bg-ui-primary/90` → `hover:bg-primary/90`
  Line 9: `bg-ui-destructive` → `bg-destructive`, `text-ui-destructive-foreground` → `text-destructive-foreground`, `hover:bg-ui-destructive/90` → `hover:bg-destructive/90`
  Line 10: `border-ui-input` → `border-input`, `bg-ui-background` → `bg-background`, `hover:bg-ui-accent` → `hover:bg-accent`, `hover:text-ui-accent-foreground` → `hover:text-accent-foreground`
  Line 11: `bg-ui-secondary` → `bg-secondary`, `text-ui-secondary-foreground` → `text-secondary-foreground`, `hover:bg-ui-secondary/80` → `hover:bg-secondary/80`
  Line 12: `hover:bg-ui-accent` → `hover:bg-accent`, `hover:text-ui-accent-foreground` → `hover:text-accent-foreground`
  Line 13: `text-ui-primary` → `text-primary`

  **Parallelization**: YES — Wave 2, with Tasks 4-15
  **Blocked By**: Tasks 1, 2
  **Blocks**: Task F1

  **References**:
  - Read file: `packages/core/src/recipes/button.ts`
  - Mapping: every `ui-X` after `bg-`, `text-`, `border-`, `ring-`, `ring-offset-` becomes `X`

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: Verify no `ui-` prefixed classes remain
    Tool: Bash
    Steps:
      1. `grep -c 'bg-ui-' packages/core/src/recipes/button.ts` → 0
      2. `grep -c 'text-ui-' packages/core/src/recipes/button.ts` → 0
      3. `grep -c 'border-ui-' packages/core/src/recipes/button.ts` → 0
      4. `grep -c 'ring-ui-' packages/core/src/recipes/button.ts` → 0
    Expected Result: Zero `ui-` references
    Evidence: .sisyphus/evidence/task-3-clean.txt
  ```

  **Commit**: YES (groups with 4-15)
  - Message: `refactor(core): remove ui prefix from recipe classes`
  - Files: (all recipe files)

---

- [x] 4. Update `packages/core/src/recipes/input.ts`

  **What to do**:
  Rename all `ui-` prefixed classes:

  Line 7: `text-ui-foreground` → `text-foreground`
  Line 9: `border-ui-input` → `border-input`, `bg-ui-background` → `bg-background`, `ring-offset-ui-background` → `ring-offset-background`, `placeholder:text-ui-muted-foreground` → `placeholder:text-muted-foreground`, `ring-ui-ring` → `ring-ring`
  Line 10: `text-ui-muted-foreground` → `text-muted-foreground`
  Line 11: `text-ui-destructive` → `text-destructive`
  Line 16: `border-ui-destructive` → `border-destructive`, `focus-visible:ring-ui-destructive` → `focus-visible:ring-destructive`

  **Parallelization**: YES — Wave 2 (with Tasks 3, 5-15)
  **Blocked By**: Tasks 1, 2

  **QA Scenarios**:

  ```
  Scenario: Verify no `ui-` classes remain
    Tool: Bash
    Steps:
      1. `grep -c 'ui-' packages/core/src/recipes/input.ts` → 0
    Expected Result: 0
    Evidence: .sisyphus/evidence/task-4-clean.txt
  ```

---

- [x] 5. Update `packages/core/src/recipes/dialog.ts`

  **What to do**:
  Line 8: `border-ui-border` → `border-border`, `bg-ui-background` → `bg-background`
  Line 12: `text-ui-muted-foreground` → `text-muted-foreground`
  Line 13: `ring-offset-ui-background` → `ring-offset-background`, `ring-ui-ring` → `ring-ring`

  **Parallelization**: YES — Wave 2
  **Blocked By**: Tasks 1, 2

  **QA Scenarios**:

  ```
  Scenario: Verify no `ui-` classes remain
    Tool: Bash
    Steps:
      1. `grep -c 'ui-' packages/core/src/recipes/dialog.ts` → 0
    Expected Result: 0
    Evidence: .sisyphus/evidence/task-5-clean.txt
  ```

---

- [x] 6. Update `packages/core/src/recipes/select.ts`

  **What to do**:
  Rename ALL `ui-` prefixed classes:
  - `text-ui-foreground` → `text-foreground`
  - `border-ui-input` → `border-input`
  - `bg-ui-background` → `bg-background`
  - `ring-offset-ui-background` → `ring-offset-background`
  - `ring-ui-ring` → `ring-ring`
  - `text-ui-muted-foreground` → `text-muted-foreground`
  - `border-ui-border` → `border-border`
  - `focus:bg-ui-accent` → `focus:bg-accent`, `focus:text-ui-accent-foreground` → `focus:text-accent-foreground`
  - `data-[highlighted]:bg-ui-accent` → `data-[highlighted]:bg-accent`
  - `data-[highlighted]:text-ui-accent-foreground` → `data-[highlighted]:text-accent-foreground`
  - `border-ui-destructive` → `border-destructive`
  - `focus-within:ring-ui-destructive` → `focus-within:ring-destructive`
  - `text-ui-destructive` → `text-destructive`

  **Parallelization**: YES — Wave 2
  **Blocked By**: Tasks 1, 2

  **QA Scenarios**:

  ```
  Scenario: Verify no `ui-` classes remain
    Tool: Bash
    Steps:
      1. `grep -c 'ui-' packages/core/src/recipes/select.ts` → 0
    Expected Result: 0
    Evidence: .sisyphus/evidence/task-6-clean.txt
  ```

---

- [x] 7. Update `packages/core/src/recipes/accordion.ts`

  **What to do**:
  Line 7: `border-ui-border` → `border-border`
  Line 9: `ring-offset-ui-background` → `ring-offset-background`, `ring-ui-ring` → `ring-ring`
  Line 10: `text-ui-foreground` → `text-foreground`
  Line 13: `text-ui-foreground` → `text-foreground`

  **Parallelization**: YES — Wave 2
  **Blocked By**: Tasks 1, 2

  **QA Scenarios**:

  ```
  Scenario: Verify no `ui-` classes remain
    Tool: Bash
    Steps:
      1. `grep -c 'ui-' packages/core/src/recipes/accordion.ts` → 0
    Expected Result: 0
    Evidence: .sisyphus/evidence/task-7-clean.txt
  ```

---

- [x] 8. Update `packages/core/src/recipes/checkbox.ts`

  **What to do**:
  Line 8: `border-ui-input` → `border-input`, `ring-offset-ui-background` → `ring-offset-background`, `ring-ui-ring` → `ring-ring`, `bg-ui-primary` → `bg-primary`, `text-ui-primary-foreground` → `text-primary-foreground`, `border-ui-primary` (×3) → `border-primary`
  Line 10: `text-ui-foreground` → `text-foreground`

  **Parallelization**: YES — Wave 2
  **Blocked By**: Tasks 1, 2

  **QA Scenarios**:

  ```
  Scenario: Verify no `ui-` classes remain
    Tool: Bash
    Steps:
      1. `grep -c 'ui-' packages/core/src/recipes/checkbox.ts` → 0
    Expected Result: 0
    Evidence: .sisyphus/evidence/task-8-clean.txt
  ```

---

- [x] 9. Update `packages/core/src/recipes/radio-group.ts`

  **What to do**:
  Line 7: `text-ui-foreground` → `text-foreground`
  Line 10: `border-ui-input` → `border-input`, `ring-offset-ui-background` → `ring-offset-background`, `ring-ui-ring` → `ring-ring`, `border-ui-primary` → `border-primary`
  Line 11: `bg-ui-primary` → `bg-primary`
  Line 12: `text-ui-foreground` → `text-foreground`

  **Parallelization**: YES — Wave 2
  **Blocked By**: Tasks 1, 2

  **QA Scenarios**:

  ```
  Scenario: Verify no `ui-` classes remain
    Tool: Bash
    Steps:
      1. `grep -c 'ui-' packages/core/src/recipes/radio-group.ts` → 0
    Expected Result: 0
    Evidence: .sisyphus/evidence/task-9-clean.txt
  ```

---

- [x] 10. Update `packages/core/src/recipes/switch.ts`

  **What to do**:
  Line 8: `ring-ui-ring` → `ring-ring`, `ring-offset-ui-background` → `ring-offset-background`, `bg-ui-primary` → `bg-primary`, `bg-ui-input` → `bg-input`
  Line 10: `bg-ui-background` → `bg-background`
  Line 11: `text-ui-foreground` → `text-foreground`

  **Parallelization**: YES — Wave 2
  **Blocked By**: Tasks 1, 2

  **QA Scenarios**:

  ```
  Scenario: Verify no `ui-` classes remain
    Tool: Bash
    Steps:
      1. `grep -c 'ui-' packages/core/src/recipes/switch.ts` → 0
    Expected Result: 0
    Evidence: .sisyphus/evidence/task-10-clean.txt
  ```

---

- [x] 11. Update `packages/core/src/recipes/tabs.ts`

  **What to do**:
  Line 7: `bg-ui-muted` → `bg-muted`, `text-ui-muted-foreground` → `text-muted-foreground`
  Line 9: `ring-offset-ui-background` → `ring-offset-background`, `ring-ui-ring` → `ring-ring`, `bg-ui-background` → `bg-background`, `text-ui-foreground` → `text-foreground`
  Line 11: `ring-offset-ui-background` → `ring-offset-background`, `ring-ui-ring` → `ring-ring`
  Line 12: `bg-ui-foreground` → `bg-foreground`

  **Parallelization**: YES — Wave 2
  **Blocked By**: Tasks 1, 2

  **QA Scenarios**:

  ```
  Scenario: Verify no `ui-` classes remain
    Tool: Bash
    Steps:
      1. `grep -c 'ui-' packages/core/src/recipes/tabs.ts` → 0
    Expected Result: 0
    Evidence: .sisyphus/evidence/task-11-clean.txt
  ```

---

- [x] 12. Update `packages/core/src/recipes/toast.ts`

  **What to do**:
  Line 6: `border-ui-border` → `border-border`
  Line 9: `text-ui-foreground/50` → `text-foreground/50`, `text-ui-foreground` → `text-foreground`
  Line 10: `hover:bg-ui-secondary` → `hover:bg-secondary`, `ring-ui-ring` → `ring-ring`
  Line 14: `bg-ui-background` → `bg-background`, `border-ui-border` → `border-border`
  Line 16: `border-ui-destructive` → `border-destructive`, `bg-ui-destructive` → `bg-destructive`, `text-ui-destructive-foreground` → `text-destructive-foreground`
  Line 17: `text-ui-destructive-foreground` → `text-destructive-foreground`
  Line 18: `text-ui-destructive-foreground/90` → `text-destructive-foreground/90`
  Line 19: `text-ui-destructive-foreground/50` → `text-destructive-foreground/50`, `text-ui-destructive-foreground` → `text-destructive-foreground`
  Line 20: `text-ui-destructive-foreground` → `text-destructive-foreground`, `border-ui-destructive-foreground/20` → `border-destructive-foreground/20`, `hover:bg-ui-destructive-foreground/10` → `hover:bg-destructive-foreground/10`

  **Parallelization**: YES — Wave 2
  **Blocked By**: Tasks 1, 2

  **QA Scenarios**:

  ```
  Scenario: Verify no `ui-` classes remain
    Tool: Bash
    Steps:
      1. `grep -c 'ui-' packages/core/src/recipes/toast.ts` → 0
    Expected Result: 0
    Evidence: .sisyphus/evidence/task-12-clean.txt
  ```

---

- [x] 13. Update `packages/core/src/recipes/tooltip.ts`

  **What to do**:
  Line 7: `border-ui-input` → `border-input`, `text-ui-foreground` → `text-foreground`, `ring-offset-ui-background` → `ring-offset-background`, `hover:bg-ui-accent` → `hover:bg-accent`, `ring-ui-ring` → `ring-ring`
  Line 10: `border-ui-border` → `border-border`, `bg-ui-popover` → `bg-popover`, `text-ui-popover-foreground` → `text-popover-foreground`
  Line 13: `border-ui-border` → `border-border`, `bg-ui-popover` → `bg-popover`

  **Note**: `bg-popover`/`text-popover-foreground` will remain unresolved (no CSS var defined) — same as before. Not introducing new behavior.

  **Parallelization**: YES — Wave 2
  **Blocked By**: Tasks 1, 2

  **QA Scenarios**:

  ```
  Scenario: Verify no `ui-` classes remain
    Tool: Bash
    Steps:
      1. `grep -c 'ui-' packages/core/src/recipes/tooltip.ts` → 0
    Expected Result: 0
    Evidence: .sisyphus/evidence/task-13-clean.txt
  ```

---

- [x] 14. Update `packages/core/src/recipes/date-picker.ts`

  **What to do**:
  Line 9: `bg-ui-background` → `bg-background`
  Line 15: `bg-ui-background` → `bg-background`
  Line 22: `bg-ui-background` → `bg-background`
  Line 58: `border-ui-destructive` → `border-destructive`, `focus-within:ring-ui-destructive` → `focus-within:ring-destructive`
  Line 59: `text-ui-destructive` → `text-destructive`

  **Parallelization**: YES — Wave 2
  **Blocked By**: Tasks 1, 2

  **QA Scenarios**:

  ```
  Scenario: Verify no `ui-` classes remain
    Tool: Bash
    Steps:
      1. `grep -c 'ui-' packages/core/src/recipes/date-picker.ts` → 0
    Expected Result: 0
    Evidence: .sisyphus/evidence/task-14-clean.txt
  ```

---

- [x] 15. Update `apps/docs/src/App.tsx`

  **What to do**:
  Replace all `ui-` prefixed Tailwind utility classes (~50 occurrences) across the file. The same pattern applies as in recipe files:
  - `bg-ui-background` → `bg-background`
  - `text-ui-foreground` → `text-foreground`
  - `border-ui-border` → `border-border`
  - `text-ui-muted-foreground` → `text-muted-foreground`
  - `bg-ui-muted` → `bg-muted`
  - `border-ui-input` → `border-input`
  - `ring-offset-ui-background` → `ring-offset-background`
  - `hover:bg-ui-accent` → `hover:bg-accent`
  - `focus-visible:ring-ui-ring` → `focus-visible:ring-ring`
  - `focus-visible:ring-offset-2` stays as-is (no ui prefix)
  - `bg-ui-popover` → `bg-popover`, `text-ui-popover-foreground` → `text-popover-foreground`

  **Method**: Use search-and-replace across the file. The patterns are all the same: remove `ui-` from any color utility class prefix.

  **Parallelization**: YES — Wave 2
  **Blocked By**: Tasks 1, 2

  **QA Scenarios**:

  ```
  Scenario: Verify no `ui-` classes remain in App.tsx
    Tool: Bash
    Steps:
      1. `grep -cP '(?<![@])(bg-ui|text-ui|border-ui|ring-ui|ring-offset-ui)' apps/docs/src/App.tsx` → 0
    Expected Result: 0
    Evidence: .sisyphus/evidence/task-15-clean.txt
  ```

  **Commit**: YES (groups with 3-15)
  - Message: `refactor(core): remove ui prefix from recipe classes and docs`
  - Files: (all recipe files + App.tsx)

---

## Final Verification Wave

- [x] F1. **Build + grep audit** — `quick`
      Run the monorepo build and a comprehensive grep to confirm no `ui-` prefixed tokens remain.

  **Steps**:
  1. `pnpm -r run build` — must exit 0 (timeout: 120s)
  2. `grep -rP '\bui-(?!radius\b)(?!background\b)(?!foreground\b)(?!primary\b)(?!secondary\b)(?!destructive\b)(?!muted\b)(?!accent\b)(?!border\b)(?!input\b)(?!ring\b)' packages/core/src/ -l || true` — check no false negatives
  3. Simpler check: `grep -rP '(bg-ui|text-ui|border-ui|ring-ui|ring-offset-ui|placeholder:text-ui)' packages/core/src/ packages/solid/src/ apps/docs/src/` — must return empty
  4. Verify `--color-ui-` doesn't exist: `grep -r '\-\-color-ui-' packages/core/src/ packages/solid/src/` → empty
  5. `pnpm -r run typecheck` — must exit 0

  **Output**:
  - Build: [PASS/FAIL]
  - Grep audit: [CLEAN/ISSUES]
  - Typecheck: [PASS/FAIL]
  - VERDICT: [APPROVE/REJECT]

---

## Commit Strategy

- **Commit 1** (Tasks 1-2): `refactor(core): remove ui prefix from theme CSS variables`
  - Files: `packages/core/src/theme.css`, `packages/solid/src/theme.css`
  - Pre-commit: grep count = 0 for `--color-ui-`

- **Commit 2** (Tasks 3-15): `refactor(core): remove ui prefix from recipe classes and docs`
  - Files: all 12 recipe files + `apps/docs/src/App.tsx`
  - Pre-commit: grep count = 0 for `(bg-ui|text-ui|border-ui|ring-ui|ring-offset-ui|placeholder:text-ui)`

---

## Success Criteria

### Verification Commands

```bash
pnpm -r run build      # Expected: exit 0
grep -rP '(bg-ui|text-ui|border-ui|ring-ui|ring-offset-ui|placeholder:text-ui)' \
  packages/core/src/ packages/solid/src/ apps/docs/src/  # Expected: empty
grep -r '\-\-color-ui-' packages/core/src/ packages/solid/src/  # Expected: empty
pnpm -r run typecheck  # Expected: exit 0
```

### Final Checklist

- [ ] Zero `--color-ui-*` references in both theme.css files
- [ ] Zero `var(--ui-*)` references in both theme.css files
- [ ] Zero `bg-ui-*`, `text-ui-*`, `border-ui-*`, `ring-ui-*`, `ring-offset-ui-*` class references in all recipe files
- [ ] Zero `bg-ui-*`, `text-ui-*`, `border-ui-*` class references in `apps/docs/src/App.tsx`
- [ ] `pnpm -r run build` passes
- [ ] `pnpm -r run typecheck` passes
