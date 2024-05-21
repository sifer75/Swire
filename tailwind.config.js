/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heebo: ["Heebo", "sans-serif"],
      },
      colors: {
        colorTitle: "#A8A8A8",
        colorText: "#6F6F6F",
        LightGray: "#BFBFBF",
        shadow: "rgba(0, 0, 0, 0.25)",
        pink: "#FF48A2",
        purple: "#A100FF",
        gradientGreen: "rgba(0, 255, 178, 0.73) 2.5%",
        gradientGreen2: "#2DC37B",
        gradientGreen3: "#61B469",
        gradientPink: "#E2D1FF",
        gradientPink2: "#FB8CC2",
        gradientDetail: "rgba(161, 0, 255, 0.25) 100%",
        gradientDetail2: "rgba(255, 255, 255, 0.13) 100%",
      },
    },
  },
  plugins: [],
};
