import type { Config } from "tailwindcss";

export default {
  darkmode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A", // Deep Blue
        secondary: "#60A5FA", // Light Blue
        accent: "#10B981", // Green
        background: "#FFFFFF", // White
        text: "#111827", // Dark Gray
        border: "#D1D5DB", // Light Gray
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
