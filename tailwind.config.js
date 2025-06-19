/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        earth: "#bd9c77",
        ["earth-light"]: "#f5f0e6",
        ["earth-strong"]: "#8f775b",
        ["earth-very-strong"]: "#6b5a46",
      },
      fontFamily: {},
    },
  },
  plugins: [],
};
