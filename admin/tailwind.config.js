/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-sage': '#1A2E25',
        'sage-medium': '#3D5A4C',
        'cream': '#FAF8F4',
        'warm-white': '#FFFFFF',
        'soft-gold': '#C5B78F',
        'bronze': '#9B8B6C',
      }
    },
  },
  plugins: [],
}
