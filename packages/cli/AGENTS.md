# PROJECT KNOWLEDGE BASE

**Generated:** 2026-06-11
**Branch:** main

## OVERVIEW

CLI for component generation (`@fan-ui/cli` / `ui`).

## ARCHITECTURE

```
Build time:                    Runtime:
packages/{framework}/src/  ──  generate-manifest.ts  ──  templates/ + component-manifest.json
packages/core/src/recipes/ ──                        ──       ↓
                                                      ──  add.ts reads manifest
                                                      ──  copies files to user project
                                                      ──  rewrites @fan-ui/core → ../recipes
```

### Key Design Decisions

1. **Manifest-driven**: The CLI reads `component-manifest.json` (generated at build time) instead of hardcoded component lists or direct FS reads of monorepo source.

2. **Bundled templates**: Component source files are copied into `templates/` at build time so the CLI is self-contained (no external deps).

3. **Auto-detected dependencies**: The build script scans imports to detect two types:
   - `recipeDependencies` — `import { buttonVariants } from "@fan-ui/core"` → cross-recipe deps
   - `componentDependencies` — `import { Spinner } from "../spinner"` → cross-component deps

4. **Multi-framework architecture**: `templates/solid/`, `templates/react/`, `templates/vue/` directories. CLI selects via `--framework` flag.

## WHERE TO LOOK

| Task                       | Location                    | Notes                                     |
| -------------------------- | --------------------------- | ----------------------------------------- |
| Add new CLI command        | src/commands/               | Create \*.ts file implementing the command |
| Update CLI index           | src/index.ts                | Export new command                         |
| Add new framework          | src/scripts/generate-manifest.ts | Add to FRAMEWORKS, COMPONENTS constants     |
| Fix dependency detection   | src/scripts/generate-manifest.ts | detectDependencies() function              |
| Update manifest schema     | src/commands/add.ts         | ComponentEntry interface + resolveWithDependencies() |

## COMMANDS

```bash
npm run generate-manifest    # Generate templates + manifest from source
npm run build                # Full build (generate-manifest + tsup + copy to dist)
moon run @fan-ui/cli:build     # Same via moonrepo
moon run @fan-ui/cli:dev       # Watch mode
```

## IMPORTANT NOTES

- `templates/` and `component-manifest.json` are generated artifacts — do not edit manually
- They are gitignored; regenerate after changing packages/solid/ or packages/core/recipes/
- The build script (`generate-manifest.ts`) is NOT bundled into dist/ — it's a build-time tool only
- Cross-dependency detection currently handles: `@fan-ui/core` imports (recipe deps) and `../<component>` relative imports (component deps)
- Known cross-dependencies: button→spinner, select→scroll-area, alert-dialog→button, date-picker→button, menu→button

## ANTI-PATTERNS (THIS DIRECTORY)

- Adding runtime FS reads of monorepo source in add.ts — use the manifest instead
- Editing templates/ or component-manifest.json directly — regenerate instead
- Hardcoding component lists — add to COMPONENTS in generate-manifest.ts
- Making add.ts too complex; keep it focused on manifest-based file copying
