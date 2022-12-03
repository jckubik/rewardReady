/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "oxford-blue": "#01163b",
        "light-gray": "#cdcdcd",
        "brunswick-green": "#214e34",
        "steel-blue": "#3581b8",
        "steel-blue-700": "#2d75a8",
        honeydew: "#dff8eb",
        "shamrock-green": "#21975a",
        amazon: "#36b156",
      },
      fontFamily: {
        inter: ["Inter"],
        "carter-one": ["Carter One"],
      },
      listStyleType: {
        square: "square",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
