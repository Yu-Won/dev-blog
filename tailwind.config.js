/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  purge: {
    enabled: true,
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    options: {
      safelist: ["dark"],
    },
  },
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"]
    },
    extend: {
      screens: {
        mobile: "320px",
        tablet: "768px",
        laptop: "1024px",
        desktop: "1440px"
      },
      typography: (theme) => ({
        dark: {
          css: {
            color: theme('colors.gray.300'),
            h1: {
              color: theme('colors.gray.100'),
            },
            h2: {
              color: theme('colors.gray.100'),
            },
          },
        }
      }),
    }
  },
  variants: {
    extend: {
      typography: ['dark'],
    }
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
}
