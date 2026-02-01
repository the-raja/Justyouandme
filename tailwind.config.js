const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#5a1e2a',
        'secondary-bg': '#8c4b58',
        'accent-red': '#a63c4f',
        'text-primary': '#f5f5f0',
        'text-secondary': '#d1c4c7',
        // Keeping old names for any remaining classes, but mapping to new palette
        'base-100': '#38121a',
        'base-200': '#491822',
        'base-300': '#5a1e2a',
        'ink-100': '#f5f5f0',
        'ink-200': '#d1c4c7',
        'ink-300': '#8c4b58',
        accent: '#a63c4f',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        serif: ['var(--font-lora)', ...fontFamily.serif],
      },
      maxWidth: {
        narrow: '420px',
      },
      lineHeight: {
        relaxed: '1.8',
      },
      letterSpacing: {
        wide: '0.05em',
      },
    },
  },
  plugins: [],
};
