/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        tall_sm: { raw: '(min-height: 640px)' },
        tall_md: { raw: '(min-height: 768px)' },
        tall_lg: { raw: '(min-height: 1024px)' },
        tall_xl: { raw: '(min-height: 1456px)' }
      },
      aspectRatio: {
        rect: '21 / 9'
      },
      fontFamily: {
        PlusJakartaSans: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        turkishRose: '#997973',
        OuterSpace: '#444853'
      }
    }
  },
  plugins: []
};
