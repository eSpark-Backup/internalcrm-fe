import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { Button, Typography, Grid, Skeleton } from "@mui/material";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";

import DynamicCard from "../../components/card";
import SearchBar from "../../components/search";
import AppDialog from "../../components/common/appDialog";
import CustomizedSnackbars from "../../components/toast";

import { getAllProjects } from "../../api/projects/getAllProjects";
import { createProject } from "../../api/projects/createProject";

import { storeChildData } from "../../redux/reducers/headerSlice";

import { formatDate } from "../../utils/formatdate";

import styles from "./style.module.css";

const Projects = () => {
  const dispatch = useDispatch();
  const allProjects = useSelector((state) => state.projects.allProjects);

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
  // eslint-disable-next-line no-unused-vars
  const [searchMonthValue, setSearchMonthValue] = useState("");
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isActive, setIsActive] = useState(true);

  // Snackbar States
  const [snackbarState, setSnackbarState] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const { isLoading } = useQuery({
    queryKey: ["FETCH_PROJECTS"],
    queryFn: () => {
      getAllProjects(dispatch, setMessage, setSnackbarState, setSeverity);
    },
  });

  // Modal Input States
  const [isCreating, setIsCreating] = useState(false);
  const [createProjectState, setCreateProjectState] = useState({
    name: "",
    startingDate: null,
    description: "not required",
  });

  const inputHandler = (key, value) => {
    setCreateProjectState({ ...createProjectState, [key]: value });
  };

  const handleStateAdterCreation = () => {
    setCreateProjectState({
      name: "",
      startingDate: null,
      description: "not required",
    });
    setIsAddProjectOpen(false);
  };

  const submitHandler = () => {
    setIsCreating(true);

    createProject(
      createProjectState,
      dispatch,
      setMessage,
      setSnackbarState,
      setSeverity,
      setIsCreating,
      handleStateAdterCreation
    );
  };

  const handleNameSearch = (value) => {
    setSearchNameValue(value);
  };

  const handleMonthSearch = (value) => {
    setSearchMonthValue(value);
  };

  const filteredProjects = allProjects?.filter((project) =>
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
      <div style={{ marginBottom: "40px" }}>
        <SearchBar
          onNameSearch={handleNameSearch}
          onMonthSearch={handleMonthSearch}
          searchTextOne="Search by name"
          searchTextTwo="Search by month"
          btn={!!isActive}
          btnText="Add Project"
          onClick={openAddProjectPopup}
        />
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
                          <Link
                            to={`/projects/cards/${project.name}`}
                            state={project}
                          >
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

      <AppDialog
        open={isAddProjectOpen}
        padding="31px 22px"
        heading="Create Project"
        singleInput={true}
        doubleButton={true}
        leftText="Cancel"
        rightText="Create"
        weight="semibold"
        margin="12px 0px 20px"
        handleClose={closeAddProjectPopup}
        onClick={submitHandler}
        value={createProjectState.name}
        onChange={(e) => inputHandler("name", e.target.value)}
        placeholder="Enter project name"
        id="project name"
        type="text"
        sx={{
          marginBottom: "12px",
        }}
        paddingLeft="21px"
        loader={isCreating}
        hasPicker={true}
        pickerPlaceholder="Enter starting date (DD/MM/YYYY)"
        onDateChange={(date) =>
          inputHandler("startingDate", date.toISOString())
        }
      />

      <CustomizedSnackbars
        message={message}
        open={snackbarState}
        setOpen={setSnackbarState}
        severity={severity}
      />
    </div>
  );
};

export default Projects;
