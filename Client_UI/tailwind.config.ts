import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Font Families
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      // Typography Scale
      fontSize: {
        // Display sizes (Hero headlines)
        "display-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],  // 72px
        "display-lg": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }], // 60px
        "display-md": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],   // 48px
        "display-sm": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }], // 36px

        // Heading sizes
        "heading-xl": ["2rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" }],   // 32px
        "heading-lg": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],  // 24px
        "heading-md": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],                            // 20px
        "heading-sm": ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }],                           // 18px

        // Body sizes
        "body-xl": ["1.25rem", { lineHeight: "1.6", fontWeight: "400" }],   // 20px
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],  // 18px
        "body-md": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],      // 16px (base)
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],  // 14px
        "body-xs": ["0.75rem", { lineHeight: "1.5", fontWeight: "400" }],   // 12px

        // Label/Caption sizes
        "label-lg": ["0.875rem", { lineHeight: "1.4", fontWeight: "500" }], // 14px medium
        "label-md": ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],  // 12px medium
        "label-sm": ["0.625rem", { lineHeight: "1.4", fontWeight: "500" }], // 10px medium
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Primary - Blue (Trust, Professional)
        primary: {
          DEFAULT: "var(--primary)",
          light: "var(--primary-light)",
          lighter: "var(--primary-lighter)",
          lightest: "var(--primary-lightest)",
          dark: "var(--primary-dark)",
        },
        // Secondary - Orange (Energy, Action, CTA)
        secondary: {
          DEFAULT: "var(--secondary)",
          light: "var(--secondary-light)",
          lighter: "var(--secondary-lighter)",
          lightest: "var(--secondary-lightest)",
          dark: "var(--secondary-dark)",
        },
        // Tertiary - Orange Tints (Warmth, Highlights)
        tertiary: {
          DEFAULT: "var(--tertiary)",
          light: "var(--tertiary-light)",
          accent: "var(--tertiary-accent)",
        },
        // State Colors - Semantic
        success: {
          DEFAULT: "var(--success)",
          light: "var(--success-light)",
        },
        info: {
          DEFAULT: "var(--info)",
          light: "var(--info-light)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          light: "var(--warning-light)",
        },
        error: {
          DEFAULT: "var(--error)",
          light: "var(--error-light)",
        },
        // Semantic colors
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
        background: {
          DEFAULT: "var(--background)",
          subtle: "var(--background-subtle)",
        },
        border: "var(--border)",
      },
      letterSpacing: {
        tightest: "-.075em",
        "tight-v2": "-0.04em",  // V2 headline style
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        full: "var(--radius-full)",
      },

      animation: {
        "infinite-scroll": "infinite-scroll 25s linear infinite",
        "infinite-scroll-reverse": "infinite-scroll-reverse 25s linear infinite",
        "orbit-slow": "orbit 30s linear infinite",
        "orbit-fast": "orbit-reverse 20s linear infinite",
        "counter-rotate-slow": "counter-rotate 30s linear infinite",
        "counter-rotate-fast": "counter-rotate-reverse 20s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "infinite-scroll-reverse": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "orbit": {
          from: { transform: "rotate(0deg)", transformOrigin: "center center" },
          to: { transform: "rotate(360deg)", transformOrigin: "center center" },
        },
        "orbit-reverse": {
          from: { transform: "rotate(360deg)", transformOrigin: "center center" },
          to: { transform: "rotate(0deg)", transformOrigin: "center center" },
        },
        "counter-rotate": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        "counter-rotate-reverse": {
          from: { transform: "rotate(-360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
