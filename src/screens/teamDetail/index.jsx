import React, { useState } from "react";
import SearchBar from "../../components/search";
import style from "./style.module.css";
import {
  Typography,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material"; // Import necessary Material-UI components
import john from "../../assets/images/img.jpeg";

import styles from "./style.module.css";

const TeamDetail = () => {
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleMemberSelect = (memberId) => {
    setSelectedMembers((prevSelected) => {
      if (prevSelected.includes(memberId)) {
        return prevSelected.filter((id) => id !== memberId);
      } else {
        return [...prevSelected, memberId];
      }
    });
  };
  const membersData = [
    {
      id: 1,
      name: "John Doe",
      role: "Senior",
      jobTitle: "Engineer",
      imageUrl: john,
    },
    {
      id: 2,
      name: "John Doe",
      role: "Senior",
      jobTitle: "Engineer",
      imageUrl: john,
    },
    {
      id: 3,
      name: "John Doe",
      role: "Senior",
      jobTitle: "Engineer",
      imageUrl: john,
    },
    {
      id: 4,
      name: "John Doe",
      role: "Senior",
      jobTitle: "Engineer",
      imageUrl: john,
    },
    {
      id: 5,
      name: "John Doe",
      role: "Senior",
      jobTitle: "Engineer",
      imageUrl: john,
    },
    {
      id: 6,
      name: "John Doe",
      role: "Senior",
      jobTitle: "Engineer",
      imageUrl: john,
    },
    {
      id: 7,
      name: "John Doe",
      role: "Senior",
      jobTitle: "Engineer",
      imageUrl: john,
    },
    {
      id: 8,
      name: "John Doe",
      role: "Senior",
      jobTitle: "Engineer",
      imageUrl: john,
    },
    {
      id: 9,
      name: "John Doe",
      role: "Senior",
      jobTitle: "Engineer",
      imageUrl: john,
    },
    // Add more member data as needed
  ];
  return (
    <div>
      <SearchBar
        searchTextOne="Search by name"
        searchTextTwo="Search by job title"
      />
      <div className={styles.container}>
        <div className={style.head_style}>
          <Typography
            variant="h5"
            sx={{
              color: "#595959",
              fontWeight: "700",
              fontSize: "20px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Head
          </Typography>
          <Grid
            sx={{ paddingLeft: "70px" }}
            container
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M59.9976 8.27539C46.2842 8.29072 33.1369 13.7451 23.44 23.442C13.7432 33.1388 8.28877 46.2861 8.27344 59.9995C8.29641 73.7106 13.7533 86.8535 23.4485 96.5486C33.1436 106.244 46.2865 111.701 59.9976 111.724C73.7157 111.724 86.8719 106.274 96.5721 96.574C106.272 86.8739 111.722 73.7176 111.722 59.9995C111.722 46.2814 106.272 33.1252 96.5721 23.425C86.8719 13.7249 73.7157 8.27539 59.9976 8.27539ZM91.4583 89.8464C88.5533 83.9871 84.0688 79.0563 78.5106 75.6101C72.9523 72.164 66.5416 70.3397 60.0018 70.3432C53.4619 70.3466 47.0532 72.1776 41.4986 75.6296C35.944 79.0816 31.4646 84.0172 28.5658 89.8795C20.8317 81.8582 16.5222 71.1422 16.5493 59.9995C16.5493 48.4763 21.1269 37.4251 29.275 29.277C37.4231 21.1288 48.4744 16.5513 59.9976 16.5513C71.5208 16.5513 82.572 21.1288 90.7201 29.277C98.8683 37.4251 103.446 48.4763 103.446 59.9995C103.472 71.1266 99.1735 81.8285 91.4583 89.8464ZM59.9976 28.965C56.3148 28.965 52.7146 30.0571 49.6525 32.1032C46.5903 34.1493 44.2037 37.0574 42.7943 40.4599C41.3849 43.8624 41.0162 47.6064 41.7347 51.2185C42.4532 54.8305 44.2266 58.1484 46.8308 60.7525C49.4349 63.3567 52.7528 65.1301 56.3649 65.8486C59.9769 66.5671 63.7209 66.1984 67.1234 64.789C70.5259 63.3797 73.434 60.993 75.4801 57.9308C77.5262 54.8687 78.6183 51.2686 78.6183 47.5857C78.6183 45.1404 78.1366 42.7191 77.2008 40.4599C76.2651 38.2007 74.8935 36.148 73.1644 34.4189C71.4353 32.6898 69.3826 31.3182 67.1234 30.3825C64.8642 29.4467 62.4429 28.965 59.9976 28.965Z"
                  fill="#595959"
                />
              </svg>
            </Grid>
          </Grid>
          {/* Details */}
          <div style={{ paddingLeft: "50px" }}>
            <Typography
              sx={{ fontSize: "14px", color: "#595959", marginBottom: "5px" }}
              variant="subtitle1"
            >
              <b>Name:</b> John Doe
            </Typography>
            <Typography
              sx={{ fontSize: "14px", color: "#595959", marginBottom: "5px" }}
              variant="subtitle1"
            >
              <b>Phone:</b> +123456789
            </Typography>{" "}
            {/* Phone */}
            <Typography
              sx={{ fontSize: "14px", color: "#595959", marginBottom: "5px" }}
              variant="subtitle1"
            >
              <b> Email:</b> john@example.com
            </Typography>{" "}
            {/* Email */}
            <Typography
              sx={{ fontSize: "14px", color: "#595959", marginBottom: "5px" }}
              variant="subtitle1"
            >
              <b>Joined Date:</b> 2024-04-19
            </Typography>{" "}
            {/* Joined date */}
          </div>
        </div>
        <div>
          <Typography
            variant="h5"
            sx={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#595959",
              backgroundColor: "#fff",
              padding: "15px",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          >
            Members(12)
          </Typography>
          <div style={{ overflowY: "scroll", height: "100%" }}>
            <Table sx={{ height: "562px" }}>
              <TableHead
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: "2",
                }}
              >
                {/* Sticky header */}
                <TableRow>
                  <TableCell
                    style={{
                      borderBottom: "none",
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
                      borderBottom: "none",
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
                      borderBottom: "none",
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
                      borderBottom: "none",
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
                      borderBottom: "none",
                      padding: "7px 22px",
                      textAlign: "center",
                      color: "#595959",
                      fontWeight: "700",
                    }}
                  >
                    Role
                  </TableCell>
                  <TableCell
                    style={{
                      borderBottom: "none",
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
                        borderBottom: "none",
                        backgroundColor: "#fff",
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
                        borderBottom: "none",
                        backgroundColor: "#fff",
                        padding: "7px 22px",
                        textAlign: "center",
                      }}
                    >
                      {member.name}
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "none",
                        backgroundColor: "#fff",
                        padding: "7px 22px",
                        textAlign: "center",
                      }}
                    >
                      {member.id}
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "none",
                        backgroundColor: "#fff",
                        padding: "7px 22px",
                        textAlign: "center",
                      }}
                    >
                      {member.jobTitle}
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "none",
                        backgroundColor: "#fff",
                        padding: "7px 22px",
                        textAlign: "center",
                      }}
                    >
                      {member.role}
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "none",
                        backgroundColor: "#fff",
                        padding: "7px 22px",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#49ACE1",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        Request
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
