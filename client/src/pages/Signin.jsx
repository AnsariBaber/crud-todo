import {
  Container,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ButtonBorder from "../componenets/ButtonBorder";
import ButtonMain from "../componenets/ButtonMain";
// import TopNavSignin from "../componenets/TopNavSignin";
import CustomInput from "../componenets/CustomInput";
import {
  useLoginUserMutation,
  // useSendMailConfirmationMutation,
  // useSendSmsCodeMutation,
} from "../services/authApis";
// import Toastify from "../connectivityAssets/Toastify";
import Loading from "../componenets/Loading";
import { setIsLoggedIn, setUserDbData } from "../slices";
import Toastify from "../componenets/Toastify";
// import { setIsLoggedIn, setUserDbData } from "../slices";

const Signin = () => {
  const dispatch = useDispatch();

  // const [sendCode] = useSendSmsCodeMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [login, { isLoading }] = useLoginUserMutation();
  // const [sendMail] = useSendMailConfirmationMutation();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const showToast = useCallback((msg, type) => {
    return setAlertState({
      open: true,
      message: msg,
      severity: type,
    });
  }, []);

  const handleSignIn = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        const data = await login({ email, password }).unwrap();

        localStorage.setItem("token", data?.token);

        showToast(data?.message, "success");
        dispatch(setUserDbData(data?.user));
        dispatch(setIsLoggedIn(true));

        setTimeout(() => {
          navigate("/");
        }, 3000);

        // if (!data?.user?.isVerified) {
        //   setTimeout(() => {
        //     navigate("/verify-otp", {
        //       state: { email: data?.user?.email },
        //     });
        //   }, 3000);
        //   // eslint-disable-next-line brace-style
        // }
        // ============ comment for production===========
        // else {
        //   dispatch(setUserDbData(data?.user));
        //   dispatch(setIsLoggedIn(true));
        //   setTimeout(() => {
        //     setTimeout(() => {
        //       navigate("/dashboard");
        //     }, 2000);
        //   }, 3000);
        // }
        // ============ comment for production===========

        // ============ uncomment for production===========
        // else if (!data?.user?.twoStepVerification) {
        //   setTimeout(() => {
        //     navigate("/two-step-verification");
        //   }, 3000);
        // } else {
        //   // Two Step Verification
        //   await sendCode({ number: data?.user?.number }).unwrap();
        //   navigate("/two-step-code", {
        //     state: { number: data?.user?.number },
        //   });

        //   // dispatch(setUserDbData(data?.user));
        //   // navigate("/dashboard");
        // }
        // ============ uncomment for production===========

        // setTimeout(() => {
        //   navigate("/verify-otp", {
        //     state: { email: data?.email },
        //   });
        // }, 3000);
        // If Email Not Verified
        // if (!data?.user?.isVerified) {
        //   const res = await sendMail().unwrap();
        //   showToast(res?.data?.message, "success");
        //   setTimeout(
        //     () =>
        //       // eslint-disable-next-line implicit-arrow-linebreak
        //       navigate("/verify-otp", {
        //         state: { email: data?.user?.email },
        //       }),
        //     3000
        //   );

        //   // navigate("/email-verification", {
        //   //   state: { email: data?.user?.email },
        //   // });
        // } else
        // if (!data?.user?.isVerified) {
        //   setLoading(false);

        //   showToast(data?.message, "success");
        //   setTimeout(
        //     () =>
        //       // eslint-disable-next-line implicit-arrow-linebreak
        //       navigate("/verify-otp", {
        //         state: { email: data?.user?.email },
        //       }),
        //     2000
        //   );
        // } else if (!data?.user?.twoStepVerification) {
        //   setLoading(false);

        //   navigate("/two-step-verification");
        // } else {
        //   // Two Step Verification
        //   await sendCode({ number: data?.user?.number }).unwrap();
        //   navigate("/two-step-code", {
        //     state: { number: data?.user?.number },
        //   });
        // }
      } catch (error) {
        console.error(error);
        showToast(error?.data?.message, "error");
      }
    },
    [dispatch, email, login, navigate, password, showToast]
  );

  return (
    <Box>
      <Loading loading={isLoading} />
      {/* <TopNavSignin signIn /> */}
      <Toastify setAlertState={setAlertState} alertState={alertState} />
      <Container maxWidth="xs">
        <form onSubmit={handleSignIn}>
          <Typography align="center" variant="h3" mt={6}>
            Sign in To-Do-List
          </Typography>
          <Typography mt={2}>Email</Typography>
          <CustomInput
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
          />

          <Typography mt={2}>Password</Typography>
          <CustomInput
            required
            placeholder="........"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{ color: "#fff" }}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* <Link to="/forgot-password" style={{ textDecoration: "none" }}>
            <Typography
              mt={2}
              sx={{
                cursor: "pointer",
                color: "#D09B03",
              }}
            >
              Forgot password?
            </Typography>
          </Link> */}

          <ButtonMain
            className="hvr-bounce-to-right"
            type="submit"
            sx={{ width: "100%", py: 2, mt: 3, fontWeight: 800 }}
          >
            Sign in
          </ButtonMain>
          <ButtonBorder
            className="hvr-bounce-to-right-sign"
            component={Link}
            to="/register"
            sx={{ width: "100%", py: 2, mt: 2 }}
          >
            Create an account
          </ButtonBorder>
        </form>
      </Container>
    </Box>
  );
};

export default Signin;
