import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { Button, Menu, MenuItem, Typography, Skeleton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import AddTaskPopup from "../../components/addTaskPopup";
import DynamicCard from "../../components/card";
import AppDialog from "../common/appDialog";
import CustomizedSnackbars from "../toast";

import IndividualTaskCard from "./card";

import { getAllProjectCards } from "../../api/projects/projectCards/getAllProjectCards";
import { createProjectCard } from "../../api/projects/projectCards/createProjectCard";
import { deleteProjectCard } from "../../api/projects/projectCards/deleteProjectCard";
import { updateProjectCardDetails } from "../../api/projects/projectCards/updateProjectCard";

import styles from "./style.module.css";

const Tasks = ({ projectId, state }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const allProjectCards = useSelector(
    (state) => state.projects.allProjectCards
  );

  // Create Card States
  const [openCardModal, setOpenCardModal] = useState(false);
  const [name, setName] = useState("");
  // Update Card State
  const [editMode, setEditMode] = useState(false);
  // Delete Card State
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  // Task States
  const [addTaskPopupOpen, setAddTaskPopupOpen] = useState(false);
  // Other State
  const [cardId, setCardId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  // Get All Cards States
  const [message, setMessage] = useState("");
  const [snackbarState, setSnackbarState] = useState(false);
  const [severity, setSeverity] = useState("");
  // Loading State
  const [cardLoading, setCardLoading] = useState(false);

  const { isLoading } = useQuery({
    queryFn: () =>
      getAllProjectCards(
        dispatch,
        setMessage,
        setSnackbarState,
        setSeverity,
        projectId
      ),
  });

  // Add Tasks For Projects
  const handleAddTaskClick = (cardId) => {
    setCardId(cardId);
    setAddTaskPopupOpen(true);
  };

  const handleOpen = () => {
    setOpenCardModal(true);
  };

  const handleClose = () => {
    setOpenCardModal(false);
    setDeletePopupOpen(false);

    setTimeout(() => {
      setEditMode(false);
      setName("");
      setCardId(null);
    }, 100);
  };

  // Create Project Card
  const handleCreateCard = () => {
    setCardLoading(true);

    createProjectCard(
      { name, projectId },
      dispatch,
      setMessage,
      setSnackbarState,
      setSeverity,
      setCardLoading,
      handleClose
    );
  };

  // Update Project Card
  const handleUpdateCard = () => {
    setCardLoading(true);

    updateProjectCardDetails(
      cardId,
      { name, projectId },
      dispatch,
      setMessage,
      setSnackbarState,
      setSeverity,
      setCardLoading,
      handleClose
    );
  };

  const handleMenuOpen = (event, cardId) => {
    setCardId(cardId);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setEditMode(true);
    setName(allProjectCards?.find((card) => card.id === cardId).name);

    handleOpen();
    handleMenuClose();
  };

  const handleDelete = () => {
    setDeletePopupOpen(true); // Open delete confirmation popup
    handleMenuClose();
  };

  // Delete Project Card
  const confirmDelete = () => {
    setCardLoading(true);

    deleteProjectCard(
      cardId,
      dispatch,
      setMessage,
      setSnackbarState,
      setSeverity,
      setCardLoading,
      handleClose
    );
  };

  return (
    <div className={styles.cards_container}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            allProjectCards && allProjectCards?.length > 2
              ? "repeat(auto-fit, minmax(200px, 1fr))"
              : "1fr 1fr 1fr",
          gridAutoFlow: "column",
          gap: "10px",
          width:
            allProjectCards && allProjectCards?.length > 2 ? "100vw" : "100%",
          overflowX: "auto",
          height: "90%",
        }}
      >
        <div>
          <DynamicCard member={true} card_style="card_style">
            <div className={styles.card_content}>
              <Typography
                variant="h5"
                sx={{ color: "#595959", marginTop: "5px", fontWeight: "600" }}
              >
                Create Card
              </Typography>
              <AddIcon className="plus_icon" onClick={handleOpen} />
            </div>
          </DynamicCard>
        </div>

        {isLoading
          ? Array.from({ length: 2 }).map((_, index) => (
              <Skeleton key={index} height="230px" variant="rounded" />
            ))
          : allProjectCards &&
            allProjectCards?.map((card) => {
              return (
                <div key={card.id}>
                  <DynamicCard member={true} card_style="card_style">
                    <div className={styles.card_content}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#595959",
                          marginTop: "5px",
                          fontWeight: "600",
                        }}
                      >
                        {card.name}
                      </Typography>

                      <MoreVertIcon
                        onClick={(event) => handleMenuOpen(event, card.id)}
                        sx={{ cursor: "pointer" }}
                      />

                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl && cardId === card.id)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={handleEdit}>Edit</MenuItem>
                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                      </Menu>
                    </div>

                    <div>
                      {card.tasks.length === 0 ? (
                        <div
                          className={`d-flex-center ${styles.task_card_container}`}
                        >
                          <Typography variant="body2">No tasks</Typography>
                        </div>
                      ) : (
                        card.tasks.map((task) => (
                          <div
                            className={`${styles.task_card_container} ${styles.tasks_container}`}
                            key={task.id}
                          >
                            <IndividualTaskCard
                              onClick={() =>
                                navigate(`${location.pathname}/task`, {
                                  state: {
                                    projectDetail: state,
                                    cardDetail: card,
                                    taskDetail: task,
                                  },
                                })
                              }
                              {...task}
                            />
                          </div>
                        ))
                      )}

                      <div style={{ padding: "20px" }}>
                        <Button
                          onClick={() => handleAddTaskClick(card.id)}
                          variant="outlined"
                          className={`inter-medium ${styles.add_task}`}
                        >
                          Add Task
                        </Button>
                      </div>
                    </div>
                  </DynamicCard>
                </div>
              );
            })}
      </div>

      {allProjectCards?.length > 2 && (
        <div className={styles.add_card_container}>
          <Button className="inter-medium" onClick={handleOpen}>
            Add Card
          </Button>
        </div>
      )}

      {/* Create Card Modal */}
      <AppDialog
        open={openCardModal}
        padding="31px 22px"
        heading={editMode ? "Edit Card" : "Create Card"}
        singleInput={true}
        doubleButton={true}
        leftText="Cancel"
        rightText={editMode ? "Edit" : "Create"}
        weight="semibold"
        margin="40px 0px 24px"
        handleClose={handleClose}
        onClick={editMode ? handleUpdateCard : handleCreateCard}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter card name"
        id="card name"
        sx={{
          marginBottom: "20px",
        }}
        paddingLeft="21px"
        loader={cardLoading}
      />

      {/* Delete Card Modal */}
      <AppDialog
        open={deletePopupOpen}
        padding="32px 38px"
        heading="Delete Card"
        textBox={true}
        text="Are you sure you want to delete this card?"
        doubleButton={true}
        leftText="No"
        rightText="Yes"
        textClass={styles.text_class}
        weight="regular"
        margin="47px 0px"
        handleClose={handleClose}
        onClick={confirmDelete}
        loader={cardLoading}
      />

      <AddTaskPopup
        open={addTaskPopupOpen}
        setAddTaskPopupOpen={setAddTaskPopupOpen}
        cardId={cardId}
        setSnackbarState={setSnackbarState}
        setSeverity={setSeverity}
        setMessage={setMessage}
      />

      <CustomizedSnackbars
        message={message}
        open={snackbarState}
        setOpen={setSnackbarState}
        severity={severity}
      />
    </div>
  );
};

export default Tasks;
