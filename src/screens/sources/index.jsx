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
import DeleteConfirmationPopup from "../../components/deletePopup";

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
  const [newSourceName, setNewSourceName] = useState("");
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editedSourceName, setEditedSourceName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isActive, setIsActive] = React.useState(true);

  const [sourceData, setSourceData] = useState([
    { name: "Bark", date: "5" },
    { name: "LinkedIn", date: "5" },
    { name: "Data Scrapping", date: "5" },
  ]);

  const chunkArray = (array, chunkSize) => {
    return Array(Math.ceil(array.length / chunkSize))
      .fill()
      .map((_, index) => index * chunkSize)
      .map((begin) => array.slice(begin, begin + chunkSize));
  };

  const handleNameSearch = (value) => {
    setSearchNameValue(value);
  };

  const handleMonthSearch = (value) => {
    setSearchMonthValue(value);
  };

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

  // Add function to open edit popup
  const openEditPopup = (index) => {
    setCurrentIndex(index);
    setEditedSourceName(sourceData[index].name);
    setIsEditPopupOpen(true);
  };

  const openAddsourcesPopup = () => {
    setIsAddSourcesOpen(true);
  };

  const closeAddsourcesPopup = () => {
    setIsAddSourcesOpen(false);
  };

  const addSource = (newSourceName) => {
    const newSource = { name: newSourceName, date: "1" };
    setSourceData((prevData) => [...prevData, newSource]);
    closeAddsourcesPopup();
  };

  const handleDelete = (index) => {
    setIndexToDelete(index);
    setDeletePopupOpen(true);
  };

  const confirmDelete = () => {
    const updatedSourceData = [...sourceData];
    updatedSourceData.splice(indexToDelete, 1);
    setSourceData(updatedSourceData);
    setDeletePopupOpen(false);
  };

  const handleEdit = () => {
    const updatedSourceData = [...sourceData];
    updatedSourceData[currentIndex].name = editedSourceName;
    setSourceData(updatedSourceData);
    setIsEditPopupOpen(false);
  };

  return (
    <div>
      <SearchBar
        hideJobTitleSearch
        onNameSearch={handleNameSearch}
        onMonthSearch={handleMonthSearch}
        searchTextOne="Search by name"
        searchTextTwo="Search by month"
        btn={!!isActive}
        btnText="Add source"
      />
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
                    <div style={{ display: "flex" }}>
                      <div
                        className={`${styles.delete_icon_container} ${
                          hoveredCards[index + chunkIndex * 3]
                            ? styles.show_icon
                            : ""
                        }`}
                        onClick={() => handleDelete(index + chunkIndex * 3)}
                      >
                        <svg
                          style={{
                            marginLeft: "17px",
                            marginTop: "17px",
                          }}
                          width="14"
                          height="16"
                          viewBox="0 0 14 16"
                          fill="#E4E4E4"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.615 15.77C2.16833 15.77 1.78733 15.6127 1.472 15.298C1.15733 14.9833 1 14.6023 1 14.155V1.77H0V0.77H4V0H10V0.77H14V1.77H13V14.155C13 14.615 12.846 14.999 12.538 15.307C12.2293 15.6157 11.845 15.77 11.385 15.77H2.615ZM12 1.77H2V14.155C2 14.3343 2.05767 14.4817 2.173 14.597C2.28833 14.7123 2.43567 14.77 2.615 14.77H11.385C11.5383 14.77 11.6793 14.706 11.808 14.578C11.936 14.4493 12 14.3083 12 14.155V1.77ZM4.808 12.77H5.808V3.77H4.808V12.77ZM8.192 12.77H9.192V3.77H8.192V12.77Z"
                            fill="E4E4E4"
                          />
                        </svg>
                      </div>
                      <div
                        className={`${styles.edit_icon_container} ${
                          hoveredCards[index + chunkIndex * 3]
                            ? styles.show_icon
                            : ""
                        }`}
                        onClick={() => openEditPopup(index + chunkIndex * 3)}
                      >
                        <svg
                          style={{
                            marginLeft: "16px",
                            marginTop: "16px",
                          }}
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="#3bb4b2"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 14.4624V17.5024C0 17.7824 0.22 18.0024 0.5 18.0024H3.54C3.67 18.0024 3.8 17.9524 3.89 17.8524L14.81 6.94244L11.06 3.19244L0.15 14.1024C0.0500001 14.2024 0 14.3224 0 14.4624ZM17.71 2.63244L15.37 0.292444C15.2775 0.19974 15.1676 0.126193 15.0466 0.0760114C14.9257 0.02583 14.796 0 14.665 0C14.534 0 14.4043 0.02583 14.2834 0.0760114C14.1624 0.126193 14.0525 0.19974 13.96 0.292444L12.13 2.12244L15.88 5.87244L17.71 4.04244C17.8027 3.94993 17.8762 3.84004 17.9264 3.71907C17.9766 3.59809 18.0024 3.46841 18.0024 3.33744C18.0024 3.20648 17.9766 3.07679 17.9264 2.95582C17.8762 2.83485 17.8027 2.72496 17.71 2.63244Z"
                            fill="#3bb4b2"
                          />
                        </svg>
                      </div>
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
            value={newSourceName}
            onChange={(e) => setNewSourceName(e.target.value)}
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
              onClick={() => addSource(newSourceName)}
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
      <Modal
        open={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        aria-labelledby="edit-sources-modal-title"
        aria-describedby="edit-sources-modal-description"
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
            id="edit-sources-modal-title"
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
            Edit Source
          </Typography>
          <TextField
            label="Enter edited source name"
            fullWidth
            value={editedSourceName}
            onChange={(e) => setEditedSourceName(e.target.value)}
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
              onClick={() => setIsEditPopupOpen(false)}
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
              onClick={handleEdit}
              sx={{
                padding: "6px 35px",
                color: "#fff",
                background: "#068987",
                textTransform: "capitalize",
                marginTop: "20px",
              }}
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>
      <DeleteConfirmationPopup
        open={deletePopupOpen}
        handleClose={() => setDeletePopupOpen(false)}
        handleDelete={confirmDelete}
        heading="Delete Card"
        sentence="Are you sure you want to delete this card?"
      />
    </div>
  );
};

export default Sources;
