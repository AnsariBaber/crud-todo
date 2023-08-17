import { Typography } from "@mui/material";
import React from "react";

const HeadingTwo = ({ text, variant }) => {
  return (
    <Typography
      variant={variant ?? "h2"}
      sx={{
        background:
          "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textFillColor: "transparent",
        textAlign: "center",
      }}
    >
      {text}
    </Typography>
  );
};

export default HeadingTwo;
