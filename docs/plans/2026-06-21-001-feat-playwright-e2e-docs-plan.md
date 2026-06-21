---
title: feat: Playwright e2e smoke tests for docs site
type: feat
status: active
date: 2026-06-21
origin: docs/brainstorms/e2e-playwright-docs-requirements.md
---

# feat: Playwright e2e smoke tests for docs site

## Overview

Add Playwright e2e functional smoke tests to `apps/docs` — covering all ~45 component documentation pages, navigation, theme toggle, and interactive example usage demos. No visual regression testing. Local execution only (no CI in v1).

---

## Problem Frame

The `apps/docs` site has zero test coverage. With ~45 component doc pages plus interactive demos, regressions in page rendering, broken navigation, or demo failures can reach production undetected. The existing `packages/solid` unit tests cover component-level behavior but cannot verify page integration, routing, or real-browser rendering.

---

## Requirements Trace

- R1. Playwright functional smoke tests (no visual regression) for `apps/docs`
- R2. Run locally via CLI command; no CI integration in v1
- R3. All ~45 component documentation pages load without JS errors or 404s
- R4. Landing page (`/`) renders correctly with expected elements
- R5. Navigation between pages works via header links
- R6. Theme toggle (light/dark) switches correctly and persists
- R7. Live demos (inline component examples in `usage.mdx`) mount and render without runtime errors
- R8. Key interactive demos can be interacted with (click, toggle) without errors
- R9. Playwright installed as devDependency under `apps/docs/package.json`
- R10. Playwright config lives at `apps/docs/e2e/playwright.config.ts`
- R11. Test specs live under `apps/docs/e2e/tests/`
- R12. A `moon` task is added for `docs:e2e` to run the tests

---

## Scope Boundaries

- No visual regression / screenshot comparison
- No CI integration (deferred)
- No unit tests for utilities or demo components
- No component-level interaction tests beyond verifying they mount (component behavior is tested in `packages/solid`)
- No test coverage for `packages/cli` or other monorepo apps/packages

---

## Context & Research

### Relevant Code and Patterns

- **URL structure**: Each component lives at `/docs/components/{kebab-name}` (e.g., `/docs/components/button`, `/docs/components/date-picker`). Route defined in `apps/docs/src/routes/docs/components/$component.tsx`
- **Component list**: `apps/docs/src/content/docs/` contains ~45 subdirectories (e.g., `button/`, `input/`, `date-picker/`) — these are the component doc pages
- **Demo components**: `apps/docs/src/components/demos/` has ~45 demo directories with interactive component examples
- **Existing unit tests**: `packages/solid/test/` uses vitest + happy-dom — not directly relevant to e2e approach
- **Moon task pattern**: `apps/docs/moon.yml` defines `dev`, `typecheck`, `build`, `preview` tasks — new `e2e` task should follow same pattern

### Key Technical Decisions

- **Use `@playwright/test`** (not raw Playwright) for the test runner, assertions, and browser management
- **Use `webServer` config** in Playwright to auto-start `vite preview` before tests — avoids manual server management
- **Parameterized tests** for component pages — one test spec that iterates over the page list instead of duplicating per-page
- **Page list sourced from filesystem** (read `apps/docs/src/content/docs/` directories) — avoids maintaining a separate list

---

## Implementation Units

- [ ] U1. **Playwright setup, config, and moon task**

**Goal:** Install Playwright, create config file, add moon task, verify Playwright works

**Requirements:** R1, R2, R9, R10, R12

**Dependencies:** None

**Files:**
- Modify: `apps/docs/package.json` (add `@playwright/test` devDependency)
- Create: `apps/docs/e2e/playwright.config.ts`
- Create: `apps/docs/e2e/global-setup.ts` (optional — exports the page list)
- Create: `apps/docs/e2e/fixtures.ts` (shared test utilities)
- Modify: `apps/docs/moon.yml` (add `e2e` task)

**Approach:**
- Install `@playwright/test` via pnpm
- Create `playwright.config.ts` with:
  - Chromium-only (fastest for smoke tests)
  - `webServer` config pointing to `pnpm build && pnpm preview` (port 4173)
  - Test directory pointing to `./tests/`
  - Retries: 1 (re-run flaky tests once)
- Add `e2e` moon task: `command: "pnpm exec playwright test"` with `deps: ["build"]`
- Create a `fixtures.ts` file that reads `apps/docs/src/content/docs/` directory listing to generate the list of component page slugs (all subdirectories)

**Patterns to follow:**
- Existing moon tasks in `apps/docs/moon.yml` (`dev`, `typecheck`, `build`, `preview`)
- Existing vitest config at `packages/solid/vitest.config.ts` for overall style reference

**Test scenarios:** (infrastructure-only, no behavioral tests in this unit)
- Playwright can launch Chromium and visit a URL
- `moon run docs:e2e` exits with code 0

**Verification:**
- `moon run docs:e2e` runs and reports "No tests found" (no test specs yet)
- `pnpm exec playwright --version` returns a version number

---

- [ ] U2. **Landing page and navigation smoke tests**

**Goal:** Verify landing page renders, header navigation works, theme toggle functions

**Requirements:** R4, R5, R6

**Dependencies:** U1

**Files:**
- Create: `apps/docs/e2e/tests/landing.spec.ts`
- Create: `apps/docs/e2e/tests/navigation.spec.ts`
- Create: `apps/docs/e2e/tests/theme.spec.ts`

**Approach:**
- `landing.spec.ts`:
  - Navigate to `/`
  - Verify the "UI" brand link is visible in the header
  - Verify "Docs" and "Components" nav links are present
  - Verify the page renders without console errors
- `navigation.spec.ts`:
  - Click "Components" nav link → verify URL changes to `/docs/components/button`
  - Click "UI" brand link → verify URL changes back to `/`
  - Navigate directly to `/docs/quickstart` → verify page renders
  - Use `page.waitForLoadState('networkidle')` after each navigation
- `theme.spec.ts`:
  - Verify theme toggle button exists
  - Click theme toggle → verify class change on `<html>` (light ↔ dark)
  - Toggle again → verify it switches back
  - Reload page → verify theme preference persists (via localStorage)

**Test scenarios:**
- **Happy path — Landing page**: `/` loads, header brand link visible, nav links visible
- **Happy path — Navigation via header**: Click "Components" → lands on button doc page
- **Happy path — Brand link**: Click "UI" from anywhere → goes to `/`
- **Happy path — Direct URL**: Navigate to `/docs/quickstart` → renders content
- **Happy path — Theme toggle click**: Toggle button exists and switches html class
- **Edge case — Theme persistence**: After toggling theme and reloading, the theme remains applied

**Verification:**
- All three test files pass with `moon run docs:e2e`
- Console errors are captured and asserted (no unexpected console.error calls)

---

- [ ] U3. **Component page smoke tests**

**Goal:** Verify all ~45 component documentation pages load without JS errors, 404s, or demo component crashes

**Requirements:** R3, R7

**Dependencies:** U1

**Files:**
- Create: `apps/docs/e2e/tests/component-pages.spec.ts`

**Approach:**
- Use `describe` with `test.describe.parallel` for faster execution
- Generate the list of component slugs dynamically by reading the `apps/docs/src/content/docs/` directory listing (skip `index.tsx`, non-component entries)
- Use Playwright's `test.describe.configure({ mode: 'parallel' })` — test each page in parallel
- For each component page:
  1. Navigate to `/docs/components/{slug}`
  2. Assert `page.url()` matches the expected URL (no redirect to 404)
  3. Assert page content contains known text (e.g., component name in title/heading)
  4. Assert no elements with `.text-destructive` (error/not-found text) are visible
  5. Assert no console errors occurred during page load
  6. Assert demo sections (`.not-prose` elements) are present and rendered
  7. Take a quick locator check that at least one Ark UI component element exists on the page
- Report failures with component name and error details

**Test scenarios:**
- **Happy path — Button page**: `/docs/components/button` loads, contains "Button" heading, has demo sections, has no destructive elements
- **Happy path — Date picker page**: `/docs/components/date-picker` loads, contains date-related content
- **Happy path — All pages**: Each of the ~45 pages loads without error or 404
- **Error path — Invalid component**: `/docs/components/nonexistent` should show "Component not found" (.text-destructive visible) — verify the 404 path works
- **Edge case — Component with special chars**: Pages like `date-picker`, `rating-group`, `segment-group` use kebab-case URLs — verify they resolve correctly

**Verification:**
- All ~45 component pages load without errors
- Total test time is reasonable (parallel execution should complete in < 2 minutes)

---

- [ ] U4. **Interactive demo behavior tests**

**Goal:** Verify that key interactive demos on component pages can be interacted with (click, toggle, expand) without errors

**Requirements:** R8

**Dependencies:** U1, U3

**Files:**
- Create: `apps/docs/e2e/tests/demo-interactions.spec.ts`

**Approach:**
- Select a representative subset of interactive demos across different component categories:
  - Accordion: expand/collapse items
  - Tabs: switch between tabs
  - Dialog/Drawer: open and close
  - Button: click variant buttons (verify they don't throw errors)
  - Checkbox: toggle checked state
  - Select: open dropdown options
  - Theme-specific: verify interactive states work in both light and dark themes
- For each interaction test:
  1. Navigate to the component page
  2. Find the interactive demo element
  3. Perform the interaction (click, toggle)
  4. Assert no console errors
  5. Assert the interaction produced expected DOM changes
- Keep assertions lightweight — the goal is to verify demos mount and respond to interaction, not to verify full component behavior

**Test scenarios:**
- **Accordion expand**: Navigate to accordion page → click accordion trigger → verify content panel becomes visible
- **Tabs switch**: Navigate to tabs page → click second tab → verify corresponding panel is visible
- **Dialog open**: Navigate to dialog page → click open button → verify dialog overlay is visible
- **Drawer open**: Navigate to drawer page → click open button → verify drawer panel appears
- **Button click**: Navigate to button page → click each variant button → no console errors
- **Checkbox toggle**: Navigate to checkbox page → click checkbox → verify checked state changes
- **Dark theme interaction**: Switch to dark theme → repeat accordion/tabs test → verify demos still work

**Verification:**
- All interactive tests pass
- No console errors during any interaction
- Interactions work in both light and dark themes

---

## System-Wide Impact

- **Interaction graph:** No impact on production code. Test code lives in isolated `apps/docs/e2e/` directory
- **Unchanged invariants:** All existing moon tasks, build commands, and dev workflows are unchanged
- **Integration coverage:** Page-level rendering + navigation + demo mounting — fills the gap between unit tests (component-level) and manual review

---

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| `vite build && vite preview` may be slow in moon task | Acceptable for local runs; no CI in v1 |
| Parallel execution may cause flaky tests (race conditions on shared state) | Each test file is independent; no shared browser state |
| Component pages change frequently (additions/removals) | Page list is auto-generated from filesystem — add/remove a content dir and tests follow |
| Interactive demo locators may change if components are refactored | Use semantic locators (`getByRole`, `getByText`) over fragile CSS selectors |

---

## Dependencies / Prerequisites

- Node.js >= 18 (already satisfied per root `package.json`)
- pnpm workspace (already configured)
- Playwright browsers must be installed after adding `@playwright/test` — run `pnpm exec playwright install chromium`

---

## Open Questions

### Deferred to Implementation

- [R10][Technical] Should config use `webServer` pointing to `vite preview` or `vite dev`? (Recommend `vite preview` for production-like behavior)
- [R3][Technical] Should the page list be a static JS array or read from filesystem? (Recommend filesystem reading in a `fixtures.ts` to auto-track additions)
- [R12][Technical] Should moon task depend on `build` or require manual server? (Recommend `webServer` + auto-start in Playwright config for cleanest UX)

---

## Sources & References

- **Origin document:** [docs/brainstorms/e2e-playwright-docs-requirements.md](docs/brainstorms/e2e-playwright-docs-requirements.md)
- Related code: `apps/docs/src/routes/docs/components/$component.tsx` — route handler for component pages
- Related code: `apps/docs/src/content/docs/` — content directories that define available component pages
- Related code: `apps/docs/moon.yml` — existing moon tasks to follow for e2e task definition
