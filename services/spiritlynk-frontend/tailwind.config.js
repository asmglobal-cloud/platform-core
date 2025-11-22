export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A5FFF",   // Blue
        accent: "#FF7A00",    // Orange
        dark: "#0d0d0d",      // Black
        light: "#ffffff",     // White
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        card: "0 4px 14px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
