import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Grid } from "@mui/material";

import DynamicCard from "../../components/card";
import CircularProgressBar from "../../components/circularProgressBar";

import { storeChildData } from "../../redux/reducers/headerSlice";

import styles from "./style.module.css";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      storeChildData({
        title: "Dashboard",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [status] = useState([90, 90]);

  return (
    <Grid container>
      {status?.map((elem, index) => {
        return (
          <Grid item xs={12} sm={6} key={index}>
            <div className={styles.card_item}>
              <DynamicCard title="Ticket Status">
                <CircularProgressBar value={elem} />
              </DynamicCard>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Dashboard;
