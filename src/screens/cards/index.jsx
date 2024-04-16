import React, { useState } from "react";
import { Typography, TextField, Button, Modal, Box } from "@mui/material";
import DynamicCard from "../../components/card";
import styles from "./style.module.css";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Cards = () => {
  const [open, setOpen] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cards, setCards] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateCard = () => {
    if (cardName.trim() !== "") {
      const newCard = { name: cardName, tasks: [] };
      setCards([...cards, newCard]);
      setCardName("");
      setOpen(false);
    }
  };

  return (
    <div>
      <div className={styles.cards_container}>
        <div style={{ display: "flex" }}>
          <div className="card_style">
            <DynamicCard hideTitleAndHr>
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
              <DynamicCard hideTitleAndHr>
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
                  <MoreVertIcon/>
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
                  <div style={{padding:"20px"}}>
                  <Button
                    variant="outlined"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: "#029E9C",
                      color: "#fff",
                      width:"100%"
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
              Create Card
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
                Create
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Cards;
