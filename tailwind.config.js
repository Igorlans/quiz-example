/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')



export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      
      container: {
        center: true,
      },

      colors: {
        'custom_yellow': '#FFCC00',
        'custom_purple': {
          300: '#9747FF',
          700: '#4C1357'
        },
        'success_green': '#2CFF34',
        'error_red': '#ff3333',
        'dark': '#1A1A1A',
      },
      
      fontFamily: {
        content: ['Nunito'],
        sans: ['Nunito']
      },

      screens: {
        xl: {'max': '1280px'},
        lg: {'max': '1024px'},
        md: {'max': '768px'},
        sm: {'max': '640px'},
        xs: {'max': '425px'},
      },

    },

  },
  plugins: [
    require('@tailwindcss/container-queries')
  ],
}

