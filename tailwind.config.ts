import type { Config } from "tailwindcss";
// L'IMPORT MODERNE (Adieu le require!)
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "rgb(var(--color-void) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
        terra: "rgb(var(--color-terra) / <alpha-value>)",
        tech: "rgb(var(--color-tech) / <alpha-value>)",
        spirit: "rgb(var(--color-spirit) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"],
        serif: ["var(--font-cinzel)", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "vodun-pattern": "url('/images/pattern-scarification.png')",
      },
    },
  },
  // UTILISATION DU PLUGIN IMPORTÉ :
  plugins: [typography],
};

export default config;
