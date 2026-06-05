# PROJECT KNOWLEDGE BASE

**Generated:** 2026-05-27 02:47:19 UTC
**Commit:** f3d6548f
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

## COMMANDS

```bash
moon run create-ui:build
moon run create-ui:dev
```
