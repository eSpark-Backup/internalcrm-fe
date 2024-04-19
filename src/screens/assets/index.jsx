import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Modal,
  TextField,
  Box,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { Delete, Search } from "@mui/icons-material";
import DeleteConfirmationPopup from "../../components/deletePopup";
import SearchBar from "../../components/search";
import { CopyIcon } from "../../components/svg/copyIcon";
import { DeleteIcon } from "../../components/svg/deleteIcon";
import { UploadIcon } from "../../components/svg/uploadIcon";


const Assets = () => {
  const [activeButton, setActiveButton] = useState("Links");
  const [attachModalOpen, setAttachModalOpen] = useState(false);
  const [attachLink, setAttachLink] = useState("");
  const [links, setLinks] = useState([
    {
      url: "https://www.figma.com/file/ZJrkg0zmOVpFPVzluXuODi/CRM?type=design&node-id=215-2681&mode=design&t=IU477jiPHgmKjez1-0",
      date: "22 September,23",
    },
    {
      url: "https://www.figma.com/file/ZJrkg0zmOVpFPVzluXuODi/CRM?type=design&node-id=215-2681&mode=design&t=IU477jiPHgmKjez1-0",
      date: "22 September,23",
    },
    {
      url: "https://www.figma.com/file/ZJrkg0zmOVpFPVzluXuODi/CRM?type=design&node-id=215-2681&mode=design&t=IU477jiPHgmKjez1-0",
      date: "22 September,23",
    },
    {
      url: "https://www.figma.com/file/ZJrkg0zmOVpFPVzluXuODi/CRM?type=design&node-id=215-2681&mode=design&t=IU477jiPHgmKjez1-0",
      date: "22 September,23",
    },
  ]);
  const [documents, setDocuments] = useState([
    { name: "ABC-UX/UI Requirements Document", date: "22 September,23" },
    { name: "ABC-UX/UI Requirements Document", date: "22 September,23" },
    { name: "ABC-UX/UI Requirements Document", date: "22 September,23" },
    { name: "ABC-UX/UI Requirements Document", date: "22 September,23" },
  ]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);

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
    // Update the state with the attached link
    const newLinks = [
      ...links,
      { url: attachLink, date: new Date().toDateString() },
    ];
    setLinks(newLinks);
    setAttachModalOpen(false);
    setAttachLink("");
  };

  const handleDelete = () => {
    // Handle deletion based on the active button and deletingIndex
    if (activeButton === "Links") {
      const updatedLinks = [...links];
      updatedLinks.splice(deletingIndex, 1);
      setLinks(updatedLinks);
    } else {
      const updatedDocuments = [...documents];
      updatedDocuments.splice(deletingIndex, 1);
      setDocuments(updatedDocuments);
    }
    setDeleteModalOpen(false);
    setDeletingIndex(null);
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
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "4px",
                    padding: "15px 25px",
                    height: "40px",
                    backgroundColor:
                      activeButton === "Links" ? "#029894" : "transparent",
                    color: "#fff",
                    textTransform: "capitalize",
                    fontSize: "14px",
                    fontWeight: "600",
                    border: `2px solid ${
                      activeButton === "Links" ? "#029894" : "#E4E4E4"
                    }`,
                    borderRadius: "5px 0px 0px 5px",
                    boxShadow: "none",
                    color: activeButton === "Links" ? "#fff" : "#029894",
                    "&:hover": {
                      backgroundColor:
                        activeButton === "Links" ? "#029894" : "transparent",
                      boxShadow: "none",
                    },
                  }}
                  variant="contained"
                  onClick={() => handleButtonClick("Links")}
                >
                  Links
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "4px",
                    padding: "15px 15px",
                    height: "40px",
                    backgroundColor:
                      activeButton === "Documents" ? "#029894" : "transparent",
                    color: "#fff",
                    textTransform: "capitalize",
                    fontSize: "14px",
                    fontWeight: "600",
                    border: `2px solid ${
                      activeButton === "Documents" ? "#029894" : "#E4E4E4"
                    }`,
                    borderRadius: "0px 5px 5px 0px",
                    boxShadow: "none",
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
      <Grid item xs={12}>
        {activeButton === "Links" ? (
          <>
            {links.map((link, index) => (
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
                      <CopyIcon />
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
                        setDeletingIndex(index); // Set the index of the item being deleted
                        setDeleteModalOpen(true); // Open the delete confirmation modal
                      }}
                    >
                      <DeleteIcon />
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
                      aria-label="download"
                      sx={{
                        backgroundColor: "#068987",
                        padding: "10px",
                        marginRight: "20px",
                        "&:hover": {
                          backgroundColor: "#068987",
                        },
                      }}
                    >
                      <UploadIcon />
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
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </Grid>
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
          <TextField
            label="Enter Link"
            variant="outlined"
            fullWidth
            value={attachLink}
            onChange={handleAttachLinkChange}
            sx={{
              marginBottom: "20px",
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
                background: "#068987",
                textTransform: "capitalize",
                marginTop: "20px",
                fontWeight: "bold",
              }}
            >
              Done
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
      />
    </>
  );
};

export default Assets;
