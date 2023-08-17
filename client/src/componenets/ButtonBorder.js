import { styled } from "@mui/material";
import Button from "@mui/material/Button";

const ButtonBorder = styled(Button)({
  color: "white",
  background:
    "linear-gradient(#31312C, #2A2A29) padding-box,\n               linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%), border-box",
  borderRadius: "15px",
  border: "2px solid transparent",
  fontFamily: "Roboto",
  fontWeight: 500,
  "&:hover": {},
});
export default ButtonBorder;
