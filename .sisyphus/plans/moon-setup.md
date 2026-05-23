# Moon Repo Setup

## TL;DR

> **Quick Summary**: Initialize moon (v2.2) as the build system for the monorepo. Create workspace config, toolchain config, and per-project `moon.yml` files for all 5 projects. Wire up cross-project dependencies so `moon run docs:dev` reactively runs `core:dev` and `solid:dev` first, enabling full HMR when changing packages code.

> **Deliverables**:
>
> - `.moon/workspace.yml` — workspace config with glob-based project discovery
> - `.moon/toolchains.yml` — JS/TS toolchain config
> - `packages/core/moon.yml` — core project config
> - `packages/solid/moon.yml` — solid project config (depends on core)
> - `packages/react/moon.yml` — react project config (depends on core)
> - `packages/cli/moon.yml` — CLI project config (standalone)
> - `apps/docs/moon.yml` — docs project config (depends on solid + core)
> - Updated `.gitignore` with moon entries
> - Updated `packages/core/package.json` with `development` export condition for better HMR

> **Estimated Effort**: Quick (10-15 min setup)
> **Parallel Execution**: YES — 3 waves
> **Critical Path**: Task 1 → Tasks 2-5 (parallel) → Tasks 6-10 (parallel) → Tasks 11-12 (parallel validation)

---

## Context

### Original Request

Setup moon repo for this project. Ensure all apps/packages have `moon.yml`. Ensure `moon run docs:dev` includes dependencies in the dev loop — changes to `packages/core` or `packages/solid` trigger updates in `apps/docs`.

### Current Project Structure

```
apps/docs/          → @ui/docs (SolidJS + Vite, depends on @ui/solid + @ui/core)
packages/core/      → @ui/core (standalone, tailwind-variants/merge)
packages/solid/     → @ui/solid (depends on @ui/core, SolidJS wrappers)
packages/react/     → @ui/react (depends on @ui/core, React wrappers)
packages/cli/       → create-ui (standalone, commander CLI)
```

### Key Observations

- **moon v2.2.4** is installed via proto at `~/.proto/shims/moon`
- Project uses pnpm workspace (already configured in `pnpm-workspace.yaml`)
- All packages have `build` and `dev` scripts (tsup/tsup --watch or vite)
- `@ui/solid` and `@ui/react` already have `development` condition in `exports` → vite resolves to source
- `@ui/core` is **missing** `development` condition → tsup rebuild needed during dev
- `vite.config.ts` already has `conditions: ['development', ...]`

### Dev Workflow Design

```
moon run docs:dev
  ├── 1. core:dev (tsup --watch)   [persistent, background]
  ├── 2. solid:dev (tsup --watch)  [persistent, background]
  └── 3. docs:dev (vite)           [persistent, foreground]
```

Core + Solid dev tasks run persistently. When you change source in either package, tsup rebuilds `dist/`, vite detects the change, and HMR updates the docs app.

### Enhancement: Add `development` condition to `@ui/core`

Adding `"development": "./src/index.ts"` to `@ui/core` exports means vite can resolve directly to TypeScript source. Combined with vite's `conditions: ['development', ...]`, this enables HMR for core changes without needing tsup --watch for core. (We still include core:dev as a fallback.)

---

## Work Objectives

### Core Objective

Initialize moon build system with correct project graph and task dependencies for a seamless dev experience.

### Concrete Deliverables

- `.moon/workspace.yml`, `.moon/toolchains.yml` config files
- `moon.yml` in all 5 projects (core, solid, react, cli, docs)
- Updated `.gitignore` with moon entries
- Updated `@ui/core` exports with `development` condition

### Definition of Done

- `moon project core`, `moon project solid`, `moon project docs` all return valid project info
- `moon run docs:dev` starts correctly with dependency tasks running first
- Changes to `packages/core/src/` or `packages/solid/src/` are reflected in `apps/docs`

### Must Have

- Every project has a valid `moon.yml` with correct `dependsOn` and tasks
- `docs:dev` task depends on `^:dev` (upstream dev tasks) for proper dev ordering
- `@ui/core` exports include `development` condition for direct source resolution

### Must NOT Have (Guardrails)

- Do NOT add Docker config or CI pipeline setup (not requested)
- Do NOT add remote caching config (not requested)
- Do NOT modify existing package.json `scripts` — moon tasks should invoke existing scripts
- Do NOT modify `pnpm-workspace.yaml` — moon does not replace pnpm workspace

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed.

### Test Decision

- **Infrastructure exists**: NO (moon is new to this project)
- **Automated tests**: NO (setup/configuration task — no unit tests needed)
- **Agent-Executed QA**: ALWAYS — each task verifies via CLI commands

### QA Policy

Every task includes agent-executed QA scenarios:

- **CLI**: Run `moon project <name>`, parse output for expected fields
- **CLI**: Run `moon run <project>:<task>`, check process start
- **File verification**: Check file existence and content with `bash`

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Initialize + Config — sequential, one at a time):
├── Task 1: Run moon init to scaffold workspace
├── Task 2: Configure .moon/workspace.yml
├── Task 3: Configure .moon/toolchains.yml
├── Task 4: Update .gitignore
└── Task 5: Add development export to @ui/core

Wave 2 (Per-project moon.yml — MAX PARALLEL, 5 tasks):
├── Task 6: packages/core/moon.yml
├── Task 7: packages/solid/moon.yml
├── Task 8: packages/react/moon.yml
├── Task 9: packages/cli/moon.yml
└── Task 10: apps/docs/moon.yml

Wave 3 (Validation — parallel):
├── Task 11: Verify all moon projects are registered
└── Task 12: Test moon run docs:dev (startup only)
```

---

## TODOs

- [x] 1. Scaffold workspace with `moon init`

  **What to do**:
  - Run `moon init --minimal` at the repo root to create `.moon/` directory
  - This creates `.moon/workspace.yml` and `.gitignore` entries

  **Must NOT do**:
  - Do NOT run `moon init --minimal` if `.moon/` already exists
  - Do NOT modify existing gitignore rules (moon appends)

  **Recommended Agent Profile**:
  - **Category**: `quick` — single command execution, no source code changes
  - **Skills**: `[]`
  - **Reason**: Trivial one-command scaffold

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 (sequential)
  - **Blocks**: Tasks 2, 3, 4
  - **Blocked By**: None

  **References**:
  - `https://moonrepo.github.io/website-v1/docs/setup-workspace#initializing-the-repository` — moon init docs

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: moon init creates .moon directory
    Tool: Bash
    Preconditions: .moon directory does not exist
    Steps:
      1. Run `moon init --minimal` at repo root
      2. Check exit code is 0
      3. Verify `.moon/` directory exists
      4. Verify `.moon/workspace.yml` exists
    Expected Result: .moon directory created with workspace.yml
    Evidence: .sisyphus/evidence/task-1-init-success.txt
  ```

  **Commit**: NO (grouped with all moon config)

---

- [x] 2. Configure `.moon/workspace.yml`

  **What to do**:
  - Overwrite `.moon/workspace.yml` with:

    ```yaml
    $schema: "https://moonrepo.dev/schemas/workspace.json"

    projects:
      - "apps/*"
      - "packages/*"

    vcs:
      client: "git"
      defaultBranch: "master"
    ```

  **Must NOT do**:
  - Do NOT use manual project map — use globs so new projects auto-register
  - Do NOT add Docker, remote cache, or other unrequested config

  **Recommended Agent Profile**:
  - **Category**: `quick` — simple YAML config file
  - **Skills**: `[]`
  - **Reason**: Straightforward config write, no code

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 3, 4, 5)
  - **Blocks**: Tasks 6-10 (project moon.yml files)
  - **Blocked By**: Task 1 (moon init)

  **References**:
  - `https://moonrepo.github.io/website-v1/docs/config/workspace#projects` — workspace projects glob syntax
  - `.moon/workspace.yml` — created by Task 1

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: workspace.yml has correct structure
    Tool: Bash
    Preconditions: .moon/workspace.yml exists
    Steps:
      1. Run `grep 'projects:' .moon/workspace.yml`
      2. Check output contains "apps/*" and "packages/*"
    Expected Result: Both glob patterns present in projects config
    Evidence: .sisyphus/evidence/task-2-workspace-config.txt
  ```

  **Commit**: NO (grouped)

---

- [x] 3. Configure `.moon/toolchains.yml`

  **What to do**:
  - Create `.moon/toolchains.yml` with:

    ```yaml
    $schema: "https://moonrepo.dev/schemas/toolchain.json"

    javascript:
      packageManager: "pnpm"

    node:
      version: "18.0.0"
      packageManager: "pnpm"

    pnpm:
      version: "9.0.0"

    typescript:
      createMissingConfig: false
      syncProjectReferences: true
    ```

  **Must NOT do**:
  - Do NOT enable Docker integration
  - Do NOT add version if not sure of exact version required

  **Recommended Agent Profile**:
  - **Category**: `quick` — YAML config file
  - **Skills**: `[]`
  - **Reason**: Simple config creation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 4, 5)
  - **Blocks**: Tasks 6-10
  - **Blocked By**: Task 1

  **References**:
  - `https://moonrepo.github.io/website-v1/docs/config/toolchain` — toolchain config reference
  - `package.json` — uses pnpm@9.0.0, node >=18

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: toolchains.yml exists with correct structure
    Tool: Bash
    Preconditions: .moon/toolchains.yml does not exist
    Steps:
      1. Verify file created successfully
      2. Run `grep 'packageManager' .moon/toolchains.yml`
      3. Check output contains "pnpm"
    Expected Result: Toolchain file exists with pnpm config
    Evidence: .sisyphus/evidence/task-3-toolchain-config.txt
  ```

  **Commit**: NO (grouped)

---

- [x] 4. Update `.gitignore` with moon entries

  **What to do**:
  - Add these entries to `.gitignore` (if not already present):
    ```
    .moon/cache/
    .moon/docker/
    .moon/hooks/
    ```

  **Must NOT do**:
  - Do NOT remove existing entries

  **Recommended Agent Profile**:
  - **Category**: `quick` — simple file append
  - **Skills**: `[]`
  - **Reason**: Trivial gitignore update

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 5)
  - **Blocks**: Nothing
  - **Blocked By**: Task 1

  **References**:
  - `.gitignore` — read existing content first
  - `https://moonrepo.github.io/website-v1/docs/setup-workspace#initializing-the-repository` — moon adds gitignore patterns

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: .gitignore has moon entries
    Tool: Bash
    Preconditions: .gitignore exists
    Steps:
      1. Run `grep '.moon/cache' .gitignore`
      2. Check output is non-empty
    Expected Result: moon entries present in .gitignore
    Evidence: .sisyphus/evidence/task-4-gitignore.txt
  ```

  **Commit**: NO (grouped)

---

- [x] 5. Add `development` export condition to `@ui/core`

  **What to do**:
  - Edit `packages/core/package.json` → add `development` condition to `"."` exports:
    ```json
    ".": {
      "development": "./src/index.ts",
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
    ```

  **Must NOT do**:
  - Do NOT change existing export paths or other fields
  - Do NOT add development condition to sub-path exports (recipes/\*) — only the main entry

  **Recommended Agent Profile**:
  - **Category**: `quick` — simple JSON edit
  - **Skills**: `[]`
  - **Reason**: One-field addition to package.json

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4)
  - **Blocks**: Nothing directly (but improves dev experience)
  - **Blocked By**: Task 1

  **References**:
  - `packages/core/package.json`:23-34 — current exports structure (no development condition)
  - `packages/solid/package.json:11` — existing development condition pattern to follow

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: @ui/core exports have development condition
    Tool: Bash
    Preconditions: packages/core/package.json exists
    Steps:
      1. Run `grep -A5 '"development"' packages/core/package.json`
      2. Check output contains "./src/index.ts"
    Expected Result: development condition present with correct source path
    Evidence: .sisyphus/evidence/task-5-core-development-export.txt
  ```

  **Commit**: NO (grouped)

---

- [x] 6. Create `packages/core/moon.yml`

  **What to do**:
  - Create `packages/core/moon.yml`:

    ```yaml
    $schema: "https://moonrepo.dev/schemas/project.json"

    language: "typescript"
    layer: "library"
    stack: "frontend"

    project:
      title: "@ui/core"
      description: "Core UI library — tailwind-variants recipes and utilities"

    tags: ["ui", "core"]

    tasks:
      build:
        command: "tsup"
        inputs:
          - "src/**/*"
          - "tsup.config.ts"
        outputs:
          - "dist"
      dev:
        command: "tsup --watch"
      typecheck:
        command: "tsc --noEmit"
    ```

  **Must NOT do**:
  - Do NOT add `dependsOn` — core has no workspace deps
  - Do NOT override package.json scripts

  **Recommended Agent Profile**:
  - **Category**: `quick` — create config file from template
  - **Skills**: `[]`
  - **Reason**: Simple YAML creation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 8, 9, 10)
  - **Blocks**: Nothing
  - **Blocked By**: Task 2 (workspace config)

  **References**:
  - `packages/core/package.json` — scripts to map to tasks (build, dev, typecheck)

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: core moon.yml is valid
    Tool: Bash
    Preconditions: packages/core/moon.yml exists
    Steps:
      1. Run `moon project core --json 2>&1`
      2. Check output contains "core" as project id
      3. Check output contains "build", "dev", "typecheck" tasks
    Expected Result: moon recognizes core project with all 3 tasks
    Evidence: .sisyphus/evidence/task-6-core-project.txt
  ```

  **Commit**: NO (grouped)

---

- [x] 7. Create `packages/solid/moon.yml`

  **What to do**:
  - Create `packages/solid/moon.yml`:

    ```yaml
    $schema: "https://moonrepo.dev/schemas/project.json"

    language: "typescript"
    layer: "library"
    stack: "frontend"

    dependsOn:
      - "core"

    project:
      title: "@ui/solid"
      description: "Solid.js UI components built on Ark UI"

    tags: ["ui", "solid"]

    tasks:
      build:
        command: "tsup"
        deps:
          - "core:build"
        inputs:
          - "src/**/*"
          - "tsup.config.ts"
        outputs:
          - "dist"
      dev:
        command: "tsup --watch"
        deps:
          - "core:dev"
      typecheck:
        command: "tsc --noEmit"
    ```

  **Must NOT do**:
  - Do NOT add `dependsOn` for core at build scope unless explicitly needed

  **Recommended Agent Profile**:
  - **Category**: `quick` — create config file from template
  - **Skills**: `[]`
  - **Reason**: Simple YAML creation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 8, 9, 10)
  - **Blocks**: Nothing (Task 10 will add deps on solid)
  - **Blocked By**: Task 2

  **References**:
  - `packages/solid/package.json` — scripts, depends on @ui/core

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: solid moon.yml is valid with core dependency
    Tool: Bash
    Preconditions: packages/solid/moon.yml exists
    Steps:
      1. Run `moon project solid --json 2>&1`
      2. Check output contains "solid" as project id
      3. Check output contains "core" in dependencies list
    Expected Result: moon recognizes solid project with core dependency
    Evidence: .sisyphus/evidence/task-7-solid-project.txt
  ```

  **Commit**: NO (grouped)

---

- [x] 8. Create `packages/react/moon.yml`

  **What to do**:
  - Create `packages/react/moon.yml`:

    ```yaml
    $schema: "https://moonrepo.dev/schemas/project.json"

    language: "typescript"
    layer: "library"
    stack: "frontend"

    dependsOn:
      - "core"

    project:
      title: "@ui/react"
      description: "React UI components built on Ark UI"

    tags: ["ui", "react"]

    tasks:
      build:
        command: "tsup"
        deps:
          - "core:build"
        inputs:
          - "src/**/*"
          - "tsup.config.ts"
        outputs:
          - "dist"
      dev:
        command: "tsup --watch"
        deps:
          - "core:dev"
      typecheck:
        command: "tsc --noEmit"
    ```

  **Must NOT do**:
  - Do NOT add development scope to dependsOn

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`
  - **Reason**: Simple YAML creation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 9, 10)
  - **Blocks**: Nothing
  - **Blocked By**: Task 2

  **References**:
  - `packages/react/package.json` — scripts, depends on @ui/core

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: react moon.yml is valid with core dependency
    Tool: Bash
    Preconditions: packages/react/moon.yml exists
    Steps:
      1. Run `moon project react --json 2>&1`
      2. Check output contains "react" as project id
      3. Check output contains "core" in dependencies list
    Expected Result: moon recognizes react project with core dependency
    Evidence: .sisyphus/evidence/task-8-react-project.txt
  ```

  **Commit**: NO (grouped)

---

- [x] 9. Create `packages/cli/moon.yml`

  **What to do**:
  - Create `packages/cli/moon.yml`:

    ```yaml
    $schema: "https://moonrepo.dev/schemas/project.json"

    language: "typescript"
    layer: "tool"
    stack: "backend"

    project:
      title: "create-ui"
      description: "CLI tool for scaffolding UI components"

    tags: ["cli"]

    tasks:
      build:
        command: "tsup"
        inputs:
          - "src/**/*"
          - "tsup.config.ts"
        outputs:
          - "dist"
      dev:
        command: "tsup --watch"
      typecheck:
        command: "tsc --noEmit"
    ```

  **Must NOT do**:
  - Do NOT add dependsOn — CLI has no workspace deps

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`
  - **Reason**: Simple YAML creation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8, 10)
  - **Blocks**: Nothing
  - **Blocked By**: Task 2

  **References**:
  - `packages/cli/package.json` — scripts

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: cli moon.yml is valid
    Tool: Bash
    Preconditions: packages/cli/moon.yml exists
    Steps:
      1. Run `moon project cli --json 2>&1`
      2. Check output contains "cli" as project id
    Expected Result: moon recognizes cli project
    Evidence: .sisyphus/evidence/task-9-cli-project.txt
  ```

  **Commit**: NO (grouped)

---

- [x] 10. Create `apps/docs/moon.yml`

  **What to do**:
  - Create `apps/docs/moon.yml`:

    ```yaml
    $schema: "https://moonrepo.dev/schemas/project.json"

    language: "typescript"
    layer: "application"
    stack: "frontend"

    dependsOn:
      - "solid"
      - "core"

    project:
      title: "@ui/docs"
      description: "Documentation site for the UI component library"

    tags: ["docs", "solid"]

    tasks:
      dev:
        command: "vite"
        deps:
          - "solid:dev"
          - "core:dev"
      build:
        command: "vite build"
        deps:
          - "solid:build"
          - "core:build"
        inputs:
          - "src/**/*"
          - "index.html"
          - "vite.config.ts"
        outputs:
          - "dist"
      preview:
        command: "vite preview"
    ```

  **Must NOT do**:
  - Do NOT add `typecheck` task — docs has no tsc script

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`
  - **Reason**: Simple YAML creation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8, 9)
  - **Blocks**: Nothing
  - **Blocked By**: Task 2

  **References**:
  - `apps/docs/package.json` — scripts: dev, build, preview
  - `apps/docs/vite.config.ts` — uses Solid plugin

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: docs moon.yml is valid with dependencies
    Tool: Bash
    Preconditions: apps/docs/moon.yml exists
    Steps:
      1. Run `moon project docs --json 2>&1`
      2. Check output contains "docs" as project id
      3. Check output contains "solid" and "core" in dependencies list
      4. Check output contains "dev", "build", "preview" tasks
    Expected Result: moon recognizes docs project with correct deps and tasks
    Evidence: .sisyphus/evidence/task-10-docs-project.txt
  ```

  **Commit**: NO (grouped)

---

- [x] 11. Verify all moon projects are registered

  **What to do**:
  - Run `moon project --list` and verify all 5 projects appear
  - Run `moon query projects` for detailed info
  - Verify dependency graph is correct

  **Must NOT do**:
  - Do NOT run any build/dev tasks yet

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`
  - **Reason**: Verification task, no code changes

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Task 12)
  - **Blocks**: Nothing
  - **Blocked By**: Tasks 6-10 (all moon.yml created)

  **References**:
  - All moon.yml files created in Tasks 6-10

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: All 5 projects are registered
    Tool: Bash
    Preconditions: All moon.yml files in place
    Steps:
      1. Run `moon project --list 2>&1`
      2. Check that core, solid, react, cli, docs all appear
    Expected Result: 5 projects listed
    Evidence: .sisyphus/evidence/task-11-all-projects.txt

  Scenario: Dependency graph is correct
    Tool: Bash
    Preconditions: All moon.yml files in place
    Steps:
      1. Run `moon query projects --graph 2>&1 || true`
      2. Or run `moon project docs --json 2>&1 | grep -E "deps|dependsOn|dependencies" -A3`
      3. Verify docs depends on solid and core
    Expected Result: docs shows solid and core as dependencies
    Evidence: .sisyphus/evidence/task-11-deps-graph.txt
  ```

  **Commit**: YES (all work) — `chore: setup moon repo with project configs`
  - Files: `.moon/*`, `**/moon.yml`, `.gitignore`, `packages/core/package.json`

---

- [x] 12. Test `moon run docs:dev` startup

  **What to do**:
  - Run `moon run docs:dev` and verify:
    1. It starts core:dev (tsup --watch) first
    2. Then starts solid:dev (tsup --watch)
    3. Then starts docs:dev (vite dev server)
  - Let it run briefly, then kill the process
  - Check vite is listening on a port

  **Must NOT do**:
  - Do NOT run for extended time — just verify startup
  - Do NOT expect build to fully succeed if deps aren't pre-built (first run may require prior build)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`
  - **Reason**: Validation task, run and observe

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Task 11)
  - **Blocks**: Nothing
  - **Blocked By**: Tasks 6-10

  **References**:
  - `apps/docs/moon.yml` — dev task with deps on solid:dev and core:dev

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: moon run docs:dev starts dependency chain
    Tool: Bash (with timeout)
    Preconditions: All moon.yml files exist, packages pre-built or not
    Steps:
      1. Run `timeout 30 moon run docs:dev 2>&1 || true`
      2. Capture output and check for:
         - "core:dev" or "Running dev" for core project
         - "solid:dev" or "Running dev" for solid project
         - "docs:dev" or "VITE" in output
    Expected Result: moon schedules and starts all 3 tasks in dependency order
    Evidence: .sisyphus/evidence/task-12-dev-startup.txt
  ```

  **Commit**: NO (verification only)

---

## Final Verification Wave

- [x] F1. **Plan Compliance Audit** — `oracle` — APPROVE

- [x] F2. **Code Quality Review** — `unspecified-high` — APPROVE

- [x] F3. **Real Manual QA** — `unspecified-high` — APPROVE

- [x] F4. **Scope Fidelity Check** — `deep` — APPROVE (minor session artifacts noted: .sisyphus/boulder.json, pnpm-lock.yaml, tsconfig.json side-effects; all deliverables within scope)

---

## Commit Strategy

- **All tasks (grouped)**: `chore: setup moon repo with project configurations`
  - `.moon/workspace.yml`
  - `.moon/toolchains.yml`
  - `.gitignore`
  - `packages/core/package.json` (development export)
  - `packages/core/moon.yml`
  - `packages/solid/moon.yml`
  - `packages/react/moon.yml`
  - `packages/cli/moon.yml`
  - `apps/docs/moon.yml`

---

## Success Criteria

### Verification Commands

```bash
moon project --list          # Expected: core, solid, react, cli, docs (5 projects)
moon project docs --json     # Expected: shows deps on solid + core
moon run docs:dev            # Expected: starts core:dev → solid:dev → docs:dev
```

### Final Checklist

- [x] `moon project core` succeeds with valid project info
- [x] `moon project solid` succeeds and lists `core` as dependency
- [x] `moon project docs` succeeds and lists `solid`, `core` as dependencies
- [x] `moon run docs:dev` starts all 3 tasks in correct order
- [x] `.moon/workspace.yml` uses glob-based project discovery
- [x] `.moon/toolchains.yml` configures typescript/javascript/pnpm
- [x] `.gitignore` has `.moon/cache/`, `.moon/docker/`, `.moon/hooks/`
- [x] `@ui/core` exports have `development` condition pointing to `./src/index.ts`
