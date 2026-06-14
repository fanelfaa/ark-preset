# PROJECT KNOWLEDGE BASE

**Generated:** 2026-05-27 02:47:19 UTC
**Commit:** f3d6548f
**Branch:** main

## OVERVIEW

Documentation site for UI component library. Built with Astro 6 + Solid.js + MDX + Tailwind CSS v4.

## STRUCTURE

```
apps/docs/
├── src/
│   ├── assets/          # Static assets (SVGs, images)
│   ├── components/      # Demo components (one dir per component)
│   ├── content/docs/components/  # MDX documentation pages
│   ├── layouts/         # Astro layouts
│   ├── pages/           # Astro routes (index + dynamic [id].astro)
│   └── styles/          # Global CSS (Tailwind)
├── astro.config.mjs     # Astro + Solid.js + MDX + Tailwind
└── moon.yml             # Moonrepo: depends on solid
```

## WHERE TO LOOK

| Task                    | Location                     | Notes                              |
| ----------------------- | ---------------------------- | ---------------------------------- |
| Add component docs page | src/content/docs/components/ | Create \*.mdx file                 |
| Add component demo      | src/components/<name>-demo/  | Create TSX demo with Astro wrapper |
| Add new page            | src/pages/                   | Astro routing (file-based)         |
| Update site layout      | src/layouts/                 | Astro layouts                      |
| Update global styles    | src/styles/global.css        | Tailwind CSS v4                    |

## CONVENTIONS

- Demos live in `src/components/<component>-demo/` as `.tsx` files
- Each demo is a simple Solid.js component imported from `@fan-ui/solid`
- Doc pages are `.mdx` files loading the demo component
- Dark mode handled via Tailwind CSS v4 (no separate toggle)
- Astro provides the page shell; Solid.js components are interactive islands

## COMMANDS

```bash
moon run docs:dev        # Dev server with HMR
moon run docs:build      # Static build
moon run docs:preview    # Preview built site
```

## NOTES

- This app depends on `@fan-ui/solid` — rebuild solid first when changing components
- Component demos auto-discovered from `src/content/docs/components/` directory
- See root AGENTS.md for project-wide information
