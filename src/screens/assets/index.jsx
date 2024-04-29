import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import {
  Button,
  Grid,
  Typography,
  Modal,
  Box,
  Card,
  CardContent,
  IconButton,
  Skeleton,
} from "@mui/material";

import DeleteConfirmationPopup from "../../components/deletePopup";
import SearchBar from "../../components/search";
import AppInput from "../../components/common/appInput";

import Spin from "../../assets/logos/spin.svg?react";

import { uploadProjectAsset } from "../../api/projects/uploadProjectAsset";
import { deleteProjectAsset } from "../../api/projects/deleteProjectAsset";
import { getAllProjectAssets } from "../../api/projects/getAllProjectAssets";

import { storeChildData } from "../../redux/reducers/headerSlice";

import styles from "./style.module.css";

const Assets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

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

  const { data, isLoading } = useQuery({
    queryFn: () => getAllProjectAssets(state.id),
  });

  const [activeButton, setActiveButton] = useState("Links");
  const [attachModalOpen, setAttachModalOpen] = useState(false);
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
              {data?.data?.map((link, index) => (
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
                        {/* Your SVG icon */}
                        <svg
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.30716 0H16.1867C17.1886 0 18 0.761564 18 1.70182V13.6145H16.1867V1.70182H5.30716V0ZM2.58726 3.40364H12.5602C13.562 3.40364 14.3735 4.1652 14.3735 5.10545V17.0182C14.3735 17.9584 13.562 18.72 12.5602 18.72H2.58726C1.58544 18.72 0.774 17.9584 0.774 17.0182V5.10545C0.774 4.1652 1.58544 3.40364 2.58726 3.40364ZM2.58726 17.0182H12.5602V5.10545H2.58726V17.0182Z"
                            fill="white"
                          />
                        </svg>
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
                        <svg
                          width="14"
                          height="16"
                          viewBox="0 0 14 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.615 15.77C2.16833 15.77 1.78733 15.6127 1.472 15.298C1.15733 14.9833 1 14.6023 1 14.155V1.77H0V0.77H4V0H10V0.77H14V1.77H13V14.155C13 14.615 12.846 14.999 12.538 15.307C12.2293 15.6157 11.845 15.77 11.385 15.77H2.615ZM12 1.77H2V14.155C2 14.3343 2.05767 14.4817 2.173 14.597C2.28833 14.7123 2.43567 14.77 2.615 14.77H11.385C11.5383 14.77 11.6793 14.706 11.808 14.578C11.936 14.4493 12 14.3083 12 14.155V1.77ZM4.808 12.77H5.808V3.77H4.808V12.77ZM8.192 12.77H9.192V3.77H8.192V12.77Z"
                            fill="white"
                          />
                        </svg>
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
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196666 15.0217 0.000666667 14.5507 0 14V11H2V14H14V11H16V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16.0007 14 16H2Z"
                            fill="white"
                          />
                        </svg>
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
                        <svg
                          width="14"
                          height="16"
                          viewBox="0 0 14 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.615 15.77C2.16833 15.77 1.78733 15.6127 1.472 15.298C1.15733 14.9833 1 14.6023 1 14.155V1.77H0V0.77H4V0H10V0.77H14V1.77H13V14.155C13 14.615 12.846 14.999 12.538 15.307C12.2293 15.6157 11.845 15.77 11.385 15.77H2.615ZM12 1.77H2V14.155C2 14.3343 2.05767 14.4817 2.173 14.597C2.28833 14.7123 2.43567 14.77 2.615 14.77H11.385C11.5383 14.77 11.6793 14.706 11.808 14.578C11.936 14.4493 12 14.3083 12 14.155V1.77ZM4.808 12.77H5.808V3.77H4.808V12.77ZM8.192 12.77H9.192V3.77H8.192V12.77Z"
                            fill="white"
                          />
                        </svg>
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
      <Modal
        open={attachModalOpen}
        onClose={handleCloseAttachModal}
        aria-labelledby="attach-modal-title"
        aria-describedby="attach-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            height: 260,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: "30px 20px",
            borderRadius: "7px",
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              textAlign: "center",
              fontWeight: "600",
              color: "#029E9C",
              marginBottom: "40px",
            }}
          >
            Attach Link
          </Typography>

          <AppInput
            value={attachLink}
            onChange={handleAttachLinkChange}
            placeholder="Attach Link"
            sx={{
              marginBottom: "20px",
            }}
            paddingLeft="21px"
          />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={handleCloseAttachModal}
              sx={{
                padding: "7px 45px",
                color: "#068987",
                border: "1px solid #068987",
                textTransform: "capitalize",
                marginRight: "10px",
                marginTop: "20px",
                fontWeight: "bold",
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleAttachDone}
              sx={{
                padding: "7px 45px",
                color: "#fff",
                background: "#068987 !important",
                textTransform: "capitalize",
                marginTop: "20px",
                fontWeight: "bold",
                width: "120px",
              }}
            >
              {addLink ? (
                <Spin style={{ width: "25px", height: "100%" }} />
              ) : (
                "Done"
              )}
            </Button>
          </div>
        </Box>
      </Modal>

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
