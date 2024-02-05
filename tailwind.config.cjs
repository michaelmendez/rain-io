/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
      },
      backgroundColor: {
        'primary-color': '#1e213a',
        'secondary-color': '#100e1d',
      },
      backgroundImage: {
        cloud: "url('cloud-background.png')",
      },
      colors: {
        'primary-gray': '#A09FB1',
        'secondary-gray': '#E7E7EB',
        'primary-blue': '#1e213a',
        'secondary-blue': '#100e1d',
      },
    },
  },
  plugins: [],
};
