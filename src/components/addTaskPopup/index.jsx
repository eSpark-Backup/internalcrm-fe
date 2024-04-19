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
import CalenderIcon from "../../assets/svg/constants";

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
          width: "800px",
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
            fontFamily: "Inter",
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
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#636363",
                fontFamily: "Inter",
              }}
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
              sx={{ fontSize: "14px", fontWeight: "500", color: "#636363" }}
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
            gap: "85px",
            alignItems: "center",
          }}
        >
          <div>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#636363",
                marginBottom: "10px",
              }}
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
                  border: "1px solid #C5C5C5",
                  width: "295px",
                  color: "#9E9E9E",
                }}
              />
              <CalenderIcon />
            </div>
          </div>
          <div>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#636363",
                marginBottom: "10px",
              }}
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
                  border: "1px solid #C5C5C5",
                  width: "295px",
                  color: "#9E9E9E",
                }}
              />
              <CalenderIcon />
            </div>
          </div>
        </div>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            color: "#636363",
            marginTop: "30px",
          }}
        >
          Description
        </Typography>
        <TextField
          sx={{ width:"670px" }}
          variant="outlined"
          margin="normal"
          fullWidth
          id="description"
          label="Description"
          placeholder="Enter description..."
          // Add any additional props or styling as needed
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
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
