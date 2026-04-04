/** @type {import('tailwindcss').Config} */
export default {
  
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-bg': '#0B0F19',
        'game-card': '#151B28',
      },
    },
  },
  plugins: [],
}

