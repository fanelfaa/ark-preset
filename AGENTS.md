# PROJECT KNOWLEDGE BASE

**Generated:** $(date -u +"%Y-%m-%d %H:%M:%S UTC")
**Commit:** $(git rev-parse --short HEAD)
**Branch:** $(git rev-parse --abbrev-ref HEAD)

## OVERVIEW

Monorepo UI library with Ark UI primitives, Solid.js and React implementations, CLI tool, and documentation site.

## STRUCTURE

```
.
├── packages/          # UI libraries and CLI
│   ├── core/          # Styling primitives (Ark UI recipes)
│   ├── solid/         # Solid.js component library
│   ├── react/         # React component library
│   └── cli/           # CLI for component generation
├── apps/              # Applications
│   └── docs/          # Documentation site (Vite + Solid.js)
├── .sisyphus/         # Agentic coding framework artifacts
└── .moon/             # Moonrepo configuration
```

## WHERE TO LOOK

| Task                     | Location                   | Notes                                               |
| ------------------------ | -------------------------- | --------------------------------------------------- |
| Add new component recipe | packages/core/src/recipes/ | Create \*.ts file with tv() slots and variants      |
| Add Solid.js component   | packages/solid/src/        | Create \*.tsx wrapper around Ark UI Solid component |
| Add React component      | packages/react/src/        | Create \*.tsx wrapper around Ark UI React component |
| Update CLI templates     | packages/cli/src/          | Modify command templates                            |
| Update documentation     | apps/docs/src/             | Edit MDX or TSX files                               |
| Check component status   | COMPONENT_TODOS.md         | Track implementation progress                       |

## CODE MAP

| Symbol         | Type      | Location                            | Refs | Role                       |
| -------------- | --------- | ----------------------------------- | ---- | -------------------------- |
| buttonVariants | variable  | packages/core/src/recipes/button.ts | 3    | Styling variant for Button |
| inputVariants  | variable  | packages/core/src/recipes/input.ts  | 3    | Styling variant for Input  |
| Button         | component | packages/solid/src/button.tsx       | 3    | Solid.js Button wrapper    |
| Button         | component | packages/react/src/button.tsx       | 3    | React Button wrapper       |
| create-ui      | binary    | packages/cli/src/index.ts           | 1    | CLI entry point            |

## CONVENTIONS

- Use Ark UI primitives as base for all components
- Style with tailwind-variants tv() function in core recipes
- Framework wrappers (solid/react) delegate to Ark UI with minimal props
- Export variants from core/index.ts and components from framework/index.ts
- Keep CLI bin unscoped (`ui`) despite @ui/\* package naming
- All configuration in package.json, vite.config.ts, tsconfig.json

## ANTI-PATTERNS (THIS PROJECT)

- Deep exports in @ui/core/package.json incomplete (only 5/14 recipes exported)
- React library lags behind Solid (5 vs 14 components)
- No test infrastructure whatsoever
- Root package name mismatch (solid-ark-ui vs @ui/\* scope)

## UNIQUE STYLES

- Recipe-first approach: styling primitives defined before framework wrappers
- Moonrepo for task orchestration instead of conventional npm scripts
- Sisyphus agent framework for AI-assisted development tracking
- Component tracking via COMPONENT_TODOS.md with 52 total targets

## COMMANDS

\`\`\`bash

# Development

pnpm dev # Run docs site
pnpm build # Build all packages
pnpm test # Not implemented yet

# Package-specific

pnpm --filter @ui/core build
pnpm --filter @ui/solid dev
pnpm --filter @ui/react dev
pnpm --filter create-ui

# Moonrepo

moon run # Run moon tasks
moon ci # CI pipeline
\`\`\`

## NOTES

- The .sisyphus/ directory contains agent plans, drafts, and evidence - do not modify manually
- Component completeness tracked in COMPONENT_TODOS.md (14/52 done as of May 2026)
- Ark UI version locked via dependencies; check package.json for exact version
- Solid.js components use inline SVG icons to avoid extra dependencies
