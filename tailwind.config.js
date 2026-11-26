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
        "skeleton-in": {
          "0%": { opacity: "0", transform: "translateY(-24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        // Yumuşak, yavaş bir yukarıdan aşağıya giriş.
        "skeleton-in": "skeleton-in 1.6s cubic-bezier(0.22, 1, 0.36, 1) both"
      }
    }
  }
};
