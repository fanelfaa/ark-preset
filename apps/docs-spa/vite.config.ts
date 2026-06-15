import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import tailwindcss from "@tailwindcss/vite";

import { tanstackRouter } from "@tanstack/router-plugin/vite";

import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  optimizeDeps: {
    exclude: ["@fan-ui/solid", "@fan-ui/core"],
  },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackRouter({ target: "solid", autoCodeSplitting: true }),
    solidPlugin(),
  ],
});
