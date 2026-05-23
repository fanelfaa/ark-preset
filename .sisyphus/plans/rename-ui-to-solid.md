# Plan: Rename packages/ui → packages/solid

## TL;DR

> **Quick Summary**: Rename the directory `packages/ui` to `packages/solid` in the monorepo, keeping the npm package name `@ui/solid` unchanged. Update 2 hardcoded directory path references and regenerate the lockfile.
>
> **Deliverables**:
>
> - Directory renamed: `packages/ui/` → `packages/solid/`
> - `packages/cli/src/commands/add.ts` path updated
> - `apps/docs/src/index.css` `@source` path updated
> - Lockfile regenerated via `pnpm install`
> - Verified: no stale `packages/ui` references remain, build passes
>
> **Estimated Effort**: Quick
> **Parallel Execution**: NO — sequential, 4 quick steps
> **Critical Path**: git mv → edit files → pnpm install → verify

---

## Context

### Original Request

Rename `packages/ui` to `packages/solid` in the monorepo, ensuring `packages/cli` and `apps/docs` still work correctly.

### Interview Summary

**Key Discussions**:

- **Package name**: Keep `@ui/solid` — pnpm resolves workspace deps by package.json `name`, not directory path
- **Verification**: Simple rename — no formal tests needed; verify via build
- **Correction**: Original request said "solig", corrected to "solid"

**Research Findings**:

- **2 hardcoded path references** found: `packages/cli/src/commands/add.ts:16` and `apps/docs/src/index.css:5`
- **Safe packages**: `@ui/core`, `@ui/react` — no references to `packages/ui`
- **Workspace config**: `pnpm-workspace.yaml` uses `packages/*` glob — auto-includes new dir
- **Tsconfig files**: All use relative `../../` paths — correct from any subdirectory name
- **No CI/CD, turbo.json, or README files** exist to update
- **pnpm-lock.yaml** has 3 references — auto-fixed via `pnpm install`

### Metis Review

**Identified Gaps** (addressed):

- **Rollback plan**: Added as final task — `git checkout` restores if anything fails
- **Stale reference check**: Added grep verification in the verification task
- **Pre-flight checks**: Added to ensure clean state before starting
- **Scope guardrails**: Explicit "MUST NOT" list in tasks

---

## Work Objectives

### Core Objective

Rename `packages/ui` directory to `packages/solid` while preserving all functionality.

### Concrete Deliverables

- `packages/solid/` exists with all `packages/ui/` contents
- No stale `packages/ui` path references in source files
- `pnpm install` succeeds cleanly
- `pnpm build` passes

### Definition of Done

- [x] `ls packages/` shows `solid/` (not `ui/`)
- [x] `grep -rn "packages/ui" --include="*.{ts,tsx,css,json}" . | grep -v node_modules | grep -v pnpm-lock | grep -v ".git"` returns empty
- [x] `pnpm install` exits 0
- [x] `pnpm build` exits 0

### Must Have

- Directory renamed with git history preserved (git mv)
- `/packages/cli/src/commands/add.ts` line 16: `'packages/ui/src'` → `'packages/solid/src'`
- `apps/docs/src/index.css` line 5: `@source '../../../packages/ui/src/'` → `@source '../../../packages/solid/src/'`
- Lockfile regenerated

### Must NOT Have (Guardrails)

- DO NOT change `packages/solid/package.json` `name` field (keep `@ui/solid`)
- DO NOT touch `packages/core`, `packages/react`, or other packages
- DO NOT modify `pnpm-workspace.yaml`
- DO NOT edit import statements or `@ui/solid` references
- DO NOT refactor `add.ts` logic beyond the path string
- DO NOT add any new documentation or tests

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed.

### Test Decision

- **Infrastructure exists**: NO
- **Automated tests**: NONE — simple rename verification
- **Agent-Executed QA**: YES — grep-based verification + build check

### QA Policy

Each task includes agent-executed verification scenarios. Evidence directory: `.sisyphus/evidence/rename-ui-to-solid/`.

---

## Execution Strategy

### Sequential Steps (no parallelism needed — 4 quick tasks)

```
Step 1: Pre-flight checks
Step 2: git mv + edit source files
Step 3: pnpm install + build
Step 4: Verification sweep
```

---

## TODOs

- [x] 1. Pre-flight Checks

  **What to do**:
  - Verified current state: `ls packages/` shows `ui/`
  - Confirmed git working tree is not clean (pre-existing modifications — noted and proceeded)
  - Confirmed no submodules
  - Confirmed existing references to `packages/ui`:
    - `grep "packages/ui" packages/cli/src/commands/add.ts` matched line 16
    - `grep "packages/ui" apps/docs/src/index.css` matched line 5

  **Must NOT do**:
  - DO NOT make any changes in this task

  **Recommended Agent Profile**:
  - **Category**: `quick`

  **Parallelization**:
  - **Can Run In Parallel**: NO

  **Acceptance Criteria**:
  - [x] `ls packages/ui` exited successfully (directory existed)
  - [x] `git status --porcelain` — working tree had pre-existing modifications (documented, proceeded)
  - [x] Stale references confirmed present (grep matches found)

  **QA Scenarios**:

  ```
  Scenario: Pre-flight verification
    Tool: Bash
    Preconditions: Repository checked out at /home/fandi/Lab/Js/ui
    Steps:
      1. Run `ls packages/ui` — should show src/package.json/tsconfig.json/tsup.config.ts
      2. Run `git status --porcelain` — should return empty
      3. Run `grep "packages/ui" packages/cli/src/commands/add.ts` — should match line 16
      4. Run `grep "packages/ui" apps/docs/src/index.css` — should match line 5
    Expected Result: All 4 checks pass, showing clean state
    Failure Indicators: Any command returns unexpected result (dir missing, dirty tree, no matches)
    Evidence: .sisyphus/evidence/rename-ui-to-solid/task-1-preflight.txt
  ```

  **Commit**: NO

- [x] 2. Rename Directory & Update Path References

  **What to do**:
  1. Renamed directory with git history: `git mv packages/ui packages/solid`
  2. Edited `packages/cli/src/commands/add.ts` line 16: `'packages/ui/src'` → `'packages/solid/src'`
  3. Edited `apps/docs/src/index.css` line 5: `@source '../../../packages/ui/src/'` → `@source '../../../packages/solid/src/'`

  **Must NOT do**:
  - DO NOT touch any other files
  - DO NOT use `mv` — must use `git mv` to preserve history

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Two simple string replacements + one git mv command
  - **Skills**: `[]`
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: NO

  **Acceptance Criteria**:
  - [x] `ls packages/solid` — directory exists with correct contents
  - [x] `ls packages/ui` — directory no longer exists
  - [x] `grep "packages/solid" packages/cli/src/commands/add.ts` — match found on line 16
  - [x] `grep "packages/solid" apps/docs/src/index.css` — match found on line 5
  - [x] `grep "packages/ui" packages/cli/src/commands/add.ts` — no match (stale ref removed)
  - [x] `grep "packages/ui" apps/docs/src/index.css` — no match (stale ref removed)

  **QA Scenarios**:

  ```
  Scenario: Directory rename verified
    Tool: Bash
    Preconditions: Task 1 completed successfully
    Steps:
      1. Run `ls packages/solid/src/index.ts` — should exist
      2. Run `ls packages/ui 2>&1` — should say "No such file or directory"
    Expected Result: Directory renamed, old path gone
    Failure Indicators: packages/ui still exists, or packages/solid is empty
    Evidence: .sisyphus/evidence/rename-ui-to-solid/task-2-dir-rename.txt

  Scenario: CLI path updated
    Tool: Bash
    Preconditions: Directory renamed
    Steps:
      1. Run `grep "packages/solid" packages/cli/src/commands/add.ts`
    Expected Result: Match on line 16: `const sourceBase = ... 'packages/solid/src'`
    Failure Indicators: Still shows `packages/ui`
    Evidence: .sisyphus/evidence/rename-ui-to-solid/task-2-cli-path.txt

  Scenario: CSS @source path updated
    Tool: Bash
    Preconditions: Directory renamed
    Steps:
      1. Run `grep "packages/solid" apps/docs/src/index.css`
    Expected Result: Match on line 5: `@source '../../../packages/solid/src/'`
    Failure Indicators: Still shows `packages/ui`
    Evidence: .sisyphus/evidence/rename-ui-to-solid/task-2-css-path.txt
  ```

  **Commit**: YES
  - Message: `chore: rename packages/ui to packages/solid`
  - Files: `packages/solid/`, `packages/cli/src/commands/add.ts`, `apps/docs/src/index.css`
  - Pre-commit: Verify `git status` shows renamed directory + 2 edited files

- [x] 3. Regenerate Lockfile & Build Verification

  **What to do**:
  1. Ran `pnpm install` — lockfile regenerated successfully
  2. Ran `pnpm build` — all 5 packages built successfully

  **Must NOT do**:
  - Not manually edited pnpm-lock.yaml
  - Not skipped build step

  **Parallelization**:
  - **Can Run In Parallel**: NO

  **Acceptance Criteria**:
  - [x] `pnpm install` exited with code 0
  - [x] `pnpm build` exited with code 0
  - [x] `grep "packages/solid" pnpm-lock.yaml` — matches found (links updated)

  **QA Scenarios**:

  ```
  Scenario: pnpm install succeeds
    Tool: Bash
    Preconditions: Task 2 completed (dir renamed, files edited)
    Steps:
      1. Run `pnpm install` in /home/fandi/Lab/Js/ui
    Expected Result: Exit code 0, no errors
    Failure Indicators: Error about missing package/link to packages/ui
    Evidence: .sisyphus/evidence/rename-ui-to-solid/task-3-pnpm-install.txt

  Scenario: Build succeeds
    Tool: Bash
    Preconditions: pnpm install succeeded
    Steps:
      1. Run `pnpm build` in /home/fandi/Lab/Js/ui
    Expected Result: All packages build successfully, exit code 0
    Failure Indicators: Build error referencing stale path or missing module
    Evidence: .sisyphus/evidence/rename-ui-to-solid/task-3-build.txt
  ```

  **Commit**: NO (lockfile update included in previous commit via amend or next commit)
  - Message: If committing separately: `chore: update lockfile after packages/ui rename`
  - Files: `pnpm-lock.yaml`

- [x] 4. Final Verification Sweep

  **What to do**:
  1. Verified NO stale `packages/ui` references remain in source files
  2. Ran comprehensive grep across the entire repo — zero matches
  3. Confirmed `pnpm build` passes (idempotent check) — exit 0

  **Must NOT do**:
  - DO NOT modify any files — this is read-only verification

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Pure verification, no changes
  - **Skills**: `[]`
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: NO

  **Acceptance Criteria**:
  - [x] `grep -rn "packages/ui" --include="*.{ts,tsx,css,json}" . | grep -v node_modules | grep -v pnpm-lock | grep -v ".git"` — returns empty
  - [x] `ls packages/solid/src/index.ts` exists
  - [x] `pnpm build` exits 0

  **QA Scenarios**:

  ```
  Scenario: No stale references remain
    Tool: Bash
    Preconditions: All previous tasks completed
    Steps:
      1. Run comprehensive grep for leftover `packages/ui` references:
         grep -rn "packages/ui" --include="*.{ts,tsx,css,json}" . | grep -v node_modules | grep -v pnpm-lock | grep -v ".git"
    Expected Result: Empty output (no stale references)
    Failure Indicators: Any match found — means we missed a file
    Evidence: .sisyphus/evidence/rename-ui-to-solid/task-4-stale-refs.txt

  Scenario: Build still passes (idempotent check)
    Tool: Bash
    Preconditions: Clean state
    Steps:
      1. Run `pnpm build` again
    Expected Result: Exit code 0
    Failure Indicators: Build fails (should be stable after task 3)
    Evidence: .sisyphus/evidence/rename-ui-to-solid/task-4-build-recheck.txt
  ```

  **Commit**: NO (merged with task 2 commit)

---

## Commit Strategy

- **Task 2**: `chore: rename packages/ui to packages/solid`
  - Files: packages/solid/ (moved), packages/cli/src/commands/add.ts, apps/docs/src/index.css
  - Pre-commit: `pnpm build` passes
- **Task 3**: Squash lockfile changes into task 2 commit, or commit separately:
  - `chore: update lockfile after packages/ui rename`
  - Files: pnpm-lock.yaml

---

## Success Criteria

### Verification Commands

```bash
ls packages/solid/src/index.ts          # Should exist
ls packages/ui 2>&1                     # Should say "No such file or directory"
grep -rn "packages/ui" --include="*.{ts,tsx,css,json}" . | grep -v node_modules | grep -v pnpm-lock | grep -v ".git"
                                        # Should return empty
pnpm build                              # Exit code 0
```

### Final Checklist

- [x] Directory renamed: `packages/ui/` → `packages/solid/`
- [x] CLI path updated: `packages/cli/src/commands/add.ts` references `packages/solid`
- [x] CSS path updated: `apps/docs/src/index.css` references `packages/solid`
- [x] Lockfile regenerated with new path links
- [x] No stale `packages/ui` references remain in source files
- [x] `pnpm build` passes
