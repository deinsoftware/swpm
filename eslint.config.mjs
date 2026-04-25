import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  {
    // Ignorar carpetas de salida y dependencias
    ignores: ["**/build/**", "**/coverage/**", "**/bin/**", "**/dist/**", "**/node_modules/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      // Definimos manualmente el estilo "Standard" que te gusta:
      "semi": ["error", "never"],            // Sin puntos y coma
      "quotes": ["error", "single"],         // Comillas simples
      "indent": ["error", 2],                // 2 espacios
      "comma-dangle": ["error", "never"],    // Sin coma final
      "object-curly-spacing": ["error", "always"],

      // Reglas de TypeScript para swpm
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  }
);