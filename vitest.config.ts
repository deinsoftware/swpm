import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    reporters: ["verbose"],
    coverage: {
      all: true,
      reporter: ["text", "html", "lcov"],
      statements: 22,
      branches: 57,
      functions: 36,
      lines: 22,
    },
  },
});
