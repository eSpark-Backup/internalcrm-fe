import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

import AppInput from "../../../components/common/appInput";
import AppDialog from "../../../components/common/appDialog";
import CustomLoader from "../../../components/loading";
import CustomizedSnackbars from "../../../components/toast";

import Visibility from "../../../assets/logos/visibility.svg?react";
import VisibilityOff from "../../../assets/logos/visibility-off.svg?react";

import { loginAdmin } from "../../../api/auth/login";

import { storeChildData } from "../../../redux/reducers/headerSlice";

import styles from "./style.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const [email, setEmail] = React.useState("");

  const [isLogin, setIsLogin] = useState(false);
  const [message, setMessage] = useState("");
  const [snackbarState, setSnackbarState] = useState(false);
  const [severity, setSeverity] = useState("");

  const handleInputChange = (key, value) => {
    setState((state) => ({ ...state, [key]: value }));
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    dispatch(
      storeChildData({
        login: true,
        title: "Login",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = () => {
    setIsLogin(true);

    loginAdmin(state, dispatch).then((res) => {
      console.log(res);

      setSnackbarState(true);
      setIsLogin(false);

      if (res.status === 200) {
        setMessage(res.data.message);
        setSeverity("success");

        navigate("dashboard");
      } else {
        setMessage(res.data.message);
        setSeverity("error");
      }
    });
  };

  return (
    <Stack className={styles.login_screen}>
      <Typography variant="body1" className="inter-regular">
        If you already have an account please login using your email & password.
      </Typography>

      <form className={styles.form}>
        <AppInput
          label="Email:"
          placeholder="Email"
          type="email"
          normalFont
          value={state.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          id="email"
        />

        <AppInput
          label="Password:"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          normalFont
          sx={{ marginTop: "20px" }}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          Visibility={Visibility}
          VisibilityOff={VisibilityOff}
          input_sx="40px"
          password
          value={state.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          id="password"
        />

        <Stack
          className={styles.checked_stack}
          flexDirection="row"
          justifyContent="space-between"
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  sx={{
                    color: "#E4E4E4",

                    "&.Mui-checked": {
                      color: "#029e9c",
                    },

                    "& svg": {
                      width: "20px",
                      height: "20px",
                    },
                  }}
                />
              }
              sx={{
                "&  .MuiTypography-root": {
                  fontFamily: "Inter, sans-serif !important",
                  fontWeight: "400 !important",
                  fontSize: "14px !important",
                  color: "#666666 !important",
                },
              }}
              label="Remember me"
            />
          </FormGroup>

          <Button
            className={`inter-regular ${styles.trouble}`}
            onClick={() => setOpenDialog(true)}
          >
            Having trouble?
          </Button>
        </Stack>

        <Button
          className={`${styles.login} inter-semibold`}
          onClick={() => handleLogin()}
          disabled={isLogin}
        >
          {isLogin ? <CustomLoader /> : "Login"}
        </Button>
      </form>

      <AppDialog
        open={openDialog}
        padding="31px 20px"
        heading="Send Reset Link to Email"
        textBox
        text="Upon providing your email, you will receive a link to reset your account."
        singleInput
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        doubleButton
        leftText="Cancel"
        rightText="Send"
        textClass={styles.text_class}
        weight="medium"
        margin="0px 0px 20px"
        handleClose={handleClose}
      />

      <CustomizedSnackbars
        message={message}
        open={snackbarState}
        setOpen={setSnackbarState}
        severity={severity}
      />
    </Stack>
  );
};

export default Login;
