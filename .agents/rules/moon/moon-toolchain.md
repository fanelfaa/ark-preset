# Moon Toolchain

## Config

`.moon/toolchains.yml`:

```yaml
node:
  version: ">=18" # Supports ranges: >=18, >=23, ~23, ^23
pnpm:
  version: "9.0.0"
typescript:
  createMissingConfig: false
```

## Version Syntax

| Syntax | Meaning      |
| ------ | ------------ |
| `>=18` | 18 or higher |
| `~23`  | 23.x only    |
| `^23`  | 23.x or 24.x |
