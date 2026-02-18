const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        discord: {
          "bg-primary": "#36393f",   // gray-700 equivalent — main chat background
          "bg-secondary": "#2f3136", // gray-800 equivalent — sidebar background
          "bg-tertiary": "#202225",  // gray-900 equivalent — server list background
          accent: "#5865f2",         // Discord blurple — indigo-500 equivalent
          text: "#dcddde",           // primary text
          "text-muted": "#72767d",   // muted / secondary text
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Open Sans", "Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
