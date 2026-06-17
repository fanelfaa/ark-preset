# PACKAGES/CLI KNOWLEDGE

**Generated:** 2026-06-17
**Branch:** main

## OVERVIEW

CLI for component generation (`@fan-ui/cli` / `ui` bin). Manifest-driven, multi-framework architecture.

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

1. **Manifest-driven**: CLI reads `component-manifest.json` (generated at build time) instead of hardcoded lists or direct FS reads.
2. **Bundled templates**: Component source files copied into `templates/` at build time — CLI is self-contained.
3. **Auto-detected dependencies**: Build script scans imports for recipeDependencies (`@fan-ui/core` imports) and componentDependencies (`../<component>` relative imports).
4. **Multi-framework**: `templates/solid/`, `templates/react/`, `templates/vue/` directories. CLI selects via `--framework` flag.

## WHERE TO LOOK

| Task                     | Location                         | Notes                                                |
| ------------------------ | -------------------------------- | ---------------------------------------------------- |
| Add new CLI command      | src/commands/                    | Create *.ts file implementing the command            |
| Update CLI index         | src/index.ts                     | Export new command                                   |
| Add new framework        | src/scripts/generate-manifest.ts | Add to FRAMEWORKS, COMPONENTS constants              |
| Fix dependency detection | src/scripts/generate-manifest.ts | detectDependencies() function                        |
| Update manifest schema   | src/commands/add.ts              | ComponentEntry interface + resolveWithDependencies() |

## COMMANDS

```bash
npm run generate-manifest    # Generate templates + manifest from source
npm run build                # Full build (generate-manifest + tsup + copy to dist)
moon run @fan-ui/cli:build   # Same via moonrepo
moon run @fan-ui/cli:dev     # Watch mode
```

## IMPORTANT NOTES

- `templates/` and `component-manifest.json` are generated artifacts — do not edit manually
- They are gitignored; regenerate after changing packages/solid/ or packages/core/recipes/
- The build script (`generate-manifest.ts`) is NOT bundled into dist/ — build-time tool only
- Cross-dependency detection handles: `@fan-ui/core` imports (recipe deps) and `../<component>` relative imports (component deps)
- Known cross-dependencies: button→spinner, select→scroll-area, alert-dialog→button, date-picker→button, menu→button, hover-card→button, popover→button, dialog→button, drawer→button, tooltip→button
- add.ts (331 lines) is the largest source file — packs 6 responsibilities: manifest loading, dep resolution, file copy, import rewriting, index updates, rollback
- @fan-ui/core and @fan-ui/solid are listed as runtime deps but only needed at build time
- No test infrastructure

## ANTI-PATTERNS (THIS DIRECTORY)

- Adding runtime FS reads of monorepo source in add.ts — use the manifest instead
- Editing templates/ or component-manifest.json directly — regenerate instead
- Hardcoding component lists — add to COMPONENTS in generate-manifest.ts
- Making add.ts too complex; keep it focused on manifest-based file copying
