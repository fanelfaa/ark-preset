## What to build

Migrate the MDX and demos for Overlay and Disclosure components (Dialog, Popover, Menu, Tooltip, Hover Card, Toast, Drawer, Collapsible, Accordion) to the new Astro site's `solid` collection. Ensure their interactive previews work perfectly using `ComponentPreview.astro`.

## Acceptance criteria

- [ ] All overlay and disclosure components are migrated from `apps/docs` to `apps/new-docs`.
- [ ] Code snippets and live demos function correctly on all migrated pages.
- [ ] Build completes without errors.

## Blocked by

- Issue 06 (06-migrate-foundational.md)

## Implementation Rules

**CRITICAL**: You MUST follow the **MDX Composition Rule** documented in `/tmp/handoff-ark-preset-astro-migration.md`.
Do NOT concatenate `intro.mdx`, `usage.mdx`, and `api.mdx` into a single file. You must copy them into `apps/new-docs/src/content/solid/components/<component>/` and write a root `<component>.mdx` file that imports them natively.
Remember to generate the installation file using the updated script which automatically places it at `components/<component>/installation.mdx`.
Also, remember to fix the `?code` imports for demos and replace `<InlineCode>` with backticks in the MDX files.
