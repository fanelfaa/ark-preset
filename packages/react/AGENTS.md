# PROJECT KNOWLEDGE BASE

**Generated:** 2026-05-14 05:04:27 UTC
**Commit:** 3fcc19f
**Branch:** main

## OVERVIEW

React component library

## WHERE TO LOOK

| Task                    | Location       | Notes                                         |
| ----------------------- | -------------- | --------------------------------------------- |
| Add new React component | src/           | Create \*.tsx wrapper around Ark UI component |
| Update react index      | src/index.ts   | Export new component                          |
| Update build config     | tsup.config.ts | Add new component to entry list               |

## ANTI-PATTERNS (THIS DIRECTORY)

- Forgetting to add the new component to tsup.config.ts entry list
- Not exporting the new component in src/index.ts
- Not using inline SVG icons to avoid extra dependencies
- Over-complicating the wrapper; keep it minimal and delegate to Ark UI

## COMMONS

```bash
# Standard commands (if applicable)
```

## NOTES

- This directory is part of the monorepo structure.
- See the root AGENTS.md for project-wide information.
