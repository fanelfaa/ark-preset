# Core Package Infrastructure - Learnings

## Task T1 Complete

### What was created:

- `packages/core/package.json` - @ui/core package with type: module, build scripts, tailwind-variants/merge deps
- `packages/core/tsconfig.json` - extends tsconfig.base.json
- `packages/core/tsup.config.ts` - ESM/CJS build, NO JSX, external: tailwind-variants
- `packages/core/src/tv.ts` - createTV wrapper (moved from packages/ui)
- `packages/core/src/theme.css` - @theme CSS (moved from packages/ui)
- `packages/core/src/types.ts` - VariantProps re-export
- `packages/core/src/index.ts` - main entry point

### Issue encountered:

- Duplicate identifier error on VariantProps when re-exporting from both tv.ts and types.ts
- Fix: Only export tv from tv.ts, keep types.ts as separate re-export for consumers

### Key patterns:

- Core package has NO JSX/TSX, pure TypeScript
- No framework dependencies (no solid-js, react, @ark-ui/solid)
- Externalize tailwind-variants to avoid bundling
- theme.css exported via separate export path for direct import
