import React from "react";
import DynamicCard from "../../components/card";
import CircularProgressBar from "../../components/circularProgressBar";
import "./style.css"

const Dashboard = () => {
  return (
    <>
    <div className="status-style">
    <div style={{marginRight:"20px"}}>    
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
