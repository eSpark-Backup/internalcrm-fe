import React, { useState } from "react";
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
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import john from "../../assets/images/img.jpeg";

const AddMembersPopup = ({ isOpen, onClose }) => {
  // State to manage selected members
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // State to manage the visibility of the popup

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

  // Function to handle member selection
  const handleMemberSelect = (memberId) => {
    setSelectedMembers((prevSelected) => {
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
        zIndex: 1130,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "15px",
          maxWidth: "70%",
          width: "60%",
          height: "520px",
          padding: "20px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          overflow: "hidden",
          padding: "15px 25px 75px 25px",
          position: "relative",
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
                <TableCell
                  style={{
                    borderBottom: "20px solid #fff",
                    padding: "7px 22px",
                    textAlign: "center",
                    color: "#595959",
                    fontWeight: "700",
                  }}
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="15" cy="15" r="15" fill="white" />
                    <svg
                      width="31"
                      height="24"
                      style={{ marginTop: "2px" }}
                      viewBox="0 0 31 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 18C5 16.9391 5.42143 15.9217 6.17157 15.1716C6.92172 14.4214 7.93913 14 9 14H17C18.0609 14 19.0783 14.4214 19.8284 15.1716C20.5786 15.9217 21 16.9391 21 18C21 18.5304 20.7893 19.0391 20.4142 19.4142C20.0391 19.7893 19.5304 20 19 20H7C6.46957 20 5.96086 19.7893 5.58579 19.4142C5.21071 19.0391 5 18.5304 5 18Z"
                        stroke="#595959"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13 10C14.6569 10 16 8.65685 16 7C16 5.34315 14.6569 4 13 4C11.3431 4 10 5.34315 10 7C10 8.65685 11.3431 10 13 10Z"
                        stroke="#595959"
                      />
                    </svg>
                  </svg>
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "20px solid #fff",
                    padding: "7px 22px",
                    textAlign: "center",
                    color: "#595959",
                    fontWeight: "700",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "20px solid #fff",
                    padding: "7px 22px",
                    textAlign: "center",
                    color: "#595959",
                    fontWeight: "700",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "20px solid #fff",
                    padding: "7px 22px",
                    textAlign: "center",
                    color: "#595959",
                    fontWeight: "700",
                  }}
                >
                  Gender
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "20px solid #fff",
                    padding: "7px 22px",
                    textAlign: "center",
                    color: "#595959",
                    fontWeight: "700",
                  }}
                >
                  Job Title
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "20px solid #fff",
                    padding: "7px 22px",
                    textAlign: "center",
                    color: "#595959",
                    fontWeight: "700",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ height: "400px", overflowY: "scroll" }}>
              {" "}
              {/* Fixed height with scroll */}
              {membersData.map((member) => (
                <TableRow key={member.id}>
                  <TableCell
                    style={{
                      borderBottom: "20px solid #fff",
                      backgroundColor: "#F6F6F6",
                      padding: "0px 20px",
                      textAlign: "center",
                    }}
                  >
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
                  <TableCell
                    style={{
                      borderBottom: "20px solid #fff",
                      backgroundColor: "#F6F6F6",
                      padding: "7px 22px",
                      textAlign: "center",
                    }}
                  >
                    {member.name}
                  </TableCell>
                  <TableCell
                    style={{
                      borderBottom: "20px solid #fff",
                      backgroundColor: "#F6F6F6",
                      padding: "7px 22px",
                      textAlign: "center",
                    }}
                  >
                    {member.id}
                  </TableCell>
                  <TableCell
                    style={{
                      borderBottom: "20px solid #fff",
                      backgroundColor: "#F6F6F6",
                      padding: "7px 22px",
                      textAlign: "center",
                    }}
                  >
                    {member.gender}
                  </TableCell>
                  <TableCell
                    style={{
                      borderBottom: "20px solid #fff",
                      backgroundColor: "#F6F6F6",
                      padding: "7px 22px",
                      textAlign: "center",
                    }}
                  >
                    {member.jobTitle}
                  </TableCell>
                  <TableCell
                    style={{
                      borderBottom: "20px solid #fff",
                      backgroundColor: "#F6F6F6",
                      padding: "7px 22px",
                      textAlign: "center",
                    }}
                  >
                    <IconButton
                      sx={{ padding: "0" }}
                      onClick={() => handleMemberSelect(member.id)}
                    >
                      {selectedMembers.includes(member.id) ? (
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.5"
                            y="0.5"
                            width="29"
                            height="29"
                            rx="14.5"
                            fill="#449D44"
                          />
                          <rect
                            x="0.5"
                            y="0.5"
                            width="29"
                            height="29"
                            rx="14.5"
                            stroke="#E4E4E4"
                          />
                          <g clip-path="url(#clip0_156_2064)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M11.7402 16.9055L20.5054 9.95076C20.7184 9.78402 20.9759 9.68375 21.2456 9.66247C21.5153 9.64119 21.7853 9.69984 22.0219 9.8311C22.2585 9.96236 22.4512 10.1604 22.5759 10.4005C22.7005 10.6406 22.7517 10.9121 22.723 11.1812C22.7029 11.3605 22.6476 11.5342 22.5601 11.692C22.4726 11.8499 22.3547 11.9889 22.2133 12.101L12.2558 20.005L12.1591 20.0841C12.1195 20.1126 12.0784 20.139 12.0361 20.1631L11.9833 20.1924H11.9775C11.6639 20.3526 11.301 20.3867 10.9631 20.2875C10.6253 20.1883 10.3383 19.9635 10.1611 19.6593L10.0088 19.3985L7.45132 14.9573C7.35759 14.8012 7.29593 14.6279 7.26991 14.4476C7.2439 14.2674 7.25407 14.0837 7.29982 13.9075C7.34556 13.7312 7.42598 13.5658 7.53636 13.4209C7.64675 13.276 7.78489 13.1546 7.94273 13.0637C8.10056 12.9728 8.27492 12.9143 8.45562 12.8915C8.63633 12.8688 8.81975 12.8823 8.99519 12.9312C9.17062 12.9801 9.33455 13.0635 9.4774 13.1765C9.62025 13.2895 9.73916 13.4298 9.82718 13.5893L11.7431 16.9084L11.7402 16.9055Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_156_2064">
                              <rect
                                width="20"
                                height="20"
                                fill="white"
                                transform="translate(5 5)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      ) : (
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.5"
                            y="0.5"
                            width="29"
                            height="29"
                            rx="14.5"
                            fill="white"
                          />
                          <rect
                            x="0.5"
                            y="0.5"
                            width="29"
                            height="29"
                            rx="14.5"
                            stroke="#E4E4E4"
                          />
                          <g clip-path="url(#clip0_156_2072)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M11.7421 16.9055L20.5073 9.95076C20.7204 9.78402 20.9779 9.68375 21.2476 9.66247C21.5173 9.64119 21.7873 9.69984 22.0239 9.8311C22.2604 9.96236 22.4531 10.1604 22.5778 10.4005C22.7025 10.6406 22.7537 10.9121 22.725 11.1812C22.7049 11.3605 22.6495 11.5342 22.562 11.692C22.4746 11.8499 22.3567 11.9889 22.2152 12.101L12.2577 20.005L12.161 20.0841C12.1215 20.1126 12.0804 20.139 12.038 20.1631L11.9853 20.1924H11.9794C11.6659 20.3526 11.3029 20.3867 10.9651 20.2875C10.6273 20.1883 10.3403 19.9635 10.1631 19.6593L10.0108 19.3985L7.45327 14.9573C7.35955 14.8012 7.29788 14.6279 7.27187 14.4476C7.24586 14.2674 7.25602 14.0837 7.30177 13.9075C7.34752 13.7312 7.42793 13.5658 7.53832 13.4209C7.6487 13.276 7.78685 13.1546 7.94468 13.0637C8.10251 12.9728 8.27687 12.9143 8.45758 12.8915C8.63828 12.8688 8.82171 12.8823 8.99714 12.9312C9.17258 12.9801 9.33651 13.0635 9.47936 13.1765C9.62221 13.2895 9.74111 13.4298 9.82913 13.5893L11.7451 16.9084L11.7421 16.9055Z"
                              fill="#E4E4E4"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_156_2072">
                              <rect
                                width="20"
                                height="20"
                                fill="white"
                                transform="translate(5 5)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button
          onClick={() => setShowPopup(true)}
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
        >
          Add
        </Button>
      </div>
      <Modal
        open={showPopup}
        onClose={() => setShowPopup(false)}
        aria-labelledby="popup-ok-modal"
        aria-describedby="modal-to-confirm-addition"
      >
        {/* <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            Popup Heading
          </Typography>
          <Button
            onClick={() => {
              setShowPopup(false);
              onClose();
            }}
            variant="contained"
            color="primary"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
            }}
          >
            OK
          </Button>
        </Box> */}
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
