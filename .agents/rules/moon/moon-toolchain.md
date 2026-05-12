# Moon Toolchain Configuration

## Location

`.moon/toolchains.yml`

## Current Config

```yaml
javascript:
  packageManager: "pnpm"

node:
  version: ">=23"
  packageManager: "pnpm"

pnpm:
  version: "9.0.0"

typescript:
  createMissingConfig: false
  syncProjectReferences: true
```

## Version Constraint Syntax

Moon uses proto's version constraint system:

| Syntax | Meaning |
|---|---|
| `23.9.0` | Exact version |
| `>=23` | 23 or higher |
| `~23` | 23.x (no 24+) |
| `^23` | 23.x or 24.x |
| `>=20 <24` | Range |

## Updating Node Version

If you upgrade Node:

```bash
node --version  # Check current
# Update .moon/toolchains.yml
node:
  version: ">=NEW_VERSION"
```

## Toolchain Verification

```bash
moon toolchain --json  # Show current toolchain
moon toolchain info    # Detailed plugin info
```

## Required Versions

| Tool | Version | Reason |
|---|---|---|
| Node | `>=23` | vite 6.x requires ESM features from Node 20+ |
| pnpm | `9.0.0` | Current workspace version |
| TypeScript | (auto) | From package.json devDependencies |