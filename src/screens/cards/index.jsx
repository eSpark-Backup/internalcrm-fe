import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { Button } from "@mui/material";

import Tasks from "../../components/taskCards";
import AddMembersPopup from "../../components/addMemberPopup";

import { storeChildData } from "../../redux/reducers/headerSlice";
import { getAllProjectMembers } from "../../api/projects/getAllProjectMembers";

const Cards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { data } = useQuery({
    queryFn: () => getAllProjectMembers(state.id),
  });
  console.log(data);

  const handleClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(
      storeChildData({
        title: state.name,
        singleButton: true,
        singleButtonText: "Back",
        handleClick,
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [addingMember, setAddingMember] = useState(false);

  const handleAddMembers = () => {
    setAddingMember(true);
    setPopupOpen(true);
  };

  const handleManageMember = () => {
    setAddingMember(false);
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
    setAddingMember(false);
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
          <Link to="/assets" style={{ textDecoration: "none" }} state={state}>
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
              onClick={handleManageMember}
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
          onClick={handleAddMembers}
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

      <AddMembersPopup
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        addingMember={addingMember}
        projectId={state?.id}
      />
    </div>
  );
};

export default Cards;
