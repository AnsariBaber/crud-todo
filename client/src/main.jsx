import React from "react";
import ReactDOM from "react-dom/client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import { Provider as ReduxProvider } from "react-redux";

import App from "./App";
import "./index.css";
import theme from "./theme";
import { store } from "./utils";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ReduxProvider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </ReduxProvider>
  // </React.StrictMode>
);
