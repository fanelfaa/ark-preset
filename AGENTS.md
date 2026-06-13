# PROJECT KNOWLEDGE BASE

**Generated:** 2026-05-27 02:47:19 UTC
**Commit:** f3d6548f
**Branch:** main

## OVERVIEW

Monorepo UI library with Ark UI primitives, Solid.js implementations, CLI tool, and documentation site.

## STRUCTURE

```
.
├── packages/          # UI libraries and CLI
│   ├── core/          # Styling primitives (Ark UI recipes)
│   ├── solid/         # Solid.js component library
│   └── cli/           # CLI for component generation
├── apps/              # Applications
│   └── docs/          # Documentation site (Astro + Solid.js)
├── .sisyphus/         # Agentic coding framework artifacts
└── .moon/             # Moonrepo configuration
```

## WHERE TO LOOK

| Task                     | Location                   | Notes                                               |
| ------------------------ | -------------------------- | --------------------------------------------------- |
| Add new component recipe | packages/core/src/recipes/ | Create \*.ts file with tv() slots and variants      |
| Add Solid.js component   | packages/solid/src/        | Create \*.tsx wrapper around Ark UI Solid component |
| Add React component      | (temporarily removed)      | Focus on Solid.js components first                  |
| Update CLI templates     | packages/cli/src/          | Modify command templates                            |
| Update documentation     | apps/docs/src/             | Edit MDX, TSX, or Astro files                       |
| Check component status   | COMPONENT_TODOS.md         | Track implementation progress                       |

## CODE MAP

| Symbol         | Type      | Location                            | Refs | Role                       |
| -------------- | --------- | ----------------------------------- | ---- | -------------------------- |
| buttonVariants | variable  | packages/core/src/recipes/button.ts | 3    | Styling variant for Button |
| inputVariants  | variable  | packages/core/src/recipes/input.ts  | 3    | Styling variant for Input  |
| Button         | component | packages/solid/src/button/          | 3    | Solid.js Button wrapper    |
| @ui/cli        | binary    | packages/cli/src/index.ts           | 1    | CLI entry point            |

## CONVENTIONS

- Use Ark UI primitives as base for all components
- Style with tailwind-variants tv() function in core recipes
- Framework wrappers (solid) delegate to Ark UI with minimal props
- Export variants from core/index.ts and components from framework/index.ts
- Keep CLI bin unscoped (`ui`) despite @ui/\* package naming
- All configuration in package.json, vite.config.ts, tsconfig.json

## ANTI-PATTERNS (THIS PROJECT)

- No test infrastructure whatsoever
- Root package name mismatch (solid-ark-ui vs @ui/\* scope)
- Deep exports in @ui/core/package.json incomplete (only 2/35 recipes exported)
- 3 flat `.tsx` files in solid/src inconsistent with directory component pattern

## UNIQUE STYLES

- Recipe-first approach: styling primitives defined before framework wrappers
- Moonrepo for task orchestration instead of conventional npm scripts
- Sisyphus agent framework for AI-assisted development tracking
- Component tracking via COMPONENT_TODOS.md with 88 total targets

## COMMANDS

\`\`\`bash

# Development

moon run docs:dev # Run docs site
pnpm build # Build all packages
pnpm test # Not implemented yet

# Package-specific

moon run core:build
moon run solid:dev
moon run create-ui:dev

# Moonrepo

moon run # Run moon tasks
moon ci # CI pipeline
\`\`\`

## NOTES

- The .sisyphus/ directory contains agent plans, drafts, and evidence - do not modify manually
- Component completeness tracked in COMPONENT_TODOS.md (31/88 done as of May 2026)
- Ark UI version locked via dependencies; check package.json for exact version
- Solid.js components use inline SVG icons to avoid extra dependencies
- React package temporarily removed — focus on Solid.js components first

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:

- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)
