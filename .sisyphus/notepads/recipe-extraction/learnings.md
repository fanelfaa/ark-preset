## T3-T6: Input, Dialog, Select, Toast Recipe Extraction

### Status: ✅ Complete

### Files Created:

- packages/core/src/recipes/input.ts
- packages/core/src/recipes/dialog.ts
- packages/core/src/recipes/select.ts
- packages/core/src/recipes/toast.ts

### Verification:

- Build succeeded: `pnpm --filter @ui/core build`
- All 4 recipe files match source variants exactly

### Patterns:

- Each recipe: imports tv from '../tv', VariantProps from 'tailwind-variants'
- Exports: variants function + VariantProps type
- Build output: ESM + CJS + DTS in dist/

### Blocks: T7 (barrel exports)
