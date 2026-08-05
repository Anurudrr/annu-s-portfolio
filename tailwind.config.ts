import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "var(--color-brand-black)",
          white: "var(--color-brand-white)",
          cream: "var(--color-brand-cream)",
          yellow: "var(--color-brand-yellow)",
          red: "var(--color-brand-red)",
          blue: "var(--color-brand-blue)",
        },
        surface: {
          primary: "var(--color-surface-primary)",
          secondary: "var(--color-surface-secondary)",
          tertiary: "var(--color-surface-tertiary)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
          inverse: "var(--color-text-inverse)",
        },
        border: {
          default: "var(--color-border-default)",
          light: "var(--color-border-light)",
        },
        focus: "var(--color-focus)",
      },
      fontFamily: {
        display: ["var(--font-bangers)", "cursive"],
        heading: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-elite)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 6rem)", { lineHeight: "1", letterSpacing: "0.05em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "1.1", letterSpacing: "0.03em" }],
        "display-md": ["clamp(1.75rem, 4vw, 2.5rem)", { lineHeight: "1.2", letterSpacing: "0.02em" }],
        "heading-lg": ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.3" }],
        "heading-md": ["clamp(1.25rem, 2.5vw, 1.5rem)", { lineHeight: "1.3" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        "caption": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.05em" }],
        "micro": ["0.625rem", { lineHeight: "1.4", letterSpacing: "0.1em" }],
      },
      spacing: {
        "space-1": "0.25rem",
        "space-2": "0.5rem",
        "space-3": "0.75rem",
        "space-4": "1rem",
        "space-5": "1.25rem",
        "space-6": "1.5rem",
        "space-8": "2rem",
        "space-10": "2.5rem",
        "space-12": "3rem",
        "space-16": "4rem",
        "space-20": "5rem",
        "space-24": "6rem",
      },
      boxShadow: {
        "brutal": "4px 4px 0 0 var(--color-border-default)",
        "brutal-sm": "2px 2px 0 0 var(--color-border-default)",
        "brutal-lg": "8px 8px 0 0 var(--color-border-default)",
        "brutal-hover": "6px 6px 0 0 var(--color-border-default)",
        "modal": "12px 12px 0 0 var(--color-border-default)",
      },
      borderWidth: {
        "border-thick": "3px",
        "border-thicker": "4px",
      },
      transitionDuration: {
        "fast": "150ms",
        "normal": "200ms",
        "slow": "300ms",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      zIndex: {
        "dropdown": "100",
        "sticky": "200",
        "modal-backdrop": "10000",
        "modal": "10100",
        "modal-high": "10200",
        "tooltip": "11000",
      },
    },
  },
  plugins: [],
} satisfies Config;