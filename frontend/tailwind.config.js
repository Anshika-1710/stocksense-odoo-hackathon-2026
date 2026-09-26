/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1C2321",
        slate: "#3E4A45",
        moss: "#4B6357",
        sage: "#EDEFEA",
        signal: "#D9A404",
      },
    },
  },
  plugins: [],
};
