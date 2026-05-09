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
        brand: {
          red: "var(--brand-red)",
          "red-dark": "var(--brand-red-dark)",
          "red-light": "var(--brand-red-light)",
          gold: "var(--brand-gold)",
          "gold-light": "var(--brand-gold-light)",
          cream: "var(--brand-cream)",
          warm: "var(--brand-warm)",
          charcoal: "var(--brand-charcoal)",
          "charcoal-light": "var(--brand-charcoal-light)",
          stone: "var(--brand-stone)",
          linen: "var(--brand-linen)",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Times New Roman", "Georgia", "serif"],
        body: ["var(--font-lato)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
