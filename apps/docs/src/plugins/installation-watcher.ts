import { resolve } from "node:path";
import { type Plugin } from "vite";
import { generateInstallationContent, DOCS_DIR, discoverComponents } from "../shared/generate-content";
import { writeFileSync, existsSync, mkdirSync } from "node:fs";

export function installationWatcherPlugin(): Plugin {
  return {
    name: "vite-plugin-installation-watcher",
    
    // Auto-generate for all components on start (dev and build)
    buildStart() {
      const components = discoverComponents();
      for (const component of components) {
        const content = generateInstallationContent(component);
        if (content) {
          const compDir = resolve(DOCS_DIR, component);
          if (!existsSync(compDir)) mkdirSync(compDir, { recursive: true });
          const outPath = resolve(compDir, 'installation.mdx');
          writeFileSync(outPath, content, "utf-8");
          // Write to implement.mdx as well if user strictly asked for it
          const implementPath = resolve(compDir, 'implement.mdx');
          writeFileSync(implementPath, content, "utf-8");
        }
      }
      console.log(`[installation-watcher] Generated docs for ${components.length} components`);
    },
    
    // Watch for changes in core recipes and solid components
    handleHotUpdate({ file, server }) {
      if (!file.includes('packages/core/src/recipes') && !file.includes('packages/solid/src')) {
        return;
      }
      
      // Extract component name
      let componentName = "";
      if (file.includes('packages/core/src/recipes/')) {
        const match = file.match(/packages\/core\/src\/recipes\/([^.]+)\.ts/);
        if (match) componentName = match[1];
      } else if (file.includes('packages/solid/src/')) {
        const match = file.match(/packages\/solid\/src\/([^/]+)/);
        if (match) {
            componentName = match[1];
            if (componentName.endsWith('.tsx')) {
                componentName = componentName.replace('.tsx', '');
            }
        }
      }
      
      if (!componentName) return;
      
      const content = generateInstallationContent(componentName);
      if (content) {
        const compDir = resolve(DOCS_DIR, componentName);
        if (!existsSync(compDir)) mkdirSync(compDir, { recursive: true });
        
        const outPath = resolve(compDir, 'installation.mdx');
        writeFileSync(outPath, content, "utf-8");
        
        const implementPath = resolve(compDir, 'implement.mdx');
        writeFileSync(implementPath, content, "utf-8");
        
        server.ws.send({
            type: 'full-reload',
            path: '*'
        });
        console.log(`[installation-watcher] Regenerated docs for ${componentName}`);
      }
    }
  };
}
