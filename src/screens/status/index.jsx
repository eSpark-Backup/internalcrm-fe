import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import styles from "./style.module.css";
import SearchBar from "../../components/search";
import OverviewPopup from "../../components/overviewPopup";

const Status = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [searchNameValue, setSearchNameValue] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [status, setStatus] = useState([
    {
      name: "Oct-Week1",
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
    console.log("Popup opened");
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleNameSearch = (value) => {
    setSearchNameValue(value);
  };

  // Filter status items based on the searchNameValue
  const filteredStatus = status.filter((item) =>
    item.name.toLowerCase().includes(searchNameValue.toLowerCase())
  );

  return (
    <div style={{ height: "100%" }}>
      <div style={{ marginBottom: "20px" }}>
        <SearchBar
          hideJobTitleSearch
          hideStatusSearch
          onNameSearch={handleNameSearch}
          searchTextOne="Search by name"
          searchTextTwo="Search by month"
          btn={!!isActive}
          btnText="Add source"
        />
      </div>
      <div className={styles.container}>
      {filteredStatus.map((statusItem, index) => (
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
              {statusItem.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {statusItem.date}
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
                onClick={openPopup}
              >
                Overview
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      </div>
      <OverviewPopup isOpen={popupOpen} onClose={handlePopupClose} />
    </div>
  );
};

export default Status;
