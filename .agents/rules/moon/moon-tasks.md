# Moon Task Definition Rules

## Task Structure

Every `moon.yml` task should have:

```yaml
tasks:
  <task-name>:
    command: '<actual command>'
    inputs: ['src/**']           # What changes trigger rebuild
    outputs: ['dist/**']        # What gets produced
    deps:                       # Build-time dependencies
      - '<project>:<task>'
```

## Input Patterns

```yaml
inputs:
  - 'src/**'        # All source files
  - 'tsup.config.ts'
  - 'package.json'
  - 'tsconfig.json'
```

## Output Patterns

```yaml
outputs:
  - 'dist/**'      # All built files
```

## Dependency Types

### Task-level deps (build order)
```yaml
build:
  deps:
    - 'core:build'   # Run core:build before this
```

### Project-level dependsOn (workspace deps)
```yaml
dependsOn:
  - 'core'          # This project needs core built first
```

## Dev vs Build Tasks

### Build tasks (production)
```yaml
build:
  command: 'tsup'
  inputs: ['src/**', 'tsup.config.ts']
  outputs: ['dist/**']
```

### Dev tasks (watch mode)
```yaml
dev:
  command: 'tsup --watch'
  # No outputs - watch mode is persistent
```

### Composite dev tasks (apps)
```yaml
dev:
  command: 'vite'
  deps:
    - 'solid:dev'    # Start solid first
    - 'core:dev'     # Start core first
```

## Don't Do

❌ **Don't** use `@globs()` syntax — invalid in moon v2
```yaml
# WRONG
inputs:
  - '@globs(src/**)'
```
```yaml
# RIGHT
inputs:
  - 'src/**'
```

❌ **Don't** add `type: library` — not a valid moon field
```yaml
# WRONG
type: library
layer: library
```

❌ **Don't** add task deps for dev commands when using project-level `dependsOn`