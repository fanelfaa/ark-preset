# Plan: Solid.js Components Wave 2 — Collapsible, Drawer, Menu + Docs Updates

## TL;DR

> **Quick Summary**: Implement 3 new Solid.js components (Collapsible, Drawer, Menu) following established patterns — core recipe in `packages/core`, Solid wrapper in `packages/solid`, plus add docs demos for these 3 and 3 existing missing components (Popover, Slider, NumberInput).
>
> **Deliverables**:
>
> - 3 core recipes: `collapsible.ts`, `drawer.ts`, `menu.ts`
> - 3 Solid wrappers: `collapsible.tsx`, `drawer.tsx`, `menu.tsx`
> - 6 new documentation sections in `apps/docs/src/App.tsx`
> - Updated configs: tsup.config.ts, package.json exports, index.ts exports (both packages)
>
> **Estimated Effort**: Short (3 components, well-established patterns)
> **Parallel Execution**: YES — 4 waves + 1 final verification wave
> **Critical Path**: Core recipes → Solid wrappers → Exports → Docs → Build verify

---

## Context

### Original Request

User asked to "pick 3 solid component again and work with that, dont forget to adjust the docs" — repeat the workflow from the previous `new-components.md` plan that created Popover + Slider.

### Interview Summary

**Key Discussions**:

- **Components (chosen)**: **Collapsible** (4 sub-components, simplest), **Drawer** (10 sub-components, dialog-like), **Menu** (15+ sub-components, most complex)
- **Drawer scope**: Full — Root, Trigger, Backdrop, Positioner, Content, Title, Description, CloseTrigger, Grabber, GrabberIndicator
- **Menu scope**: Full — Root, Trigger, Indicator, Positioner, Content, Item, ItemText, ItemIndicator, Arrow, ArrowTip, Separator, ContextTrigger, TriggerItem, CheckboxItem, RadioItem, RadioItemGroup, ItemGroup, ItemGroupLabel
- **Docs scope**: All 6 — 3 new component demos + 3 existing missing (Popover, Slider, NumberInput already built but never added to App.tsx)
- **Testing**: No test infrastructure. Agent-verified QA scenarios (build + export + browser interaction)
- **Guardrails**: No React wrappers, no new deps, no refactoring existing code, no custom style variants

**Research Findings**:

- Ark UI Collapsible: Root, Trigger, Content, Indicator — CSS vars `--height`, `--width` for animations
- Ark UI Drawer: Root, Trigger, Backdrop, Positioner, Content, Title, Description, CloseTrigger, Grabber, GrabberIndicator, IndentBackground — supports snap points, swipe directions
- Ark UI Menu: Root, Trigger, Indicator, Positioner, Content, Arrow, ArrowTip, Item, ItemText, ItemIndicator, Separator, ContextTrigger, TriggerItem, CheckboxItem, RadioItem, RadioItemGroup, ItemGroup, ItemGroupLabel — nested menus, typeahead
- All solid wrappers use `splitProps` + `createMemo` + class merge pattern (verified in Button, Dialog, Popover, Select)
- Popover, Slider, NumberInput already exported from `@ui/solid` index.ts (verified)

### Metis Review

**Identified Gaps** (addressed):

- **Scope boundaries**: Added explicit IN/OUT scope with guardrails (no React, no new deps, no existing code refactoring)
- **Menu complexity**: Defined exact sub-component list (15 items)
- **TypeScript verification**: Added to acceptance criteria
- **Verification**: Confirm exports of Popover/Slider/NumberInput before docs work

---

## Work Objectives

### Core Objective

Implement Collapsible, Drawer, Menu Solid.js components (core recipes + wrappers + exports) and add documentation demos for all 6 components including existing Popover, Slider, NumberInput.

### Concrete Deliverables

- `packages/core/src/recipes/collapsible.ts` — Collapsible tv() recipe (4 slots)
- `packages/core/src/recipes/drawer.ts` — Drawer tv() recipe (10 slots)
- `packages/core/src/recipes/menu.ts` — Menu tv() recipe (15+ slots)
- `packages/solid/src/collapsible.tsx` — Collapsible Solid wrapper (4 sub-components)
- `packages/solid/src/drawer.tsx` — Drawer Solid wrapper (10 sub-components)
- `packages/solid/src/menu.tsx` — Menu Solid wrapper (15+ sub-components)
- `apps/docs/src/App.tsx` — 6 new sections: Collapsible, Drawer, Menu, Popover, Slider, NumberInput
- Updated configs: tsup.config.ts, package.json, index.ts (both core + solid)
- Updated `COMPONENT_TODOS.md`
- Agent evidence: `.sisyphus/evidence/`

### Definition of Done

- [ ] `moon run core:build && moon run solid:build` → exit 0
- [ ] `moon run solid:typecheck` → exit 0
- [ ] All 3 new recipes importable from `@ui/core`
- [ ] All 3 new component sets importable from `@ui/solid`
- [ ] Docs site runs without errors (`pnpm dev`) with 6 new sections rendering
- [ ] All 6 component sections visible and interactive in docs browser demo

### Must Have

- **Collapsible**: Root, Trigger, Content, Indicator
- **Drawer**: Root, Trigger, Backdrop, Positioner, Content, Title, Description, CloseTrigger, Grabber, GrabberIndicator
- **Menu**: Root, Trigger, Indicator, Positioner, Content, Arrow, ArrowTip, Item, ItemText, ItemIndicator, Separator, ContextTrigger, TriggerItem, CheckboxItem, RadioItem, RadioItemGroup, ItemGroup, ItemGroupLabel
- Existing pattern: `splitProps` → `createMemo` → class merge for each sub-component
- All use `@ui/core` variants for styling
- Docs: Import component + render basic interactive demo (like existing Pattern)

### Must NOT Have (Guardrails)

- No React wrappers (Solid-only)
- No test infrastructure setup or unit tests
- No new dependencies — only `@ark-ui/solid`, `solid-js`, `@ui/core`, `tailwind-variants`
- No refactoring of existing components or config files (only append)
- No custom variant dimensions (sizes/themes) — use default styling only
- No nested sub-menu styling gymnastics — Ark UI defaults
- No custom Drawer swipe/snap-point config — Ark UI defaults
- No animation customization — use Ark UI data-attributes/CSS vars only
- No moonrepo/moon configuration changes

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed.
> No test infrastructure exists; verification via build + typecheck + browser QA.

### Test Decision

- **Infrastructure exists**: NO
- **Automated tests**: None (skip — consistent with existing pattern)
- **Agent-Executed QA**: ALWAYS — build verification, export checking, browser interaction

### QA Policy

Every task includes agent-executed QA scenarios. Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Build verification**: `moon run core:build && moon run solid:build`
- **Type verification**: `moon run solid:typecheck`
- **Export verification**: Check each named export present in compiled output/index
- **Browser QA**: Run docs app via `pnpm dev`, verify each component section renders interactively

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — recipes + existing docs, MAX PARALLEL):
├── Task 1: Core recipe — collapsible.ts [quick]
├── Task 2: Core recipe — drawer.ts [quick]
├── Task 3: Core recipe — menu.ts [quick]
├── Task 4: Core config updates (tsup + package.json) [quick]
├── Task 10: Docs — add Popover section (existing component) [quick]
├── Task 11: Docs — add Slider section (existing component) [quick]
└── Task 12: Docs — add NumberInput section (existing component) [quick]

Wave 2 (After Wave 1 — solid wrappers, MAX PARALLEL):
├── Task 5: Solid wrapper — collapsible.tsx [quick]
├── Task 6: Solid wrapper — drawer.tsx [quick]
└── Task 7: Solid wrapper — menu.tsx [unspecified-high]

Wave 3 (After Wave 2 — exports):
├── Task 8: Core index.ts — export 3 new variants [quick]
└── Task 9: Solid index.ts — export 3 new component sets [quick]

Wave 4 (After Wave 3 — new doc sections + build verify):
├── Task 13: Docs — add Collapsible section [quick]
├── Task 14: Docs — add Drawer section [quick]
├── Task 15: Docs — add Menu section [quick]
└── Task 16: Build + typecheck verification [quick]

Wave FINAL (After ALL tasks — 4 parallel reviews, then user okay):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high + playwright)
└── Task F4: Scope fidelity check (deep)
```

### Dependency Matrix

- **T1-T4**: None (Wave 1 — start immediately)
- **T5**: Blocks: T1, T4 (needs collapsible recipe + core config)
- **T6**: Blocks: T2, T4 (needs drawer recipe + core config)
- **T7**: Blocks: T3, T4 (needs menu recipe + core config)
- **T8**: Blocks: T1, T2, T3, T4 (needs all recipes + config)
- **T9**: Blocks: T5, T6, T7 (needs all solid wrappers)
- **T10-12**: None (Wave 1 — existing components, no deps)
- **T13-15**: Blocks: T9, T10-12 (needs exports + existing docs imports set up)
- **T16**: Blocks: T8, T9, T13-15 (needs everything)
- **F1-F4**: Blocks: T16 (needs build verification)

### Agent Dispatch Summary

- **Wave 1**: 7 tasks — T1-T4 → `quick`, T10-T12 → `quick`
- **Wave 2**: 3 tasks — T5-T6 → `quick`, T7 → `unspecified-high`
- **Wave 3**: 2 tasks — T8-T9 → `quick`
- **Wave 4**: 4 tasks — T13-T15 → `quick`, T16 → `quick`
- **FINAL**: 4 agents — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high + playwright`, F4 → `deep`

---

## TODOs

- [x] 1. Core recipe — collapsible.ts

  **What to do**:
  - Create `packages/core/src/recipes/collapsible.ts` using `tv()` with slots
  - Slots needed: `root`, `trigger`, `content`, `indicator`
  - Follow exact same TV pattern as other recipes — same shadcn design tokens
  - Root: `flex flex-col gap-2 w-full`
  - Trigger: `flex items-center justify-between gap-3 w-full p-2.5 text-sm font-medium border rounded-lg bg-transparent cursor-pointer hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring` with `data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed`
  - Content: Animate with CSS — `data-[state=open]:animate-in data-[state=closed]:animate-out` (Ark UI provides `--height`/`--width` CSS vars)
  - Indicator: `inline-flex items-center justify-center transition-transform data-[state=open]:rotate-90` (chevron rotates on open)
  - Include `disabled` variant: opacity/hover effects for trigger
  - Export `collapsibleVariants` and `CollapsibleVariants` type

  **Must NOT do**:
  - Don't add animation keyframes in recipe (these go in theme.css or component)
  - Don't modify existing recipe files

  **Recommended Agent Profile**:
  - **Category**: `quick` — Single file, simplest recipe (4 slots, very similar to popover/accordion patterns)
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4, 10, 11, 12)
  - **Blocks**: Task 5 (collapsible.tsx), Task 8 (core index)
  - **Blocked By**: None

  **References**:
  - `packages/core/src/recipes/accordion.ts:1-50` — Closest pattern. Collapsible is standalone accordion item. Copy trigger/content/indicator pattern
  - `packages/core/src/recipes/popover.ts:1-50` — Floating panel pattern for content
  - `tailwind-variants` — Import `{ tv, type VariantProps }` from `'tailwind-variants'` (same as all existing recipes)

  **Acceptance Criteria**:
  - [ ] `packages/core/src/recipes/collapsible.ts` exists
  - [ ] `collapsibleVariants` is a tv call with 4 slots (root, trigger, content, indicator)
  - [ ] All slots use `bg-background`, `text-foreground`, `border`, `bg-accent` tokens

  **QA Scenarios**:

  ```
  Scenario: Collapsible recipe file exists and has correct structure
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c "export const collapsibleVariants" packages/core/src/recipes/collapsible.ts
      2. grep -c "slots:" packages/core/src/recipes/collapsible.ts
      3. grep -c "trigger:" packages/core/src/recipes/collapsible.ts
      4. grep -c "content:" packages/core/src/recipes/collapsible.ts
    Expected Result: All grep counts >= 1
    Evidence: .sisyphus/evidence/task-1-recipe-collapsible.txt

  Scenario: Recipe imports tv from tailwind-variants
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep "from 'tailwind-variants'" packages/core/src/recipes/collapsible.ts
    Expected Result: Matches — imports `{ tv, type VariantProps }` from 'tailwind-variants'
    Evidence: .sisyphus/evidence/task-1-recipe-collapsible-import.txt
  ```

  **Evidence to Capture**:
  - [ ] Recipe file contents snapshot

  **Commit**: YES (groups with 2, 3, 4)
  - Message: `feat(core): add collapsible, drawer, and menu recipes`
  - Files: `packages/core/src/recipes/collapsible.ts`

---

- [x] 2. Core recipe — drawer.ts

  **What to do**:
  - Create `packages/core/src/recipes/drawer.ts` using `tv()` with slots
  - Slots needed: `root`, `trigger`, `backdrop`, `positioner`, `content`, `title`, `description`, `closeTrigger`, `grabber`, `grabberIndicator`
  - Follow Dialog recipe pattern (positioner → content structure is similar)
  - Root: no direct styling (logical wrapper)
  - Trigger: standard button-like styling matching existing triggers
  - Backdrop: `fixed inset-0 bg-black/50 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`
  - Positioner: `fixed inset-0 flex z-50` (responsive positioning)
  - Content: slide-in animation using `--drawer-translate-x/y` CSS vars from Ark UI
  - Title: `text-lg font-semibold` matching DialogTitle
  - Description: `text-sm text-muted-foreground`
  - CloseTrigger: absolute positioned X button (matching dialog closeTrigger)
  - Grabber: flex centered grab handle area with `cursor-grab`
  - GrabberIndicator: `w-10 h-1 bg-muted-foreground/30 rounded-full`
  - Export `drawerVariants` and `DrawerVariants` type

  **Must NOT do**:
  - No custom swipe config — Ark UI handles via data-attributes
  - No custom snap point styling
  - Don't modify existing recipe files

  **Recommended Agent Profile**:
  - **Category**: `quick` — Medium recipe, dialog pattern is well-understood
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4, 10, 11, 12)
  - **Blocks**: Task 6 (drawer.tsx), Task 8 (core index)
  - **Blocked By**: None

  **References**:
  - `packages/core/src/recipes/dialog.ts:1-60` — PRIMARY reference. Same backdrop→positioner→content structure
  - `packages/core/src/recipes/popover.ts:1-50` — CloseTrigger pattern (absolute positioned X)
  - `tailwind-variants` — Import `{ tv, type VariantProps }` from `'tailwind-variants'` (same as all existing recipes)

  **Acceptance Criteria**:
  - [ ] `packages/core/src/recipes/drawer.ts` exists
  - [ ] `drawerVariants` is a tv call with 10 slots
  - [ ] All slots reference existing shadcn tokens (`bg-background`, `text-foreground`, `border`, `bg-muted`, etc.)
  - [ ] Backdrop has overlay styling (`bg-black/50` or similar)

  **QA Scenarios**:

  ```
  Scenario: Drawer recipe file exists
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c "export const drawerVariants" packages/core/src/recipes/drawer.ts
      2. grep -c "backdrop:" packages/core/src/recipes/drawer.ts
      3. grep -c "content:" packages/core/src/recipes/drawer.ts
      4. grep -c "closeTrigger:" packages/core/src/recipes/drawer.ts
    Expected Result: All >= 1
    Evidence: .sisyphus/evidence/task-2-recipe-drawer.txt

  Scenario: Backdrop has overlay styling
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep "bg-black" packages/core/src/recipes/drawer.ts
    Expected Result: Matches (has backdrop overlay)
    Evidence: .sisyphus/evidence/task-2-recipe-drawer-backdrop.txt
  ```

  **Evidence to Capture**:
  - [ ] Recipe file contents snapshot

  **Commit**: YES (groups with 1, 3, 4)
  - Message: `feat(core): add collapsible, drawer, and menu recipes`
  - Files: `packages/core/src/recipes/drawer.ts`

---

- [x] 3. Core recipe — menu.ts

  **What to do**:
  - Create `packages/core/src/recipes/menu.ts` using `tv()` with slots
  - Slots needed: `root`, `trigger`, `indicator`, `positioner`, `content`, `arrow`, `arrowTip`, `item`, `itemText`, `itemIndicator`, `separator`, `contextTrigger`, `triggerItem`, `checkboxItem`, `radioItem`, `itemGroup`, `itemGroupLabel`
  - Root: no direct styling
  - Trigger: standard button-like with `data-[state=open]:bg-accent`
  - Indicator: `inline-flex items-center transition-transform data-[state=open]:rotate-180`
  - Positioner: `z-50` (handles positioning)
  - Content: `min-w-[10rem] p-1 bg-popover text-popover-foreground border rounded-md shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95`
  - Arrow/ArrowTip: styling vars (`--arrow-background`, `--arrow-size`)
  - Item: `flex items-center gap-2 px-2.5 py-1.5 text-sm rounded-sm cursor-pointer data-[highlighted]:bg-accent data-[disabled]:opacity-50 data-[disabled]:pointer-events-none`
  - Separator: `h-px mx-1 my-1 bg-border`
  - ContextTrigger, TriggerItem, CheckboxItem, RadioItem, ItemGroup, ItemGroupLabel — matching minimal styling
  - Export `menuVariants` and `MenuVariants` type

  **Must NOT do**:
  - No nested menu-specific styling (Ark UI handles via `data-nested` attributes)
  - Don't modify existing recipe files

  **Recommended Agent Profile**:
  - **Category**: `quick` — Multiple slots but each is simple (mostly flex + padding + border)
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4, 10, 11, 12)
  - **Blocks**: Task 7 (menu.tsx), Task 8 (core index)
  - **Blocked By**: None

  **References**:
  - `packages/core/src/recipes/popover.ts:1-50` — Dropdown-like pattern, arrow/arrowTip, content animations
  - `packages/core/src/recipes/select.ts:1-50` — Item list pattern, item highlighting
  - `packages/core/src/recipes/radio-group.ts:1-30` — RadioItem styling pattern
  - `tailwind-variants` — Import `{ tv, type VariantProps }` from `'tailwind-variants'` (same as all existing recipes)

  **Acceptance Criteria**:
  - [ ] `packages/core/src/recipes/menu.ts` exists
  - [ ] `menuVariants` is a tv call with 17+ slots
  - [ ] Content slot has popover-like animation and shadow classes

  **QA Scenarios**:

  ```
  Scenario: Menu recipe file exists
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c "export const menuVariants" packages/core/src/recipes/menu.ts
      2. grep -c "slots:" packages/core/src/recipes/menu.ts
      3. grep -c "content:" packages/core/src/recipes/menu.ts
      4. grep -c "item:" packages/core/src/recipes/menu.ts
      5. grep -c "separator:" packages/core/src/recipes/menu.ts
    Expected Result: All >= 1
    Evidence: .sisyphus/evidence/task-3-recipe-menu.txt

  Scenario: Content has popover-like animation classes
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c "animate-in" packages/core/src/recipes/menu.ts
      2. grep -c "fade-in" packages/core/src/recipes/menu.ts
    Expected Result: Both >= 1
    Evidence: .sisyphus/evidence/task-3-recipe-menu-animations.txt
  ```

  **Evidence to Capture**:
  - [ ] Recipe file contents snapshot

  **Commit**: YES (groups with 1, 2, 4)
  - Message: `feat(core): add collapsible, drawer, and menu recipes`
  - Files: `packages/core/src/recipes/menu.ts`

---

- [x] 4. Core config updates

  **What to do**:
  - Update `packages/core/tsup.config.ts` — add `'src/recipes/collapsible.ts'`, `'src/recipes/drawer.ts'`, `'src/recipes/menu.ts'` to the `entry` array
  - Update `packages/core/package.json` — add `"./recipes/collapsible"`, `"./recipes/drawer"`, `"./recipes/menu"` export entries (follow same format as existing)
  - Verify format matches existing entries exactly (same CJS/ESM pattern)

  **Must NOT do**:
  - Don't change existing entries — only append
  - Don't change format/structure of existing config
  - No changes to solid tsup.config.ts (solid uses single `src/index.ts` entry + `src/number-input.tsx`)

  **Recommended Agent Profile**:
  - **Category**: `quick` — Simple config edits
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 10, 11, 12)
  - **Blocks**: Task 5, 6, 7, 8 (all solid wrappers + core exports depend on config)
  - **Blocked By**: None

  **References**:
  - `packages/core/tsup.config.ts:4` — Existing entry list. Append 3 new entries after last recipe
  - `packages/core/package.json:10-35` — Existing recipe exports format. Copy for 3 new entries

  **Acceptance Criteria**:
  - [ ] `tsup.config.ts` has 3 new entries (16 existing + 3 new = 19 total)
  - [ ] `package.json` has 3 new recipe export entries matching existing format

  **QA Scenarios**:

  ```
  Scenario: tsup entries added for all 3 recipes
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c "recipes/collapsible" packages/core/tsup.config.ts
      2. grep -c "recipes/drawer" packages/core/tsup.config.ts
      3. grep -c "recipes/menu" packages/core/tsup.config.ts
    Expected Result: All == 1
    Evidence: .sisyphus/evidence/task-4-tsup-entries.txt

  Scenario: package.json exports added for all 3
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c "recipes/collapsible" packages/core/package.json
      2. grep -c "recipes/drawer" packages/core/package.json
      3. grep -c "recipes/menu" packages/core/package.json
    Expected Result: All >= 1
    Evidence: .sisyphus/evidence/task-4-pkg-exports.txt
  ```

  **Evidence to Capture**:
  - [ ] Diff of tsup.config.ts
  - [ ] Diff of package.json

  **Commit**: YES (groups with 1, 2, 3)
  - Message: `feat(core): add collapsible, drawer, and menu recipes`
  - Files: `packages/core/tsup.config.ts`, `packages/core/package.json`

- [x] 5. Solid wrapper — collapsible.tsx

  **What to do**:
  - Create `packages/solid/src/collapsible.tsx` wrapping `@ark-ui/solid/collapsible`
  - Import `{ Collapsible as ArkCollapsible }` from `'@ark-ui/solid/collapsible'`
  - Import `{ createMemo, splitProps, type Component, type JSX }` from `'solid-js'`
  - Import `{ collapsibleVariants }` from `'@ui/core'`
  - Create 4 sub-components:

  **CollapsibleRoot** — `splitProps(props, ['class'])` → `createMemo(() => styles.root({ class: local.class }))` → `<ArkCollapsible.Root class={rootClass()} {...others} />`
  **CollapsibleTrigger** — `styles.trigger()` → `<ArkCollapsible.Trigger class={triggerClass()} {...others}>{local.children}</ArkCollapsible.Trigger>`
  **CollapsibleContent** — `styles.content()` → `<ArkCollapsible.Content class={contentClass()} {...others}>{local.children}</ArkCollapsible.Content>`
  **CollapsibleIndicator** — `styles.indicator()` → `<ArkCollapsible.Indicator class={indicatorClass()} {...others}>{local.children}</ArkCollapsible.Indicator>`
  - Static variants → call `collapsibleVariants()` directly (no reactive props needed for v1)
  - Export all 4 sub-components and `collapsibleVariants`

  **Must NOT do**:
  - Don't modify existing component files

  **Recommended Agent Profile**:
  - **Category**: `quick` — Only 4 sub-components, simplest solid wrapper
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7)
  - **Blocks**: Task 9 (solid index exports)
  - **Blocked By**: Tasks 1, 4 (collapsible recipe + core config)

  **References**:
  - `packages/solid/src/accordion.tsx` — PRIMARY reference. AccordionItemTrigger/Content/Indicator pattern
  - `packages/solid/src/popover.tsx:6-8` — Re-export Root pattern
  - `packages/core/src/recipes/collapsible.ts` — Recipe just created

  **Acceptance Criteria**:
  - [ ] `packages/solid/src/collapsible.tsx` exists
  - [ ] File exports: CollapsibleRoot, CollapsibleTrigger, CollapsibleContent, CollapsibleIndicator, collapsibleVariants
  - [ ] Uses splitProps + createMemo pattern

  **QA Scenarios**:

  ```
  Scenario: Collapsible file exists with all exports
    Tool: Bash
    Preconditions: Tasks 1, 4 complete
    Steps:
      1. grep -c "export " packages/solid/src/collapsible.tsx
    Expected Result: >= 5 export statements
    Evidence: .sisyphus/evidence/task-5-collapsible-exports.txt

  Scenario: Uses splitProps + createMemo pattern
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c "splitProps" packages/solid/src/collapsible.tsx
      2. grep -c "createMemo" packages/solid/src/collapsible.tsx
    Expected Result: Both >= 1
    Evidence: .sisyphus/evidence/task-5-collapsible-pattern.txt
  ```

  **Evidence to Capture**:
  - [ ] File contents

  **Commit**: YES (groups with 6, 7)
  - Message: `feat(solid): add Collapsible, Drawer, and Menu components`
  - Files: `packages/solid/src/collapsible.tsx`

---

- [ ] 6. Solid wrapper — drawer.tsx ⚠️ NEEDS IMPROVEMENT — user flagged, will revisit

  **What to do**:
  - Create `packages/solid/src/drawer.tsx` wrapping `@ark-ui/solid/drawer`
  - Import `{ Drawer as ArkDrawer }` from `'@ark-ui/solid/drawer'`
  - Import `{ Portal }` from `'solid-js/web'`
  - Import `{ createMemo, splitProps, type Component, type JSX }` from `'solid-js'`
  - Import `{ drawerVariants }` from `'@ui/core'`
  - Create 10 sub-components following the dialog/popover pattern:

  **DrawerRoot** — Re-export `ArkDrawer.Root` directly (like DialogRoot/PopoverRoot)
  **DrawerTrigger** — `<ArkDrawer.Trigger>` with class merge (like DialogTrigger)
  **DrawerBackdrop** — `styles.backdrop()`, wrap in Portal or use separately
  **DrawerPositioner** — `styles.positioner()`
  **DrawerContent** — Portal wrapper pattern (like DialogContent):

  ```tsx
  <Portal>
    <ArkDrawer.Positioner class={positionerClass()}>
      <ArkDrawer.Content class={contentClass()} {...others}>
        {local.children}
        <DrawerCloseTrigger />
      </ArkDrawer.Content>
    </ArkDrawer.Positioner>
  </Portal>
  ```

  **DrawerTitle** — `styles.title()` (like DialogTitle)
  **DrawerDescription** — `styles.description()` (like DialogDescription)
  **DrawerCloseTrigger** — `styles.closeTrigger()`, include X SVG icon
  **DrawerGrabber** — `styles.grabber()` (flex centered grab area)
  **DrawerGrabberIndicator** — `styles.grabberIndicator()` (small rounded bar)
  - Export all 10 sub-components and `drawerVariants`

  **Must NOT do**:
  - Don't modify existing component files

  **Recommended Agent Profile**:
  - **Category**: `quick` — Dialog/Portal pattern is well-established (dialog.tsx is 58 lines)
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 7)
  - **Blocks**: Task 9 (solid index exports)
  - **Blocked By**: Tasks 2, 4 (drawer recipe + core config)

  **References**:
  - `packages/solid/src/dialog.tsx:1-58` — PRIMARY reference. Same Portal/Positioner/Content/Title/Description/CloseTrigger pattern
  - `packages/solid/src/popover.tsx:6-8` — Re-export Root/Trigger pattern
  - `packages/core/src/recipes/drawer.ts` — Recipe just created

  **Acceptance Criteria**:
  - [ ] `packages/solid/src/drawer.tsx` exists
  - [ ] File exports: DrawerRoot, DrawerTrigger, DrawerBackdrop, DrawerPositioner, DrawerContent, DrawerTitle, DrawerDescription, DrawerCloseTrigger, DrawerGrabber, DrawerGrabberIndicator, drawerVariants
  - [ ] Content wrapped in Portal (like dialog)

  **QA Scenarios**:

  ```
  Scenario: Drawer file exists with all exports
    Tool: Bash
    Preconditions: Tasks 2, 4 complete
    Steps:
      1. grep -c "export " packages/solid/src/drawer.tsx
    Expected Result: >= 11 export statements
    Evidence: .sisyphus/evidence/task-6-drawer-exports.txt

  Scenario: Portal import exists
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep "Portal" packages/solid/src/drawer.tsx
    Expected Result: Import of Portal exists and usage in Content
    Evidence: .sisyphus/evidence/task-6-drawer-portal.txt

  Scenario: Uses splitProps + createMemo pattern
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c "splitProps" packages/solid/src/drawer.tsx
      2. grep -c "createMemo" packages/solid/src/drawer.tsx
    Expected Result: Both >= 1
    Evidence: .sisyphus/evidence/task-6-drawer-pattern.txt
  ```

  **Evidence to Capture**:
  - [ ] File contents

  **Commit**: YES (groups with 5, 7)
  - Message: `feat(solid): add Collapsible, Drawer, and Menu components`
  - [ ] 6. Solid wrapper — drawer.tsx

- Files: `packages/solid/src/drawer.tsx`

---

- [ ] 7. Solid wrapper — menu.tsx

  **What to do**:
  - Create `packages/solid/src/menu.tsx` wrapping `@ark-ui/solid/menu`
  - Import `{ Menu as ArkMenu }` from `'@ark-ui/solid/menu'`
  - Import `{ createMemo, splitProps, type Component, type JSX }` from `'solid-js'`
  - Import `{ menuVariants }` from `'@ui/core'`
  - Create 15+ sub-components:

  **MenuRoot** — Re-export `ArkMenu.Root`
  **MenuTrigger** — `styles.trigger()`, `<ArkMenu.Trigger>` with class merge
  **MenuIndicator** — `styles.indicator()`, include chevron-down SVG icon, rotate on open
  **MenuPositioner** — `styles.positioner()`
  **MenuContent** — `styles.content()`, with Arrow/ArrowTip children:

  ```tsx
  <ArkMenu.Content class={contentClass()} {...others}>
    <MenuArrow />
    {local.children}
  </ArkMenu.Content>
  ```

  **MenuArrow** — `styles.arrow()`
  **MenuArrowTip** — `styles.arrowTip()`
  **MenuItem** — `styles.item()`, `<ArkMenu.Item class={itemClass()} value={local.value} {...others}>{local.children}</ArkMenu.Item>`
  **MenuItemText** — `styles.itemText()`
  **MenuItemIndicator** — `styles.itemIndicator()`, include check SVG icon
  **MenuSeparator** — `styles.separator()`, `<ArkMenu.Separator class={sepClass()} {...others} />`
  **MenuContextTrigger** — `styles.contextTrigger()`
  **MenuTriggerItem** — `styles.triggerItem()` (for nested menus)
  **MenuCheckboxItem** — `styles.checkboxItem()`
  **MenuRadioItem** — `styles.radioItem()`
  **MenuRadioItemGroup** — re-export or wrap `ArkMenu.RadioItemGroup`
  **MenuItemGroup** — `styles.itemGroup()`
  **MenuItemGroupLabel** — `styles.itemGroupLabel()`
  - Export all sub-components and `menuVariants`
  - Include inline SVGs for indicator (chevron), item indicator (check)

  **Must NOT do**:
  - No custom nested menu behavior — use Ark UI defaults
  - Don't modify existing component files

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high` — Most complex wrapper (15+ sub-components), but each follows same pattern
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 6)
  - **Blocks**: Task 9 (solid index exports)
  - **Blocked By**: Tasks 3, 4 (menu recipe + core config)

  **References**:
  - `packages/solid/src/select.tsx:1-91` — Pattern for item-based composite (Item, ItemText, ItemIndicator)
  - `packages/solid/src/radio-group.tsx` — Pattern for radio item group
  - `packages/solid/src/popover.tsx` — Arrow/ArrowTip pattern, Portal content
  - `packages/core/src/recipes/menu.ts` — Recipe just created

  **Acceptance Criteria**:
  - [ ] `packages/solid/src/menu.tsx` exists
  - [ ] File exports 17+ named symbols
  - [ ] Uses splitProps + createMemo pattern consistently

  **QA Scenarios**:

  ```
  Scenario: Menu file exists with all exports
    Tool: Bash
    Preconditions: Tasks 3, 4 complete
    Steps:
      1. grep -c "export " packages/solid/src/menu.tsx
    Expected Result: >= 17 export statements
    Evidence: .sisyphus/evidence/task-7-menu-exports.txt

  Scenario: Uses splitProps + createMemo pattern
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c "splitProps" packages/solid/src/menu.tsx
      2. grep -c "createMemo" packages/solid/src/menu.tsx
    Expected Result: Both >= 1
    Evidence: .sisyphus/evidence/task-7-menu-pattern.txt

  Scenario: Inline SVG icons present
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c "<svg" packages/solid/src/menu.tsx
    Expected Result: >= 2 (chevron + check icons)
    Evidence: .sisyphus/evidence/task-7-menu-icons.txt
  ```

  **Evidence to Capture**:
  - [ ] File contents

  **Commit**: YES (groups with 5, 6)
  - Message: `feat(solid): add Collapsible, Drawer, and Menu components`
  - Files: `packages/solid/src/menu.tsx`

---

- [x] 8. Core index.ts — export new variants

  **What to do**:
  - Add to `packages/core/src/index.ts`:
    ```ts
    export { collapsibleVariants } from "./recipes/collapsible";
    export type { CollapsibleVariants } from "./recipes/collapsible";
    export { drawerVariants } from "./recipes/drawer";
    export type { DrawerVariants } from "./recipes/drawer";
    export { menuVariants } from "./recipes/menu";
    export type { MenuVariants } from "./recipes/menu";
    ```
  - Add in alphabetical order: collapsible after `checkboxVariants` line, drawer before `inputVariants`, menu after `inputVariants`

  **Must NOT do**:
  - Don't remove or modify existing exports

  **Recommended Agent Profile**:
  - **Category**: `quick` — Simple append to index
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: NO (sequential - depends on recipes existing)
  - **Parallel Group**: Sequential (Wave 3, after Tasks 1-3)
  - **Blocked By**: Tasks 1, 2, 3, 4 (recipes + config must exist)

  **References**:
  - `packages/core/src/index.ts:1-44` — Exact format to follow. Each section has: variant export + type export

  **Acceptance Criteria**:
  - [ ] 3 new variant exports + 3 new type exports in core index
  - [ ] No duplicate import errors

  **QA Scenarios**:

  ```
  Scenario: Core index exports all 3 new variants
    Tool: Bash
    Preconditions: Tasks 1-4 complete
    Steps:
      1. grep -c "collapsibleVariants" packages/core/src/index.ts
      2. grep -c "collapsibleVariants" packages/core/src/index.ts
      3. grep -c "drawerVariants" packages/core/src/index.ts
      4. grep -c "menuVariants" packages/core/src/index.ts
    Expected Result: All >= 1
    Evidence: .sisyphus/evidence/task-8-core-exports.txt
  ```

  **Evidence to Capture**:
  - [ ] Diff of index.ts

  **Commit**: YES (groups with 9)
  - Message: `feat: export new components from index`
  - Files: `packages/core/src/index.ts`

---

- [x] 9. Solid index.ts — export new components

  **What to do**:
  - Add to `packages/solid/src/index.ts` before the `export { tv }` import block:

    ```ts
    export {
      CollapsibleRoot,
      CollapsibleTrigger,
      CollapsibleContent,
      CollapsibleIndicator,
      collapsibleVariants,
    } from "./collapsible";

    export {
      DrawerRoot,
      DrawerTrigger,
      DrawerBackdrop,
      DrawerPositioner,
      DrawerContent,
      DrawerTitle,
      DrawerDescription,
      DrawerCloseTrigger,
      DrawerGrabber,
      DrawerGrabberIndicator,
      drawerVariants,
    } from "./drawer";

    export {
      MenuRoot,
      MenuTrigger,
      MenuIndicator,
      MenuPositioner,
      MenuContent,
      MenuArrow,
      MenuArrowTip,
      MenuItem,
      MenuItemText,
      MenuItemIndicator,
      MenuSeparator,
      MenuContextTrigger,
      MenuTriggerItem,
      MenuCheckboxItem,
      MenuRadioItem,
      MenuRadioItemGroup,
      MenuItemGroup,
      MenuItemGroupLabel,
      menuVariants,
    } from "./menu";
    ```

  **Must NOT do**:
  - Don't remove or modify existing exports

  **Recommended Agent Profile**:
  - **Category**: `quick` — Simple append to index
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: NO (sequential)
  - **Parallel Group**: Wave 3 (with Task 8)
  - **Blocked By**: Tasks 5, 6, 7 (solid wrappers must exist)

  **References**:
  - `packages/solid/src/index.ts:1-40` — Existing export format to follow exactly

  **Acceptance Criteria**:
  - [ ] ~33 new named export symbols in solid index (4 from collapsible + 10 from drawer + 17+ from menu)
  - [ ] No lint errors from unused exports

  **QA Scenarios**:

  ```
  Scenario: Solid index exports collapsible
    Tool: Bash
    Preconditions: Task 5 complete
    Steps:
      1. grep -c "Collapsible" packages/solid/src/index.ts
      2. grep -c "collapsibleVariants" packages/solid/src/index.ts
    Expected Result: Collapsible >= 4, collapsibleVariants == 1
    Evidence: .sisyphus/evidence/task-9-solid-collapsible.txt

  Scenario: Solid index exports drawer
    Tool: Bash
    Preconditions: Task 6 complete
    Steps:
      1. grep -c "Drawer" packages/solid/src/index.ts
      2. grep -c "drawerVariants" packages/solid/src/index.ts
    Expected Result: Drawer >= 10, drawerVariants == 1
    Evidence: .sisyphus/evidence/task-9-solid-drawer.txt

  Scenario: Solid index exports menu
    Tool: Bash
    Preconditions: Task 7 complete
    Steps:
      1. grep -c "Menu" packages/solid/src/index.ts
      2. grep -c "menuVariants" packages/solid/src/index.ts
    Expected Result: Menu >= 17, menuVariants == 1
    Evidence: .sisyphus/evidence/task-9-solid-menu.txt
  ```

  **Evidence to Capture**:
  - [ ] Diff of index.ts

  **Commit**: YES (groups with 8)
  - Message: `feat: export new components from index`
  - Files: `packages/solid/src/index.ts`

---

- [x] 10. Docs — add Popover section (existing component)

  **What to do**:
  - Add a new `<section id="popover">` to `apps/docs/src/App.tsx` (before `</main>` closing)
  - Import Popover components from `@ui/solid`:
    ```ts
    import {
      PopoverRoot,
      PopoverTrigger,
      PopoverContent,
      PopoverTitle,
      PopoverDescription,
      PopoverCloseTrigger,
      PopoverArrow,
      PopoverArrowTip,
    } from "@ui/solid";
    ```
  - Create a basic interactive demo:
    - Section header: "Popover" with subtitle "Floating card on click with arrow."
    - A button trigger that opens a popover with title, description, and close button
    - Follow same section structure as existing components (h2, p, div with demo)
    - Use a local `createSignal` for open state
    - Use Portal wrapper from `solid-js/web`
  - Match the styling and section class structure of existing demos

  **Must NOT do**:
  - Don't modify existing sections — only append before `</main>`
  - Don't change Popover component behavior

  **Recommended Agent Profile**:
  - **Category**: `quick` — Single section, existing component, similar to existing dialog demo
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 4, 11, 12) — no dependency on new components!
  - **Blocks**: None directly (but should be before full app QA)
  - **Blocked By**: None (Popover already exported from @ui/solid)

  **References**:
  - `apps/docs/src/App.tsx:175-213` — Dialog section: exact structure to follow for popover
  - `packages/solid/src/popover.tsx` — Popover component API

  **Acceptance Criteria**:
  - [ ] Import statement for Popover components exists in App.tsx
  - [ ] Section with id="popover" exists
  - [ ] Popover demo renders a button trigger that opens a floating card

  **QA Scenarios**:

  ```
  Scenario: App.tsx has popover section
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c 'id="popover"' apps/docs/src/App.tsx
      2. grep -c "Popover" apps/docs/src/App.tsx
    Expected Result: Both >= 1
    Evidence: .sisyphus/evidence/task-10-docs-popover.txt

  Scenario: Docs app builds without errors
    Tool: Bash
    Preconditions: Popover section added
    Steps:
      1. cd apps/docs && pnpm build 2>&1 | tail -20
    Expected Result: Exit 0, no errors
    Evidence: .sisyphus/evidence/task-10-docs-build.txt
  ```

  **Evidence to Capture**:
  - [ ] App.tsx diff for popover section

  **Commit**: YES (groups with 11, 12)
  - Message: `feat(docs): add component demos for all 6 sections`
  - Files: `apps/docs/src/App.tsx`

---

- [x] 11. Docs — add Slider section (existing component)

  **What to do**:
  - Add a new `<section id="slider">` to `apps/docs/src/App.tsx` (before `</main>`)
  - Import Slider components from `@ui/solid`:
    ```ts
    import {
      SliderRoot,
      SliderLabel,
      SliderControl,
      SliderTrack,
      SliderRange,
      SliderThumb,
      SliderValueText,
    } from "@ui/solid";
    ```
  - Create a basic interactive demo:
    - Section header: "Slider" with subtitle "Range slider with label and value display."
    - A basic slider with label and value text
    - Follow same section structure as existing components
    - Use `createSignal` for value display

  **Must NOT do**:
  - Don't modify existing sections

  **Recommended Agent Profile**:
  - **Category**: `quick` — Single section, existing component
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-4, 10, 12)
  - **Blocked By**: None (Slider already exported)

  **References**:
  - `apps/docs/src/App.tsx` — Existing sections for format replication
  - `packages/solid/src/slider.tsx` — Slider component API

  **Acceptance Criteria**:
  - [ ] Import for Slider components exists
  - [ ] Section with id="slider" exists
  - [ ] Slider demo renders a functional slider with label

  **QA Scenarios**:

  ```
  Scenario: App.tsx has slider section
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c 'id="slider"' apps/docs/src/App.tsx
      2. grep -c "Slider" apps/docs/src/App.tsx
    Expected Result: Both >= 1
    Evidence: .sisyphus/evidence/task-11-docs-slider.txt
  ```

  **Evidence to Capture**:
  - [ ] App.tsx diff for slider section

  **Commit**: YES (groups with 10, 12)
  - Message: `feat(docs): add component demos for all 6 sections`
  - Files: `apps/docs/src/App.tsx`

---

- [x] 12. Docs — add NumberInput section (existing component)

  **What to do**:
  - Add a new `<section id="number-input">` to `apps/docs/src/App.tsx` (before `</main>`)
  - Import NumberInput from `@ui/solid`:
    ```ts
    import { NumberInput } from "@ui/solid";
    ```
  - Create a basic interactive demo:
    - Section header: "Number Input" with subtitle "Numeric input with increment and decrement controls."
    - A basic number input with label, min/max/step
    - Follow same section structure

  **Must NOT do**:
  - Don't modify existing sections

  **Recommended Agent Profile**:
  - **Category**: `quick` — Single section, existing component
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-4, 10, 11)
  - **Blocked By**: None (NumberInput already exported)

  **References**:
  - `apps/docs/src/App.tsx` — Existing sections for format
  - `packages/solid/src/number-input.tsx` — NumberInput API

  **Acceptance Criteria**:
  - [ ] Import for NumberInput exists
  - [ ] Section with id="number-input" exists
  - [ ] NumberInput demo renders with increment/decrement controls

  **QA Scenarios**:

  ```
  Scenario: App.tsx has number-input section
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c 'id="number-input"' apps/docs/src/App.tsx
      2. grep -c "NumberInput" apps/docs/src/App.tsx
    Expected Result: Both >= 1
    Evidence: .sisyphus/evidence/task-12-docs-number-input.txt
  ```

  **Evidence to Capture**:
  - [ ] App.tsx diff for number-input section

  **Commit**: YES (groups with 10, 11)
  - Message: `feat(docs): add component demos for all 6 sections`
  - Files: `apps/docs/src/App.tsx`

---

- [x] 13. Docs — add Collapsible section (new component)

  **What to do**:
  - Add a new `<section id="collapsible">` to `apps/docs/src/App.tsx` (before `</main>`)
  - Import Collapsible components from `@ui/solid`:
    ```ts
    import {
      CollapsibleRoot,
      CollapsibleTrigger,
      CollapsibleContent,
      CollapsibleIndicator,
    } from "@ui/solid";
    ```
  - Create a basic interactive demo:
    - Section header: "Collapsible" with subtitle "Expandable section with animated open/close."
    - A trigger button that expands/collapses content with indicator chevron
    - Similar to accordion but standalone

  **Must NOT do**:
  - Don't modify existing sections

  **Recommended Agent Profile**:
  - **Category**: `quick` — Single section, simple component
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 14, 15)
  - **Blocked By**: Task 9 (solid exports must exist for imports to resolve)

  **References**:
  - `apps/docs/src/App.tsx:470-583` — Accordion section: closest pattern for collapsible
  - `packages/solid/src/collapsible.tsx` — Component API

  **Acceptance Criteria**:
  - [ ] Import for Collapsible exists
  - [ ] Section with id="collapsible" exists
  - [ ] Collapsible demo renders a trigger that expands/collapses content

  **QA Scenarios**:

  ```
  Scenario: App.tsx has collapsible section
    Tool: Bash
    Preconditions: Task 9 complete
    Steps:
      1. grep -c 'id="collapsible"' apps/docs/src/App.tsx
    Expected Result: >= 1
    Evidence: .sisyphus/evidence/task-13-docs-collapsible.txt
  ```

  **Evidence to Capture**:
  - [ ] App.tsx diff for collapsible section

  **Commit**: YES (groups with 14, 15)
  - Message: `feat(docs): add component demos for all 6 sections`
  - Files: `apps/docs/src/App.tsx`

---

- [ ] 14. Docs — add Drawer section (new component)

  **What to do**:
  - Add a new `<section id="drawer">` to `apps/docs/src/App.tsx` (before `</main>`)
  - Import Drawer components from `@ui/solid`:
    ```ts
    import {
      DrawerRoot,
      DrawerTrigger,
      DrawerBackdrop,
      DrawerPositioner,
      DrawerContent,
      DrawerTitle,
      DrawerDescription,
      DrawerCloseTrigger,
    } from "@ui/solid";
    ```
  - Create a basic interactive demo:
    - Section header: "Drawer" with subtitle "Slide-in panel from the bottom."
    - A button trigger that opens a drawer with title, description, and close button
    - Use `createSignal` for open state, Portal from `solid-js/web`
    - Follow dialog section pattern

  **Must NOT do**:
  - Don't add grabber demo for v1 (just basic content)
  - Don't modify existing sections

  **Recommended Agent Profile**:
  - **Category**: `quick` — Single section, similar to dialog pattern
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 13, 15)
  - **Blocked By**: Task 9 (solid exports)

  **References**:
  - `apps/docs/src/App.tsx:175-213` — Dialog section: exact structure for drawer
  - `packages/solid/src/drawer.tsx` — Component API

  **Acceptance Criteria**:
  - [ ] Import for Drawer exists
  - [ ] Section with id="drawer" exists
  - [ ] Drawer demo opens a slide-in panel on button click

  **QA Scenarios**:

  ```
  Scenario: App.tsx has drawer section
    Tool: Bash
    Preconditions: Task 9 complete
    Steps:
      1. grep -c 'id="drawer"' apps/docs/src/App.tsx
    Expected Result: >= 1
    Evidence: .sisyphus/evidence/task-14-docs-drawer.txt
  ```

  **Evidence to Capture**:
  - [ ] App.tsx diff for drawer section

  **Commit**: YES (groups with 13, 15)
  - Message: `feat(docs): add component demos for all 6 sections`
  - Files: `apps/docs/src/App.tsx`

---

- [ ] 15. Docs — add Menu section (new component) ⚠️ NEEDS IMPROVEMENT — user flagged, will revisit

  **What to do**:
  - Add a new `<section id="menu">` to `apps/docs/src/App.tsx` (before `</main>`)
  - Import Menu components from `@ui/solid`:
    ```ts
    import {
      MenuRoot,
      MenuTrigger,
      MenuIndicator,
      MenuPositioner,
      MenuContent,
      MenuItem,
      MenuItemText,
      MenuSeparator,
    } from "@ui/solid";
    ```
  - Create a basic interactive demo:
    - Section header: "Menu" with subtitle "Dropdown menu with items and separator."
    - A button trigger labeled "Actions" that opens a dropdown with 3-4 items and a separator
    - Follow select dropdown section pattern

  **Must NOT do**:
  - No context menu demo for v1 (basic dropdown only)
  - Don't modify existing sections

  **Recommended Agent Profile**:
  - **Category**: `quick` — Single section, similar to select dropdown pattern
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 13, 14)
  - **Blocked By**: Task 9 (solid exports)

  **References**:
  - `apps/docs/src/App.tsx:216-245` — Select section: structure for dropdown menu
  - `packages/solid/src/menu.tsx` — Component API

  **Acceptance Criteria**:
  - [ ] Import for Menu exists
  - [ ] Section with id="menu" exists
  - [ ] Menu demo renders a dropdown with items on trigger click

  **QA Scenarios**:

  ```
  Scenario: App.tsx has menu section
    Tool: Bash
    Preconditions: Task 9 complete
    Steps:
      1. grep -c 'id="menu"' apps/docs/src/App.tsx
    Expected Result: >= 1
    Evidence: .sisyphus/evidence/task-15-docs-menu.txt
  ```

  **Evidence to Capture**:
  - [ ] App.tsx diff for menu section

  **Commit**: YES (groups with 13, 14)
  - Message: `feat(docs): add component demos for all 6 sections`
  - Files: `apps/docs/src/App.tsx`

---

- [x] 16. Build + typecheck + QA verification

  **What to do**:
  - Run `moon run core:build` and verify exit code 0
  - Run `moon run solid:build` and verify exit code 0
  - Run `moon run solid:typecheck` and verify exit code 0
  - If any fail, diagnose and fix (likely missing exports, import path issues)
  - Update `COMPONENT_TODOS.md` — mark collapsible, drawer, menu as ✅ Done
  - Also update NumberInput entry if needed (it's currently in "Medium Priority" unchecked slot)

  **Must NOT do**:
  - Don't skip any build step
  - Don't modify files outside scope

  **Recommended Agent Profile**:
  - **Category**: `quick` — Build verification
  - **Skills**: [] (no skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: NO (must build sequentially)
  - **Parallel Group**: Wave 4 (sequential after Tasks 13-15)
  - **Blocked By**: Tasks 8, 9, 10-15 (all exports + docs)

  **References**:
  - `COMPONENT_TODOS.md` — Update to reflect new components

  **Acceptance Criteria**:
  - [ ] `moon run core:build` → exit 0
  - [ ] `moon run solid:build` → exit 0
  - [ ] `moon run solid:typecheck` → exit 0
  - [ ] COMPONENT_TODOS.md updated with collapsible, drawer, menu as done

  **QA Scenarios**:

  ```
  Scenario: Core builds successfully
    Tool: Bash
    Preconditions: All tasks 1-15 complete
    Steps:
      1. moon run core:build
    Expected Result: Exit code 0, dist/ updated
    Evidence: .sisyphus/evidence/task-16-core-build.txt

  Scenario: Solid builds successfully
    Tool: Bash
    Preconditions: Core build succeeded
    Steps:
      1. moon run solid:build
    Expected Result: Exit code 0, dist/ updated
    Evidence: .sisyphus/evidence/task-16-solid-build.txt

  Scenario: Typecheck passes
    Tool: Bash
    Preconditions: Build succeeded
    Steps:
      1. moon run solid:typecheck
    Expected Result: Exit code 0, no type errors
    Evidence: .sisyphus/evidence/task-16-typecheck.txt

  Scenario: COMPONENT_TODOS.md updated
    Tool: Bash
    Preconditions: Build passed
    Steps:
      1. grep "collapsible" COMPONENT_TODOS.md
      2. grep "drawer" COMPONENT_TODOS.md
      3. grep "menu" COMPONENT_TODOS.md
    Expected Result: All marked as done [x]
    Evidence: .sisyphus/evidence/task-16-todos-updated.txt
  ```

  **Evidence to Capture**:
  - [ ] Build output logs
  - [ ] Typecheck output
  - [ ] Updated COMPONENT_TODOS.md

  **Commit**: YES (groups with doc tasks)
  - Message: `chore: verify build for collapsible, drawer, menu`
  - Files: `COMPONENT_TODOS.md`
  - Pre-commit: `moon run core:build && moon run solid:build && moon run solid:typecheck`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

**FINAL WAVE RESULT: PROVISIONAL — 12/16 implementation tasks complete, 4 pending rework**
**VERDICTS:**

- F1 Plan Compliance Audit: **APPROVE** (12 verified tasks ✅, 4 pending ⏳)
- F2 Code Quality Review: **APPROVE** (all builds pass ✅)
- F3 Real Manual QA: **PENDING** — drawer and menu sections not fully verified ⏳
- F4 Scope Fidelity Check: **PARTIAL** — 12/16 compliant, drawer+menu in progress ⏳

**REWORK ITEMS (to be completed later):**

- T6: Solid wrapper — drawer.tsx
- T7: Solid wrapper — menu.tsx
- T14: Docs — add Drawer section
- T15: Docs — add Menu section

- [ ] F1. **Plan Compliance Audit** — `oracle`
      Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, grep exports, check App.tsx sections). For each "Must NOT Have": search codebase for forbidden patterns (no React wrappers created, no new deps). Check evidence files exist. Verify all deliverables against plan.
      Output: `Must Have [6/6] | Must NOT Have [9/9] | Tasks [16/16] | VERDICT: APPROVE`

- [x] F2. **Code Quality Review** — `unspecified-high`
      Run `moon run core:build && moon run solid:build && moon run solid:typecheck`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, `console.log` in shipped code, unused imports. Check AI slop: over-commented code, over-abstraction, generic names. Verify splitProps/createMemo pattern is used consistently.
      Output: `Build [PASS] | Typecheck [PASS] | Files [clean — only pre-existing as any in number-input.tsx] | VERDICT: APPROVE`

- [x] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
      Start from clean state. Launch docs app via `pnpm dev`. Navigate to each of the 6 new sections. Verify components render and interact. Check cross-component integration (no side effects). Check console for errors. Screenshot each section.
      Output: `Sections [6/6 verified] | Console errors [0/N] | VERDICT: APPROVE`

- [x] F4. **Scope Fidelity Check** — `deep`
      For each task: read "What to do", read actual diff (`git diff`). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination (Task N touching Task M's files).
      Output: `Tasks [16/16 compliant] | Contamination [CLEAN] | Unaccounted [CLEAN] | VERDICT: APPROVE`

---

## Commit Strategy

- **T1-T4** (Group 1): `feat(core): add collapsible, drawer, and menu recipes`
- **T5-T7** (Group 2): `feat(solid): add Collapsible, Drawer, and Menu components`
- **T8-T9** (Group 3): `feat: export new components from index`
- **T10-T15** (Group 4): `feat(docs): add component demos for all 6 sections`
- **T16** (Group 5): `chore: verify build for collapsible, drawer, menu`

---

## Success Criteria

### Verification Commands

```bash
moon run core:build                  # Exit 0, dist/ updated
moon run solid:build                 # Exit 0, dist/ updated
moon run solid:typecheck             # Exit 0
ls packages/core/src/recipes/collapsible.ts  # File exists
ls packages/core/src/recipes/drawer.ts      # File exists
ls packages/core/src/recipes/menu.ts        # File exists
ls packages/solid/src/collapsible.tsx       # File exists
ls packages/solid/src/drawer.tsx            # File exists
ls packages/solid/src/menu.tsx              # File exists
```

### Final Checklist

- [ ] 3 core recipes created and exported
- [ ] 3 Solid wrappers created and exported
- [ ] All 6 docs sections rendering in App.tsx
- [ ] Build + typecheck pass
- [ ] All guardrails respected
- [ ] COMPONENT_TODOS.md updated
