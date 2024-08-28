const { scopedPreflightStyles, isolateInsideOfContainer } = require('tailwindcss-scoped-preflight')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: '#root.tw-preflight',
  theme: {
    extend: {},
  },
  plugins: [
    require("@xpd/tailwind-3dtransforms"),
    require('tailwindcss/plugin')(({ addVariant }) => {
      addVariant('search-cancel', '&::-webkit-search-cancel-button');
    }),
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer('.tw-preflight'), // style root name, used to wrap Popper menus etc
    }),
  ],
};
