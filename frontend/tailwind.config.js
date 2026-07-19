/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#003820",
        "primary-container": "#0f5132",
        "on-primary": "#ffffff",
        "on-primary-container": "#84c39b",
        "primary-fixed": "#b0f1c7",
        "primary-fixed-dim": "#95d4ac",
        "on-primary-fixed": "#002111",
        "on-primary-fixed-variant": "#0f5132",
        
        "secondary": "#4f635b",
        "on-secondary": "#ffffff",
        "secondary-container": "#d1e7dd",
        "on-secondary-container": "#556961",
        "secondary-fixed": "#d1e7dd",
        "secondary-fixed-dim": "#b6cbc2",
        "on-secondary-fixed": "#0c1f19",
        "on-secondary-fixed-variant": "#374b44",
        
        "tertiary": "#571e00",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#76320f",
        "on-tertiary-container": "#fd9c71",
        "tertiary-fixed": "#ffdbcd",
        "tertiary-fixed-dim": "#ffb596",
        "on-tertiary-fixed": "#360f00",
        "on-tertiary-fixed-variant": "#76320f",

        "surface": "#f8f9fa",
        "surface-dim": "#d9dadb",
        "surface-bright": "#f8f9fa",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f4f5",
        "surface-container": "#edeeef",
        "surface-container-high": "#e7e8e9",
        "surface-container-highest": "#e1e3e4",
        "surface-variant": "#e1e3e4",
        "surface-tint": "#2d6a48",

        "on-surface": "#191c1d",
        "on-surface-variant": "#404942",
        "inverse-surface": "#2e3132",
        "inverse-on-surface": "#f0f1f2",
        "inverse-primary": "#95d4ac",

        "background": "#f8f9fa",
        "on-background": "#191c1d",
        "outline": "#707971",
        "outline-variant": "#c0c9c0",

        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1.5rem",
        "bento": "24px",
        "full": "9999px"
      },
      spacing: {
        "unit": "4px",
        "xs": "4px",
        "sm": "8px",
        "md": "16px",
        "lg": "24px",
        "xl": "32px",
        "container-padding": "20px",
        "grid-gutter": "12px"
      },
      fontFamily: {
        "headline": ["Manrope", "sans-serif"],
        "headline-xl": ["Manrope", "sans-serif"],
        "headline-lg": ["Manrope", "sans-serif"],
        "headline-lg-mobile": ["Manrope", "sans-serif"],
        "body": ["Work Sans", "sans-serif"],
        "body-lg": ["Work Sans", "sans-serif"],
        "body-md": ["Work Sans", "sans-serif"],
        "label": ["Work Sans", "sans-serif"],
        "label-md": ["Work Sans", "sans-serif"],
        "label-sm": ["Work Sans", "sans-serif"]
      },
      fontSize: {
        "headline-lg-mobile": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "headline-lg": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-xl": ["32px", { lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "label-sm": ["12px", { lineHeight: "16px", fontWeight: "500" }],
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.05em", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }]
      }
    },
  },
  plugins: [],
}
