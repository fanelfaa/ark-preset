# Plan: Component Height Standardization (32px / h-8)

## TL;DR

> **Quick Summary**: Reduce height of Button, Input, and Select components from 40px (h-10) to 32px (h-8) baseline, with proportional padding adjustments. Button size variants scaled down by 8px each.
>
> **Deliverables**:
>
> - `packages/ui/src/button.tsx` — 4 size variants adjusted (sm/h-8, md/h-9, lg/h-10, icon/size-9)
> - `packages/ui/src/input.tsx` — input slot height h-10→h-8, padding px-3→px-2.5, py-2→py-1.5
> - `packages/ui/src/select.tsx` — control slot height h-10→h-8, padding px-3→px-2.5, py-2→py-1.5
> - Build verification passing
>
> **Estimated Effort**: Quick (10-15 min)
> **Parallel Execution**: YES — all 3 components can be done in parallel
> **Critical Path**: Task 1-3 (parallel) → Task 4 (verify build)

---

## Context

### Original Request

Set all shadcn/ui-style control components (button, input, select) to have base height of 32px (h-8 in Tailwind).

### Interview Summary

**Key Discussions**:

- Button sizes: scaled down by 8px (sm→h-8, md→h-9, lg→h-10, icon→size-9)
- Input height: h-10 → h-8 with proportional padding reduction
- Select height: h-10 → h-8 with proportional padding reduction
- Padding: reduced proportionally (e.g., px-3→px-2.5, py-2→py-1.5)
- Scope: only 3 components in `packages/ui/src/`

**Research Findings**:

- Component library: `@ui/solid` built on Ark UI v5 + tailwind-variants
- Tailwind CSS v4 with `tw-animate-css`
- No other form control components exist (no Checkbox, Radio, Switch, Toggle)
- Toast's `actionTrigger` already uses `h-8` — no change needed
- Dialog has no form control heights — no change needed
- Docs app has no hardcoded heights — no change needed
- No test infrastructure detected

### Metis Review

**Identified Gaps** (addressed):

- **Scope clarity**: Explicitly defined what's IN/OUT (see below)
- **Build verification**: Added as acceptance criterion
- **Icon sizing**: Button base class `[&_svg]:size-4` remains unchanged — icons keep their natural size
- **Other controls**: Confirmed no Checkbox/Radio/Switch/Toggle exist in the project

---

## Work Objectives

### Core Objective

Reduce height of all form control components from 40px to 32px baseline, maintaining visual proportions with adjusted padding.

### Concrete Deliverables

- `packages/ui/src/button.tsx` — height/padding adjustments across all 4 sizes
- `packages/ui/src/input.tsx` — height/padding adjustment on input slot
- `packages/ui/src/select.tsx` — height/padding adjustment on control slot

### Definition of Done

- [ ] All height and padding changes applied to the 3 files
- [ ] `pnpm run build` passes with no errors
- [ ] No console errors or runtime issues

### Must Have

- Button sm: h-8, px-2.5, rounded-md, text-xs
- Button md: h-9, px-3, py-1.5
- Button lg: h-10, rounded-md, px-6
- Button icon: size-9
- Input: h-8, px-2.5, py-1.5
- Select control: h-8, px-2.5, py-1.5

### Must NOT Have (Guardrails)

- No icon SVG size changes (base `[&_svg]:size-4` stays)
- No text/line-height adjustments
- No docs app updates
- No other component modifications (Dialog, Toast, tv.ts, theme.css untouched)
- No test files created (no test infra)
- No functional/logic changes — styling only

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed.

### Test Decision

- **Infrastructure exists**: NO
- **Automated tests**: None (no test infra — not adding it)
- **Agent QA**: Every task includes executable verification commands

### QA Policy

All verification via Bash commands: read files to confirm class changes, run build to confirm no errors, run lint to confirm no regressions.

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (ALL IN PARALLEL):
├── Task 1: Adjust Button sizes (button.tsx)
├── Task 2: Adjust Input height (input.tsx)
└── Task 3: Adjust Select height (select.tsx)

Wave FINAL (After all edits):
└── Task 4: Build verification + smoke test
```

### Agent Dispatch Summary

- **Wave 1**: 3 parallel `quick` agents — each edits 1 file
- **Final**: 1 `quick` agent — runs build

---

## TODOs

- [x] 1. Adjust Button component heights (button.tsx)

  **What to do**:
  - Edit the `buttonVariants` tv definition's `size` variants:
    - sm: `h-9 rounded-md px-3 text-xs` → `h-8 rounded-md px-2.5 text-xs`
    - md: `h-10 px-4 py-2` → `h-9 px-3 py-1.5`
    - lg: `h-11 rounded-md px-8` → `h-10 rounded-md px-6`
    - icon: `size-10` → `size-9`
  - Do NOT touch the base class, variant colors, or any other styles.
  - Do NOT change the SVG icon size (`[&_svg]:size-4` stays).

  **Must NOT do**:
  - Do not change variant colors (default, destructive, outline, secondary, ghost, link)
  - Do not change the base class or any other shared styles
  - Do not change text sizes

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: Task 4
  - **Blocked By**: None

  **References**:
  - `packages/ui/src/button.tsx:4-26` — The tv() definition containing all button variants

  **Acceptance Criteria**:
  - [ ] File `packages/ui/src/button.tsx` read — confirm changes match the spec
  - [ ] sm variant contains `h-8` and `px-2.5`
  - [ ] md variant contains `h-9` and `px-3 py-1.5`
  - [ ] lg variant contains `h-10` and `px-6`
  - [ ] icon variant contains `size-9`

  **QA Scenarios**:

  ```
  Scenario: Verify Button class changes
    Tool: Bash
    Steps:
      1. Read packages/ui/src/button.tsx
      2. grep for each size variant and confirm classes
    Expected Result:
      - sm: 'h-8 rounded-md px-2.5 text-xs'
      - md: 'h-9 px-3 py-1.5'
      - lg: 'h-10 rounded-md px-6'
      - icon: 'size-9'
    Evidence: .sisyphus/evidence/task-1-button-classes.txt
  ```

- [x] 2. Adjust Input component height (input.tsx)

  **What to do**:
  - Edit the `inputVariants` tv definition's `input` slot:
    - `h-10` → `h-8`
    - `px-3 py-2` → `px-2.5 py-1.5`
  - Keep all other classes unchanged (border, bg, rounded-md, text-sm, etc.)

  **Must NOT do**:
  - Do not change the root, label, description, error slots
  - Do not change the error variant styles
  - Do not remove any existing classes

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3)
  - **Blocks**: Task 4
  - **Blocked By**: None

  **References**:
  - `packages/ui/src/input.tsx:9-10` — The input slot class string

  **Acceptance Criteria**:
  - [ ] File `packages/ui/src/input.tsx` read — confirm changes
  - [ ] input slot contains `h-8` instead of `h-10`
  - [ ] input slot contains `px-2.5 py-1.5` instead of `px-3 py-2`

  **QA Scenarios**:

  ```
  Scenario: Verify Input class changes
    Tool: Bash
    Steps:
      1. Read packages/ui/src/input.tsx
      2. grep for the input slot class string
    Expected Result:
      - Contains 'h-8' and 'px-2.5 py-1.5'
      - Does NOT contain 'h-10' (only the input slot, root/label may not have height)
    Evidence: .sisyphus/evidence/task-2-input-classes.txt
  ```

- [x] 3. Adjust Select component height (select.tsx)

  **What to do**:
  - Edit the `selectVariants` tv definition's `control` slot:
    - `h-10` → `h-8`
    - `px-3 py-2` → `px-2.5 py-1.5`
  - Keep all other classes unchanged (border, bg, rounded-md, text-sm, focus-within, etc.)
  - Do NOT touch any other slots (label, trigger, valueText, indicator, positioner, content, item, etc.)

  **Must NOT do**:
  - Do not change label, trigger, indicator, content, item slots
  - Do not change the error variant
  - Do not remove any existing classes

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2)
  - **Blocks**: Task 4
  - **Blocked By**: None

  **References**:
  - `packages/ui/src/select.tsx:10` — The control slot class string

  **Acceptance Criteria**:
  - [ ] File `packages/ui/src/select.tsx` read — confirm changes
  - [ ] control slot contains `h-8` instead of `h-10`
  - [ ] control slot contains `px-2.5 py-1.5` instead of `px-3 py-2`

  **QA Scenarios**:

  ```
  Scenario: Verify Select class changes
    Tool: Bash
    Steps:
      1. Read packages/ui/src/select.tsx
      2. grep for the control slot class string
    Expected Result:
      - Contains 'h-8' and 'px-2.5 py-1.5'
      - Does NOT contain 'h-10' in the control slot
    Evidence: .sisyphus/evidence/task-3-select-classes.txt
  ```

- [x] 4. Build verification

  **What to do**:
  - Run `pnpm run build` from the repo root
  - Confirm no TypeScript errors, no build failures
  - Quick smoke test: verify docs dev server starts (optional)

  **Must NOT do**:
  - Do not modify any files
  - Do not run tests (none exist)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Final (after Tasks 1-3)
  - **Blocks**: None
  - **Blocked By**: Tasks 1, 2, 3

  **References**:
  - `package.json` — build script

  **Acceptance Criteria**:
  - [ ] `pnpm run build` exits with code 0
  - [ ] No TypeScript errors in build output

  **QA Scenarios**:

  ```
  Scenario: Build passes
    Tool: Bash
    Steps:
      1. Run: pnpm run build
    Expected Result: Exit code 0, no errors in output
    Failure Indicators: Build error, TypeScript error, missing module
    Evidence: .sisyphus/evidence/task-4-build-output.txt
  ```

---

## Final Verification Wave

- [x] F1. **Plan Compliance Audit** — `oracle`
      Read each modified file. For each Must Have: confirm class strings match spec. For each Must NOT Have: search codebase for any changes outside the 3 files. Check evidence files exist in `.sisyphus/evidence/`.
      Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Check** — `quick`
      Run `pnpm run build`. Verify no unused imports, no commented-out code, no accidental deletions. Check diff is clean — only height and padding class changes.
      Output: `Build [PASS/FAIL] | Diff [CLEAN/ISSUES] | VERDICT`

- [x] F3. **Real Manual QA** — `quick`
      Start from clean state. Re-read all 3 files. Execute all QA scenarios from Tasks 1-3 and 4.
      Output: `Scenarios [N/N pass] | Edge Cases [N tested] | VERDICT`

---

## Commit Strategy

- **1-4 (single commit)**: `style(ui): standardize control component heights to 32px baseline`
  - `packages/ui/src/button.tsx`
  - `packages/ui/src/input.tsx`
  - `packages/ui/src/select.tsx`

---

## Success Criteria

### Verification Commands

```bash
pnpm run build  # Expected: exit 0, no errors
```

### Final Checklist

- [ ] All 3 component files have correct height/padding classes
- [ ] Build passes
- [ ] No files outside the 3 were modified
- [ ] No functional behavior changed
