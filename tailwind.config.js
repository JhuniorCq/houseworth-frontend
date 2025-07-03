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
        ["ghost-white"]: "#F9FAFB",
        ["steel-gray"]: "#4b4f56",
      },
      fontFamily: {},
    },
  },
  plugins: [],
};
