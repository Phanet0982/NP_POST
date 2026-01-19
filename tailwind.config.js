/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class", // This must be present
  theme: {
    extend: {
      fontFamily: {
        khmer: ["Battambang", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
