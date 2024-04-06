import DynamicCard from "../../components/card";
import CircularProgressBar from "../../components/circularProgressBar";

import styles from "./style.module.css";

const Dashboard = () => {
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
