/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,css}", // Added css in case Tailwind classes are used in CSS files too
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
