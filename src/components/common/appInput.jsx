import { styled } from "@mui/material/styles";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";

import styles from "./style.module.css";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 5,
    position: "relative",
    backgroundColor: "#ffffff",
    border: "1px solid",
    borderColor: "#E4E4E4",
    width: "100%",
    padding: "10px 12px",
    color: "#595959",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),

    "@media only screen and (max-width: 1536px)": {
      padding: "9px 12px",
    },

    "@media only screen and (max-width: 1366px)": {
      padding: "7px 10px",
    },
  },
}));

const AppInput = (props) => {
  const {
    onChange,
    id,
    sx,
    label,
    placeholder,
    value,
    normalFont,
    type,
    setShowPassword,
    showPassword,
    Visibility,
    VisibilityOff,
    input_sx,
    password,
    paddingLeft,
  } = props;

  return (
    <FormControl
      variant="standard"
      className={styles.form_control}
      key={id}
      sx={sx}
    >
      {label && (
        <InputLabel
          shrink
          htmlFor="bootstrap-input"
          className={`inter-medium ${styles.input_label}`}
          sx={{ fontSize: normalFont ? "16px !important" : "14px !important" }}
        >
          {label}
        </InputLabel>
      )}

      <BootstrapInput
        placeholder={placeholder}
        value={value}
        id={`bootstrap-input ${id}`}
        className={`inter-regular ${styles.app_input}`}
        onChange={onChange}
        type={type}
        sx={{
          "& input": {
            paddingRight: input_sx && `${input_sx} !important`,
            paddingLeft: paddingLeft && `${paddingLeft} !important`,
            fontSize: normalFont ? "16px !important" : "14px !important",
            height: "auto",

            "&::placeholder": {
              color: "#838383",
              fontFamily: "Inter, sans-serif",
              fontSize: normalFont ? "16px !important" : "14px !important",
            },
          },
        }}
      />

      {password && (
        <div
          className={styles.eye_icon}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </div>
      )}
    </FormControl>
  );
};

export default AppInput;
