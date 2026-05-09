# Solid.js + Ark UI Component Library — Phase 1

## TL;DR

> **Quick Summary**: Build the first 5 components (Button, Input/Field, Dialog, Select, Toast) of a Solid.js UI library using Ark UI as headless primitives + tailwind-variants for styling, following shadcn/ui's copy-paste distribution model.

> **Deliverables**:
> - `packages/ui/` — 5 styled components + theme CSS + custom tv instance
> - `apps/docs/` — Vite + Solid demo site with interactive component demos
> - `packages/cli/` — CLI tool (`npx ui add <component>`) for copy-paste workflow
> - All published under `/home/fandi/Lab/Js/ui` monorepo

> **Estimated Effort**: Medium (13 tasks across 3 waves)
> **Parallel Execution**: YES — 3 parallel waves (Foundation → Components → CLI/Demos)
> **Critical Path**: Wave 1 → Wave 2 → Wave 3

---

## Context

### Original Request
Create a UI component library for Solid.js using:
- **Solid.js** + **TypeScript** (strict mode)
- **Ark UI** as headless primitives
- **tailwind-variants** (tv) for variant definitions
- Tailwind v4 with CSS custom properties for theming
- shadcn/ui copy-paste distribution model with CLI

### Interview Summary
**Key Decisions**:
- **Distribution**: shadcn/ui-style copy-paste via CLI (`./src/components/ui/<name>.tsx`)
- **Phase 1 Components**: Button, Input/Field, Dialog, Select, Toast
- **Package Manager**: pnpm monorepo (apps/docs + packages/ui + packages/cli)
- **Build Tool**: tsup (ESM + CJS)
- **Tailwind**: v4 with CSS custom properties (HSL vars) in separate theme.css
- **Animation**: tw-animate-css for data-attribute-driven enter/exit animations
- **Docs**: Vite + Solid (no SSR)
- **Tests**: None for Phase 1 (manual verification via docs site)
- **Pattern**: One .tsx file per component, export both component + variant function
- **Solid.js**: Latest stable (v1.9.x)
- **Ark UI**: Latest stable, per-component imports (`@ark-ui/solid/dialog`)

### Research Findings
- **Ark UI**: 62+ Solid.js components, composable sub-component pattern, data-attribute styling (`data-scope`, `data-part`, `data-state`), `asChild` polymorphic prop
- **tailwind-variants**: v3+ with Tailwind v4, slots for multi-part components, `extend` for composition, built-in tailwind-merge, `createTV` for custom instance
- **solid-ui.com**: Uses Kobalte + cva — we replace both with Ark UI + tv
- **shadcn/ui**: Copy-paste model, single-file components, exported variant functions

### Metis Review
**Gaps Addressed**:
- **CLI output path**: `./src/components/ui/<name>.tsx` (resolved)
- **CSS variable location**: Separate `theme.css` file (resolved)
- **Docs framework**: Vite + Solid (resolved)
- **Guardrails**: No tests, no Storybook, no dark mode, no extra components (set)

---

## Work Objectives

### Core Objective
Deliver 5 production-ready Solid.js UI components with a CLI for copy-paste distribution and a demo documentation site.

### Concrete Deliverables
1. `packages/ui/src/button.tsx`, `input.tsx`, `dialog.tsx`, `select.tsx`, `toast.tsx`
2. `packages/ui/src/theme.css` — CSS custom properties (HSL theming)
3. `packages/ui/src/tv.ts` — Custom tailwind-variants instance via createTV
4. `packages/ui/src/index.ts` — Barrel export file
5. `apps/docs/` — Vite + Solid demo site showing all 5 components
6. `packages/cli/` — CLI tool for `npx ui add <component>`

### Definition of Done
- [ ] `pnpm build` in packages/ui produces dist/ with ESM + CJS + .d.ts files
- [ ] All 5 components render correctly on apps/docs dev server
- [ ] `pnpm ui add button` copies component to target directory
- [ ] No TypeScript errors with strict mode

### Must Have
- Each component must have tailwind-variants variant definitions (exported)
- Each component must support `class` prop override
- Components using Ark UI must re-export styled sub-components
- CSS custom properties must use `--ui-*` namespace prefix

### Must NOT Have (Guardrails)
- No automated tests
- No Storybook
- No dark mode implementation (just prepare the CSS vars)
- No additional components beyond the 5 listed
- No icon library bundling
- No compound component patterns beyond Ark UI's built-in

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed via the docs site.

### Test Decision
- **Infrastructure exists**: NO (Phase 1 skip)
- **Automated tests**: NONE (manual verification via docs site)
- **Framework**: N/A

### QA Policy
Every task MUST include agent-executed QA scenarios. Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Component verification**: Use Vite dev server (bash + curl for HTTP status, Playwright for visual verification)
- **CLI verification**: Use Bash to run CLI and verify file output
- **Build verification**: Use Bash to run `pnpm build` and check dist/ output

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — 5 tasks, sequential scaffold):
├── Task 1: Root monorepo scaffold (pnpm-workspace, root configs)
├── Task 2: packages/ui setup (package.json, tsup, tsconfig)
├── Task 3: Custom tv instance (tv.ts via createTV)
├── Task 4: Theme CSS (theme.css with HSL custom properties)
└── Task 5: apps/docs setup (Vite + Solid + Tailwind v4)

Wave 2 (Components — 5 tasks, MAX PARALLEL after Wave 1):
├── Task 6: Button component (pure styled, no Ark UI needed)
├── Task 7: Input/Field component (pure styled + Ark UI Field)
├── Task 8: Dialog component (Ark UI Dialog)
├── Task 9: Select component (Ark UI Select)
└── Task 10: Toast component (Ark UI Toast)

Wave 3 (CLI + Demos — 3 tasks):
├── Task 11: packages/cli setup (CLI tool for add command)
├── Task 12: Component demos in apps/docs (all 5 components)
└── Task 13: End-to-end verification (build, CLI, docs)

Critical Path: T1 → T2 → T3-5 → T6-10 → T11-13
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| T1 | — | T2, T5, T11 |
| T2 | T1 | T3, T4 |
| T3 | T2 | T6–T10 |
| T4 | T2 | T6–T10 |
| T5 | T1 | T12 |
| T6–T10 | T3, T4 | T12 |
| T11 | T1 | — |
| T12 | T5, T6–T10 | T13 |
| T13 | T11, T12 | — |

---

## TODOs

- [x] 1. Root monorepo scaffold

  **What to do**:
  - Create `package.json` at root with pnpm workspace config:
    ```json
    {
      "private": true,
      "name": "ui-monorepo",
      "scripts": {
        "build": "pnpm -r build",
        "dev": "pnpm -r --parallel dev",
        "lint": "tsc --noEmit"
      }
    }
    ```
  - Create `pnpm-workspace.yaml` with:
    ```yaml
    packages:
      - 'packages/*'
      - 'apps/*'
    ```
  - Create root `.gitignore` (node_modules, dist, .turbo, .env)
  - Create root `tsconfig.base.json` with strict mode settings:
    ```json
    {
      "compilerOptions": {
        "target": "ES2022",
        "module": "ESNext",
        "moduleResolution": "bundler",
        "strict": true,
        "jsx": "preserve",
        "jsxImportSource": "solid-js",
        "declaration": true,
        "declarationMap": true,
        "sourceMap": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "resolveJsonModule": true,
        "isolatedModules": true
      }
    }
    ```
  - Create `.npmrc` with `shamefully-hoist=true`

  **Must NOT do**:
  - Don't add monorepo tools (turborepo, nx) — keep it simple
  - Don't add CI/CD config

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`
  - **Reason**: Trivial scaffold task, just creating config files

  **Parallelization**:
  - **Can Run In Parallel**: NO (sequential — blocks everything)
  - **Blocks**: Tasks 2, 5, 11
  - **Blocked By**: None

  **References**:
  - Root directory: `/home/fandi/Lab/Js/ui` (empty — fresh setup)

  **Acceptance Criteria**:
  - [ ] `pnpm-workspace.yaml` exists with correct package paths
  - [ ] `tsconfig.base.json` has strict mode enabled
  - [ ] `pnpm install` runs without errors (verify with `pnpm ls`)

  **QA Scenarios**:
  ```
  Scenario: Check workspace setup
    Tool: Bash
    Steps:
      1. Run `ls pnpm-workspace.yaml tsconfig.base.json package.json .gitignore`
      2. Run `pnpm ls` (should succeed, show empty workspace)
    Expected Result: All config files exist, pnpm recognizes workspace
    Evidence: .sisyphus/evidence/task-1-workspace-check.txt
  ```

  **Commit**: YES
  - Message: `chore: scaffold pnpm monorepo with base tsconfig`
  - Files: `pnpm-workspace.yaml`, `tsconfig.base.json`, `package.json`, `.gitignore`, `.npmrc`

---

- [x] 2. packages/ui setup

  **What to do**:
  - Create `packages/ui/` directory structure
  - Create `packages/ui/package.json`:
    ```json
    {
      "name": "@ui/solid",
      "version": "0.1.0",
      "private": true,
      "type": "module",
      "main": "./dist/index.js",
      "module": "./dist/index.js",
      "types": "./dist/index.d.ts",
      "exports": {
        ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js", "require": "./dist/index.cjs" }
      },
      "files": ["dist/", "src/"],
      "scripts": {
        "build": "tsup",
        "dev": "tsup --watch",
        "clean": "rm -rf dist",
        "typecheck": "tsc --noEmit"
      },
      "dependencies": {
        "@ark-ui/solid": "^5.0.0",
        "tailwind-variants": "^3.0.0"
      },
      "peerDependencies": {
        "solid-js": "^1.9.0",
        "tailwindcss": "^4.0.0"
      }
    }
    ```
  - Create `packages/ui/tsup.config.ts` with ESM + CJS output:
    ```ts
    import { defineConfig } from 'tsup'
    export default defineConfig({
      entry: ['src/index.ts'],
      format: ['esm', 'cjs'],
      dts: true,
      sourcemap: true,
      clean: true,
      external: ['solid-js', '@ark-ui/solid', 'tailwind-variants'],
    })
    ```
  - Create `packages/ui/tsconfig.json` extending base:
    ```json
    { "extends": "../../tsconfig.base.json", "compilerOptions": { "outDir": "./dist" }, "include": ["src"] }
    ```
  - Create `packages/ui/src/index.ts` (empty barrel file for now)

  **Must NOT do**:
  - Don't add any other dependencies yet
  - Don't create component files yet

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`
  - **Reason**: Package scaffolding, well-defined configs

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on T1)
  - **Blocks**: Tasks 3, 4
  - **Blocked By**: Task 1

  **References**:
  - `package.json` patterns: solid-ui uses `@ark-ui/solid` and `tailwind-variants`

  **Acceptance Criteria**:
  - [ ] `pnpm build` in packages/ui succeeds (empty index.ts → dist/)
  - [ ] dist/index.js and dist/index.d.ts exist
  - [ ] TypeScript strict mode passes

  **QA Scenarios**:
  ```
  Scenario: Build packages/ui
    Tool: Bash
    Steps:
      1. Run `cd packages/ui && pnpm install && pnpm build`
      2. Check `ls dist/` for output files
    Expected Result: dist/index.js, dist/index.d.ts, dist/index.cjs exist
    Evidence: .sisyphus/evidence/task-2-ui-build.txt
  ```

  **Commit**: YES (with T3–T4)
  - Message: `feat(ui): scaffold packages/ui with tsup build`

---

- [x] 3. Custom tv instance (createTV)

  **What to do**:
  - Create `packages/ui/src/tv.ts`:
    ```ts
    import { createTV } from 'tailwind-variants'
    import type { VariantProps } from 'tailwind-variants'

    const tv = createTV({
      twMerge: true,
      twMergeConfig: {
        theme: {},
        classGroups: {},
      },
    })

    export { tv, type VariantProps }
    ```
  - Export from `packages/ui/src/index.ts`: `export { tv } from './tv'`
  - Keep config minimal for Phase 1 — extend with design tokens later

  **Must NOT do**:
  - Don't add custom design tokens yet (Phase 1 keeps it simple)
  - Don't add `cn` utility — tv handles merging internally

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`
  - **Reason**: Simple utility file creation

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T4)
  - **Blocks**: Tasks 6–10
  - **Blocked By**: Task 2

  **References**:
  - tailwind-variants docs: `createTV` API from research — use `createTV({ twMerge: true, twMergeConfig: {...} })`

  **Acceptance Criteria**:
  - [ ] `tv.ts` exists and exports `tv` function + `VariantProps` type
  - [ ] index.ts re-exports tv

  **QA Scenarios**:
  ```
  Scenario: tv utility works
    Tool: Bash
    Steps:
      1. Create temp test: `node -e "const { tv } = require('./src/tv'); console.log(typeof tv)"`
    Expected Result: tv is a function
    Evidence: .sisyphus/evidence/task-3-tv-check.txt
  ```

  **Commit**: YES (with T2, T4)

---

- [x] 4. Theme CSS (CSS custom properties)

  **What to do**:
  - Create `packages/ui/src/theme.css` with HSL-based CSS custom properties:
    ```css
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
  - Export from `packages/ui/src/index.ts`: `export * from './theme.css'` (or just document the import path)
  - Note: Since this is CSS, the export is via import path documentation. The docs site will @import it.

  **Must NOT do**:
  - Don't add dark mode selectors yet (Phase 2)
  - Don't add component-specific CSS here (each component handles its own via tv)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`
  - **Reason**: Standard CSS variables file

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T3)
  - **Blocks**: Tasks 6–10
  - **Blocked By**: Task 2

  **References**:
  - Theme variable names follow shadcn/ui / solid-ui conventions
  - HSL format: `hsl(var(--ui-primary))` for Tailwind v4 `@theme` directive

  **Acceptance Criteria**:
  - [ ] `theme.css` exists with all CSS custom properties
  - [ ] Variables use `--ui-*` namespace prefix
  - [ ] Tailwind v4 `@theme` directive maps CSS vars to color tokens

  **QA Scenarios**:
  ```
  Scenario: Theme CSS parses correctly
    Tool: Bash
    Steps:
      1. Check file exists and contains `--ui-` vars
    Expected Result: theme.css has all 14+ CSS custom properties
    Evidence: .sisyphus/evidence/task-4-theme-check.txt
  ```

  **Commit**: YES (with T2, T3)

---

- [x] 5. apps/docs setup

  **What to do**:
  - Create `apps/docs/` directory
  - Create `apps/docs/package.json`:
    ```json
    {
      "name": "@ui/docs",
      "private": true,
      "type": "module",
      "scripts": {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview"
      },
      "dependencies": {
        "solid-js": "^1.9.0",
        "@ui/solid": "workspace:*"
      },
      "devDependencies": {
        "vite": "^6.0.0",
        "vite-plugin-solid": "^2.0.0",
        "@tailwindcss/vite": "^4.0.0",
        "tailwindcss": "^4.0.0",
        "tw-animate-css": "^1.0.0"
      }
    }
    ```
  - Create `apps/docs/vite.config.ts`:
    ```ts
    import { defineConfig } from 'vite'
    import solid from 'vite-plugin-solid'
    import tailwindcss from '@tailwindcss/vite'

    export default defineConfig({
      plugins: [tailwindcss(), solid()],
    })
    ```
  - Create `apps/docs/tsconfig.json` extending base
  - Create `apps/docs/index.html` with Solid.js mount point
  - Create `apps/docs/src/main.tsx` as Solid entry
  - Create `apps/docs/src/index.css`:
    ```css
    @import 'tailwindcss';
    @import 'tw-animate-css';
    @import '@ui/solid/src/theme.css';
    ```
  - Create `apps/docs/src/App.tsx` with basic layout (sidebar nav + content area)

  **Must NOT do**:
  - Don't add routing library — keep demo simple with manual state
  - Don't add component demos yet (Task 12)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: `[]`
  - **Reason**: Multiple files to create (config, vite, entry, app layout)

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T3, T4)
  - **Blocks**: Task 12
  - **Blocked By**: Task 1

  **References**:
  - Vite + Solid setup: `vite-plugin-solid` docs
  - Tailwind v4 Vite setup: `@tailwindcss/vite` plugin
  - CSS import pattern: `@import '@ui/solid/src/theme.css'`

  **Acceptance Criteria**:
  - [ ] `pnpm dev` starts without errors
  - [ ] App renders at localhost:5173 with layout visible
  - [ ] Tailwind utility classes work in the app

  **QA Scenarios**:
  ```
  Scenario: Docs dev server starts
    Tool: Bash
    Steps:
      1. Run `cd apps/docs && timeout 10 pnpm dev 2>&1 || true`
    Expected Result: Vite starts on localhost:5173 (or configured port)
    Evidence: .sisyphus/evidence/task-5-docs-server.txt

  Scenario: Tailwind works in docs
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:5173
      2. Check page has styled elements
    Expected Result: Page renders with Tailwind styles applied
    Evidence: .sisyphus/evidence/task-5-docs-tailwind.png
  ```

  **Commit**: YES (with T1, T2)
  - Message: `feat(docs): scaffold Vite + Solid docs site with Tailwind v4`

---

- [x] 6. Button component

  **What to do**:
  - Create `packages/ui/src/button.tsx`:
    - Button is a **pure styled component** (no Ark UI primitive needed — HTML `<button>` is sufficient)
    - Define variant function using `tv()`:
      ```ts
      const buttonVariants = tv({
        base: 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        variants: {
          variant: {
            default: 'bg-ui-primary text-ui-primary-foreground hover:bg-ui-primary/90',
            destructive: 'bg-ui-destructive text-ui-destructive-foreground hover:bg-ui-destructive/90',
            outline: 'border border-ui-input bg-ui-background hover:bg-ui-accent hover:text-ui-accent-foreground',
            secondary: 'bg-ui-secondary text-ui-secondary-foreground hover:bg-ui-secondary/80',
            ghost: 'hover:bg-ui-accent hover:text-ui-accent-foreground',
            link: 'text-ui-primary underline-offset-4 hover:underline',
          },
          size: {
            sm: 'h-9 rounded-md px-3 text-xs',
            md: 'h-10 px-4 py-2',
            lg: 'h-11 rounded-md px-8',
            icon: 'size-10',
          },
        },
        defaultVariants: {
          variant: 'default',
          size: 'md',
        },
      })
      ```
    - Create `Button` component using `splitProps` pattern:
      ```tsx
      import { splitProps, type Component, type JSX } from 'solid-js'
      import { tv, type VariantProps } from './tv'

      type ButtonProps = JSX.ButtonHtmlAttributes<HTMLButtonElement> &
        VariantProps<typeof buttonVariants>

      const Button: Component<ButtonProps> = (props) => {
        const [local, others] = splitProps(props, ['class', 'variant', 'size'])
        return (
          <button
            class={buttonVariants({ variant: local.variant, size: local.size, class: local.class })}
            {...others}
          />
        )
      }
      ```
    - Export both: `export { Button, buttonVariants }`
    - Add to `index.ts`: `export * from './button'`

  **Must NOT do**:
  - Don't add `as` polymorphic prop (keep simple for Phase 1)
  - Don't add loading spinner or icon support

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`
  - **Reason**: Single-file component, well-defined pattern

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T7, T8, T9, T10)
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 3, 4

  **References**:
  - CSS variable naming: `--ui-primary`, `--ui-ring`, etc. from theme.css
  - tailwind-variants `tv()` API — use `tv({ base, variants, defaultVariants })`
  - `JSX.ButtonHtmlAttributes<HTMLButtonElement>` for Solid.js native button types

  **Acceptance Criteria**:
  - [ ] Button renders with all 6 variant styles (default, destructive, outline, secondary, ghost, link)
  - [ ] Button renders with all 4 size styles (sm, md, lg, icon)
  - [ ] Disabled state works (opacity + pointer-events)
  - [ ] class prop override works
  - [ ] Exports `buttonVariants` function

  **QA Scenarios**:
  ```
  Scenario: Button renders with default variant
    Tool: Bash (with ts-check or simple render)
    Steps:
      1. Verify button.tsx exports Button and buttonVariants
      2. Check import `import { Button } from './button'` resolves
    Expected Result: Module exports correctly
    Evidence: .sisyphus/evidence/task-6-button-exports.txt
  ```

  **Commit**: YES
  - Message: `feat(ui): add Button component with 6 variants and 4 sizes`

---

- [x] 7. Input/Field component

  **What to do**:
  - Create `packages/ui/src/input.tsx`:
    - This is a form field with input + label + description + error message
    - Use Ark UI's `Field` component for accessible form control
    - Use `tv()` for slot-based variant definitions:
      ```tsx
      import { Field } from '@ark-ui/solid/field'
      import { splitProps, type Component, type JSX } from 'solid-js'
      import { tv, type VariantProps } from './tv'
      ```
    - Define slots for the multi-part field:
      ```ts
      const inputVariants = tv({
        slots: {
          root: 'grid gap-1.5',
          label: 'text-sm font-medium text-ui-foreground',
          input: 'flex h-10 w-full rounded-md border border-ui-input bg-ui-background px-3 py-2 text-sm ring-offset-ui-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-ui-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          description: 'text-sm text-ui-muted-foreground',
          error: 'text-sm text-ui-destructive',
        },
        variants: {
          error: {
            true: {
              input: 'border-ui-destructive focus-visible:ring-ui-destructive',
            },
          },
        },
        defaultVariants: {
          error: false,
        },
      })
      ```
    - Create `Input` component that wraps Ark UI Field parts:
      ```tsx
      type InputProps = {
        label?: string
        description?: string
        error?: string
        class?: string
      } & JSX.IntrinsicElements['input']

      const Input: Component<InputProps> = (props) => {
        const [local, others] = splitProps(props, ['label', 'description', 'error', 'class'])
        const styles = inputVariants({ error: !!local.error })
        return (
          <Field.Root class={styles.root({ class: local.class })} invalid={!!local.error}>
            {local.label && <Field.Label class={styles.label()}>{local.label}</Field.Label>}
            <Field.Input class={styles.input()} {...others} />
            {local.description && !local.error && (
              <Field.HelperText class={styles.description()}>{local.description}</Field.HelperText>
            )}
            <Field.ErrorText class={styles.error()}>{local.error}</Field.ErrorText>
          </Field.Root>
        )
      }
      ```
    - Export: `export { Input, inputVariants }`
    - Add to `index.ts`: `export * from './input'`

  **Must NOT do**:
  - Don't add textarea or select variants (pure input)
  - Don't add form validation library integration

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: `[]`
  - **Reason**: Multi-part component using Ark UI Field + tv slots

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T6, T8, T9, T10)
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 3, 4

  **References**:
  - Ark UI Field component: `@ark-ui/solid/field` with Root, Label, Input, HelperText, ErrorText
  - tv slots pattern: `tv({ slots: { root, label, input, ... }, variants: { error: { true: { input: '...' } } } })`

  **Acceptance Criteria**:
  - [ ] Input renders with label, input box, description, and error state
  - [ ] Error state shows error text + red border on input
  - [ ] Disabled state works
  - [ ] class prop override works on root

  **QA Scenarios**:
  ```
  Scenario: Input renders basic form
    Tool: Bash (check exports)
    Steps:
      1. Verify input.tsx exports Input and inputVariants
      2. Check import resolves
    Expected Result: Module exports correctly
    Evidence: .sisyphus/evidence/task-7-input-exports.txt
  ```

  **Commit**: YES
  - Message: `feat(ui): add Input/Field component with Ark UI Field`

---

- [x] 8. Dialog component (Ark UI Dialog)

  **What to do**:
  - Create `packages/ui/src/dialog.tsx`:
    - Wrap all Ark UI Dialog sub-components with styled versions
    - Use `tv()` with slots for the multi-part dialog:
      ```tsx
      import { Dialog as ArkDialog } from '@ark-ui/solid/dialog'
      import { Portal } from 'solid-js/web'
      import { splitProps, type Component, type JSX } from 'solid-js'
      import { tv, type VariantProps } from './tv'
      ```
    - Dialog has these sub-components to expose:
      - `DialogRoot` — re-export `ArkDialog.Root`
      - `DialogTrigger` — re-export `ArkDialog.Trigger`
      - `DialogContent` — wraps Backdrop + Positioner + Content + CloseTrigger in a Portal
      - `DialogHeader` — plain div layout helper
      - `DialogFooter` — plain div layout helper
      - `DialogTitle` — wraps `ArkDialog.Title`
      - `DialogDescription` — wraps `ArkDialog.Description`
      - `DialogCloseTrigger` — wraps `ArkDialog.CloseTrigger` with X icon
    - Define tv slots for all styled parts:
      ```ts
      const dialogVariants = tv({
        slots: {
          backdrop: 'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          positioner: 'fixed inset-0 z-50 flex items-center justify-center',
          content: 'relative z-50 grid w-full max-w-lg gap-4 border border-ui-border bg-ui-background p-6 shadow-lg rounded-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          header: 'flex flex-col space-y-1.5 text-center sm:text-left',
          footer: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
          title: 'text-lg font-semibold leading-none tracking-tight',
          description: 'text-sm text-ui-muted-foreground',
          closeTrigger: 'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-ui-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ui-ring focus:ring-offset-2',
        },
      })
      ```
    - Implement `DialogContent` as the main compound wrapper:
      ```tsx
      type DialogContentProps = { class?: string; children?: JSX.Element }

      const DialogContent: Component<DialogContentProps> = (props) => {
        const styles = dialogVariants()
        return (
          <Portal>
            <ArkDialog.Backdrop class={styles.backdrop()} />
            <ArkDialog.Positioner class={styles.positioner()}>
              <ArkDialog.Content class={styles.content({ class: props.class })}>
                {props.children}
                <ArkDialog.CloseTrigger class={styles.closeTrigger()}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-4"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
                </ArkDialog.CloseTrigger>
              </ArkDialog.Content>
            </ArkDialog.Positioner>
          </Portal>
        )
      }
      ```
    - Export all sub-components:
      ```ts
      export const DialogRoot = ArkDialog.Root
      export const DialogTrigger = ArkDialog.Trigger
      export { DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription }
      export { dialogVariants }
      ```
    - Add to `index.ts`: `export * from './dialog'`

  **Must NOT do**:
  - Don't add non-modal dialog variant (keep modal-only for Phase 1)
  - Don't add controlled open/close example in component (user handles via state)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: `[]`
  - **Reason**: Complex multi-part component with Ark UI + Portal + tv slots

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T6, T7, T9, T10)
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 3, 4

  **References**:
  - Ark UI Dialog props (from MCP): Root (open, defaultOpen, onOpenChange, closeOnEscape, modal, trapFocus), Backdrop, Positioner, Content, CloseTrigger, Title, Description
  - Animation classes: `tw-animate-css` provides `animate-in`, `animate-out`, `fade-in-0`, `fade-out-0`, `zoom-in-95`, `zoom-out-95`
  - Data attributes: `data-[state=open]`, `data-[state=closed]` for animation triggers

  **Acceptance Criteria**:
  - [ ] Dialog opens on trigger click
  - [ ] Dialog closes on X button, escape key, and backdrop click
  - [ ] Dialog content is portal-rendered
  - [ ] Focus is trapped inside dialog when open
  - [ ] Backdrop has fade animation
  - [ ] Content has scale + fade animation

  **QA Scenarios**:
  ```
  Scenario: Dialog opens and closes
    Tool: Bash (check exports)
    Steps:
      1. Verify dialog.tsx exports all Dialog sub-components
      2. Check import resolves
    Expected Result: All sub-components exported
    Evidence: .sisyphus/evidence/task-8-dialog-exports.txt
  ```

  **Commit**: YES
  - Message: `feat(ui): add Dialog component with Ark UI Dialog primitive`

---

- [x] 9. Select component (Ark UI Select)

  **What to do**:
  - Create `packages/ui/src/select.tsx`:
    - Wrap Ark UI Select with styled sub-components
    - Use `tv()` with slots:
      ```tsx
      import { Select as ArkSelect, createListCollection, type ListCollection } from '@ark-ui/solid/select'
      import { Portal } from 'solid-js/web'
      import { Index, type JSX, splitProps, type Component } from 'solid-js'
      import { tv, type VariantProps } from './tv'
      ```
    - Define tv slots:
      ```ts
      const selectVariants = tv({
        slots: {
          root: 'grid gap-1.5 w-full',
          label: 'text-sm font-medium text-ui-foreground',
          control: 'flex h-10 w-full items-center justify-between rounded-md border border-ui-input bg-ui-background px-3 py-2 text-sm ring-offset-ui-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ui-ring focus-within:ring-offset-2',
          trigger: 'flex items-center justify-center size-4 [&[data-state=open]>svg]:rotate-180',
          valueText: 'text-sm data-[placeholder-shown]:text-ui-muted-foreground',
          indicator: 'size-4 transition-transform text-ui-muted-foreground',
          positioner: 'z-50',
          content: 'z-50 min-w-[8rem] max-h-60 overflow-y-auto rounded-md border border-ui-border bg-ui-background p-1 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          item: 'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-ui-accent focus:text-ui-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-ui-accent data-[highlighted]:text-ui-accent-foreground',
          itemText: 'flex-1',
          itemIndicator: 'absolute right-2 flex size-4 items-center justify-center',
        },
        variants: {
          error: {
            true: {
              control: 'border-ui-destructive focus-within:ring-ui-destructive',
              label: 'text-ui-destructive',
            },
          },
        },
        defaultVariants: {
          error: false,
        },
      })
      ```
    - Create `SelectRoot` wrapper with styled sub-components:
      ```tsx
      type SelectRootProps = ArkSelect.RootProps & { class?: string; error?: boolean }

      const SelectRoot: Component<SelectRootProps> = (props) => {
        const [local, others] = splitProps(props as SelectRootProps, ['class', 'error'])
        const styles = selectVariants({ error: !!local.error })
        return (
          <ArkSelect.Root class={styles.root()} {...others} />
        )
      }
      ```
    - Create styled sub-component wrappers:
      ```tsx
      const SelectLabel = (props: ArkSelect.LabelProps) => {
        const styles = selectVariants()
        return <ArkSelect.Label class={styles.label()} {...props} />
      }

      const SelectControl = (props: ArkSelect.ControlProps) => {
        const styles = selectVariants()
        return <ArkSelect.Control class={styles.control()}>
          {props.children}
          <ArkSelect.Indicator class={styles.indicator()}>
            <svg>chevron-down icon</svg>
          </ArkSelect.Indicator>
        </ArkSelect.Control>
      }

      // ... similar for Trigger, ValueText, Content, Item, ItemText, ItemIndicator
      ```
    - Export `createListCollection` from Ark UI as a re-export
    - Export all sub-components and the variant function

  **Must NOT do**:
  - Don't add multi-select support (Phase 1 single select only)
  - Don't add async/loading states

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: `[]`
  - **Reason**: Complex multi-part component with Ark UI Select + collection API + tv slots

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T6, T7, T8, T10)
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 3, 4

  **References**:
  - Ark UI Select props (from MCP): Root (collection, multiple, disabled, onValueChange), Label, Control, Trigger, ValueText, Indicator, Positioner, Content, Item, ItemText, ItemIndicator
  - `createListCollection` API: `createListCollection({ items: [{ label, value }] })`
  - Ark UI example uses `<Index each={collection.items}>` for Solid.js rendering

  **Acceptance Criteria**:
  - [ ] Select renders with styled trigger, dropdown, items
  - [ ] Item selection updates value text
  - [ ] Chevron rotates on open/close
  - [ ] Dropdown is portal-rendered
  - [ ] Keyboard navigation works (arrow keys, enter, escape)

  **QA Scenarios**:
  ```
  Scenario: Select component exports
    Tool: Bash (check exports)
    Steps:
      1. Verify select.tsx exports SelectRoot, SelectTrigger, SelectContent, etc.
      2. Check import resolves
    Expected Result: All sub-components exported
    Evidence: .sisyphus/evidence/task-9-select-exports.txt
  ```

  **Commit**: YES
  - Message: `feat(ui): add Select component with Ark UI Select primitive`

---

- [x] 10. Toast component (Ark UI Toast)

  **What to do**:
  - Create `packages/ui/src/toast.tsx`:
    - Wrap Ark UI Toast with styled sub-components
    - Ark UI Toast requires `createToaster()` + `<Toaster>` component
    - Use `tv()` with slots:
      ```tsx
      import { Toast as ArkToast, createToaster, type CreateToasterReturn } from '@ark-ui/solid/toast'
      import { Portal } from 'solid-js/web'
      import { splitProps, type Component, type JSX } from 'solid-js'
      import { tv, type VariantProps } from './tv'
      ```
    - Define tv slots:
      ```ts
      const toastVariants = tv({
        slots: {
          root: 'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-ui-border p-6 pr-8 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out',
          title: 'text-sm font-semibold',
          description: 'text-sm opacity-90',
          closeTrigger: 'absolute right-2 top-2 rounded-md p-1 text-ui-foreground/50 opacity-0 transition-opacity hover:text-ui-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100',
          actionTrigger: 'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-xs font-medium transition-colors hover:bg-ui-secondary focus:outline-none focus:ring-2 focus:ring-ui-ring',
        },
        variants: {
          variant: {
            default: { root: 'bg-ui-background border-ui-border' },
            destructive: {
              root: 'destructive group border-ui-destructive bg-ui-destructive text-ui-destructive-foreground',
              title: 'text-ui-destructive-foreground',
              description: 'text-ui-destructive-foreground/90',
              closeTrigger: 'text-ui-destructive-foreground/50 hover:text-ui-destructive-foreground',
              actionTrigger: 'text-ui-destructive-foreground border-ui-destructive-foreground/20 hover:bg-ui-destructive-foreground/10',
            },
            success: { root: 'border-green-500 bg-green-50 text-green-950' },
            warning: { root: 'border-yellow-500 bg-yellow-50 text-yellow-950' },
          },
        },
        defaultVariants: { variant: 'default' },
      })
      ```
    - Create `Toaster` component:
      ```tsx
      type ToasterProps = {
        toaster: CreateToasterReturn
        class?: string
      }

      const Toaster: Component<ToasterProps> = (props) => {
        const [local, rest] = splitProps(props, ['class'])
        return (
          <ArkToast.Toaster toaster={local.toaster} class={local.class}>
            {(toast) => {
              const styles = toastVariants({ variant: toast().type as any || 'default' })
              return (
                <ArkToast.Root class={styles.root()}>
                  <div class="grid gap-1">
                    {toast().title && <ArkToast.Title class={styles.title()}>{toast().title}</ArkToast.Title>}
                    {toast().description && <ArkToast.Description class={styles.description()}>{toast().description}</ArkToast.Description>}
                  </div>
                  <ArkToast.CloseTrigger class={styles.closeTrigger()}>✕</ArkToast.CloseTrigger>
                  {toast().action && <ArkToast.ActionTrigger class={styles.actionTrigger()}>{toast().action.label}</ArkToast.ActionTrigger>}
                </ArkToast.Root>
              )
            }}
          </ArkToast.Toaster>
        )
      }
      ```
    - Export `createToaster` and `Toaster`:
      ```ts
      export { createToaster }
      export { Toaster }
      export { toastVariants }
      ```

    **IMPORTANT**: Note the required CSS for Toast. The Ark UI Toast requires specific CSS transforms on `[data-scope=toast][data-part=root]` for animations. This should be added to theme.css or a separate toast animation CSS section. Add to `theme.css`:
    ```css
    [data-scope=toast][data-part=root] {
      translate: var(--x) var(--y);
      scale: var(--scale);
      z-index: var(--z-index);
      height: var(--height);
      opacity: var(--opacity);
      will-change: translate, opacity, scale;
      transition: translate 400ms, scale 400ms, opacity 400ms, height 400ms;
    }
    ```

  **Must NOT do**:
  - Don't add promise toast variant (Phase 1 basic toasts only)
  - Don't add custom placement beyond Ark UI defaults

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: `[]`
  - **Reason**: Complex Ark UI Toast with imperative API + required CSS variables

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T6, T7, T8, T9)
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 3, 4

  **References**:
  - Ark UI Toast props (from MCP): createToaster (placement, duration, max), Toaster, Root, Title, Description, CloseTrigger, ActionTrigger
  - **Required Toast CSS**: `data-[scope=toast][data-part=root]` with translate/scale/opacity transforms (see MCP styling guide)
  - Ark UI docs: Toast animations use CSS variables `--x`, `--y`, `--scale`, `--z-index`, `--height`, `--opacity`

  **Acceptance Criteria**:
  - [ ] Toast appears on trigger
  - [ ] Toast auto-dismisses (default duration)
  - [ ] Toast close button works
  - [ ] Multiple toasts stack correctly
  - [ ] Destructive variant shows red styling
  - [ ] Toast CSS variables are properly set for animations

  **QA Scenarios**:
  ```
  Scenario: Toast component exports
    Tool: Bash (check exports)
    Steps:
      1. Verify toast.tsx exports Toaster, createToaster, toastVariants
      2. Check import resolves
    Expected Result: All exports correct
    Evidence: .sisyphus/evidence/task-10-toast-exports.txt
  ```

  **Commit**: YES
  - Message: `feat(ui): add Toast component with Ark UI Toast primitive`

---

- [x] 11. packages/cli setup (CLI tool)

  **What to do**:
  - Create `packages/cli/` directory
  - Create `packages/cli/package.json`:
    ```json
    {
      "name": "create-ui",
      "version": "0.1.0",
      "private": true,
      "type": "module",
      "bin": {
        "ui": "./dist/index.js"
      },
      "scripts": {
        "build": "tsup",
        "dev": "tsup --watch",
        "typecheck": "tsc --noEmit"
      },
      "dependencies": {
        "commander": "^13.0.0",
        "fs-extra": "^11.0.0"
      },
      "devDependencies": {
        "tsup": "^8.0.0",
        "typescript": "^5.0.0",
        "@types/fs-extra": "^11.0.0"
      }
    }
    ```
  - Create `packages/cli/tsup.config.ts`:
    ```ts
    import { defineConfig } from 'tsup'
    export default defineConfig({
      entry: ['src/index.ts'],
      format: ['esm'],
      dts: false,
      sourcemap: true,
      clean: true,
    })
    ```
  - Create `packages/cli/tsconfig.json` extending base
  - Create `packages/cli/src/index.ts`:
    ```ts
    #!/usr/bin/env node
    import { Command } from 'commander'

    const program = new Command()
      .name('ui')
      .description('Add UI components to your Solid.js project')
      .version('0.1.0')

    program
      .command('add')
      .argument('<component>', 'Component name to add')
      .option('-o, --output <path>', 'Output directory', './src/components/ui')
      .action(async (component, options) => {
        const { addComponent } = await import('./commands/add')
        await addComponent(component, options.output)
      })

    program.parse()
    ```
  - Create `packages/cli/src/commands/add.ts` with logic to:
    - Read component template from `packages/ui/src/` source files
    - Copy the file to target output directory
    - Also copy `theme.css` if it doesn't exist in target
    - Print success message with import path
    - Handle case-insensitive component names
    - Show useful error for unknown components

  **Must NOT do**:
  - Don't add init command (Phase 1 is just add)
  - Don't publish to npm (local development for Phase 1)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: `[]`
  - **Reason**: CLI tool with commander, file copy logic, path resolution

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T12)
  - **Blocks**: Task 13
  - **Blocked By**: Task 1, and source files from T6-T10

  **References**:
  - Commander.js: `npm:commander` for CLI argument parsing
  - Pattern follows shadcn/ui CLI: `npx shadcn-ui@latest add button`

  **Acceptance Criteria**:
  - [ ] `pnpm build` in packages/cli succeeds
  - [ ] `node dist/index.js add button` copies button.tsx to target
  - [ ] Unknown component shows helpful error
  - [ ] theme.css is also copied if missing

  **QA Scenarios**:
  ```
  Scenario: CLI builds and copies button
    Tool: Bash
    Steps:
      1. cd packages/cli && pnpm build
      2. mkdir -p /tmp/ui-test
      3. node dist/index.js add button -o /tmp/ui-test/components/ui
      4. ls /tmp/ui-test/components/ui/button.tsx
    Expected Result: button.tsx exists in target directory
    Evidence: .sisyphus/evidence/task-11-cli-add-button.txt

  Scenario: CLI shows error for unknown component
    Tool: Bash
    Steps:
      1. node dist/index.js add nonexistent
    Expected Result: Error message with available components
    Evidence: .sisyphus/evidence/task-11-cli-error.txt
  ```

  **Commit**: YES
  - Message: `feat(cli): add CLI tool for component copy-paste workflow`

---

- [x] 12. Component demos in apps/docs

  **What to do**:
  - Create demo pages in `apps/docs/src/` for all 5 components
  - `apps/docs/src/App.tsx` — main layout with sidebar navigation + content area
  - Each component gets a demo section showing:
    - Component rendered with different variants
    - Interactive example (e.g., open/close for Dialog, select item for Select)
  - **Button Demo**: Show all 6 variants × 3 sizes grid, disabled state
  - **Input Demo**: Basic input, input with label, input with error, disabled input
  - **Dialog Demo**: Button trigger → opens dialog, show title + description + footer buttons
  - **Select Demo**: Select with 3+ options, show selected value
  - **Toast Demo**: Button triggers toast, show different variants (default, destructive, success)
  - Keep demos in a single `App.tsx` with sections (no routing needed)

  **Must NOT do**:
  - Don't add routing or URL-based navigation (simple section switching)
  - Don't add dark mode toggle
  - Don't add copy-to-clipboard for code snippets

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `[]`
  - **Reason**: UI/demo work, creating visual demonstrations of all components

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T11)
  - **Blocks**: Task 13
  - **Blocked By**: Tasks 5, 6, 7, 8, 9, 10

  **References**:
  - `@ui/solid` package exports from index.ts
  - Component usage patterns defined in T6-T10

  **Acceptance Criteria**:
  - [ ] `pnpm dev` in apps/docs starts and shows all 5 component demos
  - [ ] Each component demo shows multiple variants
  - [ ] Interactive demos work (Dialog opens/closes, Select selects, Toast appears)
  - [ ] No TypeScript errors

  **QA Scenarios**:
  ```
  Scenario: Docs site shows all components
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:5173
      2. Check all 5 component sections are visible
      3. Click Dialog trigger → verify dialog appears
      4. Click Select → verify dropdown opens
      5. Click Toast trigger → verify toast appears
    Expected Result: All components render and are interactive
    Evidence: .sisyphus/evidence/task-12-docs-components.png

  Scenario: Dialog works end-to-end
    Tool: Playwright
    Steps:
      1. Click "Open Dialog" button
      2. Wait for dialog content to appear
      3. Click X button
      4. Verify dialog closes
    Expected Result: Dialog opens and closes correctly
    Evidence: .sisyphus/evidence/task-12-dialog-interaction.png
  ```

  **Commit**: YES
  - Message: `feat(docs): add component demos for all 5 UI components`

---

- [x] 13. End-to-end verification

  **What to do**:
  - Run full build pipeline across all packages:
    ```bash
    pnpm install && pnpm -r build
    ```
  - Verify TypeScript passes:
    ```bash
    pnpm -r typecheck
    ```
  - Verify CLI works end-to-end:
    - `mkdir -p /tmp/ui-e2e-test`
    - Test `add` for each of the 5 components
    - Verify all 5 .tsx files exist in target
  - Verify docs site renders all 5 components
  - Collect all evidence in `.sisyphus/evidence/final-qa/`
  - Fix any issues found during verification

  **Must NOT do**:
  - Don't add CI/CD integration (Phase 1 is local-only)
  - Don't add automated test suites

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: `[]`
  - **Reason**: End-to-end integration verification, problem-solving

  **Parallelization**:
  - **Can Run In Parallel**: NO (sequential — must happen after everything else)
  - **Blocks**: Nothing (final task)
  - **Blocked By**: Tasks 11, 12

  **References**:
  - All component source files from T6-T10
  - CLI output from T11
  - Docs site from T12

  **Acceptance Criteria**:
  - [ ] `pnpm build` succeeds for all 3 packages
  - [ ] TypeScript strict mode passes for all packages
  - [ ] CLI copies all 5 components correctly
  - [ ] Docs dev server starts and all 5 components render
  - [ ] No errors in console

  **QA Scenarios**:
  ```
  Scenario: Full build pipeline
    Tool: Bash
    Steps:
      1. pnpm install
      2. pnpm -r build
      3. ls packages/ui/dist/
      4. ls packages/cli/dist/
    Expected Result: All builds succeed, dist/ directories exist
    Evidence: .sisyphus/evidence/final-qa/task-13-full-build.txt

  Scenario: TypeScript strict mode
    Tool: Bash
    Steps:
      1. pnpm -r typecheck 2>&1
    Expected Result: Exit code 0, no errors
    Evidence: .sisyphus/evidence/final-qa/task-13-ts-check.txt

  Scenario: CLI copies all components
    Tool: Bash
    Steps:
      1. rm -rf /tmp/ui-e2e-test
      2. for comp in button input dialog select toast; do
           node packages/cli/dist/index.js add $comp -o /tmp/ui-e2e-test/src/components/ui
         done
      3. ls /tmp/ui-e2e-test/src/components/ui/
    Expected Result: All 5 .tsx files exist
    Evidence: .sisyphus/evidence/final-qa/task-13-cli-e2e.txt
  ```

  **Commit**: YES
  - Message: `chore: end-to-end verification of Phase 1`

---

- [x] F1. **Plan Compliance Audit** — `oracle` ✅
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — `unspecified-high` ✅
  Run `tsc --noEmit` + `pnpm build` across all packages. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [x] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill) ✅
  Start from clean state. Execute EVERY QA scenario from EVERY task. Test all 5 components in docs site. Test CLI add command. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep` ✅
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | VERDICT`

---

## Commit Strategy

- **T1–T5**: `feat(ui): scaffold monorepo with packages/ui, apps/docs, packages/cli`
- **T6**: `feat(ui): add Button component with variants`
- **T7**: `feat(ui): add Input/Field component`
- **T8**: `feat(ui): add Dialog component with Ark UI`
- **T9**: `feat(ui): add Select component with Ark UI`
- **T10**: `feat(ui): add Toast component with Ark UI`
- **T11**: `feat(cli): add CLI tool for copy-paste workflow`
- **T12**: `feat(docs): add component demos for all 5 components`
- **T13**: `chore: end-to-end verification`

---

## Success Criteria

### Verification Commands
```bash
# Build UI package
cd packages/ui && pnpm build
# Expected: dist/ with index.js, index.cjs, index.d.ts

# Build CLI
cd packages/cli && pnpm build
# Expected: dist/index.js with bin entry

# Run CLI add command
cd /tmp && mkdir test-project && cd test-project && node /path/to/cli/dist/index.js add button
# Expected: src/components/ui/button.tsx created

# Start docs
cd apps/docs && pnpm dev
# Expected: dev server on localhost:5173

# Check TypeScript
cd packages/ui && pnpm tsc --noEmit
# Expected: exit code 0
```

### Final Checklist
- [x] All 5 components render in docs site
- [x] CLI copies components correctly
- [x] Build produces clean output
- [x] No TypeScript strict mode errors
- [x] CSS custom properties are namespaced (`--ui-*`)
