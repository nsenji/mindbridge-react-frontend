/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        body:"Poppins, sans-serif"
      },
      backgroundColor: {
        'light-blue': '#d6dfee',
        'dark-blue':"#082063",
        'hover-blue': "#9aabdb"
      },
    },
  },
  plugins: [],
}

