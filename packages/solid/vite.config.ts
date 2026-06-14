import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { resolve } from "path";

export default defineConfig({
  plugins: [solid()],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["solid-js", "@ark-ui/solid", "tailwind-variants", "@fan-ui/core", /^solid-js\/.*/],
    },
    sourcemap: true,
  },
});
