import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { CopyIcon } from "../../components/svg/copyIcon";
import { DeleteIcon } from "../../components/svg/deleteIcon";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import styles from "./style.module.css";
import SearchBar from "../../components/search";
import OverviewPopup from "../../components/overviewPopup";

const Status = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  
  const [status, setStatus] = useState([
    {
      name: "Jan-Week1",
      date: "22 September,23",
    },
    {
      name: "Jan-Week1",
      date: "22 September,23",
    },
    {
      name: "Jan-Week1",
      date: "22 September,23",
    },
    {
      name: "Jan-Week1",
      date: "22 September,23",
    },
  ]);

  const openPopup = () => {
    console.log("Popup opened"); // Check if this message appears in the console
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
        }}
      >
        <SearchBar searchTextOne="Search by name" hideJobTitleSearch />
      </div>
      {status.map((status, index) => (
        <Card
          key={index}
          sx={{
            width: "100%",
            marginBottom: "15px",
            borderRadius: "12px",
            boxShadow:
              "0px 1px 1px -1px rgba(0,0,0,0.2),0px 0px 1px 0px rgba(0,0,0,0.14),0px 4px 8px 0px rgba(0,0,0,0.12)",
          }}
        >
          <CardContent
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 1.5fr 1.5fr",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontSize: "16px", fontFamily: "Inter", color: "#595959" }}
            >
              {status.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {status.date}
            </Typography>
            <div>
              <IconButton
                aria-label="copy"
                sx={{
                  backgroundColor: "#e6f5f4",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  border: "solid 1px #068987",
                  marginRight: "20px",
                  "&:hover": {
                    backgroundColor: "#e6f5f4",
                  },
                }}
                onClick={() => {
                  /* Handle copy */
                }}
              >
                {/* Your SVG icon */}
                <LaunchRoundedIcon style={{ color: "#068987" }} />
              </IconButton>
              <Button
                className={styles.status_button}
                sx={{
                  fontFamily: "Inter",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#068987",
                }}
                onClick={openPopup} // onClick bound to handlePopupOpen
              >
                Overview
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <OverviewPopup isOpen={popupOpen} onClose={handlePopupClose} />
    </div>
  );
};

export default Status;
