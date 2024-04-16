import { useEffect } from "react";
import { useDispatch } from "react-redux";

import DynamicCard from "../../components/card";
import CircularProgressBar from "../../components/circularProgressBar";

import { storeChildData } from "../../redux/reducers/headerSlice";

import "./style.css";

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
    <>
      <div className="status-style">
        <div style={{ marginRight: "20px" }}>
          <DynamicCard title="Ticket Status">
            <CircularProgressBar value={90} />
          </DynamicCard>
        </div>

        <DynamicCard title="Ticket Status">
          <CircularProgressBar value={90} />
        </DynamicCard>
      </div>
    </>
  );
};

export default Dashboard;
