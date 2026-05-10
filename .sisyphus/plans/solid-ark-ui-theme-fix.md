# Fix Tailwind v4 Theme Tokens Not Loading

## TL;DR

> **Quick Summary**: The `@theme {}` block in `packages/ui/src/theme.css` is only partially processed when imported via `@import '@ui/solid/src/theme.css'` from `apps/docs/src/index.css`. Tailwind v4's Vite plugin does not fully process `@theme` blocks inside CSS files imported from workspace packages — only 5 of 15 tokens are actually registered as utility classes (`bg-ui-background`, `bg-ui-muted`, `text-ui-foreground`, `text-ui-muted-foreground`, `border-ui-border`). The rest (primary, secondary, destructive, accent, input, ring) are **missing**, causing all styled components to render without proper colors.

> **Fix**: Move the `@theme {}` block and `:root {}` variable definitions directly into `apps/docs/src/index.css`. The `packages/ui/src/theme.css` file continues to exist as a reference for CLI consumers.

> **Estimated Effort**: Quick (single file change)
> **Parallel Execution**: N/A (one change)

---

## Root Cause

When `apps/docs/src/index.css` does:
```css
@import '@ui/solid/src/theme.css';
```

Tailwind v4's `@tailwindcss/vite` plugin resolves this import via Vite's CSS pipeline. However, the `@theme {}` at-rule inside the imported file is not fully consumed by the Tailwind engine. Only tokens that happen to be referenced by other CSS rules get generated. The `--color-ui-primary`, `--color-ui-secondary`, `--color-ui-destructive`, `--color-ui-accent`, `--color-ui-input`, `--color-ui-ring` tokens — and their corresponding utility classes — never appear.

**Evidence from browser** (verified via live page inspection):
- Existing: `--color-ui-background`, `--color-ui-foreground`, `--color-ui-muted`, `--color-ui-muted-foreground`, `--color-ui-border`
- Missing: `--color-ui-primary`, `--color-ui-primary-foreground`, `--color-ui-secondary`, `--color-ui-secondary-foreground`, `--color-ui-destructive`, `--color-ui-destructive-foreground`, `--color-ui-accent`, `--color-ui-accent-foreground`, `--color-ui-input`, `--color-ui-ring`
- Generated utility classes: only `.bg-ui-background`, `.bg-ui-muted`

---

## Fix

### File to modify: `apps/docs/src/index.css`

**Replace:**
```css
@import 'tailwindcss';
@import 'tw-animate-css';
@import '@ui/solid/src/theme.css';
```

**With:**
```css
@import 'tailwindcss';
@import 'tw-animate-css';

/* Theme tokens — must be in entry CSS for Tailwind v4 to process @theme */
@theme {
  --color-ui-background: hsl(var(--ui-background));
  --color-ui-foreground: hsl(var(--ui-foreground));
  --color-ui-primary: hsl(var(--ui-primary));
  --color-ui-primary-foreground: hsl(var(--ui-primary-foreground));
  --color-ui-secondary: hsl(var(--ui-secondary));
  --color-ui-secondary-foreground: hsl(var(--ui-secondary-foreground));
  --color-ui-destructive: hsl(var(--ui-destructive));
  --color-ui-destructive-foreground: hsl(var(--ui-destructive-foreground));
  --color-ui-muted: hsl(var(--ui-muted));
  --color-ui-muted-foreground: hsl(var(--ui-muted-foreground));
  --color-ui-accent: hsl(var(--ui-accent));
  --color-ui-accent-foreground: hsl(var(--ui-accent-foreground));
  --color-ui-border: hsl(var(--ui-border));
  --color-ui-input: hsl(var(--ui-input));
  --color-ui-ring: hsl(var(--ui-ring));
}

/* Variable definitions — these can be overridden by consumers */
:root {
  --ui-background: 0 0% 100%;
  --ui-foreground: 222.2 84% 4.9%;
  --ui-primary: 222.2 47.4% 11.2%;
  --ui-primary-foreground: 210 40% 98%;
  --ui-secondary: 210 40% 96.1%;
  --ui-secondary-foreground: 222.2 47.4% 11.2%;
  --ui-destructive: 0 84.2% 60.2%;
  --ui-destructive-foreground: 210 40% 98%;
  --ui-muted: 210 40% 96.1%;
  --ui-muted-foreground: 215.4 16.3% 46.9%;
  --ui-accent: 210 40% 96.1%;
  --ui-accent-foreground: 222.2 47.4% 11.2%;
  --ui-border: 214.3 31.8% 91.4%;
  --ui-input: 214.3 31.8% 91.4%;
  --ui-ring: 222.2 84% 4.9%;
  --ui-radius: 0.5rem;
}
```

### What NOT to do
- Do **not** delete `packages/ui/src/theme.css` — it's the canonical reference for CLI consumers who copy components via `npx ui add`
- Do **not** remove the `@import '@ui/solid/src/theme.css'` line without replacing — the theme values still come from it conceptually, but need to be inlined for Tailwind processing

### What happens to `packages/ui/src/theme.css`
It stays as-is. It's still referenced by:
- The CLI `add` command (copies it to consumer projects)
- Users who manually import it in their own projects

Those consumers will need to handle the same `@theme` issue in their own projects — but that's their concern, not ours. The docs site just needs to work.

---

## Verification

After the fix:

1. **Restart dev server** — Vite HMR should pick up changes, but a restart is safer since CSS processing changed
2. **Check generated CSS** — verify all 15 `--color-ui-*` tokens exist in the page's `<style>` tag
3. **Check utility classes** — verify `.bg-ui-primary`, `.text-ui-primary`, `.border-ui-input`, `.ring-ui-ring`, etc. are all generated
4. **Visual check** — components should have proper colors (buttons should be styled, inputs should have borders, etc.)

### QA Scenarios

```
Scenario: All theme tokens present in generated CSS
  Tool: Playwright (browser evaluate)
  Preconditions: Dev server running on localhost:5173
  Steps:
    1. Navigate to http://localhost:5173
    2. Run: document.querySelectorAll('style').map(s => s.textContent).join('').match(/--color-ui-[a-z-]+(?=:)/g)
  Expected Result: 15 unique tokens returned
  Evidence: .sisyphus/evidence/theme-fix-tokens.txt

Scenario: Components render with proper styling
  Tool: Playwright (browser snapshot)
  Preconditions: Dev server running
  Steps:
    1. Navigate to http://localhost:5173
    2. Check button elements have visible styling (not raw HTML)
    3. Check input elements have border styling
  Expected Result: Page has visible Tailwind styling on all components
  Evidence: .sisyphus/evidence/theme-fix-visual.png
```
