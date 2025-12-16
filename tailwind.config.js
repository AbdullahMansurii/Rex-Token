/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a', // Deep charcoal/black
        surface: '#121212', // Slightly lighter for cards
        primary: {
          DEFAULT: '#b026ff', // Neon Purple
          glow: '#d980ff',
        },
        secondary: '#1f1f1f',
        accent: '#00ffcc', // Just in case we need a secondary accent
        text: '#e0e0e0',
        muted: '#858585'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Assuming we might add Inter later, or use system default
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      boxShadow: {
        'glow': '0 0 15px rgba(176, 38, 255, 0.5)',
        'glow-sm': '0 0 8px rgba(176, 38, 255, 0.3)',
      },
    },
  },
  plugins: [],
}
