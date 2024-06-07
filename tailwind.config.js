/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: "Poppins, sans-serif",
      },
      backgroundColor: {
        "light-blue": "#d6dfee",
        "dark-blue": "#082063",
        "hover-light-blue": "#f5f6f7",
        "hover-blue": "#9aabdb",
        "red-container": "#ffeded",
        "red-container-inner": "#fa3c3c",
        "green-container": "#d4fadb",
        "green-container-inner": "#126e1f",
      },
      colors: {
        "dark-blue": "#082063",
        "light-blue": "#d6dfee",
      },
    },
  },
  plugins: [],
};
