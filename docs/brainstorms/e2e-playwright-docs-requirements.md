---
date: 2026-06-21
topic: e2e-playwright-docs
---

# E2E Smoke Test — apps/docs with Playwright

## Problem Frame

The `apps/docs` site (~45 component documentation pages + interactive demos) has zero test coverage. The UI component library (`packages/solid`) is tested with unit tests, but the documentation site — which integrates routing, auto-generated content, live demos, theme switching, and navigation — has no safety net. Regressions in page rendering, broken navigation, or demo failures can reach production undetected.

## Requirements

**Scope**
- R1. Playwright functional smoke tests (no visual regression) for `apps/docs`
- R2. Run locally via CLI command; no CI integration in v1
- R3. All ~45 component documentation pages must load without JS errors or 404s
- R4. Landing page (`/`) renders correctly with expected elements
- R5. Navigation between pages works via header links
- R6. Theme toggle (light/dark) switches correctly and persists
- R7. Live demos / example usage (inline component examples in `usage.mdx`) on each component page mount and render without throwing runtime errors
- R8. Key interactive demos (e.g., button variants, accordion expand/collapse) can be interacted with (click, toggle) without errors

**Infrastructure**
- R9. Playwright installed as `devDependencies` under `apps/docs/package.json`
- R10. Playwright config lives at `apps/docs/e2e/playwright.config.ts`
- R11. Test specs live under `apps/docs/e2e/tests/`
- R12. A `moon` task is added for `docs:e2e` (or equivalent `docs` task extension) to run the tests

## Non-goals (Scope Boundaries)

- No visual regression / screenshot comparison
- No CI integration (deferred)
- No unit tests for utilities or demo components (unit-only value is low and already covered implicitly by e2e)
- No component-level interaction tests beyond verifying they mount (component behavior is tested in `packages/solid`)
- No test coverage for `packages/cli` or other apps

## Key Decisions

- **E2E-only approach**: Chosen over unit tests because the primary risk is page-level rendering, navigation, and integration — exactly what e2e tests catch best. The existing `packages/solid` unit tests already cover component-level behavior.
- **Playwright**: Chosen for its reliable browser automation, parallel execution, and wide ecosystem support.
- **Functional smoke tests only**: Visual regression adds significant maintenance overhead (baseline screenshots, CI storage, flakiness) for a docs site where visual changes are intentional and frequent.

## Dependencies / Assumptions

- `apps/docs` builds and serves correctly via `vite build && vite preview` (or `vite dev`)
- Playwright browsers can be installed in the development environment
- Port 4173 (or configurable) is available for the dev server during tests

## Outstanding Questions

### Deferred to Planning

- [R5][Technical] Should tests use TanStack Router's internal route list or maintain a static page list?
- [R1][Technical] Should we use `@playwright/test` or raw Playwright? (Recommend `@playwright/test`)
- [R10][Technical] Should we use a global setup file for starting the dev server, or require manual `vite preview` before tests?
- [R12][Technical] Add as a new `moon` task or integrate into existing `docs` tasks?

## Next Steps

-> `/ce-plan` for structured implementation planning, or proceed directly to setup.
