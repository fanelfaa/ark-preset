import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import { rehypeCustomCodeBlock } from './src/plugins/rehype-custom-code-block.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), mdx()],
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    rehypePlugins: [rehypeCustomCodeBlock],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      }
    }
  }
});
