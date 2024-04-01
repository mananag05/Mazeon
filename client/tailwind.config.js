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
      rotate: {
        '160': '155deg',
      }
    },
    colors : {
      logtheme : '#4c7e9a',
      logthemstext : '#ce9c53',
      body : '#3b6278',
      lighttext : '#d7af74',
      hovers : '#46738d',
      white : '#eef3f7',
      green : '#b3ffb3',
      red : '#ffb3b3',
      bred : "#ff8080",
      opacity : "#00000066"
    }
  },
  plugins: [],
};
