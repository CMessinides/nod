module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
		"jest/globals": true
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended"
	],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2018,
		sourceType: "module"
	},
	plugins: ["@typescript-eslint", "react", "jest"],
	rules: {
		"react/prop-types": "off",
		"@typescript-eslint/indent": ["error", "tab"]
	}
};
