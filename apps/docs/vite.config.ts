import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import tailwindcss from "@tailwindcss/vite";

import { tanstackRouter } from "@tanstack/router-plugin/vite";

import solidPlugin from "vite-plugin-solid";
import solidMarkedPlugin from "vite-plugin-solid-marked";
import { installationWatcher } from "./src/plugins/installation-watcher";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  optimizeDeps: {
    exclude: ["@fan-ui/solid", "@fan-ui/core"],
  },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackRouter({ target: "solid", autoCodeSplitting: true }),
    solidMarkedPlugin({
      source: "/src/mdx-provider",
    }),
    installationWatcher(),
    solidPlugin(),
  ],
});
