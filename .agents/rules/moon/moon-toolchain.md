# Moon Toolchain

## Config

`.moon/toolchains.yml`:

```yaml
node:
  version: ">=23" # Supports ranges: >=23, ~23, ^23
pnpm:
  version: "9.0.0"
typescript:
  createMissingConfig: false
```

## Version Syntax

| Syntax | Meaning      |
| ------ | ------------ |
| `>=23` | 23 or higher |
| `~23`  | 23.x only    |
| `^23`  | 23.x or 24.x |
