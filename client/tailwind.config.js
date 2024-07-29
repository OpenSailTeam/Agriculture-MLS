module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: '#root',
  theme: {
    extend: {},
  },
  corePlugins: {

    preflight: false,
  },
  plugins: [
    require("@xpd/tailwind-3dtransforms"),
    require('tailwindcss/plugin')(({ addVariant }) => {
      addVariant('search-cancel', '&::-webkit-search-cancel-button');
    }),
  ],
};
