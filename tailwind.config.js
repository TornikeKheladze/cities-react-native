/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./App.{js,jsx,ts,tsx}', '*.{jsx,tsx}', 'src/**/*{jsx,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        darkBg: '#3f3131',
        lightBg: '#e6e0e0',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
