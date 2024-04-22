import { useEffect } from "react";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { Box, Button, Typography, TextField, Modal, Grid } from "@mui/material";
import { storeChildData } from "../../redux/reducers/headerSlice";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import DynamicCard from "../../components/card";
import styles from "./styles.module.css";
import SearchBar from "../../components/search";
import { Link } from "react-router-dom";

const Sources = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      storeChildData({
        title: "Sources",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [hoveredCards, setHoveredCards] = useState([]);
  const [searchNameValue, setSearchNameValue] = useState("");
  const [searchMonthValue, setSearchMonthValue] = useState("");
  const [isAddSourcesOpen, setIsAddSourcesOpen] = useState(false);

  const handleNameSearch = (value) => {
    setSearchNameValue(value);
  };

  const handleMonthSearch = (value) => {
    setSearchMonthValue(value);
  };

  const sourceData = [
    { name: "Bark", date: "5" },
    { name: "LinkedIn", date: "5" },
    { name: "Data Scrapping", date: "5" },
  ];

  const chunkArray = (array, chunkSize) => {
    return Array(Math.ceil(array.length / chunkSize))
      .fill()
      .map((_, index) => index * chunkSize)
      .map((begin) => array.slice(begin, begin + chunkSize));
  };

  const filteredByNamesourcess = sourceData.filter((sources) =>
    sources.name.toLowerCase().includes(searchNameValue.toLowerCase())
  );

  const filteredByMonthsourcess = sourceData.filter((sources) =>
    sources.date.toLowerCase().includes(searchMonthValue.toLowerCase())
  );

  const filteredsourcess = sourceData.filter(
    (sources) =>
      sources.name.toLowerCase().includes(searchNameValue.toLowerCase()) &&
      sources.date.toLowerCase().includes(searchMonthValue.toLowerCase())
  );

  const sources = chunkArray(filteredsourcess, 3);

  const handleMouseEnter = (index) => {
    setHoveredCards((prev) => {
      const newHoveredCards = [...prev];
      newHoveredCards[index] = true;
      return newHoveredCards;
    });
  };

  const handleMouseLeave = (index) => {
    setHoveredCards((prev) => {
      const newHoveredCards = [...prev];
      newHoveredCards[index] = false;
      return newHoveredCards;
    });
  };

  const openAddsourcesPopup = () => {
    setIsAddSourcesOpen(true);
  };

  const closeAddsourcesPopup = () => {
    setIsAddSourcesOpen(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <SearchBar
            hideJobTitleSearch
            onNameSearch={handleNameSearch}
            onMonthSearch={handleMonthSearch}
            searchTextOne="Search by name"
            searchTextTwo="Search by month"
          />
        </div>
        <Button
          onClick={openAddsourcesPopup}
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "4px",
            padding: "20px 40px",
            height: "43px",
            backgroundColor: "#029894",
          }}
        >
          <span style={{ color: "#fff", textTransform: "capitalize", fontFamily:"Inter" }}>
            Add source
          </span>
        </Button>
      </div>

      {sources.map((chunk, chunkIndex) => (
        <Grid container key={chunkIndex} spacing={2}>
          {chunk.map((sources, index) => (
            <Grid item xs={12} sm={4} key={index} className={styles.grid_style}>
              <div
                onMouseEnter={() => handleMouseEnter(index + chunkIndex * 3)}
                onMouseLeave={() => handleMouseLeave(index + chunkIndex * 3)}
              >
                <DynamicCard member={true} card_style="card_style">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <Typography
                        variant="h5"
                        sx={{ color: "#595959", fontWeight: "bold" }}
                      >
                        {sources.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#595959",
                          fontSize: "18px",
                          marginTop: "5px",
                        }}
                      >
                        Lead: <strong>{sources.date}</strong>
                      </Typography>
                    </div>
                    <div
                      className={`${styles.launch_icon_container} ${
                        hoveredCards[index + chunkIndex * 3]
                          ? styles.show_icon
                          : ""
                      }`}
                    >
                      <Link to="/cards">
                        <LaunchRoundedIcon
                          style={{
                            fontSize: "40px",
                            marginLeft: "4px",
                            marginTop: "5px",
                            color: "#3BB4B2",
                          }}
                        />
                      </Link>
                    </div>
                  </div>
                </DynamicCard>
              </div>
            </Grid>
          ))}
        </Grid>
      ))}
      <Modal
        open={isAddSourcesOpen}
        onClose={closeAddsourcesPopup}
        aria-labelledby="add-sources-modal-title"
        aria-describedby="add-sources-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <Typography
            id="add-sources-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#068987",
              marginBottom: "15px",
            }}
          >
            Add Source
          </Typography>
          <TextField
            label="Enter source name"
            fullWidth
            sx={{
              marginBottom: "10px",
              "& .MuiInputLabel-root": {
                color: "#888888",
                fontSize: "14px",
                marginTop: "-6px",
              },
              "& .MuiOutlinedInput-input": {
                padding: "8px",
              },
            }}
          />
         
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={closeAddsourcesPopup}
              sx={{
                padding: "6px 35px",
                color: "#068987",
                border: "1px solid #068987",
                textTransform: "capitalize",
                marginRight: "10px",
                marginTop: "20px",
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{
                padding: "6px 35px",
                color: "#fff",
                background: "#068987",
                textTransform: "capitalize",
                marginTop: "20px",
              }}
            >
              Add
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Sources;
