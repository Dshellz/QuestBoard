import { extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
  colorSchemes: {
    light: {
      // pour le mode light
      palette: {
        primary: {
          // pour le choix primary avec les différentes nuances de bleues
          50: "#C0CCD9",
          100: "#A5B8CF",
          200: "#6A96CA",
          300: "#4886D0",
          400: "#2178DD",
          500: "#096BDE",
          600: "#1B62B5",
          700: "#265995",
          800: "#2F4968",
          900: "#2F3C4C",
        },
      },
    },
  },
  fontFamily: {
    display: "Noto Sans", // applies to `h1`–`h4`
    body: "Noto Sans", // applies to `title-*` and `body-*`
  },
});

export default theme;
