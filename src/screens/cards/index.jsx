import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import Tasks from "../../components/taskCards";
import AddMembersPopup from "../../components/addMemberPopup";
import styles from "./style.module.css";

const Cards = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Link to="/assets" style={{ textDecoration: "none" }}>
                <Button variant="contained" className={styles.cards_button}>
                  Assets
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                className={styles.cards_button}
                onClick={handlePopupOpen}
              >
                Manage Member
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            className={styles.cards_button}
            onClick={handlePopupOpen}
          >
            Add Members
          </Button>
        </Grid>
      </Grid>
      <Tasks />
      <AddMembersPopup isOpen={isPopupOpen} onClose={handlePopupClose} />
      <AddMembersPopup isOpen={isPopupOpen} onClose={handlePopupClose} />
    </div>
  );
};

export default Cards;
