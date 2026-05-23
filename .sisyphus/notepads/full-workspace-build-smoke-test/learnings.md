# T21 Learnings: Full Workspace Build + Smoke Test

## Issue: TypeScript Project References

### Problem

`@ui/solid` (`packages/ui`) typecheck failed with:

```
error TS6306: Referenced project '/home/fandi/Lab/Js/ui/packages/core' must have setting "composite": true.
error TS6310: Referenced project '/home/fandi/Ls/ui' may not disable emit.
```

### Root Cause

- `packages/ui/tsconfig.json` had a `references` field pointing to `../core`
- `packages/core/tsconfig.json` didn't have `composite: true` required for project references
- Base tsconfig has `noEmit: true` which conflicts with composite projects

### Attempted Fix

Added `composite`, `noEmit: false`, `declaration`, `declarationMap` to core tsconfig. This caused new errors:

```
error TS6305: Output file '/home/fandi/Lab/Js/ui/packages/core/src/index.d.ts' has not been built from source file...
```

### Final Fix

Removed project references from `@ui/solid` tsconfig entirely. Typecheck now passes by resolving `@ui/core` through installed package (not source). This works because:

1. Build output in `dist/` includes `.d.ts` files
2. `skipLibCheck: true` in base config handles minor declaration mismatches
3. pnpm symlinks make the package available

### Key Takeaway

Project references with composite mode require careful setup and incremental builds. For monorepo typechecking, simpler approach without project references works fine when packages are properly built first.

## Verification Results

- ✅ `pnpm build` - All 5 packages build successfully
- ✅ `pnpm --filter @ui/core typecheck` - Passes
- ✅ `pnpm --filter @ui/solid typecheck` - Passes
- ✅ `pnpm --filter @ui/react typecheck` - Passes
