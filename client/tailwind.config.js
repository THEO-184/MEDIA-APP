/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					light: "#5c67a3",
					main: "#3f4771",
					dark: "'#2e355b",
					contrastText: "#fff",
					openTitle: "'#3f4771",
				},
				secondary: {
					light: "#ff79b0",
					main: "#ff4081",
					dark: "#c60055",
					contrastText: "#000",
				},
			},
		},
	},
	plugins: [],
};
