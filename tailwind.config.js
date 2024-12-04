/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-main': '#4E2096',
        'orange-main': '#F57F45',
      }
    },
  },
  plugins: [],
}