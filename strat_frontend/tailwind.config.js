/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e0eaff',
          200: '#c7d9ff',
          300: '#a3bdff',
          400: '#7a98ff',
          500: '#5b78ff',
          600: '#3a56ff',
          700: '#3042e5',
          800: '#2c38c7',
          900: '#2a339d',
          950: '#1a1e5c',
        },
        secondary: {
          50: '#f0f4ff',
          100: '#e2e9ff',
          200: '#cad5ff',
          300: '#a6b6ff',
          400: '#818dff',
          500: '#6b6aff',
          600: '#5e4ff0',
          700: '#503fd7',
          800: '#4335af',
          900: '#39318a',
          950: '#221c51',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
