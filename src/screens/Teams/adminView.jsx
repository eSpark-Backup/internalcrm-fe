import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Grid, IconButton, Typography } from "@mui/material";

import { storeChildData } from "../../redux/reducers/headerSlice";

import TeamTable from "../../components/table";

import View from "../../assets/logos/view.svg?react";
import Edit from "../../assets/logos/small-white-edit.svg?react";
import Delete from "../../assets/logos/delete-grey?react";

import { adminTeamHeader, adminTeamsView } from "../../constants/teams";

import styles from "./style.module.css";

const Teams = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      storeChildData({
        title: "Teams",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderAction = (row, rowIndex) => (
    <div>
      <IconButton
        onClick={() => console.log(row, rowIndex)}
        className={`inter-regular ${styles.request}`}
      >
        <Edit />
      </IconButton>

      <IconButton
        onClick={() => console.log(row, rowIndex)}
        className={`inter-regular ${styles.request}`}
      >
        <Delete />
      </IconButton>

      <IconButton
        onClick={() => console.log(row, rowIndex)}
        className={`inter-regular ${styles.request}`}
      >
        <View />
      </IconButton>
    </div>
  );

  return (
    <div style={{ height: "100%" }}>
      <Grid container item xs={12} spacing={2}>
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
              Teams ({adminTeamsView?.length})
            </Typography>
          </div>

          <TeamTable
            headers={adminTeamHeader}
            data={adminTeamsView}
            objectType="teamDetails"
            renderActions={renderAction}
            sx={{
              maxHeight: { lg: "calc(100% - 113px)", md: "42vh" },
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Teams;
