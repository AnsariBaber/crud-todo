import Backdrop from "@mui/material/Backdrop";
import { makeStyles } from "@mui/styles";
import { HashLoader } from "react-spinners";

const useStyles = makeStyles(() => ({
  backdrop: {
    zIndex: 220000000,
    color: "#fff",
  },
}));

export default function Loading({ loading }) {
  const classes = useStyles();
  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <HashLoader color="#DB9F22" size={100} />
      </Backdrop>
    </div>
  );
}
