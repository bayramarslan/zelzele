/** @type {import("tailwindcss").Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class", // or 'media' or 'class'
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        // eslint-disable-next-line quotes
        sans: ['"Iosevka Web"', ...defaultTheme.fontFamily.sans]
      },
      keyframes: {
        "list-in": {
          "0%": { transform: "translateY(-24px)" },
          "100%": { transform: "translateY(0)" }
        }
      },
      animation: {
        // Yalnızca dikey kaydırma; opaklık sabit olduğu için gradient genişlemez.
        "list-in": "list-in 1.6s cubic-bezier(0.22, 1, 0.36, 1) both"
      }
    }
  }
};
