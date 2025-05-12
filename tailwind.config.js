/** @type {import('tailwindcss').Config} */

const colors = {
  themecolor1: '#B7E0FF',
  themecolor2: '#3A6D8C',
  themecolor3: '#2D5E82',
  themecolor4: '#001F3F',
};


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'], 
  theme: {
    extend: {
      colors: colors,
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundColor: {
        'dark': '#121212',
        'dark-light': '#1e1e1e',
      },
      textColor: {
        'dark': '#f8f9fa',
        'dark-light': '#adb5bd',
      },
      borderColor: {
        'dark-border': '#343a40',
      },
      boxShadow: {
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}