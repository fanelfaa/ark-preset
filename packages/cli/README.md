# `@ark-preset/cli` — UI Component Generator

CLI tool to generate Ark UI components into your Solid.js project.

```bash
npx @ark-preset/cli add button
```

## Usage

```bash
# Add a component
npx @ark-preset/cli add button

# Specify output directory
npx @ark-preset/cli add card -o ./src/components/ui

# Specify framework
npx @ark-preset/cli add button -f solid
```

## Options

| Option                     | Description                              | Default                 |
| -------------------------- | ---------------------------------------- | ----------------------- |
| `-o, --output <path>`      | Output directory                         | `./src/components/ui`   |
| `-f, --framework <type>`   | Framework: `solid` \| `react` \| `vue`   | `solid`                 |

## Output Structure

```
./src/components/
├── ui/
│   ├── button/index.tsx   # Component source
│   └── index.ts           # Barrel export
└── recipes/
    ├── button.ts          # tv() recipe
    └── index.ts           # Barrel export
```

