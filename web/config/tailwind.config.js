/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'movie-title': ['Spicy Rice', 'sans-serif'],

        'movie-subtitle': ['Mulish', 'sans-serif'],
        'movie-body': ['Roboto', 'sans-serif'],
      },
      keyframes: {
        'move-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'move-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(50%)' },
        },
        'bounce-horizontal': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(25%)' },
        },
        'bounce-horizontal-reverse': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-25%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'wiggle-reverse': {
          '0%, 100%': { transform: 'rotate(3deg)' },
          '50%': { transform: 'rotate(-3deg)' },
        },
      },
      animation: {
        'move-left': 'move-left 2s ease-in-out forwards',
        'move-right': 'move-right 2s ease-in-out forwards',
        'bounce-horizontal': 'bounce-horizontal 1s infinite',
        'bounce-horizontal-reverse': 'bounce-horizontal-reverse 1s infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
        'wiggle-reverse': 'wiggle-reverse 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
