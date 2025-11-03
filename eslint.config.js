// @ts-check

import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default defineConfig(
	{ ignores: ["dist"] },
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			parserOptions: {
				projectService: true,
			},
		},
		extends: [
			js.configs.recommended,
			tseslint.configs.recommendedTypeChecked,
			tseslint.configs.stylisticTypeChecked,
			reactPlugin.configs.flat.recommended,
			reactHooks.configs.flat.recommended,
		],
		rules: {
			"no-bitwise": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ ignoreRestSiblings: true },
			],
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
);
