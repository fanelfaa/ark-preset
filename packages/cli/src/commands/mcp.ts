/**
 * mcp command for ark-preset CLI.
 *
 * Starts the ark-preset MCP server on stdio transport.
 * AI agents can connect to this server to discover components,
 * inspect recipes, add components to projects, and more.
 *
 * Usage:
 *   ark-preset mcp                    # Start MCP server (stdio)
 *   ark-preset mcp --transport http   # Start MCP server (HTTP)  [future]
 */

import { runServer } from "../mcp/server.js";

interface McpOptions {
  transport?: string;
}

export async function mcpCommand(options: McpOptions): Promise<void> {
  const transport = options.transport || "stdio";

  if (transport !== "stdio") {
    console.error(`❌ Unsupported transport: "${transport}". Only "stdio" is supported.`);
    process.exit(1);
  }

  await runServer();
}
