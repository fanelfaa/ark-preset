import { defineConfig } from "vitest/config";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  test: {
    environment: "happy-dom",
    setupFiles: ["./test/setup.ts"],
    include: ["./test/**/*.test.{ts,tsx}"],
    globals: true,
  },
});
