/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        mobile: "320px",
        tablet: "768px",
        laptop: "1024px",
        desktop: "1440px"
      }
    }
  },
  plugins: [],
}
