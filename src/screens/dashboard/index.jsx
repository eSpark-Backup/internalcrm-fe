import { useEffect } from "react";
import { useDispatch } from "react-redux";

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

  return (
    <div className={styles.status_style}>
      <div className={styles.card_container}>
        <div className={styles.card_item}>
          <DynamicCard title="Ticket Status">
            <CircularProgressBar value={90} />
          </DynamicCard>
        </div>

        <div className={styles.card_item}>
          <DynamicCard title="Project status">
            <CircularProgressBar value={90} />
          </DynamicCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
