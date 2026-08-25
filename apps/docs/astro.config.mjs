import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import { rehypeCustomCodeBlock } from "./src/plugins/rehype-custom-code-block.mjs";
import { unified } from "@astrojs/markdown-remark";

import { demoCodePlugin } from "./src/plugins/demo-code.ts";

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), mdx()],
  vite: {
    plugins: [tailwindcss(), demoCodePlugin()],
  },
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeCustomCodeBlock],
    }),
    shikiConfig: {
      theme: "github-dark",
    },
  },
});
