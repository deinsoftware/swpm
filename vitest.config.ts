import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    reporters: ["verbose"],
    coverage: {
      all: true,
      reporter: ["text", "html", "lcov"],
      statements: 20,
      branches: 43,
      functions: 24,
      lines: 20,
    },
  },
});
