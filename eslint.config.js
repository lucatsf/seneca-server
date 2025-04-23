import tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";

export default [
  {
    files: ["src/**/*.ts"], // Arquivos que serão lintados
    languageOptions: {
      parser: tsParser, // Usa o parser do TypeScript
      globals: {
        ...globals.node, // Define variáveis globais do Node.js
      },
    },
    plugins: {
      "@typescript-eslint": tsEslint, // Plugin do TypeScript
      prettier: prettierPlugin, // Plugin do Prettier
    },
    rules: {
      // Regras personalizadas
      "@typescript-eslint/explicit-module-boundary-types": "off", // Desativa a necessidade de tipagem explícita em funções
      "prettier/prettier": "error", // Mostra erros do Prettier como erros do ESLint
    },
  },
  prettierConfig, // Adiciona a configuração do Prettier
];
