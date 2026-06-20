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

## MCP Server (AI Agent Integration)

Run a [Model Context Protocol](https://modelcontextprotocol.io) server so AI coding agents
can discover components, inspect recipes, and generate files directly.

```bash
ark-preset mcp
```

Configure in your MCP client (`claude.json`, `cursor.json`, etc.):

```json
{
  "mcpServers": {
    "ark-preset": {
      "command": "ark-preset",
      "args": ["mcp"]
    }
  }
}
```

### Available Tools

| Tool | Description |
|------|-------------|
| `ark_preset_list_components` | List all 46 components with ✅/⬜ status and dependencies |
| `ark_preset_get_component` | Full component details — recipe source, template files, deps |
| `ark_preset_search_components` | Search components by keyword |
| `ark_preset_add_component` | Generate component files into your project |
| `ark_preset_get_recipe` | View raw `tv()` recipe source |
| `ark_preset_get_dependency_graph` | Query dependency relationships between components |
| `ark_preset_get_manifest` | Dump component manifest as JSON or text summary |

> **Note:** Complementary to the Ark UI MCP server. Ark UI MCP provides upstream
> component info (props, examples). Ark Preset MCP provides preset-specific info
> (which components have wrappers, recipe styling, code generation).

