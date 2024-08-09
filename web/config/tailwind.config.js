/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
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
      },
      animation: {
        'move-left': 'move-left 2s ease-in-out forwards',
        'move-right': 'move-right 2s ease-in-out forwards',
        'bounce-horizontal': 'bounce-horizontal 1s infinite',
        'bounce-horizontal-reverse': 'bounce-horizontal-reverse 1s infinite',
      },
    },
  },
  plugins: [],
}
