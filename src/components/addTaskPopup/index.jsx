import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";

const AddTaskPopup = ({ open, handleClose, handleAddTask }) => {
  const [task, setTask] = useState("");
  const [assignedTo, setAssignedTo] = useState(null); // State for selected employee
  const [fromDate, setFromDate] = useState(""); // State for From date
  const [toDate, setToDate] = useState(""); // State for To date

  const employees = [
    { name: "Employee 1" },
    { name: "Employee 2" },
    { name: "Employee 3" },
    // Add more employees as needed
  ];

  const handleAdd = () => {
    if (task.trim() !== "" && assignedTo && fromDate && toDate) {
      handleAddTask({
        task,
        assignedTo: assignedTo.name,
        fromDate,
        toDate,
      });
      setTask(""); // Clear input field after adding task
      setAssignedTo(null); // Clear selected employee
      setFromDate(""); // Clear From date
      setToDate(""); // Clear To date
      handleClose(); // Close the popup
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "64%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: "30px 60px",
          borderRadius: "7px",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            textAlign: "left",
            fontWeight: "bold",
            color: "#068987",
            marginBottom: "15px",
          }}
        >
          Create Task
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            gap: "165px",
            alignItems: "center",
          }}
        >
          <div>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "bold", color: "#636363" }}
            >
              Task name:
            </Typography>
            <TextField
              label="Enter task name"
              fullWidth
              value={task}
              onChange={(e) => setTask(e.target.value)}
              sx={{
                marginBottom: "25px",
                marginTop: "10px",
                width: "140%",
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
          </div>
          <div>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "bold", color: "#636363" }}
            >
              Assign To:
            </Typography>
            <Autocomplete
              options={employees}
              getOptionLabel={(option) => option.name}
              value={assignedTo}
              onChange={(event, newValue) => {
                setAssignedTo(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Employee" />
              )}
              fullWidth
              disableClearable // Add this line to disable the clear button
              sx={{
                marginBottom: "25px",
                marginTop: "10px",
                width: "370%",
                padding: "0 !important",
                "& .MuiInputLabel-root": {
                  color: "#888888",
                  fontSize: "14px",
                  marginTop: "-6px",
                },
                "& .MuiOutlinedInput-root": {
                  padding: "0",
                },
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            gap: "20px",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "bold", color: "#636363" }}
            >
              From Date:
            </Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                style={{
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #888888",
                }}
              />
              <EventIcon sx={{ color: "#888888", marginLeft: "-30px" }} />
            </div>
          </div>
          <div>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "bold", color: "#636363" }}
            >
              To Date:
            </Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                style={{
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #888888",
                }}
              />
              <EventIcon sx={{ color: "#888888", marginLeft: "-30px" }} />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Button
            onClick={handleClose}
            sx={{
              padding: "6px 35px",
              color: "#068987",
              border: "1px solid #068987",
              textTransform: "capitalize",
              marginRight: "10px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            sx={{
              padding: "6px 35px",
              color: "#fff",
              background: "#068987",
              textTransform: "capitalize",
            }}
          >
            Add
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AddTaskPopup;
