import { InputLabel } from "@mui/material";

import styles from "./style.module.css";

const Label = (props) => {
  const { label, normalFont, marginBottom } = props;

  return (
    <InputLabel
      className={`inter-medium ${styles.input_label}`}
      sx={{
        fontSize: normalFont ? "16px !important" : "14px !important",
        marginBottom: marginBottom && `${marginBottom} !important`,
      }}
    >
      {label}
    </InputLabel>
  );
};

export default Label;
