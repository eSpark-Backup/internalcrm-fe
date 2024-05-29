import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { Typography, Grid, Skeleton } from "@mui/material";

import DynamicCard from "../../components/card";
import SearchBar from "../../components/search";
import AppDialog from "../../components/common/appDialog";
import CustomizedSnackbars from "../../components/toast";

import Edit from "../../assets/logos/edit-color.svg?react";
import Delete from "../../assets/logos/delete-grey.svg?react";

import { getAllLeadSources } from "../../api/leadSources/getAllLeadSources";
import { createLeadSource } from "../../api/leadSources/createLeadSource";
import { deleteLeadSource } from "../../api/leadSources/deleteLeadSource";
import { updateLeadSource } from "../../api/leadSources/updateLeadSource";

import { storeChildData } from "../../redux/reducers/headerSlice";

import styles from "./styles.module.css";

const Sources = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allLeadSources = useSelector(
    (state) => state.leadSources.allLeadSources
  );

  useEffect(() => {
    dispatch(
      storeChildData({
        title: "Lead Sources",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [hoveredCards, setHoveredCards] = useState([]);
  const [isAddSourcesOpen, setIsAddSourcesOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const [searchNameValue, setSearchNameValue] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [sourceId, setSourceId] = useState(null);
  const [isDoingAction, setIsDoingAction] = useState(false);
  // Snackbar States
  const [snackbarState, setSnackbarState] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const { isLoading, refetch } = useQuery({
    queryFn: () => {
      getAllLeadSources(dispatch, setMessage, setSnackbarState, setSeverity);
    },
  });

  const handleNameSearch = (value) => {
    setSearchNameValue(value);
  };

  const filteredsourcess = allLeadSources.filter((source) =>
    source.name.toLowerCase().includes(searchNameValue.toLowerCase())
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

  // Add function to open edit popup
  const openEditPopup = (sources, e) => {
    e.stopPropagation();

    setSourceName(sources.name);
    setSourceId(sources.id);

    setIsEditPopupOpen(true);
    setIsAddSourcesOpen(true);
  };

  const openAddsourcesPopup = () => {
    setIsAddSourcesOpen(true);
  };

  const closeSourcePopup = () => {
    setIsAddSourcesOpen(false);
    setDeletePopupOpen(false);

    setTimeout(() => {
      setIsEditPopupOpen(false);
      setSourceName("");
    }, 100);
  };

  const addSource = () => {
    setIsDoingAction(true);

    createLeadSource(
      { name: sourceName },
      dispatch,
      setMessage,
      setSnackbarState,
      setSeverity,
      setIsDoingAction,
      closeSourcePopup,
      refetch
    );
  };

  const handleDelete = (sources, e) => {
    e.stopPropagation();

    setSourceId(sources.id);
    setDeletePopupOpen(true);
  };

  const confirmDelete = () => {
    setIsDoingAction(true);

    deleteLeadSource(
      sourceId,
      dispatch,
      setMessage,
      setSnackbarState,
      setSeverity,
      setIsDoingAction,
      closeSourcePopup
    );
  };

  const handleEdit = () => {
    setIsDoingAction(true);

    updateLeadSource(
      sourceId,
      { name: sourceName },
      dispatch,
      setMessage,
      setSnackbarState,
      setSeverity,
      setIsDoingAction,
      closeSourcePopup,
      refetch
    );

    setTimeout(() => {
      setIsEditPopupOpen(false);
    }, 100);
  };

  return (
    <div>
      <SearchBar
        hideJobTitleSearch
        onNameSearch={handleNameSearch}
        searchTextOne="Search by name"
        searchTextTwo="Search by month"
        btn={true}
        btnText="Add source"
        onClick={openAddsourcesPopup}
      />

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
                <DynamicCard member={true}>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                </DynamicCard>
              </Grid>
            ))
          : filteredsourcess?.map((sources, index) => (
              <Grid
                item
                xs={12}
                sm={4}
                key={index}
                className={styles.grid_style}
              >
                <div
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  onClick={() => navigate("/lead-status", { state: sources })}
                  style={{ cursor: "pointer" }}
                >
                  <DynamicCard member={true} card_style="card_style">
                    <div className="d-flex-between">
                      <div>
                        <Typography
                          variant="h5"
                          className={`inter-semibold ${styles.source_name}`}
                        >
                          {sources.name}
                        </Typography>

                        <Typography className={`inter-regular ${styles.lead}`}>
                          Lead: <strong>{sources.date}</strong>
                        </Typography>
                      </div>

                      <div style={{ display: "flex" }}>
                        <div
                          className={`${styles.delete_icon_container} ${
                            styles.icons_container
                          } ${hoveredCards[index] ? styles.show_icon : ""}`}
                          onClick={(e) => handleDelete(sources, e)}
                        >
                          <Delete />
                        </div>

                        <div
                          className={`${styles.edit_icon_container} ${
                            styles.icons_container
                          } ${hoveredCards[index] ? styles.show_icon : ""}`}
                          onClick={(e) => openEditPopup(sources, e)}
                        >
                          <Edit />
                        </div>
                      </div>
                    </div>
                  </DynamicCard>
                </div>
              </Grid>
            ))}
      </Grid>

      <AppDialog
        open={isAddSourcesOpen}
        padding="31px 22px"
        heading={isEditPopupOpen ? "Edit Source" : "Add Source"}
        singleInput={true}
        doubleButton={true}
        leftText="Cancel"
        rightText={isEditPopupOpen ? "Save" : "Add"}
        weight="semibold"
        margin="40px 0px 32px"
        handleClose={closeSourcePopup}
        onClick={() => {
          isEditPopupOpen ? handleEdit() : addSource();
        }}
        value={sourceName}
        onChange={(e) => setSourceName(e.target.value)}
        placeholder="Enter source name"
        id="project name"
        type="text"
        sx={{
          marginBottom: "12px",
        }}
        paddingLeft="21px"
        loader={isDoingAction}
      />

      <AppDialog
        open={deletePopupOpen}
        padding="32px 38px"
        heading="Delete Card"
        textBox={true}
        text="Are you sure you want to delete this card?"
        doubleButton={true}
        leftText="No"
        rightText="Yes"
        textClass={styles.text_class}
        weight="regular"
        margin="47px 0px"
        handleClose={() => setDeletePopupOpen(false)}
        onClick={confirmDelete}
        loader={isDoingAction}
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

export default Sources;
