import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "/landing-zara/",

  build: {
    outDir: "dist",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.ts"],
  },
});
