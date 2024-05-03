import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { Button, Grid, Skeleton } from "@mui/material";

import DeleteConfirmationPopup from "../../components/deletePopup";
import SearchBar from "../../components/search";
import AppDialog from "../../components/common/appDialog";
import AssetCard from "./assetCard";
import CustomizedSnackbars from "../../components/toast";

import { uploadProjectAsset } from "../../api/projects/projectAssets/uploadProjectAsset";
import { deleteProjectAsset } from "../../api/projects/projectAssets/deleteProjectAsset";
import { getAllProjectAssets } from "../../api/projects/projectAssets/getAllProjectAssets";

import { storeChildData } from "../../redux/reducers/headerSlice";

import styles from "./style.module.css";

const Assets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const allProjectAssets = useSelector(
    (state) => state.projects.allProjectAssets
  );

  const handleClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(
      storeChildData({
        title: "Assets",
        singleButton: true,
        singleButtonText: "Back",
        handleClick,
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoading, refetch } = useQuery({
    queryFn: () => getAllProjectAssets(state.id, dispatch),
  });

  const [activeButton, setActiveButton] = useState("Links");
  const [assetId, setAssetId] = useState(null);
  // Links / Documents State
  const [assetModalOpen, setAssetModalOpen] = useState(false);
  const [attachLink, setAttachLink] = useState("");
  const [addDocument, setAddDocument] = useState(null);
  const [loadingState, setLoadingState] = useState(false);
  // Snackbar State
  const [snackbarState, setSnackbarState] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  // Deleteing Asset Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeletingAsset, setIsDeletingAsset] = useState(false);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const handleAseetModal = () => {
    setAssetModalOpen(true);
  };

  const handleCloseAttachModal = () => {
    setAssetModalOpen(false);
    setAttachLink("");
    setDeleteModalOpen(false);
    setAssetId(null);
  };

  const handleAttachLinkChange = (event) => {
    setAttachLink(event.target.value);
  };

  const handleAttachDone = () => {
    setLoadingState(true);

    let body = {
      projectId: state.id,
    };

    if (attachLink !== "" || addDocument) {
      const formData = new FormData();
      formData.append("document", addDocument);

      if (activeButton === "Links") {
        body = {
          ...body,
          link: attachLink,
          type: "link",
        };
      } else {
        body = {
          ...body,
          asset: formData,
          type: "document",
        };
      }

      uploadProjectAsset(
        body,
        dispatch,
        setMessage,
        setSnackbarState,
        setSeverity,
        setLoadingState,
        handleCloseAttachModal,
        refetch
      );
    }
  };

  const handleDelete = () => {
    setIsDeletingAsset(true);

    deleteProjectAsset(
      assetId,
      dispatch,
      setMessage,
      setSnackbarState,
      setSeverity,
      setIsDeletingAsset,
      handleCloseAttachModal
    );
  };

  const deleteAssetHandler = (assetId) => {
    setAssetId(assetId);
    setDeleteModalOpen(true);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
          marginBottom: "40px",
        }}
      >
        <div style={{ display: "flex", gap: "40px", marginLeft: "20px" }}>
          <div>
            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{
                "& .MuiGrid-root": {
                  paddingLeft: "0",
                },
              }}
            >
              <Grid item>
                <Button
                  sx={{
                    backgroundColor:
                      activeButton === "Links" ? "#029894" : "transparent",
                    borderColor:
                      activeButton === "Links" ? "#029894" : "#E4E4E4",
                    color: activeButton === "Links" ? "#fff" : "#029894",

                    "&:hover": {
                      backgroundColor:
                        activeButton === "Links" ? "#029894" : "transparent",
                      boxShadow: "none",
                    },
                  }}
                  variant="contained"
                  onClick={() => handleButtonClick("Links")}
                  className={`inter-semibold ${styles.sub_buttons}`}
                >
                  Links
                </Button>
              </Grid>

              <Grid item>
                <Button
                  sx={{
                    backgroundColor:
                      activeButton === "Documents" ? "#029894" : "transparent",
                    borderColor:
                      activeButton === "Documents" ? "#029894" : "#E4E4E4",
                    color: activeButton === "Documents" ? "#fff" : "#029894",
                    "&:hover": {
                      backgroundColor:
                        activeButton === "Documents"
                          ? "#029894"
                          : "transparent",
                      boxShadow: "none",
                    },
                  }}
                  variant="contained"
                  onClick={() => handleButtonClick("Documents")}
                  className={`inter-semibold ${styles.sub_buttons}`}
                >
                  Documents
                </Button>
              </Grid>
            </Grid>
          </div>

          <div
            style={{
              display: "flex",
            }}
          >
            <SearchBar searchTextOne="Search by name" hideJobTitleSearch />
          </div>
        </div>

        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "4px",
            padding: "20px 50px",
            height: "35px",
            backgroundColor: "#029894",
            color: "#fff",
            textTransform: "capitalize",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#029894",
            },
          }}
          onClick={handleAseetModal}
        >
          {activeButton === "Links" ? "Attach " : "Upload"}
        </Button>
      </div>

      <div className={styles.container}>
        <Grid item xs={12}>
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  height="80px"
                  variant="rounded"
                  sx={{ marginBottom: 2.5 }}
                />
              ))
            : allProjectAssets &&
              allProjectAssets?.map((link, index) => (
                <AssetCard
                  key={index}
                  data={link}
                  activeButton={activeButton}
                  deleteAssetHandler={deleteAssetHandler}
                />
              ))}
        </Grid>
      </div>

      {/* Attach Modal */}
      <AppDialog
        open={assetModalOpen}
        padding="31px 22px"
        heading={activeButton === "Links" ? "Attach Link" : "Upload Documents"}
        singleInput={activeButton === "Links" && true}
        doubleButton={true}
        hasImage={activeButton === "Documents" && true}
        leftText="Cancel"
        rightText="Done"
        weight="semibold"
        margin="40px 0px 24px"
        handleClose={handleCloseAttachModal}
        onClick={handleAttachDone}
        value={attachLink}
        onChange={handleAttachLinkChange}
        onAcceptImage={setAddDocument}
        placeholder={
          activeButton === "Links" ? "Enter Link" : "Upload Documents"
        }
        id="add asset"
        sx={{
          marginBottom: "20px",
        }}
        paddingLeft="21px"
        loader={loadingState}
      />

      <DeleteConfirmationPopup
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleDelete={handleDelete}
        heading="Delete Asset"
        sentence="Are you sure you want to delete your asset?"
        isDeleting={isDeletingAsset}
      />

      <CustomizedSnackbars
        message={message}
        open={snackbarState}
        setOpen={setSnackbarState}
        severity={severity}
      />
    </>
  );
};

export default Assets;
