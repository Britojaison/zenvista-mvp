/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fefce8',
          100: '#fef3c7',
          500: '#d8ad28',
          600: '#b8941f',
          700: '#9a7b1a',
        },
      },
    },
  },
  plugins: [],
}
