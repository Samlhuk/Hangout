/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Indigo-600
        secondary: "#6366F1", // Indigo-500
        accent: "#EC4899", // Pink-500
        neutral: "#6B7280", // Gray-500
        base: "#FFFFFF", // White
        info: "#3B82F6", // Blue-500
        success: "#10B981", // Green-500
        warning: "#F59E0B", // Yellow-500
        error: "#EF4444", // Red-500
      },
    },
    animation: {
      slideDown: "slideDown 0.3s ease-in-out forwards",
    },
    keyframes: {
      slideDown: {
        "0%": {
          opacity: "0",
          transform: "translateY(-10%)",
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
    },
  },
  plugins: [],
};
