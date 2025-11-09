import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(210, 50%, 96%)",
        surface: "hsl(0, 0%, 100%)",
        border: "hsl(210, 16%, 82%)",
        text: "hsl(210, 15%, 20%)"
      }
    }
  },
  plugins: []
};

export default config;
