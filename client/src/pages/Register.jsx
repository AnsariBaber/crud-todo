import React, { useCallback, useState } from "react";

import {
  Container,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Grid,
  // Checkbox,
  styled,
  TextField,
  // FormControlLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import TopNavSignin from "../componenets/TopNavSignin";
import ButtonMain from "../componenets/ButtonMain";
import { useRegisterUserMutation } from "../services/authApis";
// import Toastify from "../connectivityAssets/Toastify";
import Loading from "../componenets/Loading";
import { ButtonBorder } from "../componenets";
import Toastify from "../componenets/Toastify";
// import Loading from "../connectivityAssets/Loading";

const ValidateError = styled(Typography)({
  fontSize: "13px",
  color: "red",
});
const StyledFiled = styled(TextField)({
  width: "100%",
  "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
    color: "white",
  },
  "& .css-bpeome-MuiSvgIcon-root-MuiSelect-icon": {
    color: "white",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid #E1AE3C",
    },
    "&:hover fieldset": {
      border: "1px solid #E1AE3C",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #E1AE3C",
    },
  },
});

const Register = () => {
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const showToast = (msg, type) => {
    return setAlertState({
      open: true,
      message: msg,
      severity: type,
    });
  };

  const handleRegister = useCallback(
    async (registerData) => {
      try {
        const data = await registerUser(registerData).unwrap();
        // localStorage.setItem("token", data?.token);
        showToast(data?.message, "success");

        setTimeout(() => {
          navigate("/sign-in");
        }, 3000);
      } catch ({ data }) {
        showToast(data?.message, "error");
      }
    },
    [navigate, registerUser]
  );

  return (
    <Box>
      {/* <TopNavSignin /> */}
      <Loading loading={isLoading} />

      <Container maxWidth="sm">
        <Toastify setAlertState={setAlertState} alertState={alertState} />
        <form onSubmit={handleSubmit(handleRegister)}>
          <Typography align="center" variant="h3" mt={6} mb={4}>
            Create an account
          </Typography>
          <Typography mt={2} fontSize="14px">
            Required fields have an asterisk: *
          </Typography>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography mt={2}>First name*</Typography>
                <StyledFiled
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  {...register("firstName", {
                    required: "This field is required",
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message:
                        "Only alphabatic characters are allowed without white space !",
                    },
                  })}
                />
                {errors.firstName && (
                  <ValidateError>{errors.firstName?.message}</ValidateError>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography mt={2}>Last name*</Typography>
                <StyledFiled
                  name="lastName"
                  placeholder="Last name"
                  {...register("lastName", {
                    required: "This field is required",
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message:
                        "Only alphabatic characters are allowed without white space !",
                    },
                  })}
                />
                {errors.lastName && (
                  <ValidateError>{errors.lastName?.message}</ValidateError>
                )}
              </Box>
            </Grid>
          </Grid>

          <Typography mt={2}>Email*</Typography>
          <StyledFiled
            placeholder="you@example.com"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
            })}
          />
          {errors.email && (
            <ValidateError>{errors.email?.message}</ValidateError>
          )}
          <Typography mt={2}>Password*</Typography>
          <StyledFiled
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Minume 8 characters are required !",
              },
            })}
            placeholder="........"
            type={showPassword ? "text" : "password"}
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
          {errors.password && (
            <ValidateError>{errors.password?.message}</ValidateError>
          )}

          <ButtonMain
            className="hvr-bounce-to-right"
            type="submit"
            sx={{ width: "100%", py: 2, mt: 3, fontWeight: 800 }}
          >
            create free account
          </ButtonMain>
          <ButtonBorder
            className="hvr-bounce-to-right-sign"
            component={Link}
            to="/sign-in"
            sx={{ width: "100%", py: 2, mt: 2 }}
          >
            Already have an account
          </ButtonBorder>
        </form>
      </Container>
    </Box>
  );
};

export default Register;
