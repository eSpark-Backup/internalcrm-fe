import { useState } from "react";

import { Typography, Grid, Button } from "@mui/material";

import SearchBar from "../../components/search";
import AppDialog from "../../components/common/appDialog";
import TeamTable from "../../components/table";

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

  const renderAction = (row, rowIndex) => (
    <Button
      onClick={() => handleRequestDialog(row, rowIndex)}
      className={`inter-regular ${styles.request}`}
    >
      Request
    </Button>
  );

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

          <TeamTable
            headers={header}
            data={membersData}
            objectType="teamDetails"
            renderActions={renderAction}
            sx={{
              maxHeight: { lg: "calc(100% - 113px)", md: "42vh" },
            }}
          />
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
