import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddTaskPopup from "../../components/addTaskPopup";
import DynamicCard from "../../components/card";
import DeleteConfirmationPopup from "../../components/deletePopup";
import styles from "./style.module.css";

const Tasks = () => {
  const [open, setOpen] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cards, setCards] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [addTaskPopupOpen, setAddTaskPopupOpen] = useState(false);
  const [selectedCardIndexForTask, setSelectedCardIndexForTask] =
    useState(null);

  const handleAddTaskClick = (index) => {
    setSelectedCardIndexForTask(index);
    setAddTaskPopupOpen(true);
  };

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
  };

  const handleClose = () => {
    setOpen(false);
    setDeletePopupOpen(false); // Close delete confirmation popup when closing modal
  };

  const handleCreateCard = () => {
    if (editMode && cardName.trim() !== "") {
      const updatedCards = [...cards];
      updatedCards[selectedCardIndex].name = cardName;
      setCards(updatedCards);
      setEditMode(false);
    } else if (!editMode && cardName.trim() !== "") {
      const newCard = { name: cardName, tasks: [] };
      setCards([...cards, newCard]);
    }
    setCardName("");
    setOpen(false);
  };

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedCardIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setEditMode(true);
    setCardName(cards[selectedCardIndex].name);
    handleOpen();
    handleMenuClose();
  };

  const handleDelete = () => {
    setDeletePopupOpen(true); // Open delete confirmation popup
    handleMenuClose();
  };

  const confirmDelete = () => {
    const updatedCards = cards.filter(
      (_, index) => index !== selectedCardIndex
    );
    setCards(updatedCards);
    setDeletePopupOpen(false); // Close delete confirmation popup after deletion
  };
  return (
    <div className={styles.cards_container}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            cards.length > 2
              ? "repeat(auto-fit, minmax(200px, 1fr))"
              : "1fr 1fr 1fr",
          gridAutoFlow: "column",
          gap: "10px",
          width: cards.length > 2 ? "100vw" : "100%",
          overflowX: "auto",
        }}
      >
        <div className="card_style">
          <DynamicCard member>
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
        {cards.map((card, index) => (
          <div key={index} className="card_style">
            <DynamicCard member>
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
                  onClick={(event) => handleMenuOpen(event, index)}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl && selectedCardIndex === index)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleEdit}>Edit</MenuItem>
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>
              </div>
              <div>
                <div
                  style={{
                    padding: "20px",
                    border: "1px solid #EBEBEB",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {card.tasks.length === 0 ? (
                    <Typography variant="body2">No tasks</Typography>
                  ) : (
                    card.tasks.map((task, taskIndex) => (
                      <div key={taskIndex}>
                        <Typography variant="body2">{task}</Typography>
                      </div>
                    ))
                  )}
                </div>
                <div style={{ padding: "20px" }}>
                  <Button
                    onClick={() => handleAddTaskClick(index)}
                    variant="outlined"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: "#029E9C",
                      color: "#fff",
                      width: "100%",
                      marginTop: "15px",
                      marginBottom: "-20px",
                    }}
                  >
                    Add Task
                  </Button>
                </div>
              </div>
            </DynamicCard>
          </div>
        ))}
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: "30px 20px",
            borderRadius: "7px",
          }}
        >
          <Typography
            id="add-project-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#068987",
              marginBottom: "15px",
            }}
          >
            {editMode ? "Edit Card" : "Create Card"}{" "}
            {/* Display edit mode title */}
          </Typography>
          <TextField
            label="Enter card name"
            fullWidth
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            sx={{
              marginBottom: "25px",
              marginTop: "25px",
              "& .MuiInputLabel-root": {
                color: "#888888",
                fontSize: "14px",
                marginTop: "-6px",
              },
              "& .MuiOutlinedInput-input": {
                padding: "8px",
              },
            }}
          />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={handleClose}
              sx={{
                padding: "6px 35px",
                color: "#068987",
                border: "1px solid #068987",
                textTransform: "capitalize",
                marginRight: "10px",
                marginTop: "20px",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateCard}
              sx={{
                padding: "6px 35px",
                color: "#fff",
                background: "#068987",
                textTransform: "capitalize",
                marginTop: "20px",
              }}
            >
              {editMode ? "Save" : "Create"}{" "}
            </Button>
          </div>
        </Box>
      </Modal>
      <DeleteConfirmationPopup
        open={deletePopupOpen}
        handleClose={() => setDeletePopupOpen(false)}
        handleDelete={confirmDelete}
        heading="Delete Card"
        sentence="Are you sure you want to delete this card?"
      />
      <AddTaskPopup
        open={addTaskPopupOpen}
        handleClose={() => setAddTaskPopupOpen(false)}
        handleAddTask={(task) => {
          const updatedCards = [...cards];
          updatedCards[selectedCardIndexForTask].tasks.push(task);
          setCards(updatedCards);
        }}
      />
    </div>
  );
};

export default Tasks;
