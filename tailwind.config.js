/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    screens: {
      'desktop': { max: '1281px' },
      'tablet': { max: '960px' },
    },
    plugins: [
      require('@tailwindcss/line-clamp'),
    ],
  },
  plugins: [],
};
