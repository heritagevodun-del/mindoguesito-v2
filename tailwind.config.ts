import type { Config } from "tailwindcss";

const config: Config = {
  // Indique à Tailwind où chercher les classes pour ne pas générer de CSS inutile
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. NOS COULEURS "VODUN SOUL" (Connectées à globals.css)
      colors: {
        void: "rgb(var(--color-void) / <alpha-value>)", // Noir Abysse
        gold: "rgb(var(--color-gold) / <alpha-value>)", // Or Antique
        terra: "rgb(var(--color-terra) / <alpha-value>)", // Terre/Sang
        tech: "rgb(var(--color-tech) / <alpha-value>)", // Cyan IA
        spirit: "rgb(var(--color-spirit) / <alpha-value>)", // Violet Mystique
        surface: "rgb(var(--color-surface) / <alpha-value>)", // Cartes
      },
      // 2. NOS POLICES (Connectées à layout.tsx)
      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"], // Texte courant
        serif: ["var(--font-cinzel)", "serif"], // Titres Sacrés
      },
      // 3. IMAGES DE FOND (Textures)
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "vodun-pattern": "url('/images/pattern-scarification.png')", // À venir
      },
    },
  },
  plugins: [],
};

export default config;
