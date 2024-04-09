import { Stack, Typography, Button } from "@mui/material";

import styles from "./style.module.css";

const InnerHeader = (props) => {
  const {
    login,
    dualButton,
    title,
    isActive,
    handleActive,
    dualButtonText1,
    dualButtonText2,
    handleInactive,
  } = props;

  return (
    <Stack
      className={`${styles.inner_header} ${login ? styles.header_login : ""}`}
      flexDirection="row"
      justifyContent="space-between"
    >
      <Typography
        className={`inter-bold ${styles.inner_header_heading}`}
        variant="h5"
      >
        {title}
      </Typography>

      {dualButton && (
        <div className={styles.dual_buttons}>
          <Button
            className={`${isActive ? styles.active : ""} inter-semibold ${
              styles.active_button
            }`}
            onClick={handleActive}
          >
            {dualButtonText1}
          </Button>
          <Button
            className={`${isActive ? "" : styles.active} inter-semibold ${
              styles.inactive_button
            }`}
            onClick={handleInactive}
          >
            {dualButtonText2}
          </Button>
        </div>
      )}
    </Stack>
  );
};

export default InnerHeader;
