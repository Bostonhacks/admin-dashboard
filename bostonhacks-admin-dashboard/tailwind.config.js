/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

// example of a tailwind.config.js file
// module.exports = {
//   content: ["./src/**/*.{js,jsx}"],
//   mode: "jit",
//   theme: {
//     extend: {
//       colors: {
//         primary: "#050816",
//         secondary: "#aaa6c3",
//         tertiary: "#151030",
//         "black-100": "#100d25",
//         "black-200": "#090325",
//         "white-100": "#f3f3f3",
//       },
//       boxShadow: {
//         card: "0px 35px 120px -15px #211e35",
//       },
//       screens: {
//         xs: "450px",
//       },
//       backgroundImage: {
//         "hero-pattern": "url('/src/assets/starysky.png')",
//       },
//     },
//   },
//   plugins: [],
// };