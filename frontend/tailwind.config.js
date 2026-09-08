/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a4731',
          light: '#2d6a4f',
        },
        secondary: '#40916c',
        accent: '#c9a227',
        forest: '#1a4731',
        gold: '#c9a227',
        warmWhite: '#faf8f5',
        charcoal: '#1a1a2e',
        surface: '#ffffff',
        muted: '#6b7280',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
