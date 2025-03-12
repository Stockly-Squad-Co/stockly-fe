import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A", // Deep Navy Blue
        secondary: "#1E40AF", // Royal Blue
        accent: "#FACC15", // Gold
        background: "#F8FAFC", // Soft White
        text: "#1E293B", // Dark Gray
        border: "#CBD5E1", // Light Gray
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
