# Moon Build System

## Commands

```bash
moon project <name>      # Show project info
moon run <project>:<task> # Run task with deps
moon toolchain --json     # Show toolchain config
```

## Config Files

- `.moon/workspace.yml` — Project discovery (`apps/*`, `packages/*`)
- `.moon/toolchains.yml` — Tool versions
- `<project>/moon.yml` — Task definitions

## Task Structure

```yaml
tasks:
  build:
    command: "tsup"
    inputs: ["src/**"]
    outputs: ["dist/**"]
    deps: ["core:build"] # Run core:build first
  dev:
    command: "tsup --watch"
    deps: ["core:dev"]
```

## Project Dependencies

```yaml
dependsOn:
  - "core" # Build core before this project
  - "solid"
```

## Dev vs Build

- **Build**: `inputs`, `outputs` required
- **Dev**: no `outputs` (watch mode is persistent)

## Don't

❌ `@globs()` syntax — use `src/**`
❌ `type: library` field — use `layer: library`
❌ Manual deps when `dependsOn` handles it
