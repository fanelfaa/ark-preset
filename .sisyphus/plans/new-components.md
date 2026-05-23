# Popover & Slider Components

## TL;DR

> **Quick Summary**: Create two new Ark UI Solid components (Popover + Slider) following established patterns — core recipe (`tv()` with slots) in `packages/core`, Solid wrapper (`splitProps` + `createMemo` + class merge) in `packages/solid`, with full exports and build verification.

> **Deliverables**:
>
> - `packages/core/src/recipes/popover.ts` — Popover variant recipe (10 slots)
> - `packages/core/src/recipes/slider.ts` — Slider variant recipe (10 slots)
> - `packages/solid/src/popover.tsx` — Popover component wrapper (10 sub-components)
> - `packages/solid/src/slider.tsx` — Slider component wrapper (10 sub-components)
> - Config updates: `tsup.config.ts`, `package.json` exports, `index.ts` exports (both packages)

> **Estimated Effort**: Quick (2 components, well-established patterns)
> **Parallel Execution**: YES — 3 waves
> **Critical Path**: Core recipes → Solid wrappers → Exports → Build verify

---

## Context

### Original Request

User asked to check `COMPONENT_TODOS.md` and create "a few components" — selected **popover** and **slider** from the High Priority list.

### Interview Summary

**Key Discussions**:

- **Components**: Popover (floating card, click-triggered) + Slider (range slider)
- **Testing**: No tests needed (no test infra exists)
- **Styling**: Match existing shadcn-like patterns (same design tokens, no new variants)
- **Scope**: Just these 2 components — no backdrop for popover, horizontal-only for slider v1, no hover trigger

### Metis Review

**Identified Gaps** (addressed):

- **Edge cases**: Popover viewport overflow handled by Ark, slider `disabled` state via tv slot classes
- **Guardrails**: No tests, no new dependencies, no orientation variants for slider v1, single arrow style for popover
- **Assumptions validated**: Ark UI slot names confirmed via examples, Portal pattern matches dialog/select

### Research Findings

- Ark UI Popover slots: Root, Trigger, Positioner, Content, Title, Description, CloseTrigger, Arrow, ArrowTip, Indicator, Anchor
- Ark UI Slider slots: Root, Label, ValueText, Control, Track, Range, Thumb, HiddenInput, DraggingIndicator, MarkerGroup, Marker
- Both follow same Portal/Positioner pattern as existing Dialog and Select

---

## Work Objectives

### Core Objective

Build Popover and Slider components matching the exact patterns of existing 12 components.

### Concrete Deliverables

- 2 core recipes → `packages/core/src/recipes/popover.ts`, `slider.ts`
- 2 solid wrappers → `packages/solid/src/popover.tsx`, `slider.tsx`
- Updated `tsup.config.ts`, `package.json`, `index.ts` for both packages

### Definition of Done

- [ ] `moon run core:build` and `moon run solid:build` pass with no errors
- [ ] `moon run solid:typecheck` passes with no errors
- [ ] All sub-components exported and importable from `@ui/solid`
- [ ] Recipe exports importable from `@ui/core` and `@ui/core/recipes/popover`, `@ui/core/recipes/slider`

### Must Have

- Popover: Root, Trigger, Positioner, Content, Title, Description, CloseTrigger, Arrow, ArrowTip, Indicator
- Slider: Root, Label, ValueText, Control, Track, Range, Thumb, HiddenInput
- Slider extras: DraggingIndicator, MarkerGroup, Marker (if Ark UI supports)
- Match existing splitProps → createMemo → class merge pattern exactly
- All components use `@ui/core` variants for styling

### Must NOT Have (Guardrails)

- No test files or test infrastructure
- No new dependencies beyond `@ark-ui/solid`, `solid-js`, `@ui/core`
- No popover backdrop/overlay (dialog is the modal pattern)
- No popover hover trigger (`openOnHover`) — click-only for v1
- No slider vertical orientation support for v1
- No new variant dimensions (sizes/themes) beyond defaults
- No changes to existing component structure or exports

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed.
> No test infrastructure exists; verification via build + typecheck + browser QA.

### Test Decision

- **Infrastructure exists**: NO
- **Automated tests**: None (user opted out)
- **QA**: Agent-executed verification via ark docs / browser interaction

### QA Policy

Every task includes agent-executed QA scenarios:

- **Build verification**: `moon run core:build && moon run solid:build`
- **Type verification**: `moon run solid:typecheck`
- **Export verification**: Check each named export is present in compiled output/index
- **Browser QA (if needed)**: Launch docs app and validate UI interaction

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — recipes + config, MAX PARALLEL):
├── Task 1: Core recipe — popover.ts [quick]
├── Task 2: Core recipe — slider.ts [quick]
└── Task 3: Core config updates (tsup entries, package.json exports) [quick]

Wave 2 (After Wave 1 — solid wrappers, MAX PARALLEL):
├── Task 4: Solid wrapper — popover.tsx [quick]
└── Task 5: Solid wrapper — slider.tsx [quick]

Wave 3 (After Waves 1+2 — exports):
├── Task 6: Core index.ts — export variants + types [quick]
└── Task 7: Solid index.ts — export components [quick]

Wave FINAL (Build verification):
└── Task 8: Build + typecheck + QA verification [quick]
```

---

## TODOs

- [x] 1. Core recipe — popover.ts

  **What to do**:
  - Create `packages/core/src/recipes/popover.ts` using `tv()` with slots
  - Slots needed: `root`, `trigger`, `positioner`, `content`, `title`, `description`, `closeTrigger`, `arrow`, `arrowTip`, `indicator`
  - Follow exact same TV pattern as `dialog.ts` and `tooltip.ts` — same shadcn design tokens (`border`, `background`, `popover-foreground`, etc.)
  - Content slot should have animation classes: `data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95`
  - Positioner should have `z-50` for stacking context
  - CloseTrigger should have absolute positioning like dialog's closeTrigger
  - Export `popoverVariants` and `PopoverVariants` type

  **Must NOT do**:
  - No backdrop/overlay (dialog is for modals)
  - No variant dimensions (size/color variants) — single default style
  - Don't modify existing recipe files

  **Recommended Agent Profile**:
  - **Category**: `quick` — Single file, well-established pattern (copy dialog.ts + tooltip.ts)
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: Task 4 (popover.tsx), Task 6 (core index exports)
  - **Blocked By**: None

  **References**:
  - `packages/core/src/recipes/dialog.ts` — Closest pattern (floating panel with Portal). Copy backdrop→positioner→content structure, closeTrigger pattern
  - `packages/core/src/recipes/tooltip.ts` — Simpler floating pattern. Copy arrow/arrowTip styling
  - `packages/core/src/recipes/select.ts` — Item-based pattern for content/positioner if needed
  - `packages/core/src/tv.ts` — Shared tv() factory to import from

  **Acceptance Criteria**:
  - [ ] `packages/core/src/recipes/popover.ts` exists
  - [ ] `popoverVariants` is a tv call with 10+ slots
  - [ ] All slots have appropriate Tailwind classes using `bg-popover`, `text-popover-foreground`, `border` tokens

  **QA Scenarios**:

  ```
  Scenario: Recipe file exists and has correct structure
    Tool: Bash
    Preconditions: None
    Steps:
      1. cat packages/core/src/recipes/popover.ts | grep -c "export const popoverVariants"
      2. cat packages/core/src/recipes/popover.ts | grep -c "slots:"
      3. cat packages/core/src/recipes/popover.ts | grep -c "content:"
    Expected Result: All grep counts >= 1
    Evidence: .sisyphus/evidence/task-1-recipe-exists.txt

  Scenario: Recipe imports from correct tv factory
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep "from '../tv'" packages/core/src/recipes/popover.ts
    Expected Result: Matches — uses shared tv instance
    Evidence: .sisyphus/evidence/task-1-recipe-import.txt
  ```

  **Evidence to Capture**:
  - [ ] Recipe file contents snapshot

  **Commit**: YES (groups with 2, 3)
  - Message: `feat(core): add popover and slider recipes`
  - Files: `packages/core/src/recipes/popover.ts`

---

- [x] 2. Core recipe — slider.ts

  **What to do**:
  - Create `packages/core/src/recipes/slider.ts` using `tv()` with slots
  - Slots needed: `root`, `label`, `valueText`, `control`, `track`, `range`, `thumb`, `markerGroup`, `marker`, `draggingIndicator`
  - Root: flex col gap, `w-full`
  - Track: `h-1.5 w-full rounded-full bg-muted overflow-hidden` (or `bg-secondary`)
  - Range: `h-full rounded-full bg-primary`
  - Thumb: `size-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`
  - Label: `text-sm font-medium` (same as input/select labels)
  - Control: `relative flex items-center w-full h-5`
  - Marker: `text-xs text-muted-foreground`
  - Include `disabled` variant styling on thumb slot
  - Export `sliderVariants` and `SliderVariants` type

  **Must NOT do**:
  - No vertical orientation styling for v1 (horizontal only)
  - No variant dimensions beyond defaults
  - Don't modify existing recipe files

  **Recommended Agent Profile**:
  - **Category**: `quick` — Single file, well-established pattern
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3)
  - **Blocks**: Task 5 (slider.tsx), Task 6 (core index exports)
  - **Blocked By**: None

  **References**:
  - `packages/core/src/recipes/input.ts` — Label and description pattern. Same label styling
  - `packages/core/src/recipes/select.ts` — Control/focus-within pattern
  - `packages/core/src/tv.ts` — Shared tv() factory

  **Acceptance Criteria**:
  - [ ] `packages/core/src/recipes/slider.ts` exists
  - [ ] `sliderVariants` is a tv call with 10+ slots
  - [ ] All slots reference existing shadcn tokens (`bg-primary`, `bg-muted`, `border-primary`, etc.)

  **QA Scenarios**:

  ```
  Scenario: Recipe file exists and has correct structure
    Tool: Bash
    Preconditions: None
    Steps:
      1. cat packages/core/src/recipes/slider.ts | grep -c "export const sliderVariants"
      2. cat packages/core/src/recipes/slider.ts | grep -c "slots:"
      3. cat packages/core/src/recipes/slider.ts | grep -c "thumb:"
    Expected Result: All grep counts >= 1
    Evidence: .sisyphus/evidence/task-2-recipe-exists.txt

  Scenario: Recipe has disabled styling
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c "disabled" packages/core/src/recipes/slider.ts
    Expected Result: >= 1 (thumb slot has disabled styling)
    Evidence: .sisyphus/evidence/task-2-recipe-disabled.txt
  ```

  **Evidence to Capture**:
  - [ ] Recipe file contents snapshot

  **Commit**: YES (groups with 1, 3)
  - Message: `feat(core): add popover and slider recipes`
  - Files: `packages/core/src/recipes/slider.ts`

---

- [x] 3. Core config updates

  **What to do**:
  - Update `packages/core/tsup.config.ts` — add `'src/recipes/popover.ts'` and `'src/recipes/slider.ts'` to the `entry` array
  - Update `packages/core/package.json` — add `"./recipes/popover"` and `"./recipes/slider"` export entries (follow same format as existing recipe exports)
  - Verify format matches existing entries exactly (same CJS/ESM pattern)

  **Must NOT do**:
  - Don't change existing entries — only append new ones
  - Don't change format/structure of existing config

  **Recommended Agent Profile**:
  - **Category**: `quick` — Simple config edits
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2)
  - **Blocks**: Task 6 (core exports), Task 8 (build)
  - **Blocked By**: None

  **References**:
  - `packages/core/tsup.config.ts:4` — Existing entry list. Add popover and slider to array
  - `packages/core/package.json:16-30` — Existing recipe exports format. Copy for new entries

  **Acceptance Criteria**:
  - [ ] `tsup.config.ts` has 15 entries (13 existing + 2 new)
  - [ ] `package.json` has 2 new recipe export entries matching existing format

  **QA Scenarios**:

  ```
  Scenario: tsup entries added correctly
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c "recipes/popover" packages/core/tsup.config.ts
      2. grep -c "recipes/slider" packages/core/tsup.config.ts
    Expected Result: Both == 1
    Evidence: .sisyphus/evidence/task-3-tsup-entries.txt

  Scenario: package.json exports added correctly
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c "recipes/popover" packages/core/package.json
      2. grep -c "recipes/slider" packages/core/package.json
    Expected Result: Both >= 1
    Evidence: .sisyphus/evidence/task-3-pkg-exports.txt
  ```

  **Evidence to Capture**:
  - [ ] Diff of tsup.config.ts
  - [ ] Diff of package.json

  **Commit**: YES (groups with 1, 2)
  - Message: `feat(core): add popover and slider recipes`
  - Files: `packages/core/tsup.config.ts`, `packages/core/package.json`

- [x] 4. Solid wrapper — popover.tsx

  **What to do**:
  - Create `packages/solid/src/popover.tsx` wrapping `@ark-ui/solid/popover`
  - Import `{ Popover as ArkPopover }` from `'@ark-ui/solid/popover'`
  - Import `{ Portal }` from `'solid-js/web'`
  - Import `{ createMemo, splitProps, type Component, type JSX }` from `'solid-js'`
  - Import `{ popoverVariants }` from `'@ui/core'`
  - Create these sub-components following the exact pattern from existing code:

  **PopoverRoot** — Re-export `ArkPopover.Root` directly (like `DialogRoot`)
  **PopoverTrigger** — `splitProps(props, ['class'])` → `createMemo(() => styles.trigger({ class: local.class }))` → `<ArkPopover.Trigger class={triggerClass()} {...others} />`
  **PopoverPositioner** — Same pattern, `styles.positioner()`
  **PopoverContent** — Same pattern with Portal wrapper (like DialogContent):

  ```
  <Portal>
    <ArkPopover.Positioner class={positionerClass()}>
      <ArkPopover.Content class={contentClass()} {...others}>
        {local.children}
      </ArkPopover.Content>
    </ArkPopover.Positioner>
  </Portal>
  ```

  **PopoverTitle** — `styles.title()` (like DialogTitle)
  **PopoverDescription** — `styles.description()` (like DialogDescription)
  **PopoverCloseTrigger** — `styles.closeTrigger()`, include X SVG icon (same as dialog)
  **PopoverArrow** — `styles.arrow()`
  **PopoverArrowTip** — `styles.arrowTip()`
  **PopoverIndicator** — `styles.indicator()`, include chevron-down SVG icon
  - Static variants (no reactive props) → call `popoverVariants()` directly, no createMemo needed for the base styles object. Only slot class merging needs createMemo.
  - Export all sub-components and `popoverVariants`
  - PopoverRoot should be re-exported as `PopoverRoot` (not renamed)

  **Must NOT do**:
  - No backdrop slot (dialog has it, popover doesn't)
  - No hover trigger configuration
  - Don't modify existing component files

  **Recommended Agent Profile**:
  - **Category**: `quick` — Well-established pattern, directly analogous to dialog.tsx
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 5)
  - **Blocks**: Task 7 (solid index exports)
  - **Blocked By**: Task 1 (popover recipe), Task 3 (core config)

  **References** (CRITICAL - Be Exhaustive):
  - `packages/solid/src/dialog.tsx:1-56` — PRIMARY reference. Exact pattern for Portal/Popover. Follow: import structure, Portal wrapper, splitProps, createMemo for class merge, CloseTrigger with SVG
  - `packages/solid/src/tooltip.tsx:1-42` — Secondary reference. Arrow/ArrowTip pattern
  - `packages/core/src/recipes/popover.ts` — The recipe just created (consumes these variants)

  **Acceptance Criteria**:
  - [ ] `packages/solid/src/popover.tsx` exists
  - [ ] File exports exactly these 10 items: PopoverRoot, PopoverTrigger, PopoverPositioner, PopoverContent, PopoverTitle, PopoverDescription, PopoverCloseTrigger, PopoverArrow, PopoverArrowTip, PopoverIndicator, popoverVariants
  - [ ] Content wrapped in Portal (like dialog)
  - [ ] All slots use proper class merging pattern

  **QA Scenarios**:

  ```
  Scenario: Popover file exists with all exports
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c "export " packages/solid/src/popover.tsx | head -1
    Expected Result: >= 10 export statements
    Evidence: .sisyphus/evidence/task-4-popover-exports.txt

  Scenario: Portal import exists
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep "Portal" packages/solid/src/popover.tsx
    Expected Result: Import of Portal exists and usage in Content
    Evidence: .sisyphus/evidence/task-4-popover-portal.txt

  Scenario: Uses splitProps + createMemo pattern
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c "splitProps" packages/solid/src/popover.tsx
      2. grep -c "createMemo" packages/solid/src/popover.tsx
    Expected Result: Both >= 1
    Evidence: .sisyphus/evidence/task-4-popover-pattern.txt
  ```

  **Evidence to Capture**:
  - [ ] File contents

  **Commit**: YES (groups with 5)
  - Message: `feat(solid): add Popover and Slider components`
  - Files: `packages/solid/src/popover.tsx`

---

- [x] 5. Solid wrapper — slider.tsx

  **What to do**:
  - Create `packages/solid/src/slider.tsx` wrapping `@ark-ui/solid/slider`
  - Import `{ Slider as ArkSlider }` from `'@ark-ui/solid/slider'`
  - Import `{ createMemo, splitProps, type Component, type JSX }` from `'solid-js'`
  - Import `{ sliderVariants }` from `'@ui/core'`
  - Create these sub-components:

  **SliderRoot** — `splitProps(props, ['class'])` → `createMemo(() => styles.root({ class: local.class }))` → `<ArkSlider.Root class={rootClass()} {...others} />`
  **SliderLabel** — `styles.label()` → `<ArkSlider.Label class={styles.label()} {...props} />`
  **SliderValueText** — `styles.valueText()` → `<ArkSlider.ValueText class={styles.valueText()} {...props} />`
  **SliderControl** — `styles.control()` → `<ArkSlider.Control class={controlClass()} {...others}>{local.children}</ArkSlider.Control>`
  **SliderTrack** — `styles.track()` → `<ArkSlider.Track class={styles.track()} {...others}>{local.children}</ArkSlider.Track>`
  **SliderRange** — `styles.range()` → `<ArkSlider.Range class={styles.range()} {...others} />`
  **SliderThumb** — `styles.thumb()` + index prop → `<ArkSlider.Thumb class={thumbClass()} {...others}>{local.children}</ArkSlider.Thumb>`
  **SliderHiddenInput** — Direct: `<ArkSlider.HiddenInput {...props} />` (no styling needed)
  **SliderDraggingIndicator** — `styles.draggingIndicator()`
  **SliderMarkerGroup** — `styles.markerGroup()`
  **SliderMarker** — `styles.marker()` with value prop
  - The basic usage creates Root wrapping: Label + ValueText in a flex row, Control wrapping Track > Range + Thumb
  - Static variants → call `sliderVariants()` directly
  - Export all sub-components and `sliderVariants`
  - Include SVG icons where appropriate (chevron for indicator if applicable)

  **Must NOT do**:
  - No vertical orientation support
  - Don't modify existing component files

  **Recommended Agent Profile**:
  - **Category**: `quick` — Single file, established pattern
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 4)
  - **Blocks**: Task 7 (solid index exports)
  - **Blocked By**: Task 2 (slider recipe), Task 3 (core config)

  **References**:
  - `packages/solid/src/select.tsx:1-91` — Pattern for composite components with multiple sub-exports (Item, ValueText, etc.)
  - `packages/solid/src/input.tsx:1-28` — Pattern for Label usage
  - `packages/solid/src/switch.tsx` — Pattern for Track/Range/Thumb if exists, or use general pattern from checkbox
  - `packages/core/src/recipes/slider.ts` — The recipe just created

  **Acceptance Criteria**:
  - [ ] `packages/solid/src/slider.tsx` exists
  - [ ] File exports: SliderRoot, SliderLabel, SliderValueText, SliderControl, SliderTrack, SliderRange, SliderThumb, SliderHiddenInput, SliderDraggingIndicator, SliderMarkerGroup, SliderMarker, sliderVariants
  - [ ] Thumb has `index` prop forwarded to ArkSlider.Thumb
  - [ ] Marker has `value` prop forwarded to ArkSlider.Marker

  **QA Scenarios**:

  ```
  Scenario: Slider file exists with all exports
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c "export " packages/solid/src/slider.tsx
    Expected Result: >= 12 export statements
    Evidence: .sisyphus/evidence/task-5-slider-exists.txt

  Scenario: Uses splitProps + createMemo pattern
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c "splitProps" packages/solid/src/slider.tsx
      2. grep -c "createMemo" packages/solid/src/slider.tsx
    Expected Result: Both >= 1
    Evidence: .sisyphus/evidence/task-5-slider-pattern.txt

  Scenario: Thumb component has index prop
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep "SliderThumb" packages/solid/src/slider.tsx | head -5
    Expected Result: Shows index prop for Thumb
    Evidence: .sisyphus/evidence/task-5-slider-thumb.txt
  ```

  **Evidence to Capture**:
  - [ ] File contents

  **Commit**: YES (groups with 4)
  - Message: `feat(solid): add Popover and Slider components`
  - Files: `packages/solid/src/slider.tsx`

---

- [x] 6. Core index.ts — export variants

  **What to do**:
  - Add to `packages/core/src/index.ts`:
    ```ts
    export { popoverVariants } from "./recipes/popover";
    export type { PopoverVariants } from "./recipes/popover";
    export { sliderVariants } from "./recipes/slider";
    export type { SliderVariants } from "./recipes/slider";
    ```
  - Place after existing recipe exports (alphabetical order — after `inputVariants`, before `selectVariants`)

  **Must NOT do**:
  - Don't remove or modify existing exports

  **Recommended Agent Profile**:
  - **Category**: `quick` — Simple append to index
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: NO (sequential)
  - **Parallel Group**: Sequential (after Tasks 1, 2)
  - **Blocked By**: Tasks 1, 2 (recipes must exist)

  **References**:
  - `packages/core/src/index.ts:1-39` — Exact format to follow. Each export section has: variant export + type export

  **Acceptance Criteria**:
  - [ ] 2 new variant exports + 2 new type exports in core index
  - [ ] No duplicate import errors

  **QA Scenarios**:

  ```
  Scenario: Core index exports both new variants
    Tool: Bash
    Preconditions: Tasks 1, 2 complete
    Steps:
      1. grep -c "popoverVariants" packages/core/src/index.ts
      2. grep -c "sliderVariants" packages/core/src/index.ts
      3. grep -c "PopoverVariants" packages/core/src/index.ts
      4. grep -c "SliderVariants" packages/core/src/index.ts
    Expected Result: All >= 1
    Evidence: .sisyphus/evidence/task-6-core-exports.txt
  ```

  **Evidence to Capture**:
  - [ ] Diff of index.ts

  **Commit**: YES (groups with 7)
  - Message: `feat: export new components from index`
  - Files: `packages/core/src/index.ts`

---

- [x] 7. Solid index.ts — export components

  **What to do**:
  - Add to `packages/solid/src/index.ts`:

    ```ts
    export {
      PopoverRoot,
      PopoverTrigger,
      PopoverPositioner,
      PopoverContent,
      PopoverTitle,
      PopoverDescription,
      PopoverCloseTrigger,
      PopoverArrow,
      PopoverArrowTip,
      PopoverIndicator,
      popoverVariants,
    } from "./popover";

    export {
      SliderRoot,
      SliderLabel,
      SliderValueText,
      SliderControl,
      SliderTrack,
      SliderRange,
      SliderThumb,
      SliderHiddenInput,
      SliderDraggingIndicator,
      SliderMarkerGroup,
      SliderMarker,
      sliderVariants,
    } from "./slider";
    ```

  - Place after existing exports (after `datePickerVariants` closing line, before EOF)

  **Must NOT do**:
  - Don't remove or modify existing exports

  **Recommended Agent Profile**:
  - **Category**: `quick` — Simple append to index
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: NO (sequential)
  - **Parallel Group**: Sequential (after Tasks 4, 5)
  - **Blocked By**: Tasks 4, 5 (solid wrappers must exist)

  **References**:
  - `packages/solid/src/index.ts` — Existing export format to follow exactly

  **Acceptance Criteria**:
  - [ ] 21 new named export symbols in solid index (10 from popover + 11 from slider)
  - [ ] No lint errors from unused exports

  **QA Scenarios**:

  ```
  Scenario: Solid index exports popover components
    Tool: Bash
    Preconditions: Tasks 4 complete
    Steps:
      1. grep -c "Popover" packages/solid/src/index.ts
      2. grep -c "popoverVariants" packages/solid/src/index.ts
    Expected Result: Popover >= 10, popoverVariants == 1
    Evidence: .sisyphus/evidence/task-7-solid-exports.txt

  Scenario: Solid index exports slider components
    Tool: Bash
    Preconditions: Tasks 5 complete
    Steps:
      1. grep -c "Slider" packages/solid/src/index.ts
      2. grep -c "sliderVariants" packages/solid/src/index.ts
    Expected Result: Slider >= 11, sliderVariants == 1
    Evidence: .sisyphus/evidence/task-7-slider-exports.txt
  ```

  **Evidence to Capture**:
  - [ ] Diff of index.ts

  **Commit**: YES (groups with 6)
  - Message: `feat: export new components from index`
  - Files: `packages/solid/src/index.ts`

---

- [x] 8. Build + typecheck verification

  **What to do**:
  - Run `moon run core:build` and verify exit code 0
  - Run `moon run solid:build` and verify exit code 0
  - Run `moon run solid:typecheck` and verify exit code 0
  - If any fail, diagnose and fix
  - Update `COMPONENT_TODOS.md` — mark popover and slider as ✅ Done (add to implemented table)

  **Must NOT do**:
  - Don't skip any build step if it fails — fix issues before proceeding
  - Don't modify files outside scope

  **Recommended Agent Profile**:
  - **Category**: `quick` — Build verification
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: NO (sequential, must build)
  - **Parallel Group**: Sequential (after all tasks)
  - **Blocked By**: Tasks 1-7

  **References**:
  - `COMPONENT_TODOS.md` — Update to reflect new components

  **Acceptance Criteria**:
  - [ ] `moon run core:build` → exit 0
  - [ ] `moon run solid:build` → exit 0
  - [ ] `moon run solid:typecheck` → exit 0
  - [ ] COMPONENT_TODOS.md updated with popover + slider as done

  **QA Scenarios**:

  ```
  Scenario: Core builds successfully
    Tool: Bash
    Preconditions: All tasks complete
    Steps:
      1. moon run core:build
    Expected Result: Exit code 0, dist/ updated with popover/slider recipes
    Evidence: .sisyphus/evidence/task-8-core-build.txt

  Scenario: Solid builds successfully
    Tool: Bash
    Preconditions: Core build succeeded
    Steps:
      1. moon run solid:build
    Expected Result: Exit code 0, dist/ updated
    Evidence: .sisyphus/evidence/task-8-solid-build.txt

  Scenario: Typecheck passes
    Tool: Bash
    Preconditions: Build succeeded
    Steps:
      1. moon run solid:typecheck
    Expected Result: Exit code 0, no type errors
    Evidence: .sisyphus/evidence/task-8-typecheck.txt

  Scenario: COMPONENT_TODOS.md updated
    Tool: Bash
    Preconditions: Build passed
    Steps:
      1. grep "popover" COMPONENT_TODOS.md | head -1
      2. grep "slider" COMPONENT_TODOS.md | head -1
    Expected Result: Both marked as done [x]
    Evidence: .sisyphus/evidence/task-8-todos-updated.txt
  ```

  **Evidence to Capture**:
  - [ ] Build output logs
  - [ ] Typecheck output
  - [ ] Updated COMPONENT_TODOS.md section

  **Commit**: YES (alone)
  - Message: `chore: verify build for popover and slider`
  - Files: `COMPONENT_TODOS.md`
  - Pre-commit: `moon run core:build && moon run solid:build && moon run solid:typecheck`

---

- [x] F1. **Plan Compliance Audit** — `oracle`
      Read plan end-to-end. Verify all 10 Popover + 10 Slider subcomponents exist. Check guardrails: no tests created, no new deps, no popover backdrop, no vertical slider. Check evidence files.
      Output: `Must Have [10/10 popover + 11/11 slider verified] | Must NOT Have [4/4 guardrails] | Tasks [8/8] | VERDICT: APPROVE`

- [x] F2. **Code Quality Review** — `unspecified-high`
      Run `moon run core:build && moon run solid:build && moon run solid:typecheck`. Review all changed files for: `as any`, empty catches, `console.log`, unused imports. Check AI slop: over-commented code, over-abstraction.
      Output: `Build [PASS] | Typecheck [PASS] | Files [8 clean/0 issues] | VERDICT: APPROVE`

- [x] F3. **Real Manual QA** — `unspecified-high`
      Start from clean state. Verify each component can be imported and used. Check cross-task integration (components build together). Verify COMPONENT_TODOS.md reflects new components.
      Output: `Components [2/2 verified] | Exports [23/23] | Build [PASS] | VERDICT: APPROVE`

- [x] F4. **Scope Fidelity Check** — `deep`
      For each task: read "What to do", read actual diff. Verify 1:1 compliance — nothing missing, nothing beyond scope. Check "Must NOT do" for forbidden patterns. Detect cross-contamination.
      Output: `Tasks [8/8 compliant] | Contamination [CLEAN] | Unaccounted [CLEAN] | VERDICT: APPROVE`

---

## Commit Strategy

- **1-3**: `feat(core): add popover and slider recipes`
- **4-5**: `feat(solid): add Popover and Slider components`
- **6-7**: `feat: export new components from index`
- **8**: `chore: verify build`

---

## Success Criteria

### Verification Commands

```bash
moon run core:build           # Expected: exit 0, dist/ updated
moon run solid:build          # Expected: exit 0, dist/ updated
moon run solid:typecheck      # Expected: exit 0, no type errors
ls packages/solid/src/popover.tsx  # Expected: file exists
ls packages/solid/src/slider.tsx   # Expected: file exists
ls packages/core/src/recipes/popover.ts  # Expected: file exists
ls packages/core/src/recipes/slider.ts   # Expected: file exists
```

### Final Checklist

- [ ] All 2 components built and exported
- [ ] Core recipes importable from `@ui/core`
- [ ] Solid components importable from `@ui/solid`
- [ ] Build + typecheck pass
- [ ] All guardrails respected
