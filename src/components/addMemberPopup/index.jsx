import { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Modal,
  Box,
  Typography,
} from "@mui/material";

import john from "../../assets/images/img.jpeg";
import DeleteMarked from "../../assets/logos/delete-marked.svg?react";
import DeleteUnmarked from "../../assets/logos/delete-unmarked.svg?react";
import { UnselectedTick } from "../svg/unselectedTicks";
import { SelectedTick } from "../svg/selectedTick";
import { UserIcon } from "../svg/userIcon";
import Spin from "../../assets/logos/spin.svg?react";

import { addProjectMembers } from "../../api/projects/projectMembers/addProjectMember";
import { deleteProjectMember } from "../../api/projects/projectMembers/deleteProjectMember";

const AddMembersPopup = ({ isOpen, onClose, addingMember, projectId }) => {
  const [showPopup, setShowPopup] = useState(false);

  // Handle Add/Remove Members
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const [userIds, setUserIds] = useState([]);

  const addMembersToProject = () => {
    setIsAdding(true);

    addProjectMembers({ projectId, userIds }).then((res) => {
      if (res) {
        if (res.status === 200) {
          setIsAdding(false);
          setUserIds([]);
          setShowPopup(true);
          onClose();
        }

        if (res.status === 400 || res?.data?.error !== "") {
          setIsAdding(false);
        }
      }
    });
  };

  const removeMembersFromProject = () => {
    setIsRemoving(true);

    deleteProjectMember(projectId, userIds).then((res) => {
      if (res) {
        if (res.status === 200) {
          setIsRemoving(false);
          setUserIds([]);
          setShowPopup(true);
          onClose();
        }

        if (res.status === 400 || res?.data?.error !== "") {
          setIsRemoving(false);
        }
      }
    });
  };

  // Dummy data for members, replace with actual data from your application
  const membersData = [
    {
      id: 1,
      name: "John Doe",
      gender: "Male",
      jobTitle: "Engineer",
      imageUrl: john,
    },
    {
      id: 2,
      name: "John Doe",
      gender: "Male",
      jobTitle: "Engineer",
      imageUrl: john,
    },
    {
      id: 3,
      name: "John Doe",
      gender: "Male",
      jobTitle: "Engineer",
      imageUrl: john,
    },
    {
      id: 4,
      name: "John Doe",
      gender: "Male",
      jobTitle: "Engineer",
      imageUrl: john,
    },
    {
      id: 5,
      name: "John Doe",
      gender: "Male",
      jobTitle: "Engineer",
      imageUrl: john,
    },
    {
      id: 6,
      name: "John Doe",
      gender: "Male",
      jobTitle: "Engineer",
      imageUrl: john,
    },
    {
      id: 7,
      name: "John Doe",
      gender: "Male",
      jobTitle: "Engineer",
      imageUrl: john,
    },
    {
      id: 8,
      name: "John Doe",
      gender: "Male",
      jobTitle: "Engineer",
      imageUrl: john,
    },
    {
      id: 9,
      name: "John Doe",
      gender: "Male",
      jobTitle: "Engineer",
      imageUrl: john,
    },
    // Add more member data as needed
  ];

  const headCellStyle = {
    borderBottom: "20px solid #fff",
    padding: "7px 22px",
    textAlign: "center",
    color: "#595959",
    fontWeight: "700",
  };

  const contentCellStyle = {
    borderBottom: "20px solid #fff",
    backgroundColor: "#F6F6F6",
    padding: "0px 20px",
    textAlign: "center",
  };

  // Function to handle member selection
  const handleMemberSelect = (memberId) => {
    setUserIds((prevSelected) => {
      if (prevSelected.includes(memberId)) {
        return prevSelected.filter((id) => id !== memberId);
      } else {
        return [...prevSelected, memberId];
      }
    });
  };

  return (
    <div
      style={{
        display: isOpen ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1200,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "15px",
          maxWidth: "70%",
          width: "60%",
          height: "520px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          overflow: "hidden",
          padding: "15px 25px 75px 25px",
          position: "relative",
          zIndex: 1400,
        }}
      >
        <div style={{ overflowY: "scroll", height: "100%" }}>
          <Table>
            <TableHead
              style={{
                backgroundColor: "#F6F6F6",
                position: "sticky",
                top: 0,
                zIndex: "2",
              }}
            >
              {/* Sticky header */}
              <TableRow>
                <TableCell sx={headCellStyle}>
                  <UserIcon />
                </TableCell>
                <TableCell sx={headCellStyle}>Name</TableCell>
                <TableCell sx={headCellStyle}>ID</TableCell>
                <TableCell sx={headCellStyle}>Gender</TableCell>
                <TableCell sx={headCellStyle}>Job Title</TableCell>
                <TableCell sx={headCellStyle}>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody style={{ height: "400px", overflowY: "scroll" }}>
              {membersData.map((member) => (
                <TableRow key={member.id}>
                  <TableCell sx={contentCellStyle}>
                    <img
                      src={member.imageUrl}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        marginTop: "5px",
                      }}
                    />
                  </TableCell>

                  <TableCell sx={contentCellStyle}>{member.name}</TableCell>
                  <TableCell sx={contentCellStyle}>{member.id}</TableCell>
                  <TableCell sx={contentCellStyle}>{member.gender}</TableCell>
                  <TableCell sx={contentCellStyle}>{member.jobTitle}</TableCell>

                  <TableCell sx={contentCellStyle}>
                    <IconButton
                      sx={{ padding: "0" }}
                      onClick={() => handleMemberSelect(member.id)}
                    >
                      {addingMember ? (
                        userIds.includes(member.id) ? (
                          <UnselectedTick />
                        ) : (
                          <SelectedTick />
                        )
                      ) : userIds.includes(member.id) ? (
                        <DeleteMarked />
                      ) : (
                        <DeleteUnmarked />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Button
          onClick={() => {
            if (addingMember) {
              addMembersToProject();
            } else {
              removeMembersFromProject;
            }
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "4px",
            padding: "10px 50px",
            height: "40px",
            backgroundColor: "#029894",
            color: "#fff",
            textTransform: "capitalize",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#029894",
            },
          }}
        >
          {isAdding || isRemoving ? (
            <Spin style={{ width: "35px", height: "35px" }} />
          ) : addingMember ? (
            "Add"
          ) : (
            "Remove"
          )}
        </Button>
      </div>

      <Modal
        open={showPopup}
        onClose={() => setShowPopup(false)}
        aria-labelledby="popup-ok-modal"
        aria-describedby="modal-to-confirm-addition"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            height: 240,
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
              fontWeight: "semi",
              color: "#029E9C",
              marginBottom: "40px",
            }}
          >
            Successfully Added
          </Typography>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => {
                setShowPopup(false);
                onClose();
              }}
              sx={{
                padding: "7px 45px",
                color: "#fff",
                background: "#029894",
                textTransform: "capitalize",
                marginTop: "20px",
                fontWeight: "bold",
              }}
            >
              Ok
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddMembersPopup;
