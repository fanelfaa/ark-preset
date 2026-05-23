# Apply Imigrasi Dependency Pattern

## TL;DR

> **Quick Summary**: Fix all gaps in tsconfig.json and vite.config.ts to match the proven dependency wiring pattern from imigrasi (web-client → shared-ui), ensuring consistent TypeScript project references and build-time dependency resolution across the monorepo.
>
> **Deliverables**:
>
> - 3 tsconfig.json files updated (core, solid, react) with `composite: true` + references
> - 1 vite.config.ts updated (docs) with `vite-tsconfig-paths` plugin + `optimizeDeps.exclude`
> - 1 package.json updated (docs) with `vite-tsconfig-paths` devDependency
>
> **Estimated Effort**: Quick (~15 min)
> **Parallel Execution**: YES — 2 waves
> **Critical Path**: Install deps → verify build

---

## Context

### Original Request

> "Learn this project ~/Work/Zero/Projects/imigrasi about how the configured dependents using moon.yml and tsconfig and package json. the web-client is depend on shared-ui so lets only focus on that. and after that implement to this project."

### Interview Summary

**Key Discussions**:

- Analyzed imigrasi's 3-layer dependency pattern: package.json (workspace:\* + exports), moon.yml (dependsOn), tsconfig (composite + references), vite (tsconfigPaths + optimizeDeps.exclude)
- User chose "Fix ALL gaps" to fully align with imigrasi's pattern

**Research Findings**:

- imigrasi/shared-ui uses `composite: true`, `declaration: true` in tsconfig for project reference chain
- imigrasi/web-client uses `vite-tsconfig-paths()` + `optimizeDeps.exclude: ['@repo/shared-ui']`
- Current project already has correct moon.yml and package.json deps — only tsconfig + vite config gaps remain
- `.moon/toolchains.yml` has `syncProjectReferences: true` which auto-syncs tsconfig refs

### Metis Review

**Addressed Gaps**:

- **Q: Are these gaps actually causing real problems?** → No runtime errors yet, but inconsistency breaks the project reference chain. solid has references, react doesn't — creates maintenance burden and means `tsc --noEmit` in react doesn't use the proper reference mechanism.
- **Q: composite + noEmit compatibility?** → Verified: `composite: true` is compatible with `noEmit: true` for type-checking workflows. tsup handles actual builds.
- **Q: syncProjectReferences conflict?** → `syncProjectReferences: true` works alongside manual references — it ensures consistency, doesn't override them.

---

## Work Objectives

### Core Objective

Align all config files (tsconfig.json, vite.config.ts) in this monorepo to match imigrasi's dependency wiring pattern.

### Concrete Deliverables

- `packages/core/tsconfig.json` — add `composite: true`
- `packages/solid/tsconfig.json` — add `composite: true`
- `packages/react/tsconfig.json` — add `composite: true + references: [core]`
- `apps/docs/vite.config.ts` — add `vite-tsconfig-paths` plugin + `optimizeDeps.exclude`
- `apps/docs/package.json` — add `vite-tsconfig-paths` devDependency

### Definition of Done

- [ ] `moon run core:typecheck` passes
- [ ] `moon run solid:typecheck` passes
- [ ] `moon run react:typecheck` passes
- [ ] `moon run docs:build` (or `vite build`) passes

### Must Have

- All 3 library packages (core, solid, react) have `composite: true` in tsconfig
- react/tsconfig.json has `references` pointing to core
- docs/vite.config.ts excludes workspace packages from optimization
- docs app can build successfully with all changes

### Must NOT Have (Guardrails)

- No changes to package.json name/version/exports (only devDependencies in docs)
- No changes to moon.yml files (already correct)
- No changes to source code (.tsx, .ts files)
- No changes to build configuration (tsup.config.ts)

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed.

### Test Decision

- **Infrastructure exists**: YES (moon + tsc + vite)
- **Automated tests**: N/A (config-only changes)
- **Agent-Executed QA**: Check typecheck + build pass

### QA Policy

Every task includes agent-executed QA verification:

- Run `moon run <project>:typecheck` to verify TypeScript compilation
- Run `moon run docs:build` to verify full build chain

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Parallel — all tsconfig changes are independent):
├── Task 1: core/tsconfig.json — add composite: true
├── Task 2: solid/tsconfig.json — add composite: true
├── Task 3: react/tsconfig.json — add composite: true + references to core
└── Task 4: docs/package.json — add vite-tsconfig-paths devDep

Wave 2 (After install — vite config depends on package being installed):
└── Task 5: docs/vite.config.ts — add tsconfigPaths plugin + optimizeDeps.exclude

Wave FINAL (Verification):
├── Task F1: moon run core:typecheck
├── Task F2: moon run solid:typecheck
├── Task F3: moon run react:typecheck
└── Task F4: moon run docs:build
```

### Agent Dispatch Summary

- **Wave 1**: 4 parallel `quick` tasks
- **Wave 2**: 1 `quick` task
- **Final**: 4 parallel verification commands

---

## TODOs

- [x] 1. Add `composite: true` to core/tsconfig.json

  **What to do**:
  - Edit `packages/core/tsconfig.json`
  - Add `"composite": true` to `compilerOptions` (preserving all existing settings)
  - The `declaration` option is implied by `composite`, so it can stay or be removed

  **Must NOT do**:
  - Do not remove `noEmit: true` — tsc --noEmit is still the typecheck workflow
  - Do not change any other settings

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single-line addition to a config file
  - **Skills**: `[]`
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (Tasks 1, 2, 3, 4)
  - **Blocks**: Verification tasks, Task 5
  - **Blocked By**: None

  **Acceptance Criteria**:
  - [ ] `moon run core:typecheck` passes

  **QA Scenarios**:

  ```
  Scenario: TypeScript compilation still works
    Tool: Bash
    Steps:
      1. Run: moon run core:typecheck
    Expected Result: Exit code 0, no errors
    Evidence: .sisyphus/evidence/task-1-typecheck.txt
  ```

  **Commit**: YES (groups with 2, 3)
  - Message: `chore: add composite:true to core/solid/react tsconfig`
  - Files: `packages/core/tsconfig.json`, `packages/solid/tsconfig.json`, `packages/react/tsconfig.json`

---

- [x] 2. Add `composite: true` to solid/tsconfig.json

  **What to do**:
  - Edit `packages/solid/tsconfig.json`
  - Add `"composite": true` to `compilerOptions`

  **Must NOT do**:
  - Same guardrails as Task 1

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (Tasks 1, 2, 3, 4)
  - **Blocks**: Verification tasks
  - **Blocked By**: None

  **Acceptance Criteria**:
  - [ ] `moon run solid:typecheck` passes

  **QA Scenarios**:

  ```
  Scenario: TypeScript compilation still works
    Tool: Bash
    Steps:
      1. Run: moon run solid:typecheck
    Expected Result: Exit code 0, no errors
    Evidence: .sisyphus/evidence/task-2-typecheck.txt
  ```

  **Commit**: YES (groups with 1, 3)

---

- [x] 3. Add `composite: true` and `references` to react/tsconfig.json

  **What to do**:
  - Edit `packages/react/tsconfig.json`
  - Add `"composite": true` to `compilerOptions`
  - Add a `references` array at the top level:
    ```json
    "references": [
      { "path": "../core" }
    ]
    ```

  **Must NOT do**:
  - Do not change jsx or jsxImportSource settings (keep `react-jsx`)
  - Do not remove `noEmit: true`

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (Tasks 1, 2, 3, 4)
  - **Blocks**: Verification tasks
  - **Blocked By**: None

  **Acceptance Criteria**:
  - [ ] `moon run react:typecheck` passes
  - [ ] tsconfig.json has `references: [{ path: "../core" }]`

  **QA Scenarios**:

  ```
  Scenario: TypeScript compilation still works
    Tool: Bash
    Steps:
      1. Run: moon run react:typecheck
    Expected Result: Exit code 0, no errors
    Evidence: .sisyphus/evidence/task-3-typecheck.txt
  ```

  **Commit**: YES (groups with 1, 2)

---

- [x] 4. Add `vite-tsconfig-paths` devDependency to docs/package.json

  **What to do**:
  - Edit `apps/docs/package.json`
  - Add `"vite-tsconfig-paths": "^5.0.0"` to `devDependencies`
  - Run `pnpm install` to install the new dependency

  **Must NOT do**:
  - Do not change any existing dependencies
  - Do not touch scripts or other fields

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Wave 1)
  - **Parallel Group**: Wave 1 (Tasks 1, 2, 3, 4)
  - **Blocks**: Task 5
  - **Blocked By**: None

  **Acceptance Criteria**:
  - [ ] `vite-tsconfig-paths` appears in docs/package.json devDependencies
  - [ ] `pnpm install` completes without errors
  - [ ] `vite-tsconfig-paths` is present in node_modules

  **QA Scenarios**:

  ```
  Scenario: Dependency installed correctly
    Tool: Bash
    Steps:
      1. Run: node -e "require('vite-tsconfig-paths')" --prefix apps/docs
    Expected Result: No error (module loads successfully)
    Evidence: .sisyphus/evidence/task-4-install.txt
  ```

  **Commit**: YES
  - Message: `chore(docs): add vite-tsconfig-paths dependency`
  - Files: `apps/docs/package.json`, `pnpm-lock.yaml`

---

- [x] 5. Add `vite-tsconfig-paths` plugin and `optimizeDeps.exclude` to docs/vite.config.ts

  **What to do**:
  - Edit `apps/docs/vite.config.ts`
  - Add import: `import tsconfigPaths from 'vite-tsconfig-paths'`
  - Add `tsconfigPaths()` to the plugins array
  - Add `optimizeDeps: { exclude: ['@ui/solid', '@ui/core'] }` to the config object

  The final config should look like:

  ```ts
  import { defineConfig } from "vite";
  import solid from "vite-plugin-solid";
  import tailwindcss from "@tailwindcss/vite";
  import tsconfigPaths from "vite-tsconfig-paths";

  export default defineConfig({
    plugins: [tailwindcss(), solid(), tsconfigPaths()],
    resolve: {
      conditions: ["development", "module", "import", "resolve"],
    },
    optimizeDeps: {
      exclude: ["@ui/solid", "@ui/core"],
    },
  });
  ```

  **Must NOT do**:
  - Do not remove the existing `resolve.conditions` config
  - Do not change the order of existing plugins
  - Do not remove `import path from 'path'` etc. if still needed — but actually the current file doesn't use `path` or `fileURLToPath` anywhere, so remove those unused imports

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on Task 4 — package must be installed)
  - **Parallel Group**: Wave 2
  - **Blocks**: Verification tasks
  - **Blocked By**: Task 4

  **Acceptance Criteria**:
  - [ ] `moon run docs:build` passes
  - [ ] vite.config.ts imports and uses `vite-tsconfig-paths`
  - [ ] optimizeDeps.exclude includes `@ui/solid` and `@ui/core`

  **QA Scenarios**:

  ```
  Scenario: Vite build works with new config
    Tool: Bash
    Steps:
      1. Run: moon run docs:build
    Expected Result: Build succeeds, exit code 0
    Evidence: .sisyphus/evidence/task-5-build.txt
  ```

  **Commit**: YES
  - Message: `chore(docs): add tsconfigPaths plugin and optimizeDeps.exclude`
  - Files: `apps/docs/vite.config.ts`

---

## Final Verification Wave

- [x] F1. **Plan Compliance Audit** — `quick`
      Read each changed file and verify against plan:
  - core/tsconfig.json has `composite: true`
  - solid/tsconfig.json has `composite: true`
  - react/tsconfig.json has `composite: true` + `references` to core
  - docs/package.json has `vite-tsconfig-paths`
  - docs/vite.config.ts uses `tsconfigPaths()` + `optimizeDeps.exclude`
  - moon.yml files are unchanged
  - No source code was modified
    Output: All Must Have [5/5] | Must NOT Have [5/5] | VERDICT: APPROVE/REJECT

- [x] F2. **TypeScript Compilation Check** — `quick`
      Run typecheck on all affected packages:
  - `moon run core:typecheck`
  - `moon run solid:typecheck`
  - `moon run react:typecheck`
    Output: core [PASS/FAIL] | solid [PASS/FAIL] | react [PASS/FAIL] | VERDICT

- [x] F3. **Build Verification** — `quick`
      Run build on docs app and verify it completes:
  - `moon run docs:build`
    Output: Build [PASS/FAIL] | VERDICT

- [x] F4. **Scope Fidelity Check** — `quick`
      Compare `git diff` against plan scope:
  - Only the 5 specified files changed
  - No source code (.tsx, .ts) modified
  - No moon.yml files modified
    Output: Files [5/5] | Scope [CLEAN] | VERDICT: APPROVE/REJECT

---

## Commit Strategy

- **1-3** (grouped): `chore: add composite:true to core/solid/react tsconfig`
  - `packages/core/tsconfig.json`, `packages/solid/tsconfig.json`, `packages/react/tsconfig.json`
  - Pre-commit: `moon run core:typecheck && moon run solid:typecheck && moon run react:typecheck`

- **4**: `chore(docs): add vite-tsconfig-paths dependency`
  - `apps/docs/package.json`, `pnpm-lock.yaml`

- **5**: `chore(docs): add tsconfigPaths plugin and optimizeDeps.exclude`
  - `apps/docs/vite.config.ts`
  - Pre-commit: `moon run docs:build`

---

## Success Criteria

### Verification Commands

```bash
moon run core:typecheck    # Expected: PASS
moon run solid:typecheck   # Expected: PASS
moon run react:typecheck   # Expected: PASS
moon run docs:build        # Expected: Build succeeds
```

### Final Checklist

- [ ] All 3 library packages have `composite: true` in tsconfig
- [ ] react/tsconfig.json references core
- [ ] docs/vite.config.ts has tsconfigPaths + optimizeDeps.exclude
- [ ] All typecheck commands pass
- [ ] docs build succeeds
- [ ] No source code or moon.yml files modified
