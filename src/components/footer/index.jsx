import { Typography } from "@mui/material";

import styles from "./styles.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Typography variant="body1" className="inter-medium">
        All rights reserved © 2024 <span>eSpark Consulting Group</span>
      </Typography>
    </div>
  );
};

export default Footer;
