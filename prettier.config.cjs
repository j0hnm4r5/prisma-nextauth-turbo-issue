/** @type {import("prettier").Config} */
module.exports = {
	trailingComma: "es5",
	semi: true,
	tabWidth: 2,
	useTabs: true,
	singleQuote: false,
	printWidth: 120,

	plugins: [require.resolve("prettier-plugin-tailwindcss")], // https://github.com/tailwindlabs/prettier-plugin-tailwindcss
};
