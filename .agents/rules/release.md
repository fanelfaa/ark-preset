# Release Workflow Rules

This project uses a monorepo structure with pnpm workspaces.
The release and publish processes are automated via GitHub Actions, but the version bumping, committing, and tagging must be done correctly.

## 1. Version Bumping

Do not use `npm version` at the project root since the root `package.json` is set to version `0.0.0` and private.
Instead, bump the versions in the individual package directories: `packages/core`, `packages/solid`, and `packages/cli`.

You can bump the version uniformly across all packages (e.g. `patch`, `minor`, `major`) by running:

```bash
for dir in packages/core packages/solid packages/cli; do (cd $dir && npm version patch --no-git-tag-version); done
```

_Note: The `--no-git-tag-version` is crucial so npm doesn't attempt to commit and tag in each subdirectory._

## 2. Lockfile Sync

Run `pnpm install` at the root directory to ensure that `pnpm-lock.yaml` is in sync with the new versions in the `package.json` files.

## 3. Commit and Tag

Stage and commit the `package.json` updates:

```bash
git add .
git commit -m "chore(release): bump to vX.Y.Z"
```

Next, create the release tag. It's recommended to create an **annotated tag** so that standard push commands can pick it up:

```bash
git tag -a vX.Y.Z -m "Release vX.Y.Z"
```

## 4. Push to Origin

If you created an annotated tag, you can push the commit and the tag together:

```bash
git push --follow-tags
```

If you created a lightweight tag (without `-a`), `--follow-tags` will **not** push it. You must push it explicitly:

```bash
git push origin main
git push origin vX.Y.Z
```

## 5. Publishing

Once the `vX.Y.Z` tag is pushed, the `.github/workflows/publish.yml` GitHub Action will automatically run. It will:

- Check out the repository.
- Build and publish each package (`@ark-preset/core`, `@ark-preset/solid`, `@ark-preset/cli`) to npm.
- Only publish if the version doesn't already exist on npm.
