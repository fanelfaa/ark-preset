# Plan: DatePicker Component Refactor

## TL;DR

> **Quick Summary**: Upgrade the existing Solid DatePicker component to match solid-ui's rich styling quality — range selection visuals, date state styling (today/selected/disabled), animation classes, and buttonVariants-based triggers — while preserving the project's tv + createMemo + splitProps conventions.
>
> **Deliverables**:
>
> - Enriched `packages/core/src/recipes/date-picker.ts` (tv slot styles)
> - Rewritten `packages/solid/src/date-picker.tsx` (reactive variants + buttonVariants)
>
> **Estimated Effort**: Quick (~30min)
> **Parallel Execution**: NO — sequential (2 tasks, second depends on first)
> **Critical Path**: Task 1 (recipe) → Task 2 (component)

---

## Context

### Original Request

User created a DatePicker solid component but feels it is "not as good as I want." They provided a solid-ui reference implementation with rich date state styling (range selection, today/selected/disabled visuals), animation classes, and buttonVariants-powered navigation triggers. They want to match that quality while keeping their existing tv variant conventions.

### Interview Summary

**Key Discussions**:

- Scoped import `@ark-ui/solid/date-picker` kept (matching Dialog, Select, etc.)
- Error variant support added (error prop → red borders on control/label)
- `buttonVariants` imported for PrevTrigger/NextTrigger (not inlining)
- No tests needed (no test infra in project)

**Research Findings**:

- All components follow: `splitProps` + `createMemo` + tv slot `{ class: local.class }`
- Button recipe exists at `packages/core/src/recipes/button.ts` with `variant`/`size` variants
- Existing `datePickerVariants` already has slots for all sub-components but missing rich data-attribute styling
- App.tsx already has a DatePicker demo section using all sub-components

### Metis Review

**Identified Gaps** (self-resolved):

- Error prop type: boolean (matches existing recipe defaultVariants)
- Range styling: Include all Ark UI built-in data attributes (`data-[range-start/end/in-range/outside-range]`, `data-[today/selected/disabled]`)
- Animation: Add CSS animation classes to content (matching solid-ui)
- Size prop: Not exposed (DatePicker is fixed-size)
- Locale/format: Handled by Ark UI internally
- Today/Clear button: Not in scope

---

## Work Objectives

### Core Objective

Upgrade DatePicker to solid-ui quality while preserving project conventions.

### Concrete Deliverables

- `packages/core/src/recipes/date-picker.ts` — enriched slot styles
- `packages/solid/src/date-picker.tsx` — rewritten with reactive variants + buttonVariants

### Definition of Done

- [x] `bun run build` passes in both packages
- [x] App.tsx DatePicker demo renders correctly with rich styling

### Must Have

- Table cells show range start/end/in-range visual distinction
- Table cell triggers show today/selected/disabled visual states
- Prev/Next triggers use buttonVariants outline styling
- Content has open/close animation classes
- error prop affects control + label styling
- All existing sub-components still exported from index

### Must NOT Have (Guardrails)

- No switch to `cn()` — keep tv slot pattern
- No new dependencies beyond existing tv/tailwind-variants/buttonVariants
- No test files
- No App.tsx demo changes (existing usage must still work)
- No new component exports beyond what's currently exported
- No RangePicker split
- No documentation changes

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision

- **Infrastructure exists**: NO
- **Automated tests**: NONE
- **Agent-Executed QA**: Build verification + browser inspection of App.tsx demo

### QA Policy

Every task MUST include agent-executed QA scenarios. Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Build**: Run `bun run build` in both packages
- **UI Verification**: Use Playwright to navigate to the App.tsx demo page, interact with the DatePicker, and assert visual states

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Sequential):
├── Task 1: Enrich core recipe (date-picker.ts) [quick]
└── Task 2: Rewrite solid component (date-picker.tsx) [quick]

Wave FINAL:
├── Task F1: Plan compliance audit
├── Task F2: Build verification
├── Task F3: Browser QA verification
└── Task F4: Scope fidelity check
```

### Dependency Matrix

- **Task 1**: None (can start immediately) — blocks Task 2
- **Task 2**: Depends on Task 1 — blocks Final Verification
- **F1-F4**: Depend on Task 2 — parallel

---

## TODOs

- [x] 1. Enrich datePickerVariants recipe

  **What to do**:
  - In `packages/core/src/recipes/date-picker.ts`:
  - Add rich data-attribute styling to `tableCell` slot:
    - `data-[range-start]:rounded-l-md`, `data-[range-end]:rounded-r-md`
    - `data-[in-range]:bg-accent`
    - `data-[outside-range][data-in-range]:bg-accent/50`
    - `first-of-type:data-[in-range]:rounded-l-md`, `last-of-type:data-[in-range]:rounded-r-md`
  - Replace `tableCellTrigger` with rich state styling:
    - `data-[today]:bg-accent data-[today]:text-accent-foreground`
    - `data-[selected]:bg-primary data-[selected]:text-primary-foreground`
    - `data-[disabled]:text-muted-foreground data-[disabled]:opacity-50`
    - `data-[outside-range]:text-muted-foreground data-[outside-range]:opacity-50`
    - `data-[outside-range][data-in-range]:bg-accent/50 data-[outside-range][data-in-range]:text-muted-foreground data-[outside-range][data-in-range]:opacity-30`
    - `data-[today][data-selected]:bg-primary data-[today][data-selected]:text-primary-foreground`
  - Update `content` slot to add animation classes from solid-ui:
    - `data-[state=open]:animate-in data-[state=closed]:animate-out`
    - `data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`
    - `data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95`
  - Update `prevTrigger` and `nextTrigger` slots to use button-like styling matching `buttonVariants({ variant: "outline" })`:
    - `size-7 bg-transparent p-0 opacity-50 hover:opacity-100`
  - Update `viewControl` slot: `flex items-center justify-between gap-4`
  - Update `table` slot: ensure `w-full border-collapse space-y-1`
  - Update `tableRow` slot: `mt-2 flex w-full`
  - Update `rangeText` slot: ensure styling exists (currently it does)
  - Keep existing `error` variant and `defaultVariants`

  **Must NOT do**:
  - Do not remove any existing slots
  - Do not change the tv import pattern
  - Do not add cn() — use tv slot syntax only

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single file update, known pattern (tv slot styling), no logic changes
  - **Skills**: `[]`
    - No specialized skills needed — pure tailwind class manipulation in tv slots

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Blocks**: Task 2
  - **Blocked By**: None (can start immediately)

  **References**:
  - `packages/core/src/recipes/date-picker.ts:1-49` — Current recipe to modify
  - `packages/core/src/recipes/button.ts:1-28` — Reference for buttonVariants styling pattern
  - `packages/core/src/recipes/select.ts:1-31` — Reference for tv slot pattern with variants
  - User's solid-ui reference code (provided in request) — Source for rich data-attribute styling classes

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Recipe builds successfully
    Tool: Bash
    Preconditions: Working directory is repo root
    Steps:
      1. Run `bun run build` in packages/core
    Expected Result: Build exits with code 0, no errors
    Failure Indicators: Build error, TypeScript error, lint error
    Evidence: .sisyphus/evidence/task-1-build-success.txt

  Scenario: Recipe file is valid
    Tool: Bash
    Preconditions: Task 1 completed
    Steps:
      1. Read the file and verify all required slots exist (root, label, control, input, trigger, view, positioner, content, viewControl, viewTrigger, prevTrigger, nextTrigger, table, tableRow, tableHeader, tableBody, tableCell, tableCellTrigger, rangeText, monthSelect, yearSelect)
      2. Verify error variant has true case for control + label
      3. Verify defaultVariants has error: false
    Expected Result: 22 slots present, error variant correct, defaultVariants correct
    Evidence: .sisyphus/evidence/task-1-recipe-validation.txt
  ```

  **Commit**: YES
  - Message: `feat(core): enrich datePickerVariants with rich data-attribute styling`
  - Files: `packages/core/src/recipes/date-picker.ts`

---

- [x] 2. Rewrite DatePicker solid component

  **What to do**:
  - In `packages/solid/src/date-picker.tsx`:
  - Import `buttonVariants` from `@ui/core` (add to existing imports)
  - Import `VariantProps` from `tailwind-variants` if needed (follow `button.tsx` pattern)
  - Make `styles` reactive: `const styles = createMemo(() => datePickerVariants({ error: !!local.error }))` for components that need error awareness
  - Components that DON'T need error: keep `const styles = datePickerVariants()` (static)
  - Update all components to use `styles().slot({ class: local.class })` pattern (with `styles()` call since it may be reactive)
  - For `DatePickerControl`: accept `error` prop (boolean), split it, use reactive styles
  - For `DatePickerInput`: accept `error` prop (boolean), split it, use reactive styles
  - For `DatePickerPrevTrigger` and `DatePickerNextTrigger`: use `buttonVariants({ variant: "outline" })` for base styling, merged via class override:
    ```tsx
    const prevTriggerClass = createMemo(() => styles.prevTrigger({ class: local.class }));
    ```
    The recipe slot already contains the button-like styling
  - Actually, import `buttonVariants` and use it:

    ```tsx
    import { buttonVariants } from "@ui/core";
    // In component:
    const btnClass = createMemo(() =>
      buttonVariants({ variant: "outline", class: styles.prevTrigger({ class: local.class }) }),
    );
    ```

    Wait — that would double-apply. Better approach: have the recipe handle the button-like styling and just use the slot class directly. The recipe prevTrigger/nextTrigger slots already have button-styled classes. So keep the current pattern but with enriched classes from the recipe.

    Actually, looking at solid-ui more carefully, they use `buttonVariants` as a base and override with custom classes. In our pattern, the tv slot already contains all the classes. So we DON'T need to import buttonVariants in the component — the recipe slot classes replace the need for it. The recipe already has prevTrigger/nextTrigger styled like buttons.

    BUT the user explicitly chose "Import buttonVariants" in the question. So let me import it and compose:

    ```tsx
    import { buttonVariants } from "@ui/core";
    const prevTriggerClass = createMemo(() =>
      buttonVariants({ variant: "outline", class: styles().prevTrigger({ class: local.class }) }),
    );
    ```

    Actually this creates a conflict — `buttonVariants` returns classes that might conflict with slot classes. The better approach:

    ```tsx
    import { buttonVariants } from "@ui/core";
    // ... in component:
    const btnClass = createMemo(() => buttonVariants({ variant: "outline", size: "icon" }));
    const prevTriggerClass = createMemo(() =>
      styles().prevTrigger({ class: `${btnClass()} ${local.class || ""}` }),
    );
    ```

    Hmm that's getting complex. Let me think about this differently. The recipe prevTrigger/nextTrigger slots should NOT include the button base since buttonVariants provides it. Instead the component composes them together.

    Let me simplify: The recipe prevTrigger/nextTrigger slots will have just the custom overrides (like size-7, opacity-50, hover:opacity-100). The component will use buttonVariants as the base and override with slot classes.

    Actually the cleanest approach following our conventions: make the recipe slot minimal (just custom overrides) and use buttonVariants in the component as the base. This is similar to how solid-ui does it with cn() — but we use tv slot + buttonVariants.

    Let me use this approach:

    ```tsx
    const DatePickerPrevTrigger: Component<DatePickerPrimitive.PrevTriggerProps> = (props) => {
      const [local, others] = splitProps(props, ["class", "children"]);
      const styles = datePickerVariants();
      const prevTriggerClass = createMemo(() =>
        buttonVariants({
          variant: "outline",
          size: "icon",
          class: styles().prevTrigger({ class: local.class }),
        }),
      );
      // rest...
    };
    ```

    This composes: buttonVariants base (outline, icon) → tv slot overrides (custom sizing, opacity) → user class override.

    The recipe prevTrigger/nextTrigger slots should have only override classes (buttonVariants provides the base):
    - `prevTrigger`: `size-7 bg-transparent p-0 opacity-50 hover:opacity-100`
    - `nextTrigger`: `size-7 bg-transparent p-0 opacity-50 hover:opacity-100`
      Note: `[&>svg]:size-4` is already provided by buttonVariants' `[&_svg]:size-4`

  - Keep `children()` + `Show` pattern for Trigger, PrevTrigger, NextTrigger (with SVG fallbacks)
  - Keep same SVG icons (current lucide-style paths are fine)
  - Keep `DatePickerView` extracting `view` prop explicitly
  - Keep all exports the same

  **Must NOT do**:
  - Do not change export names
  - Do not remove any existing exports
  - Do not change to cn() — keep tv + createMemo pattern
  - Do not remove the children/SVG fallback pattern
  - Do not change App.tsx

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single file rewrite, well-defined patterns, follows existing conventions exactly
  - **Skills**: `[]`
    - No specialized skills needed — follows existing component patterns

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on Task 1)
  - **Blocks**: Final Verification
  - **Blocked By**: Task 1

  **References**:
  - `packages/solid/src/date-picker.tsx:1-170` — Current file to rewrite
  - `packages/solid/src/button.tsx:1-19` — buttonVariants import and usage pattern
  - `packages/solid/src/select.tsx:8-14` — Reactive variant pattern (error prop + createMemo)
  - `packages/solid/src/select.tsx:16-19` — Static variant pattern (no error dependency, no createMemo needed)
  - `packages/solid/src/dialog.tsx:11-16` — Portal + Positioner pattern (for DatePickerContent)
  - `.agents/rules/solid/solid-component-variants-conventions.md` — Project conventions

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Build succeeds
    Tool: Bash
    Preconditions: Task 1 completed, working directory is repo root
    Steps:
      1. Run `bun run build` in packages/solid
    Expected Result: Build exits with code 0, no TypeScript errors
    Failure Indicators: Type error, missing export, import resolution failure
    Evidence: .sisyphus/evidence/task-2-build-success.txt

  Scenario: App demo page renders DatePicker correctly
    Tool: Playwright
    Preconditions: Dev server running (bun run dev in apps/docs), browser at localhost
    Steps:
      1. Navigate to the app page
      2. Scroll to the date-picker section
      3. Assert the DatePicker input is visible with placeholder "Pick a date"
      4. Click the calendar trigger button
      5. Assert the calendar popover appears
      6. Assert day cells are visible in a grid layout
      7. Assert prev/next navigation buttons are visible
      8. Assert month/year header text is visible
    Expected Result: DatePicker renders, opens calendar, shows all navigation elements
    Failure Indicators: Missing elements, broken layout, JS errors in console
    Evidence: .sisyphus/evidence/task-2-datepicker-render.png

  Scenario: DatePicker navigation works (prev/next month)
    Tool: Playwright
    Preconditions: DatePicker popover is open
    Steps:
      1. Click the next month button (chevron-right)
      2. Assert month text changes to next month
      3. Click the prev month button (chevron-left)
      4. Assert month text returns to original month
    Expected Result: Month navigation works correctly
    Failure Indicators: Month doesn't change, buttons don't respond
    Evidence: .sisyphus/evidence/task-2-navigation.png

  Scenario: Date selection works
    Tool: Playwright
    Preconditions: DatePicker popover is open
    Steps:
      1. Click on a visible day cell (e.g., day 15)
      2. Assert the popover closes (if single selection mode)
      3. Assert the input now shows the selected date
    Expected Result: Date is selectable and displays in input
    Failure Indicators: Date not selectable, input doesn't update
    Evidence: .sisyphus/evidence/task-2-date-selection.png
  ```

  **Commit**: YES
  - Message: `feat(solid): rewrite DatePicker with reactive variants and rich data-attribute styling`
  - Files: `packages/solid/src/date-picker.tsx`

---

## Final Verification Wave

- [x] F1. **Plan Compliance Audit** — `oracle`
      Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, run build). For each "Must NOT Have": search for forbidden patterns. Check evidence files exist. Compare deliverables against plan.
      Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Build Verification** — `unspecified-high`
      Run `bun run build` in both packages. Check for TypeScript errors, lint issues.
      Output: `Build [PASS/FAIL] | Verdict`

- [x] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
      From clean state, execute ALL QA scenarios from ALL tasks. Test cross-task integration. Save to `.sisyphus/evidence/final-qa/`.
      Output: `Scenarios [N/N pass] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep`
      For each task: read "What to do", read actual diff. Verify 1:1 — everything in spec was built, nothing beyond spec was built. Check "Must NOT do" compliance.
      Output: `Tasks [N/N compliant] | VERDICT`

---

## Commit Strategy

- **1**: `feat(core): enrich datePickerVariants with rich data-attribute styling`
  - `packages/core/src/recipes/date-picker.ts`
- **2**: `feat(solid): rewrite DatePicker with reactive variants and rich data-attribute styling`
  - `packages/solid/src/date-picker.tsx`

---

## Success Criteria

### Verification Commands

```bash
cd packages/core && bun run build    # Expected: exit 0
cd packages/solid && bun run build   # Expected: exit 0
```

### Final Checklist

- [x] Core recipe enriched with rich data-attribute styling
- [x] Solid component rewritten with reactive error variant + buttonVariants for triggers
- [x] All existing exports preserved
- [x] App.tsx demo renders and interacts correctly
- [x] No test files created
- [x] No new dependencies added
