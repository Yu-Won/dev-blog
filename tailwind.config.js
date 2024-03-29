/** @type {import('tailwindcss').Config} */

module.exports = {
	darkMode: "class",
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			sans: ["Roboto", "sans-serif"],
		},
		extend: {
			screens: {
				mobile: "320px",
				tablet: "768px",
				laptop: "1024px",
				desktop: "1440px",
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						"code::before": {
							content: '""',
						},
						"code::after": {
							content: '""',
						},
						code: {
							backgroundColor: theme("colors.zinc.200/50"),
							paddingTop: "0.125rem",
							paddingBottom: "0.125rem",
							borderRadius: "0.25rem",
							color: theme("colors.violet.500/50"),
						},
					},
				},
			}),
			keyframes: {
				"footer-up": {
					"0%": {
						opacity: "0",
						transform: "translateY(60px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
				"arrow-left": {
					"0%": {
						transform: "translateX(8px)",
					},
					"100%": {
						transform: "translateX(0)",
					},
				},
				"arrow-right": {
					"0%": {
						transform: "translateX(-8px)",
					},
					"100%": {
						transform: "translateX(0)",
					},
				},
			},
			animation: {
				"footer-up": "footer-up 0.2s ease-in",
				"arrow-left": "arrow-left 1s infinite",
				"arrow-right": "arrow-right 1s infinite",
			},
		},
	},
	variants: {
		extend: {
			typography: ["dark"],
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
