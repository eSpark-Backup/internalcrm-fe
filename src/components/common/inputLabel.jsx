import { InputLabel } from "@mui/material";

import styles from "./style.module.css";

const Label = (props) => {
  const { label, normalFont } = props;

  return (
    <InputLabel
      className={`inter-medium ${styles.input_label}`}
      sx={{ fontSize: normalFont ? "16px !important" : "14px !important" }}
    >
      {label}
    </InputLabel>
  );
};

export default Label;
