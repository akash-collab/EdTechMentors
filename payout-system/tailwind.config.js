// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blueLightest: '#E3F2FD',
        blueLighter: '#BBDEFB',
        blueLight: '#90CAF9',
        blue: '#64B5F6',
        blueMedium: '#42A5F5',
        bluePrimary: '#2196F3',
        blueDark: '#1E88E5',
        blueDarker: '#1976D2',
        blueDarkest: '#1565C0',
        blueDeep: '#0D47A1',
        brightOrange: '#f07167',
        brightGreen: '#38b000',
      },
    },
  },
  plugins: [],
}