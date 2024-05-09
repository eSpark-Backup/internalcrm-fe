import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { Button } from "@mui/material";

import Tasks from "../../components/taskCards";
import AddMembersPopup from "../../components/addMemberPopup";

import { getAllProjectMembers } from "../../api/projects/projectMembers/getAllProjectMembers";

import { storeChildData } from "../../redux/reducers/headerSlice";

import styles from "./style.module.css";

const Cards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const allProjectMembers = useSelector(
    (state) => state.projects.allProjectMembers
  );

  useQuery({
    queryFn: () => getAllProjectMembers(state.id, dispatch),
  });

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
    <div style={{ position: "relative" }}>
      <div className={styles.header_container}>
        <div className={styles.action_button_container}>
          <Link
            to="/projects/assets"
            style={{ textDecoration: "none" }}
            state={state}
          >
            <Button>Assets</Button>
          </Link>

          {allProjectMembers?.length ? (
            <div className="manage_members">
              <Button onClick={handleManageMember}>Manage Member</Button>
            </div>
          ) : null}
        </div>

        <Button onClick={handleAddMembers}>Add Members</Button>
      </div>

      <Tasks projectId={state.id} state={state} />

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
