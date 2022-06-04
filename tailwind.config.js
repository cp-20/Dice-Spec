const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      ...defaultTheme.colors,
      transparent: 'transparent',
      current: 'currentColor',
    },
    fontFamily: {
      ...defaultTheme.fontFamily,
      ZenKaku: ['Zen Kaku Gothic Antique', 'sans-serif'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
