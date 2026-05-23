# Plan: Multi-Framework Support (Shared Core + React)

## TL;DR

> **Quick Summary**: Extract shared styling recipes into a new `@ui/core` package, refactor existing Solid components to consume from core, and create a new `@ui/react` package with React equivalents of all 5 components — all while keeping the public API of `@ui/solid` unchanged.
>
> **Deliverables**:
>
> - `packages/core/` — `@ui/core` with tv.ts, theme.css, and 5 recipe files
> - `packages/ui/` — `@ui/solid` refactored (internal imports changed, public API identical)
> - `packages/react/` — `@ui/react` with 5 React components
> - `packages/cli/` — Updated with `--framework` flag
>
> **Estimated Effort**: Medium (10-14 tasks across 3 waves)
> **Parallel Execution**: YES — 3 waves, max 7 concurrent tasks
> **Critical Path**: Core infrastructure → Recipe extraction → Framework components → CLI update

---

## Context

### Original Request

"Currently the tsup.config only supports Solid JSX. If I want the UI to also include another UI library like React, what should I do?"

### Interview Summary

**Key Decisions**:

- Add React support (only — not Vue/Svelte for now)
- Architecture: **Shared Core + Wrappers** (extract recipes into `@ui/core`, each framework has thin wrappers)
- All 5 existing components get React versions: Button, Input, Dialog, Select, Toast
- CLI gets `--framework <solid|react>` flag
- No automated tests (agent QA only)
- Docs site updates are explicitly out of scope

**Metis Review Findings**:

- `tv.ts` is already a framework-agnostic `createTV` wrapper — can extract as-is
- Two variant patterns exist: **flat** (Button) and **multi-slot** (Input, Dialog, Select, Toast)
- Multi-slot pattern: `styles = theVariants()` called in component body — in React this needs `useMemo` for optimal perf
- `@ark-ui/solid` imports need mapping to `@ark-ui/react` equivalents
- `theme.css` is a Tailwind v4 `@theme` block — purely framework-agnostic

---

## Work Objectives

### Core Objective

Transform the single-framework Solid library into a multi-framework UI library with shared styling core, without breaking existing Solid consumers.

### Concrete Deliverables

- `packages/core/src/tv.ts` — tailwind-variants wrapper (moved from ui/)
- `packages/core/src/theme.css` — CSS variables (moved from ui/)
- `packages/core/src/recipes/*.ts` — 5 recipe files extracted from components
- `packages/ui/src/*.tsx` — 5 Solid components refactored to import recipes from core
- `packages/react/src/*.tsx` — 5 new React components using `@ark-ui/react`
- `packages/cli/src/commands/add.ts` — updated with `--framework` flag

### Definition of Done

- [x] `pnpm build` succeeds for all 3 packages (core, solid, react)
- [x] `@ui/solid` public API unchanged (same exports from index.ts)
- [x] `@ui/react` exports same component API as `@ui/solid` (same prop names, same behavior)
- [x] CLI `ui add button --framework react` copies React version
- [x] CLI `ui add button --framework solid` copies Solid version (existing behavior preserved)
- [x] All QA scenarios pass for both framework packages

### Must Have

- All `@ui/solid` exports must remain available (backward compat)
- `@ui/react` must have feature parity with `@ui/solid` for the 5 components
- Both packages must produce correct JSX output (no Solid JSX in React build, no React JSX in Solid build)
- CLI must accept `--framework` with values `solid` or `react`

### Must NOT Have (Guardrails)

- No changes to existing `@ui/solid` public API (no renaming exports, no removing features)
- No framework-specific code leaking into core (core must be pure TS, no JSX, no framework imports)
- No changes to docs app
- No automated test setup (as requested)
- No Vue/Svelte packages — plan scope is React only

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed.
> Acceptance criteria requiring "user manually tests/confirms" are FORBIDDEN.

### Test Decision

- **Infrastructure exists**: NO
- **Automated tests**: NONE (as requested)
- **Agent-Executed QA**: ALWAYS — Each task includes Playwright/curl/interactive_bash scenarios

### QA Policy

Every task MUST include agent-executed QA scenarios. Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Core recipes** (pure functions): Bash REPL — import recipe, call with args, verify output string
- **Solid/React components**: Build check + typecheck + tsc --noEmit
- **CLI**: Bash — run command, verify file output

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — 7 parallel tasks):
├── T1: Core package infrastructure
├── T2: Extract Button recipe to core
├── T3: Extract Input recipe to core
├── T4: Extract Dialog recipe to core
├── T5: Extract Select recipe to core
├── T6: Extract Toast recipe to core
└── T7: Core index.ts barrel + build verification

Wave 2 (Framework components — 12 parallel tasks):
├── T8: Refactor Solid Button to use @ui/core
├── T9: Refactor Solid Input to use @ui/core
├── T10: Refactor Solid Dialog to use @ui/core
├── T11: Refactor Solid Select to use @ui/core
├── T12: Refactor Solid Toast to use @ui/core
├── T13: Create React package infrastructure
├── T14: Create React Button
├── T15: Create React Input
├── T16: Create React Dialog
├── T17: Create React Select
├── T18: Create React Toast
└── T19: React package index.ts + build verification

Wave 3 (Integration):
├── T20: Update CLI with --framework flag
└── T21: Full workspace build + smoke test

Final Verification Wave:
├── F1: Plan compliance audit (oracle)
├── F2: Code quality review
├── F3: Real QA — all scenarios
└── F4: Scope fidelity check
```

**Critical Path**: T1 → T7 → T8-19 (any) → T20 → T21 → F1-F4
**Parallel Speedup**: ~65% faster than sequential
**Max Concurrent**: 12 (Wave 2)

---

## TODOs

- [x] 1. Create Core Package Infrastructure

  **What to do**:
  - Create `packages/core/` directory structure
  - Create `packages/core/package.json` with:
    - `name: "@ui/core"`
    - `type: "module"`
    - Same build scripts as `packages/ui/`
    - `dependencies: { "tailwind-variants": "^3.0.0", "tailwind-merge": "^3.5.0" }`
    - No peer deps (framework-agnostic)
  - Create `packages/core/tsconfig.json` extending `../../tsconfig.base.json`
  - Create `packages/core/tsup.config.ts` with:
    - Entry: `src/index.ts`
    - Format: `['esm', 'cjs']`
    - `dts: true`
    - NO JSX configuration (pure TS)
    - `external: ['tailwind-variants']`
  - Move `packages/ui/src/tv.ts` → `packages/core/src/tv.ts` (identical content — `createTV` wrapper)
  - Move `packages/ui/src/theme.css` → `packages/core/src/theme.css` (single canonical source)
  - Update the moved `theme.css` — confirm it has no Solid-specific references (it shouldn't, it's pure CSS)
  - Add `packages/core/src/types.ts` re-exporting `VariantProps` from `tailwind-variants`:
    ```ts
    export type { VariantProps } from "tailwind-variants";
    ```

  **Must NOT do**:
  - Do NOT add any JSX/TSX files to core
  - Do NOT import from solid-js, react, or any framework
  - Do NOT add ark-ui dependencies

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward file creation, copying existing patterns
  - **Skills**: `[]`
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2-7)
  - **Blocks**: All subsequent tasks
  - **Blocked By**: None

  **References**:
  - `packages/ui/package.json` — Copy structure patterns (scripts, tsconfig path)
  - `packages/ui/tsup.config.ts` — Reference for tsup config structure (remove JSX parts)
  - `packages/ui/src/tv.ts` — File to move to core (content stays identical)
  - `packages/ui/src/theme.css` — File to move to core (content stays identical)

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Core package builds and exports tv
    Tool: Bash
    Preconditions: packages/core/ directory exists with all config files
    Steps:
      1. Run: pnpm --filter @ui/core build
      2. Check: ls packages/core/dist/ shows index.js, index.d.ts, tv.js, tv.d.ts
      3. Run: node -e "const m = require('./packages/core/dist/tv'); console.log(typeof m.tv)"
    Expected Result: Output is 'function' — tv is exported and callable
    Evidence: .sisyphus/evidence/task-1-core-build.txt

  Scenario: theme.css is present in core
    Tool: Bash
    Preconditions: theme.css moved to packages/core/src/
    Steps:
      1. Check: grep '@theme' packages/core/src/theme.css
    Expected Result: File contains @theme directive with color variables
    Evidence: .sisyphus/evidence/task-1-theme-exists.txt
  ```

  **Commit**: YES
  - Message: `feat(core): scaffold @ui/core package with tv and theme`
  - Files: `packages/core/*`
  - Pre-commit: `pnpm --filter @ui/core build`

---

- [x] 2. Extract Button Recipe to Core

  **What to do**:
  - Create `packages/core/src/recipes/button.ts`
  - Extract the `buttonVariants` tv() call from `packages/ui/src/button.tsx` into this file
  - Export `buttonVariants` as the default and named export
  - Import `tv` from `../tv`
  - The recipe is the same `tv({ base: ..., variants: { variant: {...}, size: {...} }, defaultVariants: {...} })`
  - Re-export the `VariantProps` type: `export type ButtonVariants = VariantProps<typeof buttonVariants>`

  **Content to extract** (from `packages/ui/src/button.tsx` lines 4-26):
  - The entire `buttonVariants = tv({...})` call
  - Remove the `import { tv, type VariantProps } from './tv'` from the component — it moves to core

  **Must NOT do**:
  - Do NOT change the tv() configuration — must produce identical class strings
  - Do NOT import any framework code

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single file creation, pure code extraction
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3-7)
  - **Blocks**: Tasks 8, 14 (Solid and React Button)
  - **Blocked By**: Task 1

  **References**:
  - `packages/ui/src/button.tsx:4-26` — Source of the recipe to extract
  - `packages/ui/src/tv.ts` — The tv import source (moved to core in T1)

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: Button recipe produces correct class string
    Tool: Bash
    Preconditions: Task 1 completed, packages/core ready
    Steps:
      1. Build: pnpm --filter @ui/core build
      2. Run: node -e "
          const { buttonVariants } = require('./packages/core/dist/recipes/button');
          console.log(buttonVariants({ variant: 'default', size: 'sm' }));
        "
    Expected Result: Output is a class string containing 'inline-flex items-center justify-center'
    Evidence: .sisyphus/evidence/task-2-button-recipe.txt

  Scenario: Recipe exists as TS source file
    Tool: Bash
    Steps:
      1. Check: head -5 packages/core/src/recipes/button.ts
    Expected Result: File starts with import from '../tv' and exports buttonVariants
    Evidence: .sisyphus/evidence/task-2-recipe-source.txt
  ```

  **Commit**: YES (groups with T3-T7)
  - Message: `feat(core): extract button recipe`
  - Files: `packages/core/src/recipes/button.ts`, `packages/ui/src/button.tsx`
  - Pre-commit: `pnpm --filter @ui/core build`

---

- [x] 3. Extract Input Recipe to Core

  **What to do**:
  - Create `packages/core/src/recipes/input.ts`
  - Extract `inputVariants` tv() call from `packages/ui/src/input.tsx:5-23`
  - Same pattern as Task 2 — the tv() with multi-slots (root, label, input, description, error)
  - Export `inputVariants` and type `InputVariants`

  **Must NOT do**: Same as Task 2

  **Recommended Agent Profile**: Same as Task 2 (`quick`)

  **Parallelization**: Same as Task 2

  **References**:
  - `packages/ui/src/input.tsx:5-23` — Source recipe
  - `packages/core/src/tv.ts` — tv import

  **QA Scenarios**:
  Same pattern as Task 2 — verify recipe builds and produces class strings with expected Tailwind classes.

  **Commit**: YES (groups with T2, T4-T7)
  - Message: `feat(core): extract input recipe`
  - Files: `packages/core/src/recipes/input.ts`

---

- [x] 4. Extract Dialog Recipe to Core

  **What to do**:
  - Create `packages/core/src/recipes/dialog.ts`
  - Extract `dialogVariants` tv() call from `packages/ui/src/dialog.tsx:6-17`
  - Multi-slot recipe with: backdrop, positioner, content, header, footer, title, description, closeTrigger
  - Export `dialogVariants` and type `DialogVariants`

  **References**: `packages/ui/src/dialog.tsx:6-17`

  **QA Scenarios**: Same pattern — verify recipe compiles and produces expected class strings.

  **Commit**: YES (groups)
  - Message: `feat(core): extract dialog recipe`

---

- [x] 5. Extract Select Recipe to Core

  **What to do**:
  - Create `packages/core/src/recipes/select.ts`
  - Extract `selectVariants` tv() call from `packages/ui/src/select.tsx:6-31`
  - Multi-slot recipe with many slots: root, label, control, trigger, valueText, indicator, positioner, content, item, itemText, itemIndicator
  - Also has an `error` variant
  - Export `selectVariants` and type `SelectVariants`

  **References**: `packages/ui/src/select.tsx:6-31`

  **QA Scenarios** (follows same pattern as T2):

  ```
  Scenario: Select recipe produces correct class string
    Tool: Bash
    Steps:
      1. pnpm --filter @ui/core build
      2. node -e "const { selectVariants } = require('./packages/core/dist/recipes/select'); console.log(selectVariants().root)"
    Expected Result: Output contains 'grid gap-1.5 w-full' (the root slot class)
    Evidence: .sisyphus/evidence/task-5-select-recipe.txt

  Scenario: Select recipe with error variant
    Tool: Bash
    Steps:
      1. node -e "const { selectVariants } = require('./packages/core/dist/recipes/select'); console.log(selectVariants({ error: true }).control)"
    Expected Result: Output contains 'border-ui-destructive' (error variant applied)
    Evidence: .sisyphus/evidence/task-5-select-error.txt
  ```

  **Commit**: YES (groups)
  - Message: `feat(core): extract select recipe`

---

- [x] 6. Extract Toast Recipe to Core

  **What to do**:
  - Create `packages/core/src/recipes/toast.ts`
  - Extract `toastVariants` tv() call from `packages/ui/src/toast.tsx:5-28`
  - Multi-slot recipe with: root, title, description, closeTrigger, actionTrigger
  - Has `variant` variant: default, destructive, success, warning
  - Export `toastVariants` and type `ToastVariants`

  **References**: `packages/ui/src/toast.tsx:5-28`

  **QA Scenarios** (follows same pattern as T2):

  ```
  Scenario: Toast recipe produces default variant classes
    Tool: Bash
    Steps:
      1. pnpm --filter @ui/core build
      2. node -e "const { toastVariants } = require('./packages/core/dist/recipes/toast'); console.log(toastVariants().root)"
    Expected Result: Output contains 'bg-ui-background border-ui-border' (default variant)
    Evidence: .sisyphus/evidence/task-6-toast-recipe.txt

  Scenario: Toast recipe with destructive variant
    Tool: Bash
    Steps:
      1. node -e "const { toastVariants } = require('./packages/core/dist/recipes/toast'); console.log(toastVariants({ variant: 'destructive' }).root)"
    Expected Result: Output contains 'bg-ui-destructive text-ui-destructive-foreground'
    Evidence: .sisyphus/evidence/task-6-toast-destructive.txt
  ```

  **Commit**: YES (groups)
  - Message: `feat(core): extract toast recipe`

---

- [x] 7. Core Barrel Exports + Build Verification

  **What to do**:
  - Create `packages/core/src/index.ts` that re-exports everything:
    ```ts
    export { tv } from "./tv";
    export type { VariantProps } from "./tv"; // or from './types'
    export { buttonVariants } from "./recipes/button";
    export type { ButtonVariants } from "./recipes/button";
    export { inputVariants } from "./recipes/input";
    export type { InputVariants } from "./recipes/input";
    export { dialogVariants } from "./recipes/dialog";
    export type { DialogVariants } from "./recipes/dialog";
    export { selectVariants } from "./recipes/select";
    export type { SelectVariants } from "./recipes/select";
    export { toastVariants } from "./recipes/toast";
    export type { ToastVariants } from "./recipes/toast";
    ```
  - Run `pnpm --filter @ui/core build` and verify it succeeds
  - Update root `package.json` if needed (pnpm-workspace.yaml already auto-discovers)

  **Parallelization**: Blocked by T2-T6

  **QA Scenarios**:

  ```
  Scenario: Core package builds successfully
    Tool: Bash
    Steps:
      1. pnpm --filter @ui/core build
      2. ls packages/core/dist/
    Expected Result: dist/ contains all recipe JS files and .d.ts files
    Evidence: .sisyphus/evidence/task-7-core-build.txt

  Scenario: All recipes accessible from barrel
    Tool: Bash
    Steps:
      1. node -e "const m = require('./packages/core/dist'); console.log(Object.keys(m))"
    Expected Result: Object keys include tv, buttonVariants, inputVariants, dialogVariants, selectVariants, toastVariants
    Evidence: .sisyphus/evidence/task-7-core-barrel.txt
  ```

  **Commit**: YES (groups with T2-T6)
  - Message: `feat(core): add barrel exports and build verification`
  - Files: `packages/core/src/index.ts`

---

- [x] 8. Refactor Solid Button to Use @ui/core

  **What to do**:
  - Update `packages/ui/src/button.tsx`:
    - Change `import { tv, type VariantProps } from './tv'` → `import { buttonVariants } from '@ui/core/recipes/button'`
    - Add `import type { VariantProps } from '@ui/core'`
    - Remove the local `buttonVariants = tv({...})` block (now in core)
    - Keep the `Button` component itself identical — uses `buttonVariants(...)` which now comes from core
    - The `type ButtonProps` should use `VariantProps<typeof buttonVariants>` — now imported from @ui/core
  - Add `@ui/core` to `packages/ui/package.json` dependencies:
    - `"dependencies": { "@ui/core": "workspace:*", ...existing... }`
  - Update `packages/ui/tsup.config.ts`:
    - Add `@ui/core` to the `external` array

  **Must NOT do**:
  - Do NOT change the Button component's behavior, props, or exported API
  - Do NOT change any other component files

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 9-19)
  - **Blocks**: Task 21
  - **Blocked By**: Task 7

  **References**:
  - `packages/ui/src/button.tsx` — File to modify
  - `packages/core/src/recipes/button.ts` — New import source
  - `packages/ui/package.json` — Add dependency
  - `packages/ui/tsup.config.ts` — Add external

  **QA Scenarios**:

  ```
  Scenario: Solid Button builds and typechecks
    Tool: Bash
    Steps:
      1. pnpm --filter @ui/solid build
      2. pnpm --filter @ui/solid typecheck
    Expected Result: Both pass with no errors
    Evidence: .sisyphus/evidence/task-8-solid-button-build.txt

  Scenario: Button export still available
    Tool: Bash
    Steps:
      1. node -e "const m = require('./packages/ui/dist'); console.log(typeof m.Button)"
    Expected Result: 'function' (Button is still exported)
    Evidence: .sisyphus/evidence/task-8-solid-button-export.txt
  ```

  **Commit**: YES (groups with T9-T12)
  - Message: `refactor(solid): use @ui/core recipes`
  - Files: `packages/ui/src/button.tsx`, `packages/ui/package.json`, `packages/ui/tsup.config.ts`

---

- [x] 9. Refactor Solid Input to Use @ui/core

  **What to do**:
  - Update `packages/ui/src/input.tsx`:
    - Replace `import { tv, type VariantProps } from './tv'` with recipe imports from `@ui/core`
    - Remove local `inputVariants = tv({...})` block
    - Keep the `Input` component identical — uses `inputVariants({ error: !!local.error })`
    - Update type imports: `type VariantProps` from `@ui/core`

  **Parallelization**: Same as T8 (Wave 2, parallel with all)

  **References**: Same pattern as T8 but for Input component

  **Commit**: YES (groups with T8, T10-T12)

---

- [x] 10. Refactor Solid Dialog to Use @ui/core

  **What to do**:
  - Update `packages/ui/src/dialog.tsx`:
    - Replace tv import with `dialogVariants` from `@ui/core/recipes/dialog`
    - Remove local `dialogVariants = tv({...})` block
    - All component functions use `dialogVariants()` — stays identical

  **Parallelization**: Same as T8

  **Commit**: YES (groups)

---

- [x] 11. Refactor Solid Select to Use @ui/core

  **What to do**:
  - Update `packages/ui/src/select.tsx`:
    - Replace tv import with `selectVariants` from `@ui/core/recipes/select`
    - Remove local `selectVariants = tv({...})` block

  **Parallelization**: Same as T8

  **Commit**: YES (groups)

---

- [x] 12. Refactor Solid Toast to Use @ui/core

  **What to do**:
  - Update `packages/ui/src/toast.tsx`:
    - Replace tv import with `toastVariants` from `@ui/core/recipes/toast`
    - Remove local `toastVariants = tv({...})` block

  **Parallelization**: Same as T8

  **Commit**: YES (groups)

---

- [x] 13. Create React Package Infrastructure

  **What to do**:
  - Create `packages/react/` directory
  - Create `packages/react/package.json`:
    ```json
    {
      "name": "@ui/react",
      "version": "0.1.0",
      "private": true,
      "type": "module",
      "main": "./dist/index.js",
      "module": "./dist/index.js",
      "types": "./dist/index.d.ts",
      "exports": {
        ".": {
          "development": "./src/index.ts",
          "types": "./dist/index.d.ts",
          "import": "./dist/index.js",
          "require": "./dist/index.cjs"
        }
      },
      "files": ["dist/", "src/"],
      "scripts": {
        "build": "tsup",
        "dev": "tsup --watch",
        "clean": "rm -rf dist",
        "typecheck": "tsc --noEmit"
      },
      "dependencies": {
        "@ui/core": "workspace:*",
        "tailwind-merge": "^3.5.0",
        "tailwind-variants": "^3.0.0"
      },
      "peerDependencies": {
        "react": "^18.0.0 || ^19.0.0",
        "react-dom": "^18.0.0 || ^19.0.0",
        "@ark-ui/react": "^5.0.0",
        "tailwindcss": "^4.0.0"
      },
      "devDependencies": {
        "tsup": "^8.0.0",
        "typescript": "^5.0.0",
        "@types/react": "^19.0.0",
        "@types/react-dom": "^19.0.0"
      }
    }
    ```
  - Create `packages/react/tsconfig.json` extending `../../tsconfig.base.json`
    - Override compilerOptions: `"jsx": "react-jsx"`, `"jsxImportSource": "react"`
  - Create `packages/react/tsup.config.ts`:
    ```ts
    import { defineConfig } from "tsup";
    export default defineConfig({
      entry: ["src/index.ts"],
      format: ["esm", "cjs"],
      dts: true,
      sourcemap: true,
      clean: true,
      external: ["react", "react-dom", "@ark-ui/react", "@ui/core", "tailwind-variants"],
      esbuildOptions(options) {
        options.jsx = "automatic";
        options.jsxImportSource = "react";
      },
    });
    ```
  - Create empty `packages/react/src/index.ts` (filled by T19)
  - Install deps: `pnpm install`

  **Must NOT do**:
  - Do NOT add any Solid deps to the React package
  - Do NOT copy the Solid tsup config without changing JSX settings

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 8-12, 14-19)
  - **Blocks**: Tasks 14-19
  - **Blocked By**: Task 7

  **References**:
  - `packages/ui/package.json` — Reference for structure
  - `packages/ui/tsup.config.ts` — Reference for tsup config pattern

  **QA Scenarios**:

  ```
  Scenario: React package config correct
    Tool: Bash
    Steps:
      1. Check: cat packages/react/tsup.config.ts | grep 'jsxImportSource'
    Expected Result: Output contains 'jsxImportSource = 'react'' (not 'solid-js')
    Evidence: .sisyphus/evidence/task-13-react-jsx-config.txt

  Scenario: Basic build works
    Tool: Bash
    Steps:
      1. pnpm --filter @ui/react build
    Expected Result: Build succeeds, dist/ has index.js
    Evidence: .sisyphus/evidence/task-13-react-build-base.txt
  ```

  **Commit**: YES
  - Message: `feat(react): scaffold @ui/react package`
  - Files: `packages/react/*`

---

- [x] 14. Create React Button Component

  **What to do**:
  - Create `packages/react/src/button.tsx`:

    ```tsx
    import { forwardRef, type ButtonHTMLAttributes } from "react";
    import { buttonVariants } from "@ui/core/recipes/button";
    import type { VariantProps } from "@ui/core";

    type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
      VariantProps<typeof buttonVariants>;

    const Button = forwardRef<HTMLButtonElement, ButtonProps>(
      ({ className, variant, size, ...props }, ref) => {
        return (
          <button
            ref={ref}
            className={buttonVariants({ variant, size, class: className })}
            {...props}
          />
        );
      },
    );
    Button.displayName = "Button";

    export { Button, buttonVariants };
    export type { ButtonProps };
    ```

  **Must NOT do**:
  - Do NOT use Solid-js patterns (no `splitProps`, no `Component<Props>`, no `<Index>`)
  - Do NOT import from `@ark-ui/solid` — use only `@ark-ui/react` if needed

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 8-13, 15-19)
  - **Blocked By**: Task 13 (React infra), Task 7 (recipes ready)

  **QA Scenarios**:

  ```
  Scenario: React Button builds and typechecks
    Tool: Bash
    Steps:
      1. pnpm --filter @ui/react build
      2. pnpm --filter @ui/react typecheck
    Expected Result: Both pass
    Evidence: .sisyphus/evidence/task-14-react-button-build.txt

  Scenario: Button export exists
    Tool: Bash
    Steps:
      1. grep 'export.*Button' packages/react/src/button.tsx
    Expected Result: Button and buttonVariants exported
    Evidence: .sisyphus/evidence/task-14-react-button-exports.txt
  ```

  **Commit**: YES (groups with T15-T18)
  - Message: `feat(react): add Button component`
  - Files: `packages/react/src/button.tsx`

---

- [x] 15. Create React Input Component

  **What to do**:
  - Create `packages/react/src/input.tsx`:

    ```tsx
    import { forwardRef, type InputHTMLAttributes } from "react";
    import { Field } from "@ark-ui/react/field";
    import { inputVariants } from "@ui/core/recipes/input";

    type InputProps = {
      label?: string;
      description?: string;
      error?: string;
      className?: string;
    } & InputHTMLAttributes<HTMLInputElement>;

    const Input = forwardRef<HTMLInputElement, InputProps>(
      ({ label, description, error, className, ...props }, ref) => {
        const styles = inputVariants({ error: !!error });
        return (
          <Field.Root className={styles.root({ class: className })} invalid={!!error}>
            {label && <Field.Label className={styles.label()}>{label}</Field.Label>}
            <Field.Input className={styles.input()} ref={ref} {...props} />
            {description && !error && (
              <Field.HelperText className={styles.description()}>{description}</Field.HelperText>
            )}
            <Field.ErrorText className={styles.error()}>{error}</Field.ErrorText>
          </Field.Root>
        );
      },
    );
    Input.displayName = "Input";

    export { Input, inputVariants };
    export type { InputProps };
    ```

  **Key difference from Solid**: React uses `forwardRef` and `className` instead of `class`.

  **Parallelization**: Same as T14

  **References**: `packages/ui/src/input.tsx` for behavior parity

  **Commit**: YES (groups)
  - Message: `feat(react): add Input component`

---

- [x] 16. Create React Dialog Component

  **What to do**:
  - Create `packages/react/src/dialog.tsx`
  - Use `@ark-ui/react/dialog` for `ArkDialog`
  - Re-export `DialogRoot = ArkDialog.Root` and `DialogTrigger = ArkDialog.Trigger` directly
  - Create `DialogContent` using `forwardRef`, `ArkDialog.Backdrop`, `ArkDialog.Positioner`, `ArkDialog.Content`, `ArkDialog.CloseTrigger`
  - Use `dialogVariants` from `@ui/core/recipes/dialog`
  - Use `className` instead of `class`, same SVG close icon

  **Important**: Ark UI React's Dialog components (`Backdrop`, `Positioner`, `Content`, etc.) are direct children — no explicit Portal wrapper needed (Ark UI handles it internally).

  **Parallelization**: Same as T14

  **References**: `packages/ui/src/dialog.tsx` for behavior parity

  **Commit**: YES (groups)
  - Message: `feat(react): add Dialog component`

---

- [x] 17. Create React Select Component

  **What to do**:
  - Create `packages/react/src/select.tsx`
  - Use `@ark-ui/react/select` for ArkSelect components
  - Use `Array.map()` instead of Solid's `<Index>` for item rendering
  - Use `createPortal` from `react-dom` OR `@ark-ui/react/portal` for dropdown portal
  - Import and re-export `createListCollection` from `@ark-ui/react/select`
  - Apply `selectVariants` from `@ui/core/recipes/select`

  **Key patterns for React**:
  - `ArkSelect.Root`, `ArkSelect.Label`, `ArkSelect.Control`, etc.
  - Items mapped with `.map()`:
    ```tsx
    {
      items.map((item) => (
        <ArkSelect.Item key={item.value} item={item} className={styles.item()}>
          <ArkSelect.ItemText>{item.label}</ArkSelect.ItemText>
          <ArkSelect.ItemIndicator className={styles.itemIndicator()}>
            <svg>...</svg>
          </ArkSelect.ItemIndicator>
        </ArkSelect.Item>
      ));
    }
    ```

  **Parallelization**: Same as T14

  **References**: `packages/ui/src/select.tsx` for behavior parity

  **Commit**: YES (groups)
  - Message: `feat(react): add Select component`

---

- [x] 18. Create React Toast Component

  **What to do**:
  - Create `packages/react/src/toast.tsx`
  - Use `@ark-ui/react/toast` for ArkToast components
  - Import and re-export `createToaster` from `@ark-ui/react/toast`
  - Create `Toaster` component using React's render pattern (Solid uses render callbacks — React may use direct children or render props)
  - Apply `toastVariants` from `@ui/core/recipes/toast`

  **Key difference from Solid**: Solid uses `<ArkToaster>{(toast) => <Toast.Root>...</Toast.Root>}</ArkToaster>`. The React equivalent may differ — check Ark UI React Toast docs for exact API.

  **Parallelization**: Same as T14

  **References**: `packages/ui/src/toast.tsx` for behavior parity

  **Commit**: YES (groups)
  - Message: `feat(react): add Toast component`

---

- [x] 19. React Package Barrel + Build

  **What to do**:
  - Create `packages/react/src/index.ts`:
    ```tsx
    export { Button, buttonVariants } from "./button";
    export type { ButtonProps } from "./button";
    export { Input, inputVariants } from "./input";
    export type { InputProps } from "./input";
    export {
      DialogRoot,
      DialogTrigger,
      DialogContent,
      DialogHeader,
      DialogFooter,
      DialogTitle,
      DialogDescription,
      dialogVariants,
    } from "./dialog";
    export {
      SelectRoot,
      SelectLabel,
      SelectControl,
      SelectTrigger,
      SelectValue,
      SelectContent,
      SelectItem,
      SelectItemText,
      SelectItemIndicator,
      selectVariants,
      createListCollection,
    } from "./select";
    export { createToaster, Toaster, toastVariants } from "./toast";
    ```
  - Run `pnpm --filter @ui/react build` and fix any build issues
  - Run `pnpm --filter @ui/react typecheck` and fix any type errors

  **Must NOT do**:
  - The exports should mirror `@ui/solid`'s index.ts as closely as possible

  **Parallelization**: Blocked by T14-T18

  **QA Scenarios**:

  ```
  Scenario: React package builds with all components
    Tool: Bash
    Steps:
      1. pnpm --filter @ui/react build
      2. pnpm --filter @ui/react typecheck
    Expected Result: Both pass
    Evidence: .sisyphus/evidence/task-19-react-build.txt

  Scenario: All component exports available
    Tool: Bash
    Steps:
      1. node -e "const m = require('./packages/react/dist'); console.log(Object.keys(m).sort())"
    Expected Result: Exports include Button, Input, DialogRoot, SelectRoot, Toaster, etc.
    Evidence: .sisyphus/evidence/task-19-react-exports.txt
  ```

  **Commit**: YES
  - Message: `feat(react): add barrel exports and build verification`
  - Files: `packages/react/src/index.ts`

---

- [x] 20. Update CLI with --framework Flag

  **What to do**:
  - Update `packages/cli/src/index.ts`:
    - Add `--framework <solid|react>` option to the `add` command
    - Default to `solid` for backward compatibility
    - Pass the framework choice to `addComponent()`
  - Update `packages/cli/src/commands/add.ts`:
    - Change `addComponent(componentName, outputDir)` → `addComponent(componentName, outputDir, framework)`
    - Update the source path based on framework:
      - `solid` → `packages/ui/src/`
      - `react` → `packages/react/src/`
    - Component filenames are the same (`button.tsx`, `input.tsx`, etc.)
    - Copy `theme.css` from `packages/core/src/theme.css` (canonical source)

  **Must NOT do**:
  - Default behavior (`solid`) must remain identical to current behavior
  - Do NOT change the component names list

  **Parallelization**: Blocked by T7, T13

  **References**:
  - `packages/cli/src/index.ts` — Add option
  - `packages/cli/src/commands/add.ts` — Update source path logic

  **QA Scenarios**:

  ```
  Scenario: CLI --framework react copies React version
    Tool: Bash
    Preconditions: @ui/react build completed
    Steps:
      1. mkdir -p /tmp/ui-test-react
      2. node packages/cli/dist/index.js add button --framework react -o /tmp/ui-test-react
      3. grep 'from. react' /tmp/ui-test-react/button.tsx || grep 'forwardRef' /tmp/ui-test-react/button.tsx
    Expected Result: Output shows React-specific patterns (forwardRef or 'from react')
    Evidence: .sisyphus/evidence/task-20-cli-react.txt

  Scenario: CLI default (solid) copies Solid version
    Tool: Bash
    Steps:
      1. mkdir -p /tmp/ui-test-solid
      2. node packages/cli/dist/index.js add button -o /tmp/ui-test-solid
      3. grep 'splitProps' /tmp/ui-test-solid/button.tsx
    Expected Result: Output shows Solid-specific pattern (splitProps)
    Evidence: .sisyphus/evidence/task-20-cli-solid.txt
  ```

  **Commit**: YES
  - Message: `feat(cli): add --framework flag for react/solid`
  - Files: `packages/cli/src/index.ts`, `packages/cli/src/commands/add.ts`

---

- [x] 21. Full Workspace Build + Smoke Test

  **What to do**:
  - Run `pnpm build` (builds ALL packages in correct order)
  - Verify all 4 packages build: core, solid, react, cli
  - Run `pnpm --filter @ui/core typecheck`, `pnpm --filter @ui/solid typecheck`, `pnpm --filter @ui/react typecheck`
  - Fix any inter-package dependency issues
  - Quick smoke test: write small scripts that import from each package

  **Must NOT do**:
  - Don't add new packages or change existing package structure

  **Parallelization**: Blocked by T20

  **QA Scenarios**:

  ```
  Scenario: Full workspace build succeeds
    Tool: Bash
    Steps:
      1. pnpm build
    Expected Result: All packages build successfully (exit code 0)
    Evidence: .sisyphus/evidence/task-21-full-build.txt

  Scenario: TypeScript type checks pass
    Tool: Bash
    Steps:
      1. pnpm --filter @ui/core typecheck
      2. pnpm --filter @ui/solid typecheck
      3. pnpm --filter @ui/react typecheck
    Expected Result: All pass with no errors
    Evidence: .sisyphus/evidence/task-21-typechecks.txt
  ```

  **Commit**: YES
  - Message: `chore: build verification and cleanup`
  - Files: Misc fixes across packages

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

- [x] F1. **Plan Compliance Audit** — `oracle`
      Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, run build, check exports). For each "Must NOT Have": search for forbidden patterns (Solid JSX in React pkg, React imports in core, etc.) — reject with file:line if found. Check evidence files exist.
      Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — `unspecified-high`
      Run `pnpm build` (all packages). Run `tsc --noEmit` on each package. Check: `as any`, `@ts-ignore`, console.log in prod, commented-out code, unused imports. Check AI slop: over-abstraction, generic names.
      Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Types [PASS/FAIL] | VERDICT`

- [x] F3. **Real QA** — `unspecified-high`
      Execute EVERY QA scenario from every task. Test cross-task integration: can a React app import and render `@ui/react` components? Can a Solid app still import from `@ui/solid`?
      Output: `Scenarios [N/N pass] | Integration [PASS/FAIL] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep`
      For each task: read "What to do", read actual diff. Verify 1:1 everything built (no missing) and nothing beyond spec (no creep). Check "Must NOT do" compliance. Detect cross-package contamination.
      Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | VERDICT`

---

## Commit Strategy

- T1: `feat(core): scaffold @ui/core package with tv and theme`
- T2-T6: `feat(core): extract [component] recipe`
- T7: `feat(core): add barrel exports`
- T8-T12: `refactor(solid): use recipes from @ui/core`
- T13: `feat(react): scaffold @ui/react package`
- T14-T18: `feat(react): add [component] component`
- T19: `feat(react): add barrel exports`
- T20: `feat(cli): add --framework flag`
- T21: `chore: build verification and cleanup`

---

## Success Criteria

### Verification Commands

```bash
# Core builds
pnpm --filter @ui/core build        # Expected: produces dist/ with JS and .d.ts

# Solid builds
pnpm --filter @ui/solid build        # Expected: produces dist/ with Solid JSX

# React builds
pnpm --filter @ui/react build        # Expected: produces dist/ with React JSX

# CLI works
pnpm --filter create-ui build        # Expected: produces dist/index.js

# Full workspace
pnpm build                          # Expected: all 4 packages build successfully
```

### Final Checklist

- [x] `@ui/core/dist/index.js` exists and exports recipes
- [x] `@ui/solid/dist/index.js` exists and exports same API as before
- [x] `@ui/react/dist/index.js` exists and exports all 5 components
- [x] `ui add button --framework react` copies React version
- [x] `ui add button --framework solid` copies Solid version
- [x] No `solid-js` imports anywhere in `packages/react/`
- [x] No `react` imports anywhere in `packages/core/`
- [x] No framework imports anywhere in `packages/core/`
