/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "768px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

//https://tailwindcss.com/docs/theme
