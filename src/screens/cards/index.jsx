import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tasks from "../../components/taskCards";
import AddMembersPopup from "../../components/addMemberPopup";

const Cards = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/assets" style={{ textDecoration: "none" }}>
            <Button
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
              Assets
            </Button>
          </Link>
          <div className="manage_members">
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
                padding: "20px 25px",
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
              Manage Member
            </Button>
          </div>
        </div>
        <Button
          onClick={handlePopupOpen}
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "4px",
            padding: "20px 30px",
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
          Add Members
        </Button>
      </div>
      <Tasks />
      <AddMembersPopup isOpen={isPopupOpen} onClose={handlePopupClose} />
    </div>
  );
};

export default Cards;
