module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#303868",
        secondary: "#52678e",
        info: "#6f8fc8",
      },
    },
    fontFamily: {
      mont: ["Montserrat"],
    },
  },
  variants: {
    extend: {
      maxHeight: ["focus"],
      backgroundColor: ["active", "disabled", "odd"],
      opacity: ["disabled"],
      textColor: ["odd"],
      animation: ["group-hover"],
    },
  },
  plugins: [],
};
