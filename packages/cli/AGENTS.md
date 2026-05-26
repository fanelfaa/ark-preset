# PROJECT KNOWLEDGE BASE

**Generated:** 2026-05-14 05:04:27 UTC
**Commit:** 3fcc19f
**Branch:** main

## OVERVIEW

CLI for component generation

## WHERE TO LOOK

| Task                | Location      | Notes                                      |
| ------------------- | ------------- | ------------------------------------------ |
| Add new CLI command | src/commands/ | Create \*.ts file implementing the command |
| Update CLI index    | src/index.ts  | Export new command                         |

## ANTI-PATTERNS (THIS DIRECTORY)

- Not exporting the new command in src/index.ts
- Making the command too complex; keep it focused and reusable

## COMMONS

```bash
# Standard commands (if applicable)
```

## NOTES

- This directory is part of the monorepo structure.
- See the root AGENTS.md for project-wide information.
