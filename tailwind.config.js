/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        git: {
          50: '#fff5f2',
          100: '#ffe8e1',
          200: '#ffd3c4',
          300: '#ffb29a',
          400: '#ff8262',
          500: '#f05032', // Canonical Git orange-red
          600: '#dc381a',
          700: '#b82a12',
          800: '#942412',
          900: '#7a2214',
          950: '#420d06',
        },
        surface: {
          light: '#fbfbfa',
          dark: '#0d1117',
          cardLight: '#ffffff',
          cardDark: '#161b22',
          borderLight: '#e1e4e8',
          borderDark: '#30363d',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-git': '0 0 25px -5px rgba(240, 80, 50, 0.25)',
      }
    },
  },
  plugins: [],
}

