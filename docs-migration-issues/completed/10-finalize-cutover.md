## What to build

Migrate any remaining miscellaneous pages. Update `moon.yml` and root `package.json` scripts so that `moon run docs:dev` and `docs:build` point to `apps/new-docs`. Safely archive or delete the old `apps/docs` app.

## Acceptance criteria

- [ ] Any missing pages/components not covered by previous batches are migrated.
- [ ] `moon.yml` is updated to orchestrate `apps/new-docs` instead of `apps/docs`.
- [ ] Root `package.json` scripts are updated to point to the new app.
- [ ] Running `pnpm run docs:dev` and `pnpm run docs:build` successfully targets the new Astro app.
- [ ] The old `apps/docs` is either deleted or renamed (e.g., to `apps/old-docs`) to finalize the cutover.

## Blocked by

- Issue 07 (07-migrate-forms.md)
- Issue 08 (08-migrate-overlays.md)
- Issue 09 (09-migrate-display-layout.md)
