import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme1 = createTheme({
  palette: {
    background: {
      default: "#222222",
      color: "#fff",
    },
    text: {
      primary: "#fff",
      secondary: "#BEBEC7",
    },
    primary: {
      main: "#DB9F22",
    },
  },
  typography: {
    fontFamily: ["'Audiowide', cursive", "'Roboto', sans-serif"].join(","),
    h1: {
      fontFamily: "'Audiowide', cursive",
      fontSize: "55px",
    },
    h2: {
      fontFamily: "'Audiowide', cursive",
      fontSize: "40px",
    },
    h3: {
      fontFamily: "'Audiowide', cursive",
      fontSize: "24px",
    },
    h4: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: "22px",
    },

    body: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: "16px",
    },
    body1: {
      fontFamily: "'Roboto'",
    },
    body2: {
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      color: "#D6D6D6",
    },
    subtitle: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: "12px",
      fontWeight: 400,
    },
    gery: {
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      color: "#BEBEC7",
      fontSize: "14px",
    },
    geryBold: {
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 700,
      color: "#D6D6D6",
      fontSize: "14px",
    },
  },
});

theme1.overrides = {
  MuiCssBaseline: {
    "@global": {
      body: {
        fontFamily: "Roboto, sans-serif",
        backgroundColor: "#000",
        color: "#fff",
      },
      ".img-fluid": {
        maxWidth: "100%",
        height: "auto",
      },
    },
  },
};

const theme = responsiveFontSizes(theme1);

export default theme;
