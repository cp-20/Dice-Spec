const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      ...defaultTheme.fontFamily,
      ZenKaku: ['Zen Kaku Gothic Antique', 'sans-serif'],
    },
    extend: {
      screens: {
        xs: '480px',
        sm: '576px',
        md: '720px',
        lg: '1080px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
