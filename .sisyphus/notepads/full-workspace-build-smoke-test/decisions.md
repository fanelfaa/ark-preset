# T21 Decisions

## Decision: Remove Project References from @ui/solid

**Context**: Typecheck for @ui/solid (`@ui/ui` package) was failing due to TypeScript project reference misconfiguration.

**Options Considered**:

1. Add `composite: true` to @ui/core tsconfig - Requires managing incremental builds
2. Remove project references entirely - Simplest solution, works with built packages

**Decision**: Remove project references from `packages/ui/tsconfig.json`

**Rationale**:

- Project references with composite mode add complexity
- The workspace properly builds packages before typechecking
- Built packages in `dist/` include proper `.d.ts` files
- `skipLibCheck: true` handles any minor type declaration mismatches

**Result**: All typechecks pass cleanly.
