import { Typography } from "@mui/material";
import React from "react";
import DynamicCard from "../../components/card";
import styles from "./style.module.css";

const Cards = () => {
  return (
    <div>
      <div className={styles.cards_container}>
        <div className="card_style">
          <DynamicCard hideTitleAndHr>
            <Typography
              variant="h5"
              sx={{ color: "#595959", marginTop: "5px" }}
            >
              Create Card
            </Typography>
          </DynamicCard>
        </div>
      </div>
    </div>
  );
};

export default Cards;
