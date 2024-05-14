import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Typography, Grid } from "@mui/material";

import DynamicCard from "../../components/card";
import SearchBar from "../../components/search";
import AppDialog from "../../components/common/appDialog";

import Edit from "../../assets/logos/edit-color.svg?react";
import Delete from "../../assets/logos/delete-grey.svg?react";

import { sources } from "../../constants/sourceData";

import { storeChildData } from "../../redux/reducers/headerSlice";

import styles from "./styles.module.css";

const Sources = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      storeChildData({
        title: "Lead Sources",
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
  const [currentIndex, setCurrentIndex] = useState(null);

  const [sourceData, setSourceData] = useState(sources);

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
  const openEditPopup = (index, e) => {
    e.stopPropagation();

    setCurrentIndex(index);
    setNewSourceName(sourceData[index].name);

    setIsEditPopupOpen(true);

    setIsAddSourcesOpen(true);
  };

  const openAddsourcesPopup = () => {
    setIsAddSourcesOpen(true);
  };

  const closeAddsourcesPopup = () => {
    setIsAddSourcesOpen(false);

    setTimeout(() => {
      setIsEditPopupOpen(false);
      setNewSourceName("");
    }, 100);
  };

  const addSource = (newSourceName) => {
    const newSource = { name: newSourceName, date: "1" };
    setSourceData((prevData) => [...prevData, newSource]);
    closeAddsourcesPopup();
  };

  const handleDelete = (index, e) => {
    e.stopPropagation();

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
    updatedSourceData[currentIndex].name = newSourceName;
    setSourceData(updatedSourceData);
    closeAddsourcesPopup();

    setTimeout(() => {
      setIsEditPopupOpen(false);
    }, 100);
  };

  return (
    <div>
      <SearchBar
        hideJobTitleSearch
        onNameSearch={handleNameSearch}
        onMonthSearch={handleMonthSearch}
        searchTextOne="Search by name"
        searchTextTwo="Search by month"
        btn={true}
        btnText="Add source"
        onClick={openAddsourcesPopup}
      />

      <Grid container spacing={2}>
        {filteredsourcess?.map((sources, index) => (
          <Grid item xs={12} sm={4} key={index} className={styles.grid_style}>
            <div
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => navigate("/lead-status")}
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
                      onClick={(e) => handleDelete(index, e)}
                    >
                      <Delete />
                    </div>

                    <div
                      className={`${styles.edit_icon_container} ${
                        styles.icons_container
                      } ${hoveredCards[index] ? styles.show_icon : ""}`}
                      onClick={(e) => openEditPopup(index, e)}
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
        handleClose={closeAddsourcesPopup}
        onClick={() => {
          isEditPopupOpen ? handleEdit() : addSource(newSourceName);
        }}
        value={newSourceName}
        onChange={(e) => setNewSourceName(e.target.value)}
        placeholder="Enter source name"
        id="project name"
        type="text"
        sx={{
          marginBottom: "12px",
        }}
        paddingLeft="21px"
        // loader={isCreating}
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
      />
    </div>
  );
};

export default Sources;
