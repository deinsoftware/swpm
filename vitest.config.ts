import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    reporters: ["verbose"],
    coverage: {
      all: true,
      reporter: ["text", "html", "lcov"],
      statements: 8,
      branches: 38,
      functions: 21,
      lines: 8,
    },
  },
});
