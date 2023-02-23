/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        sm: `0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);`
      },
      fontFamily: {
        'Roboto': ['Roboto', 'sans-serif']
      },
      textColor: {
        'black-soft': 'rgba(0, 0, 0, 0.87)',
      },
      backgroundColor: {
        neutral: {
          1000: 'rgb(18, 18, 18)'
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        appearY: {
          '0%': { transform: 'translateY(-1rem)' },
          '100%': { transform: 'translateY(0)' },
        },
        hideY: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(1rem)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s linear',
        fadeOut: 'fadeOut 0.5s linear',
        appearY: 'appearY 0.5s',
        hideY: 'hideY 0.5s',
      }
    },
  },
  plugins: [],
};
