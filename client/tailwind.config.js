const { scopedPreflightStyles, isolateInsideOfContainer } = require('tailwindcss-scoped-preflight');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: '#root.tw-preflight',  // Adjust this to match your root element's ID and class
  theme: {
    extend: {},
  },
  plugins: [
    require("@xpd/tailwind-3dtransforms"),
    require('tailwindcss/plugin')(({ addVariant }) => {
      addVariant('search-cancel', '&::-webkit-search-cancel-button');
    }),
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer('.tw-preflight')  // Ensures only elements within this container are affected
    }),
  ],
};
