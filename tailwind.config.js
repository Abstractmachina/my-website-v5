/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        'mytheme-primary-400': '#8b5cf6',
        'mytheme-secondary-400': '#7c3aed',
        'expense-green': '#22c55e',
      }
    },
  },
  darkMode: 'selector',
  plugins: [],
}

