/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: "#2857ab",
        error: '#C23321',
        success: '#0C8E36'
      },
    },
  },
  plugins: [],
};
