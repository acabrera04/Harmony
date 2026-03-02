const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        marathon: {
          'bg-primary': '#1a1a1a',
          'bg-secondary': '#111111',
          'bg-tertiary': '#0a0a0a',
          'accent': '#AAFF00',
          'accent-hover': '#88CC00',
          'text': '#e0e0e0',
          'text-muted': '#666666',
        },
      },
      fontFamily: {
        sans: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
