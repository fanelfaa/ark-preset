# Docs Site — Astro + Solid.js

## Architecture

The docs site is an **Astro app** with Solid.js islands for interactive components.

- Content lives in `src/content/` (Content Collections — multi-framework routing via `solid/`, `react/`, `vue/` subdirectories)
- Pages are Astro routes in `src/pages/`
- Interactive components (DocsLayout, ThemeToggle, demos) are Solid.js islands with `client:load`
- Syntax highlighting via Shiki with dual-theme (controlled by `html.dark` class)
- Code blocks rendered as `<custom-code-block>` web component (copy + expand/collapse, no FOUC)

## Development

```bash
astro dev --background
```

Manage with `astro dev stop`, `astro dev status`, `astro dev logs`.

## Adding Component Docs

Each component has a directory under `src/content/solid/components/<name>/`:

```
src/content/solid/components/<name>/
├── index.tsx           # Section imports (Intro, Usage, API, Installation)
├── intro.mdx           # Title + description + live demo
├── usage.mdx           # Usage patterns + demos
├── api.mdx             # API reference link
├── installation.mdx    # Generated installation snippet
└── demos/              # Demo components (optional)
```

### Generating installation docs

```bash
pnpm generate-installation <name>
```

Or run the watcher plugin in dev mode — it auto-regenerates on source changes.

## Docs Conventions

| What                | Rule                                                                           |
| ------------------- | ------------------------------------------------------------------------------ |
| `client:load`       | Required for Solid.js islands in MDX (`DocsLayout`, `ComponentPreview`, demos) |
| Demo imports        | `client:load` on interactive demo components                                   |
| Code blocks         | Use fenced code blocks — rendered by Shiki + `<custom-code-block>`             |
| Framework selector  | `id="framework-selector"`, redirects via client-side JS                        |
| Theme               | `html.dark` class + `ui-theme` localStorage key                                |
| Sidebar nav         | Managed in `src/sidebar-nav.ts`                                                |
| Content collections | `src/content.config.ts` — solid, react, vue entrypoints                        |

## Full documentation

https://docs.astro.build
