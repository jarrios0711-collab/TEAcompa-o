import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff8ff",
          100: "#dbeffd",
          200: "#bfe3fc",
          300: "#93d2fa",
          400: "#60b8f5",
          500: "#3a9ef0",
          600: "#2482e5",
          700: "#1d6dd3",
          800: "#1d58ab",
          900: "#1d4c87",
          950: "#153052",
        },
        aqua: {
          50: "#f0fdfa",
          100: "#ccfbef",
          200: "#99f6df",
          300: "#5eebcc",
          400: "#2dd4b3",
          500: "#14b89b",
          600: "#0d947f",
          700: "#0f7668",
          800: "#115e54",
          900: "#134e46",
          950: "#042f2c",
        },
        warm: {
          50: "#fdf8f0",
          100: "#f9eddb",
          200: "#f2d8b5",
          300: "#e9be86",
          400: "#dfa055",
          500: "#d78837",
          600: "#c9722c",
          700: "#a75a26",
          800: "#864926",
          900: "#6d3e22",
          950: "#3a1f10",
        },
      },
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
        display: ["Nunito", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
