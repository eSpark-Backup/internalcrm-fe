import { useState } from "react";

import {
  Typography,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";

import SearchBar from "../../components/search";
import AppDialog from "../../components/common/appDialog";

import User from "../../assets/logos/change-password.svg?react";
import Head from "../../assets/logos/head-image.svg?react";

import { header, membersData } from "../../constants/teamDetails";

import styles from "./style.module.css";

const TeamDetail = () => {
  const [requestDialog, setRequestDialog] = useState(false);
  const [requested, setRequested] = useState(false);

  const onClick = () => {
    handleClose();
    setRequested(false);
  };

  const handleClose = () => {
    setRequestDialog(false);
  };

  const handleRequestDialog = () => {
    setRequestDialog(true);
  };

  return (
    <>
      <SearchBar
        searchTextOne="Search by name"
        searchTextTwo="Search by job title"
      />

      <Grid container className={styles.grid_container}>
        <Grid
          item
          md={4}
          xs={12}
          sx={{
            height: { lg: "100%", xs: "auto" },
            marginBottom: { lg: 0, xs: 3 },
          }}
        >
          <div className={styles.head_style}>
            <Typography variant="h5" className={`${styles.head} inter-bold`}>
              Head
            </Typography>

            <div className={styles.head_image}>
              <Head />
            </div>

            <div>
              <Typography
                className={`${styles.details} inter-regular`}
                variant="subtitle1"
              >
                <span className={`inter-bold`}>Name:</span> John Doe
              </Typography>

              <Typography
                className={`${styles.details} inter-regular`}
                variant="subtitle1"
              >
                <span className={`inter-bold`}> Email:</span> john@example.com
              </Typography>

              <Typography
                className={`${styles.details} inter-regular`}
                variant="subtitle1"
              >
                <span className={`inter-bold`}>Phone:</span> +123456789
              </Typography>

              <Typography
                className={`${styles.details} inter-regular`}
                variant="subtitle1"
              >
                <span className={`inter-bold`}>Joined Date:</span> 2024-04-19
              </Typography>
            </div>
          </div>
        </Grid>

        <Grid
          item
          md={8}
          xs={12}
          sx={{
            height: {
              xl: "calc(100% - 73px)",
              lg: "calc(100% - 53px)",
            },
          }}
          className={styles.right_grid}
        >
          <div className={styles.members}>
            <Typography
              variant="h5"
              className={`${styles.total_members} inter-bold`}
            >
              Members(12)
            </Typography>
          </div>

          <TableContainer
            sx={{
              maxHeight: { lg: "calc(100% - 113px)", md: "42vh" },
            }}
          >
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={{ height: "100%" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell className={styles.header_cell}>
                    <User />
                  </TableCell>

                  {header?.map((item) => (
                    <TableCell
                      key={item}
                      className={`${styles.header_cell} inter-medium`}
                    >
                      {item}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody className={styles.table_body}>
                {membersData.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className={`${styles.body_cell} inter-regular`}>
                      <img src={member.imageUrl} />
                    </TableCell>

                    <TableCell className={`${styles.body_cell} inter-regular`}>
                      {member.name}
                    </TableCell>

                    <TableCell className={`${styles.body_cell} inter-regular`}>
                      {member.id}
                    </TableCell>

                    <TableCell className={`${styles.body_cell} inter-regular`}>
                      {member.jobTitle}
                    </TableCell>

                    <TableCell className={`${styles.body_cell} inter-regular`}>
                      {member.role}
                    </TableCell>

                    <TableCell
                      className={`${styles.body_cell} inter-regular ${styles.request}`}
                    >
                      <span onClick={handleRequestDialog}>Request</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <AppDialog
        open={requestDialog}
        padding="32px 38px"
        heading={`${requested ? "Cancel" : "Send"} Request`}
        textBox={true}
        text={
          requested
            ? "Are you sure you want to cancel your request?"
            : "Are you sure you want to send request?"
        }
        doubleButton={true}
        leftText={requested ? "No" : "Cancel"}
        rightText={requested ? "Yes" : "Send"}
        textClass={styles.text_class}
        weight="regular"
        margin="47px 0px"
        handleClose={handleClose}
        onClick={onClick}
      />
    </>
  );
};

export default TeamDetail;
