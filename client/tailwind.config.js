/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        amber: {
          50: '#fdf8f0',
          100: '#f8edda',
          200: '#f0d9b0',
          300: '#e4be7c',
          400: '#d6a04a',
          500: '#c8893a',
          600: '#a06820',
          700: '#7a4e18',
          800: '#5c3a12',
          900: '#3d250c',
        },
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
