export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,jsx,ts,tsx}",   // include layouts
    "./src/website/**/*.{js,jsx,ts,tsx}",   // include public pages
  ],

  theme: {
    extend: {
      colors: {
        primary: "#0A5FFF",
        accent: "#FF7A00",
        dark: "#0d0d0d",
        light: "#ffffff",
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
