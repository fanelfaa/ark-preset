# TanStack Router Init for apps/docs

## TL;DR

> **Quick Summary**: Initialize TanStack Router (Solid.js) in the docs site with file-based routing, migrate the existing App.tsx to `src/routes/index.tsx`, and fix the build script race condition.
>
> **Deliverables**:
>
> - `@tanstack/solid-router` + `@tanstack/solid-router-devtools` + `@tanstack/router-plugin` installed
> - Vite plugin configured with `target: 'solid'` and `autoCodeSplitting: true`
> - `src/routes/__root.tsx` — root layout with `<Outlet />` + devtools
> - `src/routes/index.tsx` — existing App.tsx content migrated as the `/` route
> - `src/main.tsx` — updated to use `RouterProvider` with generated `routeTree`
> - Build script fixed: `"vite build && tsc --noEmit"` (sequential, resolves race condition)
> - `src/routeTree.gen.ts` added to `.gitignore`
> - `src/App.tsx` deleted (dead code removed)
>
> **Estimated Effort**: Short
> **Parallel Execution**: YES — 2 waves
> **Critical Path**: Install deps → Configure vite → Create route files → Update main.tsx → Verify build

---

## Context

### Original Request

Initialize TanStack Router in `apps/docs` using the manual installation approach with Solid.js, then move the existing App.tsx content to `src/routes/index.tsx`.

### Interview Summary

**Key Discussions**:

- **Solid.js (not React)**: Use `@tanstack/solid-router` and `@tanstack/solid-router-devtools`
- **File-based routing**: Use `@tanstack/router-plugin/vite` with `target: 'solid'` and `autoCodeSplitting: true`
- **routeTree.gen.ts**: Add to `.gitignore` (not committed)
- **TanStackRouterDevtools**: Include in root layout

**Research Findings**:

- App.tsx is 1107 lines with 19 component demos (Button, Input, Dialog, Select, Toast, Switch, Checkbox, Tabs, Accordion, RadioGroup, Tooltip, DatePicker, NumberInput, Popover, Slider, Collapsible, Menu, Drawer)
- Current entry: `render(() => <App />, document.getElementById('root')!)`
- Solid.js uses `class` attribute (not `className`)
- Plugin must be placed BEFORE `vite-plugin-solid` in plugins array

### Metis Review

**Identified Gaps** (addressed):

- **Build race condition**: `tsc --noEmit & vite build` uses `&` (parallel). `tsc` fails because `routeTree.gen.ts` doesn't exist yet. Fix: change to `"vite build && tsc --noEmit"`.
- **Missing HMR pragma**: `/* @refresh reload */` needed in `main.tsx` for Solid HMR compatibility with router
- **TypeScript module augmentation**: `declare module '@tanstack/solid-router'` needed for type-safe router registration
- **Scope boundaries**: Single `/` route only — no nav sidebar, no splitting demos into sub-routes, no route transitions, no loading states

---

## Work Objectives

### Core Objective

Initialize TanStack Router with file-based routing in the Solid.js docs site, migrating the existing single-page App component into a proper router-driven architecture.

### Concrete Deliverables

- `apps/docs/package.json` — updated with new deps
- `apps/docs/vite.config.ts` — tanstackRouter plugin added
- `apps/docs/src/routes/__root.tsx` — root layout file
- `apps/docs/src/routes/index.tsx` — index route with migrated App content
- `apps/docs/src/main.tsx` — RouterProvider entry point
- `apps/docs/.gitignore` — routeTree.gen.ts excluded
- `apps/docs/src/App.tsx` — **deleted**

### Definition of Done

- [ ] `pnpm dev` starts without errors; all demos render in browser
- [ ] `pnpm build` succeeds (vite build + tsc --noEmit)
- [ ] TanStackRouterDevtools visible in dev mode
- [ ] `routeTree.gen.ts` is gitignored
- [ ] `App.tsx` is deleted

### Must Have

- Solid.js router packages installed (`@tanstack/solid-router`, `@tanstack/solid-router-devtools`, `@tanstack/router-plugin`)
- Vite plugin configured with `target: 'solid'` and `autoCodeSplitting: true`
- Plugin placed BEFORE `vite-plugin-solid` in the plugins array
- `src/routes/__root.tsx` with `<Outlet />` and `<TanStackRouterDevtools />`
- `src/routes/index.tsx` with all existing App.tsx component demo content
- `src/main.tsx` uses `RouterProvider` with `createRouter({ routeTree })`
- TypeScript module augmentation in main.tsx
- `/* @refresh reload */` pragma in main.tsx
- Build script changed from `&` (parallel) to `&&` (sequential)

### Must NOT Have (Guardrails)

- No routes beyond `/` (no `/about`, `/components/x`, etc.)
- No refactoring/cleaning of App.tsx demo code during migration
- No modifications to `packages/solid` or `packages/core`
- No navigation links in root layout (only one route — pointless)
- No route transitions, loading states, or animation libraries
- No changes to CSS, Tailwind config, or theme imports

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision

- **Infrastructure exists**: NO
- **Automated tests**: None (docs-only, no test infra)
- **Agent-Executed QA**: ALWAYS — each task includes verifiable scenarios

### QA Policy

Every task MUST include agent-executed QA scenarios. Evidence saved to `.sisyphus/evidence/`.

- **Build verification**: `bash` with `vite build && tsc --noEmit`
- **Dev server verification**: `bash` with timeout + Playwright browser snapshot
- **File existence checks**: `bash` with `ls` and `test -f` commands
- **Git status checks**: `bash` with `git diff --stat` to verify scope

---

## Execution Strategy

### Parallel Execution Waves

> Maximize throughput by grouping independent tasks into parallel waves.

```
Wave 1 (Start Immediately — deps + infra changes):
├── Task 1: Install TanStack Router dependencies [quick]
├── Task 2: Configure Vite plugin [quick]
├── Task 3: Add routeTree.gen.ts to .gitignore [quick]
└── Task 4: Fix build script race condition [quick]

Wave 2 (After Wave 1 — route files + entry point):
├── Task 5: Create src/routes/__root.tsx [quick]
├── Task 6: Create src/routes/index.tsx (migrate App.tsx) [unspecified-high]
├── Task 7: Update src/main.tsx to use RouterProvider [quick]
└── Task 8: Delete src/App.tsx + final verification [quick]

Critical Path: Task 1 → Task 2 → Task 5 / Task 6 / Task 7 → Task 8
Parallel Speedup: ~50% faster than sequential
Max Concurrent: 4 (Wave 1)
```

### Dependency Matrix

- **1-4**: — (independent) → 5-7
- **5**: 1, 2, 4 → 8
- **6**: 1, 2, 4 → 8
- **7**: 1, 2, 3, 4 → 8
- **8**: 5, 6, 7 → FINAL

### Agent Dispatch Summary

- **Wave 1**: 4 tasks → `quick` (all)
- **Wave 2**: 4 tasks → T5-T7 `quick`, T6 `unspecified-high` (large file)

---

## TODOs

- [x] 1. Install TanStack Router dependencies

  **What to do**:
  - Run `pnpm add @tanstack/solid-router @tanstack/solid-router-devtools` in `apps/docs/`
  - Run `pnpm add -D @tanstack/router-plugin` in `apps/docs/`
  - Verify `package.json` now includes:
    - `"@tanstack/solid-router": "^..."` in dependencies
    - `"@tanstack/solid-router-devtools": "^..."` in dependencies
    - `"@tanstack/router-plugin": "^..."` in devDependencies
  - Run `pnpm install` from workspace root to update lockfile

  **Must NOT do**:
  - Do NOT install React variants (`@tanstack/react-router`, `@tanstack/react-router-devtools`)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple package installation, no code changes
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4)
  - **Blocks**: Tasks 5, 6, 7
  - **Blocked By**: None (can start immediately)

  **References**:
  - `apps/docs/package.json` — file to update with new deps

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Verify deps installed in package.json
    Tool: Bash
    Preconditions: pnpm install completed successfully
    Steps:
      1. Run: grep -c '@tanstack/solid-router' apps/docs/package.json
      2. Run: grep -c '@tanstack/solid-router-devtools' apps/docs/package.json
      3. Run: grep -c '@tanstack/router-plugin' apps/docs/package.json
    Expected Result: Each grep returns exit code 0 (found)
    Evidence: .sisyphus/evidence/task-1-deps-installed.txt

  Scenario: Verify pnpm install succeeds
    Tool: Bash
    Preconditions: package.json updated
    Steps:
      1. Run: pnpm install 2>&1 | tail -5
    Expected Result: Exit code 0, no error messages
    Evidence: .sisyphus/evidence/task-1-pnpm-install.txt
  ```

  **Commit**: YES
  - Message: `feat(docs): add tanstack router dependencies`
  - Files: `apps/docs/package.json`, `pnpm-lock.yaml`

---

- [x] 2. Configure Vite plugin

  **What to do**:
  - Edit `apps/docs/vite.config.ts`
  - Add import: `import { tanstackRouter } from '@tanstack/router-plugin/vite'`
  - Add the plugin call in the `plugins` array **BEFORE** `solid()`:
    ```ts
    tanstackRouter({
      target: 'solid',
      autoCodeSplitting: true,
    }),
    ```
  - Resulting plugins array order should be:
    ```ts
    plugins: [
      tailwindcss(),
      tanstackRouter({ target: 'solid', autoCodeSplitting: true }),
      solid(),
      tsconfigPaths(),
    ],
    ```
    Note: `tailwindcss()` stays first. `tanstackRouter()` goes before `solid()` because the router plugin must pre-process routes before the Solid plugin compiles them.

  **Must NOT do**:
  - Do NOT set `target: 'react'` — must be `'solid'`
  - Do NOT remove or reorder existing plugins incorrectly

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple config edit in single file
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4)
  - **Blocks**: Tasks 5, 6, 7
  - **Blocked By**: Task 1 (plugin must be installed first)

  **References**:
  - `apps/docs/vite.config.ts` — file to edit (current content shown in interview)
  - Plugin docs: `tanstackRouter({ target: 'solid', autoCodeSplitting: true })`

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Verify plugin configured correctly
    Tool: Bash
    Preconditions: Task 1 completed (deps installed)
    Steps:
      1. Run: grep -c 'tanstackRouter' apps/docs/vite.config.ts
      2. Run: grep -c "target: 'solid'" apps/docs/vite.config.ts
      3. Run: grep -c 'autoCodeSplitting: true' apps/docs/vite.config.ts
    Expected Result: All three grep commands return exit code 0
    Evidence: .sisyphus/evidence/task-2-plugin-config.txt

  Scenario: Verify plugin is before solid() in plugins array
    Tool: Bash
    Preconditions: vite.config.ts edited
    Steps:
      1. Run: grep -n 'tanstackRouter\|solid()' apps/docs/vite.config.ts
    Expected Result: Line number for tanstackRouter is less than line number for solid()
    Evidence: .sisyphus/evidence/task-2-plugin-order.txt
  ```

  **Commit**: YES (groups with 1)
  - Message: `feat(docs): add tanstack router vite plugin`
  - Files: `apps/docs/vite.config.ts`
  - Pre-commit: `pnpm --filter @ui/docs build` (will fail until routes exist — that's expected, verified in Task 8)

---

- [x] 3. Add routeTree.gen.ts to .gitignore

  **What to do**:
  - Check if `apps/docs/.gitignore` exists. If not, create it.
  - Add the line: `src/routeTree.gen.ts` to the gitignore file
  - If the file doesn't exist yet, create `apps/docs/.gitignore` with this single entry

  **Must NOT do**:
  - Do NOT add to root `.gitignore` — scope is apps/docs only
  - Do NOT commit the generated file itself

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single-line edit
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4)
  - **Blocks**: Task 7 (main.tsx references routeTree.gen.ts)
  - **Blocked By**: None (can start immediately)

  **References**:
  - `.gitignore` convention in this project (root `.gitignore` exists at `/home/fandi/Lab/Js/ui/.gitignore`)

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Verify routeTree.gen.ts is gitignored
    Tool: Bash
    Preconditions: .gitignore edited
    Steps:
      1. Run: cd apps/docs && git check-ignore src/routeTree.gen.ts
    Expected Result: Command outputs "src/routeTree.gen.ts" (file is ignored)
    Evidence: .sisyphus/evidence/task-3-gitignore.txt
  ```

  **Commit**: YES (groups with 1, 2)
  - Message: `chore(docs): gitignore generated route tree`
  - Files: `apps/docs/.gitignore`

---

- [x] 4. Fix build script race condition

  **What to do**:
  - Edit `apps/docs/package.json`
  - Change the `"build"` script from:
    ```
    "build": "tsc --noEmit & vite build"
    ```
    to:
    ```
    "build": "vite build && tsc --noEmit"
    ```
  - Rationale: `&` runs both in parallel — `tsc` will fail because `routeTree.gen.ts` doesn't exist yet. `&&` runs sequentially: Vite builds first (generating routeTree during the process), then `tsc` type-checks the generated file.

  **Must NOT do**:
  - Do NOT remove `tsc --noEmit` entirely (it provides type checking)
  - Do NOT use semicolons (`;`) which would ignore failures

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single-line edit in package.json
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3)
  - **Blocks**: Task 8 (final build verification)
  - **Blocked By**: None (can start immediately — doesn't depend on deps being installed for the edit itself)

  **References**:
  - `apps/docs/package.json` line 7: current build script

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Verify build script changed
    Tool: Bash
    Preconditions: package.json edited
    Steps:
      1. Run: grep '"build"' apps/docs/package.json
    Expected Result: Output matches `"build": "vite build && tsc --noEmit"`
    Evidence: .sisyphus/evidence/task-4-build-script.txt
  ```

  **Commit**: YES (groups with 1, 2, 3)
  - Message: `fix(docs): fix build race condition with sequential vite+tsc`
  - Files: `apps/docs/package.json`

---

- [x] 5. Create src/routes/\_\_root.tsx

  **What to do**:
  - Create `apps/docs/src/routes/` directory
  - Create `apps/docs/src/routes/__root.tsx` with:

    ```tsx
    import { createRootRoute, Outlet } from "@tanstack/solid-router";
    import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";

    export const Route = createRootRoute({
      component: () => (
        <>
          <Outlet />
          <TanStackRouterDevtools />
        </>
      ),
    });
    ```

  - This is a minimal root layout — no `<html>`/`<head>` tags (client-rendered SPA), no navigation links (only one route exists)

  **Must NOT do**:
  - Do NOT add navigation links (only one route — `/` — makes nav pointless)
  - Do NOT include `<html>`, `<head>` or SSR-specific tags
  - Do NOT rename to `root.tsx` — must be `__root.tsx` (double underscore, TanStack Router convention)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small file creation, ~15 lines
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7)
  - **Blocks**: Task 8
  - **Blocked By**: Tasks 1, 2 (deps + plugin needed)

  **References**:
  - Official manual setup for Solid.js root route (fetched from tanstack.com)

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Verify __root.tsx exists with correct content
    Tool: Bash
    Preconditions: File created
    Steps:
      1. Run: test -f apps/docs/src/routes/__root.tsx && echo "EXISTS"
      2. Run: grep -c 'createRootRoute' apps/docs/src/routes/__root.tsx
      3. Run: grep -c 'Outlet' apps/docs/src/routes/__root.tsx
    Expected Result: File exists, contains createRootRoute and Outlet
    Evidence: .sisyphus/evidence/task-5-root-route.txt
  ```

  **Commit**: YES (groups with 6, 7)
  - Message: `feat(docs): add tanstack router root layout and routes`
  - Files: `apps/docs/src/routes/__root.tsx`

---

- [x] 6. Create src/routes/index.tsx (migrate App.tsx)

  **What to do**:
  - **MOST CRITICAL TASK** — preserve all existing behavior exactly
  - Copy ALL content from `apps/docs/src/App.tsx` (1107 lines) into `apps/docs/src/routes/index.tsx`
  - Add this import at the top:
    ```tsx
    import { createFileRoute } from "@tanstack/solid-router";
    ```
  - Change the component definition and export:
    - Keep the `App` component function body **EXACTLY AS-IS** (all JSX, signals, state)
    - Remove `export default App` at the bottom
    - Add after the component (or wrap differently):
      ```tsx
      export const Route = createFileRoute("/")({
        component: App,
      });
      ```
    - Keep `export default App` as well for backwards compatibility if any other file imports it (check if anything imports App.tsx first). But since App.tsx will be deleted, this shouldn't matter — remove the default export.
    - Rename the component from `App` to something more descriptive like `HomePage` or keep as `App` (internal name doesn't matter). Let's keep it as `App` for minimal diff.

  - Exact structure:

    ```tsx
    import { createFileRoute } from "@tanstack/solid-router";
    // … all existing imports from App.tsx (Component, createSignal, Index, Portal, @ui/solid components) …

    const App = () => {
      // … all existing JSX exactly as-is …
    };

    export const Route = createFileRoute("/")({
      component: App,
    });
    ```

  **Must NOT do**:
  - Do NOT change any JSX, CSS classes, or component behavior
  - Do NOT refactor the App component — move verbatim
  - Do NOT split demos into separate routes
  - Do NOT remove the existing component imports from `@ui/solid`

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Large file (1107 lines), careful copy+modify needed to preserve exact behavior
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 7)
  - **Blocks**: Task 8
  - **Blocked By**: Tasks 1, 2 (deps + plugin needed)

  **References**:
  - `apps/docs/src/App.tsx` — full source to copy from (1107 lines, read in full)
  - TanStack Router Solid.js API: `createFileRoute('/')({ component: ... })`

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Verify index.tsx contains all original imports
    Tool: Bash
    Preconditions: File created
    Steps:
      1. Run: grep -c "from '@ui/solid'" apps/docs/src/routes/index.tsx
      2. Run: grep -c "createFileRoute" apps/docs/src/routes/index.tsx
      3. Run: grep -c "export const Route" apps/docs/src/routes/index.tsx
      4. Run: grep -c "createSignal" apps/docs/src/routes/index.tsx
    Expected Result: Each grep finds expected content
    Evidence: .sisyphus/evidence/task-6-index-route.txt

  Scenario: Verify file structure is correct
    Tool: Bash
    Preconditions: File created
    Steps:
      1. Run: wc -l apps/docs/src/routes/index.tsx
    Expected Result: Line count >= 1100 (content preserved from original App.tsx)
    Evidence: .sisyphus/evidence/task-6-line-count.txt
  ```

  **Commit**: YES (groups with 5, 7)
  - Message: `feat(docs): migrate App.tsx to routes/index.tsx`
  - Files: `apps/docs/src/routes/index.tsx`

---

- [x] 7. Update src/main.tsx to use RouterProvider

  **What to do**:
  - Replace the entire content of `apps/docs/src/main.tsx` with:

    ```tsx
    /* @refresh reload */
    import { render } from "solid-js/web";
    import { RouterProvider, createRouter } from "@tanstack/solid-router";

    // Import the generated route tree
    import { routeTree } from "./routeTree.gen";

    // Create a new router instance
    const router = createRouter({ routeTree });

    // Register the router instance for type safety
    declare module "@tanstack/solid-router" {
      interface Register {
        router: typeof router;
      }
    }

    // Import styles
    import "./index.css";

    // Render the app
    const rootElement = document.getElementById("root")!;

    render(() => <RouterProvider router={router} />, rootElement);
    ```

  - Key differences from current main.tsx:
    - Added `/* @refresh reload */` pragma (required for Solid HMR with router)
    - Removed `import App from './App'` (no longer needed)
    - Added `import { routeTree } from './routeTree.gen'` (generated by plugin)
    - Added `RouterProvider` + `createRouter`
    - Added TypeScript module augmentation for type safety
    - `render()` now renders `<RouterProvider router={router} />`
    - `import './index.css'` preserved (same as before)

  **Must NOT do**:
  - Do NOT forget the `/* @refresh reload */` pragma — breaks HMR without it
  - Do NOT remove `import './index.css'` — styles still needed
  - Do NOT use React-style JSX (this is Solid.js)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small file rewrite (~25 lines)
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 6)
  - **Blocks**: Task 8
  - **Blocked By**: Tasks 1, 2, 3 (deps, plugin, gitignore)

  **References**:
  - `apps/docs/src/main.tsx` — current file (5 lines, read in full)
  - TanStack Router Solid.js manual setup — exact pattern from official docs

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Verify main.tsx has correct imports and structure
    Tool: Bash
    Preconditions: File updated
    Steps:
      1. Run: grep -c '@refresh reload' apps/docs/src/main.tsx
      2. Run: grep -c 'RouterProvider' apps/docs/src/main.tsx
      3. Run: grep -c 'createRouter' apps/docs/src/main.tsx
      4. Run: grep -c "from './routeTree.gen'" apps/docs/src/main.tsx
      5. Run: grep -c "import './index.css'" apps/docs/src/main.tsx
    Expected Result: All 5 grep commands return exit code 0
    Evidence: .sisyphus/evidence/task-7-main-tsx.txt
  ```

  **Commit**: YES (groups with 5, 6)
  - Message: `feat(docs): wire up RouterProvider in main.tsx`
  - Files: `apps/docs/src/main.tsx`

---

- [x] 8. Delete src/App.tsx + final verification

  **What to do**:
  - Delete `apps/docs/src/App.tsx` (content migrated to routes/index.tsx)
  - Run `pnpm install` if lockfile changed
  - Run `pnpm --filter @ui/docs build` to verify full build passes
  - Run `git diff --stat --name-only` to verify only `apps/docs/` files changed

  **Must NOT do**:
  - Do NOT delete routes/index.tsx, \_\_root.tsx, or any other files
  - Do NOT merge changes yet — verified by final review wave

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: File deletion + run build command
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on tasks 5, 6, 7)
  - **Blocks**: Final Verification Wave
  - **Blocked By**: Tasks 5, 6, 7

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Verify App.tsx is deleted
    Tool: Bash
    Preconditions: Task 6 completed
    Steps:
      1. Run: test -f apps/docs/src/App.tsx && echo "EXISTS" || echo "DELETED"
    Expected Result: Output "DELETED" (file no longer exists)
    Evidence: .sisyphus/evidence/task-8-app-tsx-deleted.txt

  Scenario: Verify full build succeeds
    Tool: Bash
    Preconditions: All previous tasks completed
    Steps:
      1. Run: pnpm --filter @ui/docs build 2>&1 | tail -20
    Expected Result: Exit code 0, no TypeScript errors, "build complete" in output
    Evidence: .sisyphus/evidence/task-8-build-success.txt

  Scenario: Verify generated route tree exists
    Tool: Bash
    Preconditions: Build completed
    Steps:
      1. Run: test -f apps/docs/src/routeTree.gen.ts && echo "EXISTS"
    Expected Result: Output "EXISTS" (route tree was generated by plugin)
    Evidence: .sisyphus/evidence/task-8-routetree-gen.txt

  Scenario: Verify only apps/docs files changed
    Tool: Bash
    Preconditions: All changes staged or committed
    Steps:
      1. Run: git diff --stat --name-only HEAD 2>/dev/null || git diff --stat --name-only
    Expected Result: All changed files are under apps/docs/
    Evidence: .sisyphus/evidence/task-8-scope-check.txt

  Scenario: Verify all demos render in browser (Playwright smoke test)
    Tool: Playwright
    Preconditions: Dev server running (pnpm --filter @ui/docs dev)
    Steps:
      1. Navigate to http://localhost:5173
      2. Wait for page to fully load (wait 5s)
      3. Take a full-page screenshot
      4. Check console for errors
      5. Verify key text is visible (e.g. "Solid UI", "Button", "Dialog")
    Expected Result: Page renders without errors, all demo sections visible
    Evidence: .sisyphus/evidence/task-8-browser-smoke.png
  ```

  **Commit**: YES
  - Message: `chore(docs): delete App.tsx after router migration`
  - Files: `apps/docs/src/App.tsx` (deleted)
  - Pre-commit: `pnpm --filter @ui/docs build && git diff --stat`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

- [x] F1. **Plan Compliance Audit** — `oracle`
      Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
      Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — `unspecified-high`
      Run `tsc --noEmit` + linter + build. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names.
      Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [x] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
      Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration (dev server starts, page renders all demos). Test edge cases: routeTree.gen.ts gitignored, no leftover App.tsx, build succeeds. Save to `.sisyphus/evidence/final-qa/`.
      Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep`
      For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching packages/solid or packages/core. Flag unaccounted changes.
      Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

| Task(s)    | Message                                                          | Files                                                       | Pre-commit                     |
| ---------- | ---------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------ |
| 1, 2, 3, 4 | `feat(docs): add tanstack router deps and config`                | package.json, vite.config.ts, .gitignore, pnpm-lock.yaml    | —                              |
| 5, 6, 7    | `feat(docs): migrate to tanstack router with file-based routing` | src/routes/\_\_root.tsx, src/routes/index.tsx, src/main.tsx | —                              |
| 8          | `chore(docs): delete App.tsx after router migration`             | src/App.tsx (deleted)                                       | `pnpm --filter @ui/docs build` |

---

## Success Criteria

### Verification Commands

```bash
# Build must succeed
pnpm --filter @ui/docs build
# Expected: exit code 0, no errors

# Generated route tree should exist
test -f apps/docs/src/routeTree.gen.ts
# Expected: file exists

# routeTree.gen.ts should be gitignored
cd apps/docs && git check-ignore src/routeTree.gen.ts
# Expected: outputs "src/routeTree.gen.ts"

# App.tsx should be deleted
test -f apps/docs/src/App.tsx && echo "EXISTS" || echo "DELETED"
# Expected: "DELETED"

# Only apps/docs files changed
git diff --stat --name-only
# Expected: all paths under apps/docs/
```

### Final Checklist

- [ ] All TanStack Router deps installed in apps/docs/package.json
- [ ] Vite plugin configured with `target: 'solid'` and `autoCodeSplitting: true`
- [ ] Plugin placed BEFORE `solid()` in plugins array
- [ ] `src/routes/__root.tsx` exists with `<Outlet />` and `<TanStackRouterDevtools />`
- [ ] `src/routes/index.tsx` contains all App.tsx content migrated verbatim
- [ ] `src/main.tsx` uses `RouterProvider` with `routeTree`
- [ ] `/* @refresh reload */` pragma in main.tsx
- [ ] TypeScript module augmentation for router type safety
- [ ] Build script: `"vite build && tsc --noEmit"` (sequential)
- [ ] `src/routeTree.gen.ts` added to `.gitignore`
- [ ] `src/App.tsx` deleted
- [ ] `pnpm build` succeeds
- [ ] Dev server shows all demos correctly
- [ ] Only `apps/docs/` files modified
