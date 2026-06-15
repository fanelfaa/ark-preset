// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

import solidJs from "@astrojs/solid-js";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), solidJs()],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@fan-ui/solid", "@fan-ui/core"],
    },
  },
});
