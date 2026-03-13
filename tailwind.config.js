/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#2D5A3D',
          'green-dark': '#1A3A25',
          'green-light': '#4A7C5C',
          cream: '#F5F0E8',
          sand: '#E8DFD0',
          charcoal: '#2C2C2C',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
