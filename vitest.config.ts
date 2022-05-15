import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    reporters: ["verbose"],
    coverage: {
      all: true,
      reporter: ["text", "html", "lcov"],
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
});
