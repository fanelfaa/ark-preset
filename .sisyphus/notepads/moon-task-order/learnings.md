# Moon Task Order Test Findings

## Test: `moon run docs:dev`

### Expected Order

1. core:dev
2. solid:dev
3. docs:dev

### Actual Order Observed

```
▮▮▮▮ core:dev
▮▮▮▮ docs:dev    <-- WRONG ORDER (docs started before solid)
▮▮▮▮ solid:dev
Error: glob::create
  × Failed to create glob from pattern packages/core/@globs(src/**).
```

### Issues Found

1. **Task ordering wrong**: docs:dev started BEFORE solid:dev (should be 3rd, not 2nd)
2. **Glob error**: `packages/core/@globs(src/**)` fails to parse - glob expression syntax broken

### Verification

Run: `timeout 30 moon run docs:dev 2>&1 | head -50`
