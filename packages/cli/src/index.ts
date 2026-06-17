#!/usr/bin/env node
import { Command } from "commander";

const program = new Command()
  .name("ark-preset")
  .description("Add UI components to your Solid.js project")
  .version("0.1.0");

program
  .command("add")
  .argument("<component>", "Component name to add")
  .option("-o, --output <path>", "Output directory", "./src/components/ui")
  .option("-f, --framework <type>", "Framework type (solid|react)", "solid")
  .action(async (component, options) => {
    const { addComponent } = await import("./commands/add.js");
    await addComponent(component, options.output, options.framework);
  });

program.parse();
