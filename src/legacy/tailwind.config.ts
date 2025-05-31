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
        "ocean-blue": {
          DEFAULT: "#0A64BC",
          "600": "#0A64BC", // Assuming 600 is the default or a common shade
          "700": "#08509A", // Darker shade for text or accents
        },
        "teal": {
          DEFAULT: "#05B2DC",
          "500": "#05B2DC",
        },
        "coral": {
          DEFAULT: "#FF585D",
          "500": "#FF585D",
          "600": "#E64F54", // Darker shade for hover
        },
        "sand": {
          DEFAULT: "#F9F5E3",
          "100": "#F9F5E3", 
        },
        "slate": {
          DEFAULT: "#2A3B47",
          "600": "#3E5669", // Lighter shade for text
          "700": "#2A3B47",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        headings: ["Montserrat", "sans-serif"],
        accent: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;

