import { useEffect } from "react";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { Box, Button, Typography, TextField, Modal, Grid } from "@mui/material";
import { storeChildData } from "../../redux/reducers/headerSlice";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import DynamicCard from "../../components/card";
import styles from "./style.module.css";
import SearchBar from "../../components/search";
import { Link } from "react-router-dom";

const Projects = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      storeChildData({
        title: "Projects",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [hoveredCards, setHoveredCards] = useState([]);
  const [searchNameValue, setSearchNameValue] = useState("");
  const [searchMonthValue, setSearchMonthValue] = useState("");
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

  const handleNameSearch = (value) => {
    setSearchNameValue(value);
  };

  const handleMonthSearch = (value) => {
    setSearchMonthValue(value);
  };

  const projectData = [
    { name: "ABC Project", date: "12 September, 23" },
    { name: "ABC Project", date: "12 September, 23" },
    { name: "ABC Project", date: "12 September, 23" },
    { name: "XYZ Project", date: "15 October, 23" },
    { name: "XYZ Project", date: "15 October, 23" },
    { name: "XYZ Project", date: "15 October, 23" },
  ];

  const chunkArray = (array, chunkSize) => {
    return Array(Math.ceil(array.length / chunkSize))
      .fill()
      .map((_, index) => index * chunkSize)
      .map((begin) => array.slice(begin, begin + chunkSize));
  };

  const filteredByNameProjects = projectData.filter((project) =>
    project.name.toLowerCase().includes(searchNameValue.toLowerCase())
  );

  const filteredByMonthProjects = projectData.filter((project) =>
    project.date.toLowerCase().includes(searchMonthValue.toLowerCase())
  );

  const filteredProjects = projectData.filter(
    (project) =>
      project.name.toLowerCase().includes(searchNameValue.toLowerCase()) &&
      project.date.toLowerCase().includes(searchMonthValue.toLowerCase())
  );

  const teamsChunks = chunkArray(filteredProjects, 3);

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

  const openAddProjectPopup = () => {
    setIsAddProjectOpen(true);
  };

  const closeAddProjectPopup = () => {
    setIsAddProjectOpen(false);
  };

  return (
    <div style={{ height: "100%" }}>
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
            onNameSearch={handleNameSearch}
            onMonthSearch={handleMonthSearch}
            searchTextOne="Search by name"
            searchTextTwo="Search by month"
          />
        </div>
        <Button
          onClick={openAddProjectPopup}
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "4px",
            padding: "20px 40px",
            height: "43px",
            backgroundColor: "#029894",
          }}
        >
          <span style={{ color: "#fff", textTransform: "capitalize" }}>
            Add Project
          </span>
        </Button>
      </div>
      <div className={styles.container}>
        {teamsChunks.map((chunk, chunkIndex) => (
          <Grid container key={chunkIndex} spacing={2}>
            {chunk.map((project, index) => (
              <Grid
                item
                xs={12}
                sm={4}
                key={index}
                className={styles.grid_style}
              >
                <div
                  onMouseEnter={() => handleMouseEnter(index + chunkIndex * 3)}
                  onMouseLeave={() => handleMouseLeave(index + chunkIndex * 3)}
                >
                  <DynamicCard member={true} card_style="card_style">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Typography
                          variant="h5"
                          sx={{ color: "#595959", fontWeight: "bold" }}
                        >
                          {project.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#595959",
                            fontSize: "18px",
                            marginTop: "5px",
                          }}
                        >
                          Created on: <strong>{project.date}</strong>
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
      </div>
      <Modal
        open={isAddProjectOpen}
        onClose={closeAddProjectPopup}
        aria-labelledby="add-project-modal-title"
        aria-describedby="add-project-modal-description"
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
            id="add-project-modal-title"
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
            Create Project
          </Typography>
          <TextField
            label="Enter project name"
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
          <TextField
            label="Enter starting date (DD/MM/YYYY)"
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
              onClick={closeAddProjectPopup}
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
              Create
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Projects;
