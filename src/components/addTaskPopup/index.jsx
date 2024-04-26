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
import CalenderIcon from "../svg/calenderIcon";
import Picker from "../datePicker/index";

const AddTaskPopup = ({ open, handleClose, handleAddTask }) => {
  const [task, setTask] = useState("");
  const [assignedTo, setAssignedTo] = useState(null); // State for selected employee
  const [fromDate, setFromDate] = useState(""); // State for From date
  const [toDate, setToDate] = useState(""); // State for To date
  const [description, setDescription] = useState("");

  const employees = [
    { name: "Employee 1" },
    { name: "Employee 2" },
    { name: "Employee 3" },
    // Add more employees as needed
  ];

  const handleAdd = () => {
    console.log("Task:", task);
    console.log("Assigned To:", assignedTo);
    console.log("From Date:", fromDate);
    console.log("To Date:", toDate);
    console.log("Description:", description);
    if (
      task.trim() !== "" &&
      assignedTo &&
      fromDate &&
      toDate &&
      description.trim() !== ""
    ) {
      handleAddTask({
        task: task,
        description: description,
        assignedTo: assignedTo,
        fromDate: fromDate,
        toDate: toDate,
      });
      setTask("");
      setDescription("");
      setAssignedTo(null);
      setFromDate("");
      setToDate("");
      handleClose();
    } else {
      // Handle case where all fields are not filled
      console.log("Please fill all fields");
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
            gap: "90px",
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
                width: "23vw",
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
                width: "23vw",
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
            <div className="calender_field">
              <Picker />
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
            <div className="calender_field">
             
              <Picker />
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
          sx={{ width: "670px" }}
          variant="outlined"
          margin="normal"
          fullWidth
          id="description"
          label="Description"
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
