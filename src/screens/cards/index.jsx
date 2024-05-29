import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { Button, Grid } from "@mui/material";

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
  };

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        // style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <Grid item xs={allProjectMembers?.length ? 12 : 6} sm={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Link to="/projects/assets" style={{ textDecoration: "none" }}>
                <Button variant="contained" className={styles.cards_button}>
                  Assets
                </Button>
              </Link>
            </Grid>

            {allProjectMembers?.length ? (
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  className={styles.cards_button}
                  onClick={handleManageMember}
                >
                  Manage Member
                </Button>
              </Grid>
            ) : null}
          </Grid>
        </Grid>

        <Grid
          item
          xs={allProjectMembers?.length ? 12 : 6}
          sm={6}
          sx={{
            display: { sm: "flex", xs: "block" },
            justifyContent: "end",
          }}
        >
          <Button
            variant="contained"
            className={styles.cards_button}
            onClick={handleAddMembers}
          >
            Add Members
          </Button>
        </Grid>
      </Grid>

      <Tasks projectId={state.id} state={state} />

      <AddMembersPopup
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        check={addingMember === true}
        projectId={state?.id}
        successfullText={addingMember ? "Added" : "Removed"}
        buttonText={addingMember ? "Add" : "Remove"}
      />
    </div>
  );
};

export default Cards;
