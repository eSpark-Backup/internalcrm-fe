import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { Box, Button, Typography, Modal, Grid, Skeleton } from "@mui/material";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";

import DynamicCard from "../../components/card";
import SearchBar from "../../components/search";
import AppInput from "../../components/common/appInput";
import Picker from "../../components/datePicker";

import Spin from "../../assets/logos/spin.svg?react";

import { getAllProjects } from "../../api/projects/getAllProjects";
import { createProject } from "../../api/projects/createProject";

import { storeChildData } from "../../redux/reducers/headerSlice";

import { formatDate } from "../../utils/formatdate";

import styles from "./style.module.css";

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

  const { data, isLoading } = useQuery({
    queryKey: ["FETCH_PROJECTS"],
    queryFn: () => getAllProjects(),
  });

  const [hoveredCards, setHoveredCards] = useState([]);
  const [searchNameValue, setSearchNameValue] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [searchMonthValue, setSearchMonthValue] = useState("");
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

  // Modal Input States
  const [isCreating, setIsCreating] = useState(false);
  const [createProjectState, setCreateProjectState] = useState({
    name: "",
    startingDate: null,
    description: "not required",
  });

  const inputHandler = (key, value) => {
    setCreateProjectState({ ...createProjectState, [key]: value });

    // if (key === "startingDate") {
    //   // Regular expression to match DD/MM/YYYY format
    //   const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;

    //   if (!dateFormat.test(value)) {
    //     setError("Invalid date format. Please use DD/MM/YYYY format.");
    //   } else {
    //     setError("");
    //   }
    // }
  };

  const submitHandler = () => {
    setIsCreating(true);

    createProject(createProjectState)
      .then((res) => {
        if (res.status === 200) {
          setIsCreating(false);
          setIsAddProjectOpen(false);

          return;
        }

        if (res.status === 400) {
          setIsCreating(false);

          return;
        }
      })
      .catch((error) => {
        setIsCreating(false);
        console.error(error);
      });
  };

  const handleNameSearch = (value) => {
    setSearchNameValue(value);
  };

  const handleMonthSearch = (value) => {
    setSearchMonthValue(value);
  };

  const filteredProjects = data?.data?.filter((project) =>
    project.name.toLowerCase().includes(searchNameValue.toLowerCase())
  );

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
            backgroundColor: "#029894 !important",
          }}
        >
          <span style={{ color: "#fff", textTransform: "capitalize" }}>
            Add Project
          </span>
        </Button>
      </div>

      <div className={styles.container}>
        <Grid container spacing={2}>
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  key={index}
                  className={styles.grid_style}
                >
                  <Skeleton
                    variant="rounded"
                    height={110}
                    sx={{ borderRadius: 2.5 }}
                  />
                </Grid>
              ))
            : filteredProjects?.map((project, index) => (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  key={index}
                  className={styles.grid_style}
                >
                  <div
                    onMouseEnter={() => handleMouseEnter(index * 3)}
                    onMouseLeave={() => handleMouseLeave(index * 3)}
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
                            Created on:{" "}
                            <strong>{formatDate(project?.startingDate)}</strong>
                          </Typography>
                        </div>

                        <div
                          className={`${styles.launch_icon_container} ${
                            hoveredCards[index * 3] ? styles.show_icon : ""
                          }`}
                        >
                          <Link to="/cards" state={project}>
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

          <AppInput
            onChange={(e) => inputHandler("name", e.target.value)}
            sx={{
              marginBottom: "12px",
            }}
            placeholder="Enter project name"
            value={createProjectState.name}
            type="text"
            paddingLeft={"21px"}
          />

          <Picker
            placeholder="Enter starting date (DD/MM/YYYY)"
            onChange={(date) =>
              inputHandler("startingDate", date.toISOString())
            }
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
              className={`${styles.create_btn} inter-semibold`}
              onClick={() => submitHandler()}
              disabled={isCreating}
            >
              {isCreating ? <Spin /> : "Create"}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Projects;
