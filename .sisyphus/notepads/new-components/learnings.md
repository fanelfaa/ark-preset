# new-components Notepad

## Task Breakdown

### Wave 1 (Parallel)

1. Core recipe — popover.ts (10 slots)
2. Core recipe — slider.ts (11 slots)
3. Core config updates (tsup + package.json)

### Wave 2 (Parallel, after Wave 1)

4. Solid wrapper — popover.tsx (10 sub-components)
5. Solid wrapper — slider.tsx (12 sub-components)

### Wave 3 (Sequential, after Wave 2)

6. Core index.ts exports
7. Solid index.ts exports

### Final

8. Build + typecheck verification

## Patterns Learned

- dialog.ts: backdrop + positioner + content + closeTrigger (with SVG)
- tooltip.ts: root + trigger + positioner + content + arrow + arrowTip
- select.ts: root with error variants, composite pattern
- Portal wrapper for floating content (dialog, select pattern)

## Guardrails

- No backdrop for popover (dialog is modal)
- No hover trigger for popover (click-only v1)
- No vertical orientation for slider v1
- No tests
