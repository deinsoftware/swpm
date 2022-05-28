import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    reporters: ["verbose"],
    coverage: {
      all: true,
      reporter: ["text", "html", "lcov"],
      statements: 25,
      branches: 48,
      functions: 19,
      lines: 25,
    },
  },
});
