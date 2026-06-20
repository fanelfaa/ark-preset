/**
 * ark-preset MCP Server
 *
 * Provides MCP tools for AI agents to interact with the ark-preset component library.
 * Serves as a bridge between AI coding agents and the component scaffolding system.
 *
 * Can be invoked via: npx @ark-preset/cli@latest mcp
 * Or configured directly as an MCP server in client configs.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

// ── Path Resolution ───────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findPackageRoot(): string {
  let dir = __dirname;
  while (true) {
    if (fs.existsSync(path.join(dir, "component-manifest.json"))) {
      return dir;
    }
    const parent = path.resolve(dir, "..");
    if (parent === dir) break;
    dir = parent;
  }
  return __dirname;
}

const PACKAGE_ROOT = findPackageRoot();
const MANIFEST_PATH = path.join(PACKAGE_ROOT, "component-manifest.json");
const TEMPLATES_DIR = path.join(PACKAGE_ROOT, "templates");
const RECIPES_DIR = path.join(TEMPLATES_DIR, "recipes");

// ── Types ─────────────────────────────────────────────────────────

interface ComponentEntry {
  files: string[];
  recipes: string[];
  recipeDependencies: string[];
  componentDependencies: string[];
}

interface Manifest {
  version: string;
  solid: Record<string, ComponentEntry>;
}

// ── Manifest Loading ──────────────────────────────────────────────

function loadManifest(): Manifest | null {
  if (!fs.existsSync(MANIFEST_PATH)) return null;
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8")) as Manifest;
  } catch {
    return null;
  }
}

function readFileSafe(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

function getPackageVersion(): string {
  const candidates = [
    path.join(PACKAGE_ROOT, "package.json"),
    path.resolve(PACKAGE_ROOT, "..", "package.json"),
  ];
  for (const p of candidates) {
    try {
      return JSON.parse(fs.readFileSync(p, "utf-8")).version || "0.1.0";
    } catch {
      // continue
    }
  }
  return "0.1.0";
}

// ── Data Building ─────────────────────────────────────────────────

interface ComponentInfo {
  name: string;
  hasRecipe: boolean;
  hasWrapper: boolean;
  recipeDependencies: string[];
  componentDependencies: string[];
  templateFiles: string[];
  recipePath: string | null;
}

function buildComponentsList(): ComponentInfo[] {
  const manifest = loadManifest();
  if (!manifest) return [];

  const components: ComponentInfo[] = [];

  for (const [name, entry] of Object.entries(manifest.solid)) {
    const recipeFile = `${name}.ts`;
    const recipePath = path.join(RECIPES_DIR, recipeFile);

    components.push({
      name,
      hasRecipe: fs.existsSync(recipePath),
      hasWrapper: entry.files.length > 0,
      recipeDependencies: entry.recipeDependencies,
      componentDependencies: entry.componentDependencies,
      templateFiles: entry.files,
      recipePath: fs.existsSync(recipePath) ? recipePath : null,
    });
  }

  return components.sort((a, b) => a.name.localeCompare(b.name));
}

function getComponentByName(name: string): ComponentInfo | null {
  const components = buildComponentsList();
  return components.find((c) => c.name === name) ?? null;
}

// ── MCP Server ────────────────────────────────────────────────────

export async function createServer(): Promise<McpServer> {
  const version = getPackageVersion();
  const server = new McpServer(
    {
      name: "ark-preset",
      version,
    },
    {
      capabilities: {
        tools: {},
      },
      instructions: `# ark-preset MCP Server

Ark Preset is an opinionated UI component library built on Ark UI primitives with tailwind-variants styling for Solid.js projects.

## Key Concepts

- **Component**: A UI component (e.g., "button", "dialog", "select")
- **Recipe**: A tailwind-variants (tv()) styling definition that defines variants and slots
- **Wrapper**: A Solid.js component that wraps an Ark UI primitive with the recipe styling
- **Dependencies**: Components can depend on other components' recipes (e.g., alert-dialog depends on button)

## Workflow

1. Use \`ark_preset_list_components\` to discover available components
2. Use \`ark_preset_get_component\` to inspect a component's details
3. Use \`ark_preset_add_component\` to generate component files into your project
4. Use \`ark_preset_get_recipe\` to view the raw styling recipe source
5. Use \`ark_preset_get_component_usage\` to get JSX usage examples for a component`,
    },
  );

  // ── Tool: list_components ──────────────────────────────────────

  server.registerTool(
    "ark_preset_list_components",
    {
      description: `List all available ark-preset components with their implementation status.

Returns a complete inventory of components sorted by name, showing which have recipe stylings, Solid.js wrappers, and dependency relationships.

Use this first to discover what's available, then use ark_preset_get_component for details on a specific component.`,
      inputSchema: {
        filter: z
          .enum(["all", "done", "pending"])
          .optional()
          .default("all")
          .describe("Filter by status: all, done (recipe+wrapper), or pending"),
      },
    },
    async (args) => {
      const components = buildComponentsList();
      const filter = args.filter ?? "all";

      const filtered = components.filter((c) => {
        if (filter === "done") return c.hasRecipe && c.hasWrapper;
        if (filter === "pending") return !c.hasRecipe || !c.hasWrapper;
        return true;
      });

      const lines = filtered.map((c) => {
        const status = c.hasRecipe && c.hasWrapper ? "✅" : "⬜";
        const deps = [
          ...c.recipeDependencies.map((d) => `recipe:${d}`),
          ...c.componentDependencies.map((d) => `comp:${d}`),
        ];
        const depStr = deps.length > 0 ? ` (depends on: ${deps.join(", ")})` : "";
        return `- ${status} **${c.name}**${depStr}`;
      });

      return {
        content: [
          {
            type: "text",
            text:
              `Total: ${filtered.length}/${components.length} components` +
              (filter !== "all" ? ` (filter: ${filter})` : "") +
              "\n\n" +
              lines.join("\n"),
          },
        ],
      };
    },
  );

  // ── Tool: get_component ────────────────────────────────────────

  server.registerTool(
    "ark_preset_get_component",
    {
      description: `Get detailed information about a specific ark-preset component.

Returns the component's recipe status, Solid.js wrapper files, styling dependencies, and template file list.

Use this after ark_preset_list_components to inspect a component before generating it.`,
      inputSchema: {
        component: z
          .string()
          .describe("Component name (kebab-case, e.g., 'alert-dialog', 'date-picker')"),
      },
    },
    async (args) => {
      const name = args.component;
      const component = getComponentByName(name);

      if (!component) {
        const all = buildComponentsList();
        return {
          content: [
            {
              type: "text",
              text: `❌ Component "${name}" not found.\n\nAvailable components: ${all.map((c) => `\`${c.name}\``).join(", ")}`,
            },
          ],
          isError: true,
        };
      }

      const recipeContent = component.recipePath
        ? readFileSafe(component.recipePath)
        : null;

      const sections: string[] = [
        `# ${component.name}`,
        "",
        `**Status:** ${component.hasRecipe && component.hasWrapper ? "✅ Fully implemented" : "⬜ Incomplete"}`,
        `**Has recipe:** ${component.hasRecipe ? "✅" : "❌"}`,
        `**Has wrapper:** ${component.hasWrapper ? "✅" : "❌"}`,
        "",
        `## Dependencies`,
        `**Recipe deps:** ${component.recipeDependencies.length > 0 ? component.recipeDependencies.join(", ") : "(none)"}`,
        `**Component deps:** ${component.componentDependencies.length > 0 ? component.componentDependencies.join(", ") : "(none)"}`,
        "",
        `## Template Files`,
        component.templateFiles.length > 0
          ? component.templateFiles.map((f) => `- \`${f}\``).join("\n")
          : "(none)",
      ];

      if (recipeContent) {
        sections.push(``, `## Recipe Source`, "", "```ts", recipeContent, "```");
      }

      return {
        content: [
          {
            type: "text",
            text: sections.join("\n"),
          },
        ],
      };
    },
  );

  // ── Tool: get_component_usage ──────────────────────────────────

  server.registerTool(
    "ark_preset_get_component_usage",
    {
      description: `Get JSX usage examples for a specific ark-preset component.

Returns code examples showing how to import and use the component in Solid.js, including variants, sizes, event handlers, and common patterns.

Use this when you need to show a user how to use a component in their code.`,
      inputSchema: {
        component: z
          .string()
          .describe("Component name (kebab-case, e.g., 'button', 'alert-dialog')"),
      },
    },
    async (args) => {
      const name = args.component;
      const usageDir = path.join(TEMPLATES_DIR, "usage-examples");
      const usageFile = path.join(usageDir, `${name}.md`);
      const content = readFileSafe(usageFile);

      if (!content) {
        return {
          content: [
            {
              type: "text",
              text: `❌ Usage example not found for "${name}".\n\nAvailable components with usage examples are the same as the component list. Use ark_preset_list_components first.`,
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `# ${name} — Usage Examples\n\n${content}`,
          },
        ],
      };
    },
  );

  // ── Tool: search_components ────────────────────────────────────

  server.registerTool(
    "ark_preset_search_components",
    {
      description: `Search for components by name or keyword.

Performs case-insensitive substring matching against component names. Useful when you don't know the exact component name or want to find related components.`,
      inputSchema: {
        query: z.string().describe("Search query (case-insensitive substring match)"),
      },
    },
    async (args) => {
      const query = args.query.toLowerCase();
      const components = buildComponentsList();

      const matched = components.filter((c) => c.name.includes(query));

      if (matched.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No components match "${args.query}".\n\nAvailable components: ${components.map((c) => `\`${c.name}\``).join(", ")}`,
            },
          ],
        };
      }

      const lines = matched.map((c) => {
        const status = c.hasRecipe && c.hasWrapper ? "✅" : "⬜";
        return `- ${status} **${c.name}**${c.recipeDependencies.length > 0 ? ` (depends: ${c.recipeDependencies.join(", ")})` : ""}`;
      });

      return {
        content: [
          {
            type: "text",
            text: `Found ${matched.length} component(s) matching "${args.query}":\n\n${lines.join("\n")}`,
          },
        ],
      };
    },
  );

  // ── Tool: get_recipe ───────────────────────────────────────────

  server.registerTool(
    "ark_preset_get_recipe",
    {
      description: `Get the raw tailwind-variants recipe source for a component.

Returns the full TypeScript source of the tv() styling recipe, including all variants, slots, default variants, and compound variants.

This is useful for understanding the available style options, slot names, and variant values for a component.`,
      inputSchema: {
        component: z
          .string()
          .describe("Component name (kebab-case, e.g., 'button', 'dialog')"),
      },
    },
    async (args) => {
      const name = args.component;
      const recipeFile = path.join(RECIPES_DIR, `${name}.ts`);
      const content = readFileSafe(recipeFile);

      if (!content) {
        const all = buildComponentsList().filter((c) => c.hasRecipe);
        return {
          content: [
            {
              type: "text",
              text: `❌ Recipe not found for "${name}".\n\nAvailable recipes: ${all.map((c) => `\`${c.name}\``).join(", ")}`,
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `# ${name} Recipe\n\n\`\`\`ts\n${content}\n\`\`\``,
          },
        ],
      };
    },
  );

  // ── Tool: add_component ──────────────────────────────────────

  server.registerTool(
    "ark_preset_add_component",
    {
      description: `Generate component files into your Solid.js project.

Copies the component's Solid.js wrapper, recipe styling, and all dependency files into your project directory. This is the programmatic equivalent of running \`ark-preset add <component>\`.

The files are generated with import paths rewritten from \`@ark-preset/core\` to relative imports pointing at a local \`recipes/\` directory, making them self-contained in your project.`,
      inputSchema: {
        component: z
          .string()
          .describe("Component name to generate (kebab-case)"),
        output: z
          .string()
          .optional()
          .default("./src/components/ui")
          .describe("Output directory for generated components"),
        framework: z
          .enum(["solid"])
          .optional()
          .default("solid")
          .describe("Framework (only solid is supported)"),
      },
    },
    async (args) => {
      const componentName = args.component.toLowerCase();
      const outputDir = args.output ?? "./src/components/ui";
      const framework = args.framework ?? "solid";

      const manifest = loadManifest();
      if (!manifest) {
        return {
          content: [
            {
              type: "text",
              text: "❌ Cannot load component manifest. Make sure the CLI is built correctly.",
            },
          ],
          isError: true,
        };
      }

      const fwManifest = manifest[framework as keyof Manifest] as
        | Record<string, ComponentEntry>
        | undefined;
      if (!fwManifest) {
        return {
          content: [
            {
              type: "text",
              text: `❌ Framework "${framework}" not found in manifest. Available: solid`,
            },
          ],
          isError: true,
        };
      }

      // Narrow for closure (TypeScript can't narrow across function boundaries)
      const safeManifest = fwManifest;

      const entry = safeManifest[componentName];
      if (!entry) {
        const available = Object.keys(fwManifest).sort();
        return {
          content: [
            {
              type: "text",
              text: `❌ Component "${componentName}" not found.\n\nAvailable components: ${available.map((c) => `\`${c}\``).join(", ")}`,
            },
          ],
          isError: true,
        };
      }

      // Resolve dependencies recursively
      const visitedComponents = new Set<string>();
      const visitedRecipes = new Set<string>();
      const allFiles: string[] = [];
      const allRecipes: string[] = [];

      function resolveDeps(comp: string) {
        if (visitedComponents.has(comp)) return;
        visitedComponents.add(comp);

        const compEntry = safeManifest[comp];
        if (!compEntry) return;

        allFiles.push(...compEntry.files);
        allRecipes.push(...compEntry.recipes);

        for (const dep of compEntry.componentDependencies) {
          resolveDeps(dep);
        }
        for (const dep of compEntry.recipeDependencies) {
          if (!visitedRecipes.has(dep)) {
            visitedRecipes.add(dep);
            const depEntry = safeManifest[dep];
            if (depEntry) {
              allRecipes.push(...depEntry.recipes);
            } else {
              const recipeFile = `${dep}.ts`;
              if (fs.existsSync(path.join(RECIPES_DIR, recipeFile))) {
                allRecipes.push(recipeFile);
              }
            }
          }
        }
      }

      resolveDeps(componentName);

      const writtenFiles: string[] = [];
      const errors: string[] = [];

      const compTargetDir = path.resolve(outputDir);
      const recipeTargetDir = path.join(path.dirname(compTargetDir), "recipes");

      for (const file of [...new Set(allFiles)]) {
        const templatePath = path.join(TEMPLATES_DIR, file);
        const relativeToFramework = file.split("/").slice(1).join("/");
        const targetPath = path.join(compTargetDir, relativeToFramework);

        if (!fs.existsSync(templatePath)) {
          errors.push(`Template not found: ${file}`);
          continue;
        }

        try {
          await fs.ensureDir(path.dirname(targetPath));
          let content = fs.readFileSync(templatePath, "utf-8");
          const relPath = path.relative(
            path.dirname(targetPath),
            recipeTargetDir,
          );
          const importPath = relPath.startsWith(".") ? relPath : `./${relPath}`;
          content = content.replace(
            /from\s+['"]@ark-preset\/core['"]/g,
            `from '${importPath}'`,
          );
          fs.writeFileSync(targetPath, content, "utf-8");
          writtenFiles.push(targetPath);
        } catch (err) {
          errors.push(`Failed to copy ${file}: ${err}`);
        }
      }

      for (const recipe of [...new Set(allRecipes)]) {
        const templatePath = path.join(RECIPES_DIR, recipe);
        const targetPath = path.join(recipeTargetDir, recipe);

        if (!fs.existsSync(templatePath)) {
          errors.push(`Recipe not found: ${recipe}`);
          continue;
        }

        try {
          await fs.ensureDir(recipeTargetDir);
          fs.copyFileSync(templatePath, targetPath);
          writtenFiles.push(targetPath);
        } catch (err) {
          errors.push(`Failed to copy recipe ${recipe}: ${err}`);
        }
      }

      const themeTemplate = path.join(TEMPLATES_DIR, "theme.css");
      const themeTarget = path.join(compTargetDir, "theme.css");
      if (fs.existsSync(themeTemplate) && !fs.existsSync(themeTarget)) {
        try {
          fs.copyFileSync(themeTemplate, themeTarget);
          writtenFiles.push(themeTarget);
        } catch (err) {
          errors.push(`Failed to copy theme.css: ${err}`);
        }
      }

      const successMsg =
        writtenFiles.length > 0
          ? `✅ Generated ${writtenFiles.length} file(s) for "${componentName}":\n\n${writtenFiles.map((f) => `- \`${f}\``).join("\n")}`
          : "⚠ No files were generated.";

      const errorMsg =
        errors.length > 0
          ? `\n\n⚠ Warnings/errors:\n${errors.map((e) => `- ${e}`).join("\n")}`
          : "";

      return {
        content: [
          {
            type: "text",
            text: `${successMsg}${errorMsg}`,
          },
        ],
      };
    },
  );

  // ── Tool: get_dependency_graph ────────────────────────────────

  server.registerTool(
    "ark_preset_get_dependency_graph",
    {
      description: `Get the full dependency graph of the ark-preset component ecosystem.

Returns the dependency relationships between all components, including both recipe dependencies (styling imports) and component dependencies (Solid.js imports).

Useful for understanding which components need to be generated together and what order to install them in.`,
      inputSchema: {
        component: z
          .string()
          .optional()
          .describe("Optional: focus on a specific component's dependencies"),
      },
    },
    async (args) => {
      const manifest = loadManifest();
      if (!manifest) {
        return {
          content: [{ type: "text", text: "❌ Cannot load manifest." }],
          isError: true,
        };
      }

      const focus = args.component;
      const components = manifest.solid;

      if (focus) {
        const entry = components[focus];
        if (!entry) {
          return {
            content: [
              {
                type: "text",
                text: `❌ Component "${focus}" not found.`,
              },
            ],
            isError: true,
          };
        }

        // Find reverse dependents
        const dependents = Object.entries(components)
          .filter(
            ([name, e]) =>
              name !== focus &&
              (e.recipeDependencies.includes(focus) ||
                e.componentDependencies.includes(focus)),
          )
          .map(([name]) => `  \`${name}\` → \`${focus}\``);

        const lines = [
          `# Dependency Graph: ${focus}\n`,
          `## Recipe Dependencies (styling)`,
          ...(entry.recipeDependencies.length > 0
            ? entry.recipeDependencies.map((d) => `  \`${focus}\` → \`${d}\` (recipe)`)
            : ["  (none)"]),
          "",
          `## Component Dependencies (Solid.js)`,
          ...(entry.componentDependencies.length > 0
            ? entry.componentDependencies.map((d) => `  \`${focus}\` → \`${d}\` (component)`)
            : ["  (none)"]),
          "",
          `## Reverse Dependents`,
          ...(dependents.length > 0 ? dependents : ["  (none)"]),
        ];

        return {
          content: [{ type: "text", text: lines.join("\n") }],
        };
      }

      // Full graph
      const lines = ["# Full Dependency Graph\n"];
      for (const [name, entry] of Object.entries(components)) {
        const deps = [
          ...entry.recipeDependencies.map((d) => `recipe:${d}`),
          ...entry.componentDependencies.map((d) => `comp:${d}`),
        ];
        if (deps.length > 0) {
          lines.push(`- \`${name}\` → ${deps.join(", ")}`);
        } else {
          lines.push(`- \`${name}\` (no dependencies)`);
        }
      }

      return {
        content: [{ type: "text", text: lines.join("\n") }],
      };
    },
  );

  // ── Tool: get_manifest ────────────────────────────────────────

  server.registerTool(
    "ark_preset_get_manifest",
    {
      description: `Get raw manifest data for all components.

Returns the complete component-manifest.json as structured data, showing every component with its template files, recipes, and dependency relationships.`,
      inputSchema: {
        format: z
          .enum(["json", "text"])
          .optional()
          .default("json")
          .describe("Output format: json (full JSON) or text (summary)"),
      },
    },
    async (args) => {
      const manifest = loadManifest();
      if (!manifest) {
        return {
          content: [{ type: "text", text: "❌ Cannot load manifest." }],
          isError: true,
        };
      }

      const format = args.format ?? "json";

      if (format === "json") {
        return {
          content: [
            {
              type: "text",
              text: `\`\`\`json\n${JSON.stringify(manifest, null, 2)}\n\`\`\``,
            },
          ],
        };
      }

      const components = Object.keys(manifest.solid);
      const totalFiles = components.reduce(
        (acc, c) => acc + manifest.solid[c].files.length,
        0,
      );
      const totalRecipes = components.reduce(
        (acc, c) => acc + manifest.solid[c].recipes.length,
        0,
      );

      return {
        content: [
          {
            type: "text",
            text:
              [
                `# Manifest Summary`,
                `**Version:** ${manifest.version}`,
                `**Components:** ${components.length}`,
                `**Template files:** ${totalFiles}`,
                `**Recipes:** ${totalRecipes}`,
                ``,
                `**Components:**`,
                ...components.map((c) => {
                  const e = manifest.solid[c];
                  return `- \`${c}\` (${e.files.length} files, ${e.recipes.length} recipes)`;
                }),
              ].join("\n"),
          },
        ],
      };
    },
  );

  return server;
}

// ── Main Entry Point ─────────────────────────────────────────────

export async function runServer(): Promise<void> {
  const server = await createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

// Allow direct invocation (dev convenience when running server.ts directly)
const scriptFile = process.argv[1] ?? "";
const isMain = scriptFile.endsWith("server.ts") || scriptFile.endsWith("server.js");
if (isMain) {
  runServer().catch((err) => {
    console.error("MCP server error:", err);
    process.exit(1);
  });
}
