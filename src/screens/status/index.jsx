import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";

import SearchBar from "../../components/search";
import OverviewPopup from "../../components/overviewPopup";

import Navigation from "../../assets/logos/navigation.svg?react";

import { storeChildData } from "../../redux/reducers/headerSlice";

import styles from "./style.module.css";

const Status = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      storeChildData({
        title: "Lead Status",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [popupOpen, setPopupOpen] = useState(false);
  const [searchNameValue, setSearchNameValue] = useState("");

  const [status] = useState([
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
          btn={true}
          btnText="Upload"
        />
      </div>

      <div className={styles.container}>
        {filteredStatus.map((statusItem, index) => (
          <Card key={index} className={styles.card_container}>
            <CardContent className={styles.card_content}>
              <Typography
                variant="body1"
                className={`inter-regular ${styles.item_name}`}
              >
                {statusItem.name}
              </Typography>

              <Typography
                variant="body2"
                u56
                className={`inter-regular ${styles.date}`}
              >
                {statusItem.date}
              </Typography>

              <div>
                <Link to="/status-table">
                  <IconButton
                    aria-label="copy"
                    className={styles.icon_container}
                  >
                    <Navigation />
                  </IconButton>
                </Link>

                <Button
                  className={`${styles.overview} inter-medium`}
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
