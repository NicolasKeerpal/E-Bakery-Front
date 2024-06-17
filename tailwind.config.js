/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          'primary_color': '#221303',
          'secondary_color':'#533619',
          'hover_effect': '#EB9063',
          'text_page_not_found':'#7D4B19',
          'border_color': '#714A23',
          'bk_color_card': '#82572D',
          'bk_border_card': '#B67A3D',
        },
      },
    },
  },
  plugins: [],
}