/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          '533619': '#533619',
        },
      },
    },
  },
  plugins: [],
}