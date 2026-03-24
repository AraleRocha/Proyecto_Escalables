/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary":      "#518162",
        "sage-light":   "#eef3f0",
        "sage-dark":    "#5e7164",
        "beige":        "#f5f2ed",
        "crema":        "#faf9f6",
        "natural-text": "#2d332f",
        "accent-red":   "#d98e8e",
        "accent-blue":  "#8eb0d9",
      },
      fontFamily: {
        sans:    ["Manrope", "sans-serif"],
        display: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

