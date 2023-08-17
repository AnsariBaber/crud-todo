import { Box, Container, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { ButtonBorder } from "../componenets";
// eslint-disable-next-line import/named
import { pageNotFound } from "../assets";
import HeadingTwo from "../componenets/HeadingTwo";

export default function PageNotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container>
        <Grid
          container
          spacing={2}
          direction={{ xs: "column-reverse", md: "row" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid xs={12} md={6} sx={{ textAlign: "center" }}>
            {/* <Typography variant="h1">Page not found</Typography> */}
            <HeadingTwo text="Page not found" variant="h1" />

            <Typography variant="h3" sx={{ my: 2 }}>
              The page you’re looking for doesn’t exist.
            </Typography>

            <ButtonBorder
              sx={{ mt: 3, px: 5, py: 2 }}
              className="hvr-bounce-to-right-sign"
              component={Link}
              to="/"
            >
              Back Home
            </ButtonBorder>
          </Grid>
          <Grid xs={12} md={6}>
            <img width="100%" src={pageNotFound} alt="page not found" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
