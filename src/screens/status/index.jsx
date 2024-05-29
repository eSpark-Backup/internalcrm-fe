import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";

import SearchBar from "../../components/search";
import OverviewPopup from "../../components/overviewPopup";
import AppDialog from "../../components/common/appDialog";

import Navigation from "../../assets/logos/navigation.svg?react";

import { storeChildData } from "../../redux/reducers/headerSlice";

import styles from "./style.module.css";

const Status = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(
      storeChildData({
        title: "Lead Status",
        singleButton: true,
        singleButtonText: "Back",
        handleClick,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [popupOpen, setPopupOpen] = useState(false);
  const [searchNameValue, setSearchNameValue] = useState("");
  //
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [addDocument, setAddDocument] = useState(null);
  const [loadingState, setLoadingState] = useState(false);

  const handleAttachDone = () => {
    setLoadingState(true);

    const formData = new FormData();
    formData.append("asset", addDocument);
    formData.append("sourceId", state.id);

    // uploadProjectAsset(
    //   body,
    //   dispatch,
    //   setMessage,
    //   setSnackbarState,
    //   setSeverity,
    //   setLoadingState,
    //   handleCloseAttachModal,
    //   refetch
    // );
  };

  const handleCloseModal = () => {
    setDocumentModalOpen(false);
    setAddDocument(null);
  };

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
          onClick={() => setDocumentModalOpen(true)}
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

      <AppDialog
        open={documentModalOpen}
        padding="31px 22px"
        heading="Upload Lead"
        doubleButton={true}
        hasImage={true}
        leftText="Cancel"
        rightText="Done"
        weight="semibold"
        margin="40px 0px 24px"
        handleClose={handleCloseModal}
        onClick={handleAttachDone}
        onAcceptImage={setAddDocument}
        placeholder="Upload Lead"
        id="upload lead"
        sx={{
          marginBottom: "20px",
        }}
        paddingLeft="21px"
        loader={loadingState}
      />
    </div>
  );
};

export default Status;
