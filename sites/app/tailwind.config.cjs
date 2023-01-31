/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"Jura",
					"ui-sans-serif",
					"system-ui",
					"-apple-system",
					"BlinkMacSystemFont",
					"Segoe UI",
					"Roboto",
					"Helvetica Neue",
					"Arial",
					"Noto Sans",
					"sans-serif",
					"Apple Color Emoji",
					"Segoe UI Emoji",
					"Segoe UI Symbol",
					"Noto Color Emoji",
				],
				mono: [
					"Martian Mono",
					"ui-monospace",
					"SFMono-Regular",
					"Menlo",
					"Monaco",
					"Consolas",
					"Liberation Mono",
					"Courier New",
					"monospace",
				],
			},
			keyframes: {
				marquee: {
					"0%": { transform: "translateX(0%)" },
					"100%": { transform: "translateX(-100%)" },
				},
			},
			animation: {
				marquee: "marquee 10s linear infinite",
			},
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			black: "#0c0c0c",
			white: "#cdfeff",
			sunrise: "#ffffbd",
			ice: "#b9fffe",
			sky: "#71c4e3",
			powder: "#4ca4c2",
			stone: "#323c43",
			emerald: "#131f21",
			jungle: "#0e1414",
			pumpkin: "#ff3e2c",
			laser: "#0ff90e",
			cherry: "#611616",
		},
	},
	plugins: [
		require("@tailwindcss/typography"), // https://tailwindcss.com/docs/typography-plugin
		require("@tailwindcss/forms"), // https://github.com/tailwindlabs/tailwindcss-forms
		require("tailwindcss-debug-screens"), // https://github.com/jorenvanhee/tailwindcss-debug-screens
		require("tailwind-scrollbar"), //https://github.com/adoxography/tailwind-scrollbar
		// children
		function ({ addVariant }) {
			addVariant("child", "& > *");
			addVariant("child-hover", "& > *:hover");
		},
		// add all colors as variables in :root
		function ({ addBase, theme }) {
			function extractColorVars(colorObj, colorGroup = "") {
				return Object.keys(colorObj).reduce((vars, colorKey) => {
					const value = colorObj[colorKey];

					const newVars =
						typeof value === "string"
							? { [`--color${colorGroup}-${colorKey}`]: value }
							: extractColorVars(value, `-${colorKey}`);

					return { ...vars, ...newVars };
				}, {});
			}

			addBase({
				":root": extractColorVars(theme("colors")),
			});
		},
	],
};
