import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          100: "#F8F4F0",
          500: "#98908B",
        },
        grey: {
          100: "#F2F2F2",
          300: "#B3B3B3",
          500: "#696868",
          900: "#201F24",
        },
        green: "#277C78",
        turquoise: "#597C7C",
        armyGreen: "#7F9161",
        yellow: "#F2CDAC",
        gold: "#CAB361",
        orange: "#BE6C49",
        red: "#C94736",
        magenta: "#934F6F",
        cyan: "#82C9D7",
        blue: "#3F82B2",
        navy: "#626070",
        navyGray: "#97A0AC",
        purpleDark: "#826CB0",
        purpleLight: "#AF81BA",
        brown: "#93674F",
      },
    },
  },
  plugins: [],
};
export default config;
