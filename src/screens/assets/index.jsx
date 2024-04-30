import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Skeleton,
} from "@mui/material";

import DeleteConfirmationPopup from "../../components/deletePopup";
import SearchBar from "../../components/search";
import AppDialog from "../../components/common/appDialog";

import Copy from "../../assets/logos/copy.svg?react";
import Download from "../../assets/logos/download.svg?react";
import DeleteLight from "../../assets/logos/delete-light.svg?react";

import { uploadProjectAsset } from "../../api/projects/uploadProjectAsset";
import { deleteProjectAsset } from "../../api/projects/deleteProjectAsset";
import { getAllProjectAssets } from "../../api/projects/getAllProjectAssets";

import { storeChildData } from "../../redux/reducers/headerSlice";

import styles from "./style.module.css";

const Assets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const allProjectAssets = useSelector(
    (state) => state.projects.allProjectAssets
  );
  console.log(allProjectAssets);

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

  const { isLoading } = useQuery({
    queryFn: () => getAllProjectAssets(state.id, dispatch),
  });

  const [activeButton, setActiveButton] = useState("Links");
  const [attachModalOpen, setAttachModalOpen] = useState(true);
  const [attachLink, setAttachLink] = useState("");
  const [addLink, setLink] = useState(false);
  const [documents] = useState([
    {
      name: "ABC-UX/UI Requirements Document",
      date: "22 September,23",
      assetId: 1,
    },
    {
      name: "ABC-UX/UI Requirements Document",
      date: "22 September,23",
      assetId: 2,
    },
    {
      name: "ABC-UX/UI Requirements Document",
      date: "22 September,23",
      assetId: 3,
    },
    {
      name: "ABC-UX/UI Requirements Document",
      date: "22 September,23",
      assetId: 4,
    },
  ]);

  // Deleteing Asset Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingAsset, setDeletingAsset] = useState(null);
  const [isDeletingAsset, setIsDeletingAsset] = useState(false);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const handleAttach = () => {
    setAttachModalOpen(true);
  };

  const handleCloseAttachModal = () => {
    setAttachModalOpen(false);
  };

  const handleAttachLinkChange = (event) => {
    setAttachLink(event.target.value);
  };

  const handleAttachDone = () => {
    setLink(true);

    let body = {
      projectId: state.id,
    };

    if (attachLink !== "") {
      if (activeButton === "Links") {
        body = {
          ...body,
          link: attachLink,
          type: "link",
        };
      } else {
        body = {
          ...body,
          asset: attachLink,
          type: "document",
        };
      }

      uploadProjectAsset(body)
        .then((res) => {
          if (res) {
            console.log(res);

            if (res.status === 200) {
              setAttachLink("");
              setAttachModalOpen(false);
              setLink(false);

              return;
            }

            if (res.status === 400 || res?.data?.error !== "") {
              setLink(false);
            }
          }
        })
        .catch((error) => {
          setLink(false);
          console.log(error);
        });
    }
  };

  const handleDelete = () => {
    setIsDeletingAsset(true);

    deleteProjectAsset(deletingAsset).then((res) => {
      if (res) {
        if (res.status === 200) {
          setIsDeletingAsset(false);
          setDeleteModalOpen(false);
          setDeletingAsset(null);

          return;
        }

        if (res.status === 400 || res?.data?.error !== "") {
          setIsDeletingAsset(false);
        }
      }
    });
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
          onClick={activeButton === "Links" ? handleAttach : ""}
        >
          {activeButton === "Links" ? "Attach " : "Upload"}
        </Button>
      </div>

      <div className={styles.container}>
        <Grid item xs={12}>
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                height="80px"
                variant="rounded"
                sx={{ marginBottom: 2.5 }}
              />
            ))
          ) : activeButton === "Links" ? (
            <>
              {allProjectAssets?.map((link, index) => (
                <Card
                  key={index}
                  sx={{
                    width: "100%",
                    marginBottom: "15px",
                    borderRadius: "12px",
                    boxShadow:
                      "0px 1px 1px -1px rgba(0,0,0,0.2),0px 0px 1px 0px rgba(0,0,0,0.14),0px 4px 8px 0px rgba(0,0,0,0.12)",
                  }}
                >
                  <CardContent
                    style={{
                      display: "grid",
                      gridTemplateColumns: "3.5fr 1fr 1fr",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="body1">{link.url}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {link.date}
                    </Typography>
                    <div>
                      <IconButton
                        aria-label="copy"
                        sx={{
                          backgroundColor: "#068987",
                          padding: "10px",
                          marginRight: "20px",
                          "&:hover": {
                            backgroundColor: "#068987",
                          },
                        }}
                        onClick={() => {
                          /* Handle copy */
                        }}
                      >
                        <Copy />
                      </IconButton>

                      <IconButton
                        aria-label="delete"
                        sx={{
                          backgroundColor: "#FF0000",
                          padding: "11px",
                          marginRight: "-30px",
                          "&:hover": {
                            backgroundColor: "#FF0000",
                          },
                        }}
                        onClick={() => {
                          setDeletingAsset(link.assetId);
                          setDeleteModalOpen(true);
                        }}
                      >
                        <DeleteLight />
                      </IconButton>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <>
              {documents.map((doc, index) => (
                <Card
                  key={index}
                  sx={{
                    width: "100%",
                    marginBottom: "15px",
                    borderRadius: "12px",
                    boxShadow:
                      "0px 1px 1px -1px rgba(0,0,0,0.2),0px 0px 1px 0px rgba(0,0,0,0.14),0px 4px 8px 0px rgba(0,0,0,0.12)",
                  }}
                >
                  <CardContent
                    style={{
                      display: "grid",
                      gridTemplateColumns: "3.5fr 1fr 1fr",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="body1">{doc.name}</Typography>

                    <Typography variant="body2" color="textSecondary">
                      {doc.date}
                    </Typography>

                    <div>
                      <IconButton
                        aria-label="copy"
                        sx={{
                          backgroundColor: "#068987",
                          padding: "10px",
                          marginRight: "20px",
                          "&:hover": {
                            backgroundColor: "#068987",
                          },
                        }}
                      >
                        {/* Your SVG icon */}
                        <Download />
                      </IconButton>

                      <IconButton
                        aria-label="delete"
                        sx={{
                          backgroundColor: "#FF0000",
                          padding: "11px",
                          marginRight: "-30px",
                          "&:hover": {
                            backgroundColor: "#FF0000",
                          },
                        }}
                        onClick={() => {
                          setDeletingAsset(doc.assetId);
                          setDeleteModalOpen(true);
                        }}
                      >
                        <DeleteLight />
                      </IconButton>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </Grid>
      </div>

      {/* Attach Modal */}
      <AppDialog
        open={attachModalOpen}
        padding="31px 22px"
        heading="Attach Link"
        singleInput={true}
        doubleButton={true}
        leftText="Cancel"
        rightText="Done"
        weight="semibold"
        margin="40px 0px 24px"
        handleClose={handleCloseAttachModal}
        onClick={handleAttachDone}
        value={attachLink}
        onChange={handleAttachLinkChange}
        placeholder="Enter Link"
        id="attach link"
        sx={{
          marginBottom: "20px",
        }}
        paddingLeft="21px"
        loader={addLink}
      />

      <DeleteConfirmationPopup
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleDelete={handleDelete}
        heading="Delete Asset"
        sentence="Are you sure you want to delete your asset?"
        isDeleting={isDeletingAsset}
      />
    </>
  );
};

export default Assets;
