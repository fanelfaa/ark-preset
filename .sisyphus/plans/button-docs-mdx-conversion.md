# Convert Button Component Docs to Astro MDX

## TL;DR

> **Quick Summary**: Convert the Solid.js/TanStack Router button documentation page to an Astro MDX page with full docs layout (header + sidebar), matching the original visual/functional output exactly.
>
> **Deliverables**:
>
> - `apps/docs/src/layouts/DocsLayout.astro` — Docs layout with sticky header + sidebar navigation (18 component links)
> - `apps/docs/src/components/CodeBlock.tsx` — Solid.js island for copy-to-clipboard code blocks
> - `apps/docs/src/pages/docs/components/button.mdx` — MDX documentation page
>
> **Estimated Effort**: Short
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Task 1 (CodeBlock) → Task 2 (DocsLayout) → Task 3 (MDX page)

---

## Context

### Original Request

Convert button component documentation from `/home/fandi/Lab/Js/ui/apps/docs/src/routes/docs/components/button.tsx` (313 lines) to Astro MDX format at `apps/docs/src/pages/docs/components/button.mdx`, matching the original output exactly.

### Interview Summary

**Key Discussions**:

- User wants exact visual/functional parity with the original TSX page
- Only the button component documentation (not other components)
- Target route: `/docs/components/button` → maps to `src/pages/docs/components/button.mdx`
- Full docs layout with header + sidebar navigation required
- Tailwind CSS v4 already installed manually — just use it

**Research Findings**:

- `@astrojs/mdx` already installed and configured
- `@astrojs/solid-js` already installed with `solid-js` dependency
- Tailwind v4 setup complete: `@tailwindcss/vite` in astro.config, `global.css` imports tailwindcss + tw-animate-css + @ui/core/theme.css
- `@source` directives already configured for scanning component files
- `@ui/solid` is a workspace dependency — provides Button, Tabs, buttonVariants
- Original docs layout (`docs.tsx`) has: sticky header with "Solid UI" branding, nav links (Docs, Components), sidebar with 18 component links grouped under "UI", main content area with max-w-4xl

### Source File Structure (313 lines TSX)

- Hero: title, description, external docs link
- Preview/Code tabs (interactive) — shows live button variants or usage code
- Installation: CLI / Manual tabs (interactive) — with recipe and component code snippets
- Usage: import and basic usage code blocks
- Variants: live preview of all 6 variants
- Sizes: live preview of all 4 sizes (including icon with SVG)
- Disabled: live preview of all variants disabled
- Link: code example using `buttonVariants` on `<a>` tag
- API Reference: props table (variant, size, disabled, class)

### Metis Review

**Identified Gaps** (addressed):

- Tailwind setup: Already done by user — removed from plan scope
- Docs layout scope: User confirmed full layout with sidebar needed — added as Task 2
- Route path: Confirmed `/docs/components/button` — updated file path
- `@ui/solid` build state: Added to QA verification steps
- Two Tabs instances on same page: Each gets its own `createSignal` — verified safe in MDX islands

---

## Work Objectives

### Core Objective

Create an Astro MDX page that renders identically to the original Solid.js button documentation page, with interactive tabs and live component previews.

### Concrete Deliverables

- `apps/docs/src/layouts/DocsLayout.astro` — Docs layout with header + sidebar (matches `docs.tsx` from source)
- `apps/docs/src/components/CodeBlock.tsx` — Solid.js island for copy-to-clipboard
- `apps/docs/src/pages/docs/components/button.mdx` — Full documentation page

### Definition of Done

- [ ] `pnpm --filter @ui/docs dev` starts without errors
- [ ] Navigate to `/docs/components/button` — page renders with header, sidebar, and all content sections
- [ ] Sidebar shows 18 component links under "UI" group, "Button" highlighted as active
- [ ] Tabs (Preview/Code, CLI/Manual) are interactive and switch correctly
- [ ] Copy buttons on code blocks work (clipboard write + checkmark feedback)
- [ ] Live Button previews render with correct variants, sizes, disabled states

### Must Have

- All sections from original: Hero, Preview/Code, Installation, Usage, Variants, Sizes, Disabled, Link, API Reference
- Interactive tabs (Preview↔Code, CLI↔Manual) using Solid.js Tabs from @ui/solid
- Copy-to-clipboard on all code blocks with visual feedback
- Live Button component previews (not just screenshots)
- External docs link to Kobalte
- API reference table

### Must NOT Have (Guardrails)

- No TanStack Router imports (Astro handles routing via file system)
- No `createFileRoute` or route configuration
- No changes to other pages or components
- No test infrastructure (none exists in project)

---

## Verification Strategy

### Test Decision

- **Infrastructure exists**: NO
- **Automated tests**: None
- **Agent-Executed QA**: Playwright browser verification

### QA Policy

- **Frontend/UI**: Playwright — navigate to `/components/button`, verify sections, interact with tabs, test copy buttons

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately - component + layout):
├── Task 1: Create CodeBlock.tsx Solid island [quick]
└── Task 2: Create DocsLayout.astro with header + sidebar [quick]

Wave 2 (After Wave 1 - MDX page):
└── Task 3: Create button.mdx documentation page [quick]

Wave FINAL (After ALL tasks):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Manual QA via Playwright (unspecified-high)
└── Task F4: Scope fidelity check (deep)
-> Present results -> Get explicit user okay
```

### Dependency Matrix

- **1**: - → 3
- **2**: - → 3
- **3**: 1, 2 → FINAL

### Agent Dispatch Summary

- **Wave 1**: **2** - T1 → `quick`, T2 → `quick`
- **Wave 2**: **1** - T3 → `quick`
- **FINAL**: **4** - F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [x] 1. Create CodeBlock.tsx Solid.js island component

  **What to do**:
  - Create `apps/docs/src/components/CodeBlock.tsx` as a Solid.js component
  - Implement copy-to-clipboard with `navigator.clipboard.writeText()`
  - Show checkmark SVG when copied, copy icon otherwise
  - Accept `code` prop (string) and render inside `<pre><code>` block
  - Style matches original: `overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm`
  - Copy button positioned absolute top-right

  **Must NOT do**:
  - Add syntax highlighting (not in original)
  - Change the SVG icons from the original

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `['solid-js-best-practices']`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 2)
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 3
  - **Blocked By**: None

  **References**:
  - `/home/fandi/Lab/Js/ui/apps/docs/src/routes/docs/components/button.tsx:70-94` — original CodeBlock component implementation
  - `apps/docs/src/components/` — target directory for new component

  **Acceptance Criteria**:
  - File exists at `apps/docs/src/components/CodeBlock.tsx`
  - Component accepts `code` prop
  - Renders `<pre><code>` with copy button
  - Copy button writes to clipboard and shows checkmark for 1.5s

  **QA Scenarios**:

  ```
  Scenario: CodeBlock renders with copy functionality
    Tool: Playwright
    Preconditions: Task 3 complete (page uses CodeBlock)
    Steps:
      1. Navigate to /docs/components/button
      2. Verify code block is visible with code content
      3. Click copy button (absolute top-right of code block)
      4. Verify checkmark SVG appears
      5. Wait 1.5s, verify copy icon returns
    Expected Result: Copy button toggles between copy/checkmark icons
    Evidence: .sisyphus/evidence/task-1-codeblock-copy.png
  ```

  **Commit**: YES (groups with 2)
  - Message: `feat(docs): add CodeBlock island and DocsLayout for MDX pages`
  - Files: `apps/docs/src/components/CodeBlock.tsx`, `apps/docs/src/layouts/DocsLayout.astro`

- [x] 2. Create DocsLayout.astro with header + sidebar

  **What to do**:
  - Create `apps/docs/src/layouts/DocsLayout.astro` matching the original `docs.tsx` layout
  - **Header** (sticky, z-50, border-b, bg-background/95, backdrop-blur, h-14):
    - "Solid UI" brand link pointing to `/`
    - Nav links: "Docs" → `/docs`, "Components" → `/docs/components/button`
    - Active state styling for current page
  - **Sidebar** (hidden on mobile, lg:block, w-64, border-r, sticky top-14):
    - Single nav group "UI" with 18 component links
    - Links: Accordion, Button, Checkbox, Collapsible, Date Picker, Dialog, Drawer, Input, Menu, Number Input, Popover, Radio Group, Select, Slider, Switch, Tabs, Toast, Tooltip
    - "Button" link should have active styling (text-foreground font-medium bg-muted/60)
    - Other links are regular `<a>` tags (non-active state)
  - **Main content** (flex-1, max-w-4xl, mx-auto, px-6, py-10):
    - `<slot />` for MDX page content
  - Import `../styles/global.css` for Tailwind + theme CSS

  **Must NOT do**:
  - Use TanStack Router `<Link>` components — use native `<a>` tags
  - Add client-side routing or SPA behavior
  - Create pages for the other 17 components
  - Add mobile hamburger menu (sidebar is `hidden lg:block` in original)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 1)
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 3
  - **Blocked By**: None

  **References**:
  - `/home/fandi/Lab/Js/ui/apps/docs/src/routes/docs.tsx` — original docs layout (104 lines)
  - `apps/docs/src/layouts/Layout.astro` — existing bare layout (for reference)
  - `apps/docs/src/styles/global.css` — CSS import with Tailwind + theme

  **Acceptance Criteria**:
  - File exists at `apps/docs/src/layouts/DocsLayout.astro`
  - Header renders with "Solid UI" brand + nav links
  - Sidebar renders with 18 component links under "UI" group
  - "Button" link has active styling
  - Main content area has max-w-4xl constraint
  - Layout imports global.css for Tailwind styling

  **QA Scenarios**:

  ```
  Scenario: DocsLayout renders header and sidebar
    Tool: Playwright
    Steps:
      1. Navigate to /docs/components/button
      2. Verify "Solid UI" text is visible in header
      3. Verify "Docs" and "Components" nav links exist
      4. Verify sidebar is visible (at desktop width)
      5. Verify "UI" group heading in sidebar
      6. Verify all 18 component links are present
      7. Verify "Button" link has active styling (bg-muted/60)
    Expected Result: Full docs layout renders correctly
    Evidence: .sisyphus/evidence/task-2-docs-layout.png

  Scenario: Sidebar links are clickable (non-404 for button)
    Tool: Playwright
    Steps:
      1. Navigate to /docs/components/button
      2. Click "Button" link in sidebar
      3. Verify page stays at /docs/components/button (same page)
      4. Click "Accordion" link in sidebar
      5. Verify 404 or navigation (expected: 404 since page doesn't exist)
    Expected Result: Button link works, other links may 404 (expected)
    Evidence: .sisyphus/evidence/task-2-sidebar-links.png
  ```

  **Commit**: YES (groups with 1)

- [x] 3. Create button.mdx documentation page

  **What to do**:
  - Create `apps/docs/src/pages/docs/components/button.mdx`
  - Use frontmatter: `layout: ../../../layouts/DocsLayout.astro`, `title: Button`
  - Import `Button`, `buttonVariants`, `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` from `@ui/solid` with `client:load` directive
  - Import `CodeBlock` from `../../../components/CodeBlock.tsx` with `client:load` directive
  - Convert all sections from TSX to MDX:
    1. **Hero**: `# Button` heading, description paragraph, external docs link with SVG icon
    2. **Preview/Code tabs**: Tabs with "Preview" (live buttons) and "Code" (CodeBlock with usage code)
    3. **Installation**: Tabs with "CLI" (`npx solidui-cli@latest add button`) and "Manual" (3 steps: install dep, create recipe, create component + note)
    4. **Usage**: Import code + basic usage code
    5. **Variants**: Live preview of all 6 variants (default, secondary, destructive, outline, ghost, link)
    6. **Sizes**: Live preview of all 4 sizes (sm, md, lg, icon with + SVG)
    7. **Disabled**: Live preview of all 6 variants with disabled prop
    8. **Link**: CodeBlock showing buttonVariants on `<a>` tag
    9. **API Reference**: Table with Prop/Type/Default columns
  - Use MDX code blocks (`tsx ... `) for static code display where CodeBlock isn't needed
  - All styling via Tailwind classes matching original

  **Must NOT do**:
  - Include TanStack Router imports or Route exports
  - Add sections not in the original
  - Change the visual styling from the original

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2
  - **Blocks**: Final verification
  - **Blocked By**: Task 1, Task 2

  **References**:
  - `/home/fandi/Lab/Js/ui/apps/docs/src/routes/docs/components/button.tsx` — full source to convert
  - `apps/docs/src/layouts/DocsLayout.astro` — layout to use in frontmatter
  - `apps/docs/src/components/CodeBlock.tsx` — code block component
  - `https://docs.astro.build/en/guides/integrations-guide/mdx/` — MDX usage in Astro
  - `https://docs.astro.build/en/guides/markdown-content/` — Markdown content guide

  **Acceptance Criteria**:
  - File exists at `apps/docs/src/pages/docs/components/button.mdx`
  - Page accessible at `/docs/components/button` route
  - All 9 sections render correctly within DocsLayout
  - Tabs are interactive (click switches content)
  - CodeBlock components work (copy to clipboard)
  - Live Button previews render with correct styling

  **QA Scenarios**:

  ```
  Scenario: All sections render on page load
    Tool: Playwright
    Steps:
      1. Navigate to /docs/components/button
      2. Verify h1 "Button" is visible
      3. Verify description text "Displays a button or a component that looks like a button"
      4. Verify "Docs" external link exists
      5. Verify Preview/Code tabs exist
      6. Verify "Installation" h2 exists
      7. Verify "Usage" h2 exists
      8. Verify "Variants" h2 exists
      9. Verify "Sizes" h2 exists
      10. Verify "Disabled" h2 exists
      11. Verify "Link" h2 exists
      12. Verify "API Reference" h2 exists
      13. Verify API table has 4 rows (variant, size, disabled, class)
    Expected Result: All sections and content present
    Evidence: .sisyphus/evidence/task-3-all-sections.png

  Scenario: Preview tab shows live buttons
    Tool: Playwright
    Steps:
      1. Navigate to /docs/components/button
      2. Click "Preview" tab
      3. Verify 6 buttons visible: Default, Secondary, Destructive, Outline, Ghost, Link
    Expected Result: Live Button components render with correct variant styling
    Evidence: .sisyphus/evidence/task-3-preview-tab.png

  Scenario: Code tab shows usage code
    Tool: Playwright
    Steps:
      1. Navigate to /docs/components/button
      2. Click "Code" tab
      3. Verify code content contains "import { Button }"
    Expected Result: CodeBlock displays usage code
    Evidence: .sisyphus/evidence/task-3-code-tab.png

  Scenario: Installation CLI tab shows command
    Tool: Playwright
    Steps:
      1. Navigate to /docs/components/button
      2. Scroll to Installation section
      3. Verify "CLI" tab is active by default
      4. Verify code block contains "npx solidui-cli@latest add button"
    Expected Result: CLI installation command visible
    Evidence: .sisyphus/evidence/task-3-install-cli.png

  Scenario: Installation Manual tab shows steps
    Tool: Playwright
    Steps:
      1. Navigate to /docs/components/button
      2. Click "Manual" tab in Installation section
      3. Verify 3 code blocks visible (npm install, recipe code, component code)
      4. Verify note about Tailwind CSS theme variables
    Expected Result: All manual installation steps visible
    Evidence: .sisyphus/evidence/task-3-install-manual.png

  Scenario: Variants section shows all button variants
    Tool: Playwright
    Steps:
      1. Navigate to /docs/components/button
      2. Scroll to Variants section
      3. Verify 6 buttons: Default, Secondary, Destructive, Outline, Ghost, Link
    Expected Result: All variant buttons rendered
    Evidence: .sisyphus/evidence/task-3-variants.png

  Scenario: Sizes section shows all sizes including icon
    Tool: Playwright
    Steps:
      1. Navigate to /docs/components/button
      2. Scroll to Sizes section
      3. Verify 4 buttons: Sm, Md, Lg, and icon button with + SVG
    Expected Result: All size buttons rendered correctly
    Evidence: .sisyphus/evidence/task-3-sizes.png

  Scenario: Disabled section shows disabled variants
    Tool: Playwright
    Steps:
      1. Navigate to /docs/components/button
      2. Scroll to Disabled section
      3. Verify 6 disabled buttons with opacity-50 styling
    Expected Result: All disabled variant buttons rendered
    Evidence: .sisyphus/evidence/task-3-disabled.png

  Scenario: API Reference table has correct data
    Tool: Playwright
    Steps:
      1. Navigate to /docs/components/button
      2. Scroll to API Reference section
      3. Verify table headers: Prop, Type, Default
      4. Verify row 1: variant | "default" | "secondary" | ... | "default"
      5. Verify row 2: size | "sm" | "md" | "lg" | "icon" | "sm"
      6. Verify row 3: disabled | boolean | false
      7. Verify row 4: class | string | —
    Expected Result: API table matches original
    Evidence: .sisyphus/evidence/task-3-api-table.png
  ```

  **Commit**: YES
  - Message: `feat(docs): add button component documentation in MDX format`
  - Files: `apps/docs/src/pages/docs/components/button.mdx`
  - Pre-commit: `pnpm --filter @ui/docs build`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

- [x] F1. **Plan Compliance Audit** — `oracle`
      Read the plan end-to-end. For each "Must Have": verify implementation exists. For each "Must NOT Have": search codebase for forbidden patterns. Check evidence files exist. Compare deliverables against plan.
      Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — `unspecified-high`
      Run `pnpm --filter @ui/docs build`. Review all changed files for: `as any`/`@ts-ignore`, unused imports, console.log in prod. Check AI slop: excessive comments, over-abstraction, generic names.
      Output: `Build [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [x] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill if UI)
      Start from clean state. Navigate to `/components/button`. Execute EVERY QA scenario — follow exact steps, capture evidence. Test tab switching, copy buttons, all live previews. Save to `.sisyphus/evidence/final-qa/`.
      Output: `Scenarios [N/N pass] | Integration [N/N] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep`
      For each task: read "What to do", read actual diff. Verify 1:1 — everything in spec was built, nothing beyond spec. Check "Must NOT do" compliance. Flag unaccounted changes.
      Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | VERDICT`

---

## Commit Strategy

- **1+2**: `feat(docs): add CodeBlock island and DocsLayout for MDX pages` — CodeBlock.tsx, DocsLayout.astro
- **3**: `feat(docs): add button component documentation in MDX format` — button.mdx

---

## Success Criteria

### Verification Commands

```bash
pnpm --filter @ui/docs build    # Expected: build succeeds, no errors
pnpm --filter @ui/docs preview  # Expected: server starts, /docs/components/button accessible
```

### Final Checklist

- [ ] All "Must Have" sections present in rendered page
- [ ] All "Must NOT Have" patterns absent (no TanStack Router, no Route exports)
- [ ] Build succeeds without errors
- [ ] Tabs switch interactively
- [ ] Copy-to-clipboard works on all code blocks
- [ ] Live Button previews render correctly for all variants, sizes, and disabled states
- [ ] API reference table matches original
- [ ] Docs layout renders with header, sidebar, and active "Button" link
