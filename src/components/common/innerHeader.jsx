import { useState } from "react";
import { useSelector } from "react-redux";

import { Stack, Typography, Button } from "@mui/material";

import styles from "./style.module.css";

const InnerHeader = () => {
  const childData = useSelector((state) => state.header.childData);

  const [filledButton, setFilledButton] = useState(true);

  const handleActive = () => {
    setFilledButton(true);
    childData?.handleActive();
  };

  const handleInactive = () => {
    setFilledButton(false);
    childData?.handleInactive();
  };

  return (
    <Stack
      className={`${styles.inner_header} ${
        childData?.login ? styles.header_login : styles.auth_inner_header
      }`}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography
        className={`inter-bold ${styles.inner_header_heading}`}
        variant="h5"
      >
        {childData?.title}
      </Typography>

      {childData?.dualButton && (
        <div className={styles.dual_buttons}>
          <Button
            className={`${filledButton ? styles.active : ""} inter-semibold ${
              styles.active_button
            }`}
            onClick={handleActive}
          >
            {childData?.dualButtonText1}
          </Button>
          <Button
            className={`${filledButton ? "" : styles.active} inter-semibold ${
              styles.inactive_button
            }`}
            onClick={handleInactive}
          >
            {childData?.dualButtonText2}
          </Button>
        </div>
      )}

      {childData?.singleButton && (
        <div className={styles.single_button}>
          <Button
            className={`inter-semibold ${styles.back}`}
            onClick={childData?.handleClick}
          >
            {childData?.singleButtonText}
          </Button>
        </div>
      )}
    </Stack>
  );
};

export default InnerHeader;
