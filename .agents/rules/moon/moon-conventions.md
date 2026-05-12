# Moon Build System Conventions

## Overview

This repo uses **moon v2** as the build system orchestrator. Moon runs tasks with proper dependency resolution and project graph management.

## Key Commands

```bash
moon project <name>       # Show project info
moon project <name> --json # JSON output for parsing
moon run <project>:<task> # Run task with deps
moon toolchain            # Manage tool versions
moon query projects       # Show all projects
```

## Project Structure

- `.moon/workspace.yml` — Glob-based project discovery (`apps/*`, `packages/*`)
- `.moon/toolchains.yml` — Node, pnpm, TypeScript version constraints
- `<project>/moon.yml` — Per-project task definitions

## Task Running

```
moon run docs:dev
  └── 1. core:dev (tsup --watch)   [persistent, background]
  └── 2. solid:dev (tsup --watch)  [persistent, background]
  └── 3. docs:dev (vite)           [persistent, foreground]
```

Moon automatically orders dependencies. Do NOT manually run deps before `moon run` — let moon handle it.

## Common Patterns

### Adding a new project

1. Create `packages/<name>/moon.yml` or `apps/<name>/moon.yml`
2. Include required fields:
   ```yaml
   language: typescript
   layer: library  # or 'application', 'tool'
   stack: frontend  # or 'backend'
   tasks:
     build:
       command: 'tsup'
       inputs: ['src/**']
       outputs: ['dist/**']
     dev:
       command: 'tsup --watch'
   ```

### Task dependencies

Use `deps` to enforce build order:
```yaml
tasks:
  build:
    command: 'vite build'
    deps:
      - 'core:build'
      - 'solid:build'
```

### Project dependencies

Use `dependsOn` for workspace deps:
```yaml
dependsOn:
  - 'core'
  - 'solid'
```

## Verification

After any moon config change, verify:
```bash
moon project <name>           # Should show project
moon project <name> --json    # Should show deps
moon run <project>:<task>     # Should start with deps
```

## Common Issues

| Issue | Cause | Fix |
|---|---|---|
| `glob::create` error | Invalid glob syntax (`@globs()`) | Use `src/**` not `@globs(src/**)` |
| Node version mismatch | toolchains.yml has wrong version | Update `node.version` to `>=23` |
| Task not found | Wrong project ID | Check `moon project --list` for correct ID |