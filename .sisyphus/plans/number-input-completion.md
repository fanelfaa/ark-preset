# Plan: Number-input Component Completion (Solid.js)

## TL;DR

> **Quick Summary**: Complete the partially-built Solid.js number-input component by adding missing Ark UI subcomponents (Control, IncrementTrigger, DecrementTrigger, Scrubber) with inline SVG icons, and removing the incomplete helperText/description prop.
>
> **Deliverables**:
>
> - Rewritten `packages/solid/src/number-input.tsx` with full Ark UI integration
> - Verified build passes and exports are correct
>
> **Estimated Effort**: Quick
> **Parallel Execution**: NO - single task
> **Critical Path**: Rewrite component → Build verification

---

## Context

### Original Request

Sisyphus created a number-input component but it's not finished. The core recipe is complete but the Solid.js wrapper is missing key Ark UI subcomponents.

### Interview Summary

**Key Discussions**:

- The core recipe at `packages/core/src/recipes/number-input.ts` is complete with 8 slots: root, label, control, input, incrementTrigger, decrementTrigger, scrubber, valueText
- The Solid component only uses Root, Label, Input, and a misaligned HelperText
- Missing: Control wrapper, IncrementTrigger, DecrementTrigger, Scrubber
- Decision: remove helperText/valueText entirely (no description/helper/value display)

**Research Findings**:

- Ark UI NumberInput provides: Root, Label, Input, Control, IncrementTrigger, DecrementTrigger, Scrubber, ValueText, RootProvider
- Basic Ark UI structure: `Root > (Label, Control > (Input + (IncrementTrigger + DecrementTrigger)), Scrubber, ValueText)`
- Existing project patterns (Accordion, Select) use `splitProps`, `createMemo` for variant application, and inline SVGs for icons

### Metis Review

**Identified Gaps** (addressed):

- All recipe slots confirmed present and matching Ark UI components
- SVG icon patterns confirmed consistent with existing components
- disabled/invalid variant flow confirmed via recipe
- Scrubber inclusion confirmed with user

---

## Work Objectives

### Core Objective

Complete `packages/solid/src/number-input.tsx` to properly wrap all relevant Ark UI NumberInput subcomponents with correct recipe slot styling.

### Concrete Deliverables

- `packages/solid/src/number-input.tsx` — rewritten with full Ark UI integration
- Build passes with `pnpm --filter @ui/solid build`

### Definition of Done

- [ ] `pnpm --filter @ui/solid build` exits with code 0
- [ ] No TypeScript errors in `packages/solid/src/number-input.tsx`
- [ ] Component exports `NumberInput`, `numberInputVariants` from package

### Must Have

- `NumberInputControl` wrapping `NumberInputInput` + triggers, using recipe `control` slot
- `NumberInputIncrementTrigger` with chevron-up SVG icon, using recipe `incrementTrigger` slot
- `NumberInputDecrementTrigger` with chevron-down SVG icon, using recipe `decrementTrigger` slot
- `NumberInputScrubber` with grip/grab SVG icon, using recipe `scrubber` slot
- All props passed through to underlying Ark UI components (min, max, step, disabled, invalid, value, defaultValue, etc.)
- `disabled` and `invalid` variant props wired through to recipe

### Must NOT Have (Guardrails)

- No React component
- No test files or test infrastructure
- No `valueText` or `helperText` / `description` prop or display
- No modifications to the core recipe
- No new dependencies (use inline SVGs only)
- No CSS-in-JS or external stylesheets

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** - ALL verification is agent-executed.

### Test Decision

- **Infrastructure exists**: NO
- **Automated tests**: None (skip)
- **Agent-Executed QA**: ALWAYS — build verification, export check, file content validation

### QA Policy

Every task MUST include agent-executed QA scenarios. Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Build verification**: `pnpm --filter @ui/solid build`
- **File content validation**: Read file and verify structure

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Single Task):
├── Task 1: Rewrite packages/solid/src/number-input.tsx

Wave FINAL (After ALL tasks):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── F3 skipped (no UI to run QA against)
├── F4: Scope fidelity check (deep)
```

### Dependency Matrix

- Task 1: None (can start immediately)
- F1-F4: Task 1, build verification

### Agent Dispatch Summary

- **1**: **1** - T1 → `quick`
- **FINAL**: **3** - F1 → `oracle`, F2 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [x] 1. Rewrite Solid.js number-input component

  **What to do**:
  Rewrite `packages/solid/src/number-input.tsx` to:
  1. Import `NumberInput` as namespace from `@ark-ui/solid/number-input` (not individual named imports)
  2. Remove `NumberInputHelperText` import and usage entirely
  3. Remove `description` prop from props type
  4. Add `NumberInputControl` wrapping the input and triggers — apply recipe `control` slot
  5. Add `NumberInputIncrementTrigger` with chevron-up SVG icon — apply recipe `incrementTrigger` slot
  6. Add `NumberInputDecrementTrigger` with chevron-down SVG icon — apply recipe `decrementTrigger` slot
  7. Add `NumberInputScrubber` with horizontal grip/drag SVG icon — apply recipe `scrubber` slot
  8. Keep `label` prop with `NumberInputLabel` — apply recipe `label` slot
  9. Keep `NumberInputInput` — apply recipe `input` slot
  10. Keep `disabled`/`invalid` from `VariantProps<typeof numberInputVariants>` in props type
  11. Pass remaining props via `others` to `NumberInputRoot`
  12. Use `splitProps` pattern: separate local props (`label`, `class`, `disabled`, `invalid`) from `others`
  13. Use `createMemo` for styles, apply `{ class: local.class }` on root slot

  **Structure of the returned JSX**:

  ```
  NumberInputRoot (recipe: root)
    NumberInputLabel (recipe: label) — conditional if label prop exists
    NumberInputControl (recipe: control)
      NumberInputInput (recipe: input)
      NumberInputIncrementTrigger (recipe: incrementTrigger)
        [inline SVG - chevron-up]
      NumberInputDecrementTrigger (recipe: decrementTrigger)
        [inline SVG - chevron-down]
    NumberInputScrubber (recipe: scrubber)
      [inline SVG - grip horizontal]
  ```

  **SVG Icons to use** (inline, matching existing project style — 16x16 viewBox, stroke="currentColor"):
  - Chevron-up: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`
  - Chevron-down: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`
  - Grip-horizontal (scrubber): `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="19" r="1"/></svg>`

  **Must NOT do**:
  - Do NOT add `description` or `helperText` props
  - Do NOT add `valueText` display
  - Do NOT modify the recipe file
  - Do NOT add any new dependencies
  - Do NOT add test files
  - Keep Atomic: one component file change only

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single file rewrite following well-established patterns from existing components
  - **Skills**: None needed
  - **Skills Evaluated but Omitted**:
    - `solid-js-best-practices`: Not needed — this is a straightforward wrapper following existing codebase patterns

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 (Single Task)
  - **Blocks**: F1, F2, F4
  - **Blocked By**: None

  **References**:
  **Pattern References** (existing code to follow):
  - `packages/solid/src/accordion.tsx:1-47` — Full pattern: Ark UI namespace import, splitProps, createMemo for styles, applying slots to subcomponents
  - `packages/solid/src/select.tsx:22-34` — `SelectControl` pattern: wrapping Ark UI component, adding inline SVG children, applying recipe control slot
  - `packages/solid/src/number-input.tsx:1-33` — Current file to be fully rewritten

  **Ark UI API Reference**:
  - Ark UI NumberInput subcomponents to use: `NumberInput.Root`, `NumberInput.Label`, `NumberInput.Control`, `NumberInput.Input`, `NumberInput.IncrementTrigger`, `NumberInput.DecrementTrigger`, `NumberInput.Scrubber`

  **WHY Each Reference Matters**:
  - Accordion shows the full pattern of wrapping Ark UI subcomponents with recipe slots — every new subcomponent follows the same `const X: Component<ArkComp.XProps> = (props) => { splitProps; styles; apply class; }` shape
  - Select shows how to add inline SVG children within a Control wrapper — needed for trigger buttons inside the Control
  - Current number-input shows what's there now (to remove) and serves as the base to rewrite

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Build passes after rewrite
    Tool: Bash (pnpm build)
    Preconditions: All file changes saved
    Steps:
      1. Run `pnpm --filter @ui/solid build`
    Expected Result: Exit code 0, build succeeds with no errors
    Failure Indicators: Non-zero exit code, TypeScript errors in number-input.tsx, missing import errors
    Evidence: .sisyphus/evidence/task-1-build-pass.txt

  Scenario: File structure matches expected pattern
    Tool: Bash (read + grep)
    Preconditions: Build passed
    Steps:
      1. Read `packages/solid/src/number-input.tsx`
      2. Verify imports include: `NumberInput` from `@ark-ui/solid/number-input` (namespace), `createMemo`, `splitProps`, `Component` from `solid-js`, `numberInputVariants` from `@ui/core`, `VariantProps` from `tailwind-variants`
      3. Verify NO import of: `NumberInputHelperText`
      4. Verify props type does NOT include `description`
      5. Verify JSX contains: `NumberInputControl`, `NumberInputIncrementTrigger`, `NumberInputDecrementTrigger`, `NumberInputScrubber`
      6. Verify SVG elements are present (3 SVG tags for chevron-up, chevron-down, grip)
    Expected Result: All 6 verifications pass
    Failure Indicators: Any of the checks fail
    Evidence: .sisyphus/evidence/task-1-file-structure.txt

  Scenario: Exports are correct
    Tool: Bash (grep)
    Preconditions: Build passed
    Steps:
      1. Run `grep 'export { NumberInput, numberInputVariants }' packages/solid/src/number-input.tsx`
    Expected Result: Export line exists matching the expected format
    Failure Indicators: Export line missing or different name
    Evidence: .sisyphus/evidence/task-1-exports.txt
  ```

  **Evidence to Capture:**
  - [ ] `.sisyphus/evidence/task-1-build-pass.txt` — build output
  - [ ] `.sisyphus/evidence/task-1-file-structure.txt` — file verification
  - [ ] `.sisyphus/evidence/task-1-exports.txt` — export check

  **Commit**: YES
  - Message: `fix(solid): complete number-input component with all Ark UI subcomponents`
  - Files: `packages/solid/src/number-input.tsx`
  - Pre-commit: `pnpm --filter @ui/solid build`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

- [x] F1. **Plan Compliance Audit** — `oracle`
      Read the plan end-to-end. For each "Must Have": verify implementation exists (read file). For each "Must NOT Have": search codebase for forbidden patterns (description prop, helperText, valueText in number-input.tsx) — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
      Output: `Must Have [6/6] | Must NOT Have [6/6] | Tasks [1/1] | VERDICT: APPROVE`

- [x] F2. **Code Quality Review** — `unspecified-high`
      Run `pnpm --filter @ui/solid build`. Review changed file for: `as any`/`@ts-ignore`, empty catches, console.log, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names. Ensure follows Accordion/Select patterns.
      Output: `Build [PASS] | Lint [no linter] | Files [1 clean/1 issue] | VERDICT: PASS`

- [x] F3. **Real Manual QA** — _SKIPPED (no UI runtime to verify against — component is a library export)_

- [x] F4. **Scope Fidelity Check** — `deep`
      For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination.
      Output: `Tasks [1/1 compliant] | Contamination [CLEAN] | Unaccounted [CLEAN] | VERDICT: APPROVE`

---

## Commit Strategy

- **1**: `fix(solid): complete number-input component with all Ark UI subcomponents` - packages/solid/src/number-input.tsx, `pnpm --filter @ui/solid build`

---

## Success Criteria

### Verification Commands

```bash
pnpm --filter @ui/solid build  # Expected: exit 0, no errors
```

### Final Checklist

- [ ] `packages/solid/src/number-input.tsx` rewritten with all Ark UI subcomponents
- [ ] No `description`/`helperText`/`valueText` in the component
- [ ] `NumberInputControl`, `IncrementTrigger`, `DecrementTrigger`, `Scrubber` all present
- [ ] Inline SVG icons for all triggers and scrubber
- [ ] All 8 recipe slots correctly applied
- [ ] Build passes
- [ ] No recipe file changes
- [ ] No test files added
