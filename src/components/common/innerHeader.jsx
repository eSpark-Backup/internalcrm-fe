import { useLocation } from "react-router-dom";

import { Stack, Typography } from "@mui/material";

import styles from "./style.module.css";

const InnerHeader = () => {
  const location = useLocation();

  return (
    <Stack className={styles.inner_header}>
      <Typography
        className={`inter-bold ${styles.inner_header_heading}`}
        variant="h5"
      >
        {location.pathname === "/" ? "Login" : location.pathname.split("/")[1]}
      </Typography>
    </Stack>
  );
};

export default InnerHeader;
