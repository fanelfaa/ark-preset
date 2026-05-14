# PROJECT KNOWLEDGE BASE

**Generated:** 2026-05-14 05:04:27 UTC
**Commit:** 3fcc19f
**Branch:** main

## OVERVIEW
Styling primitives (Ark UI recipes)


## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Add new component recipe | src/recipes/ | Create \*.ts file with tv() slots and variants |
| Update core index | src/index.ts | Export new recipe variants |
| Update build config | tsup.config.ts | Add new recipe to entry list |


## ANTI-PATTERNS (THIS DIRECTORY)
- Forgetting to add the new recipe to tsup.config.ts entry list
- Not exporting the new recipe variants in src/index.ts
- Using CSS directly instead of tailwind-variants tv() function

## COMMONS
```bash
# Standard commands (if applicable)
```

## NOTES
- This directory is part of the monorepo structure.
- See the root AGENTS.md for project-wide information.
