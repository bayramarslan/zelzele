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
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      },
      animation: {
        // Yumuşak bir görünüm; kaydırma yok, yalnızca opaklık geçişi.
        "fade-in": "fade-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) both"
      }
    }
  }
};
