import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
  Grid,
  TextareaAutosize,
} from "@mui/material";

import Picker from "../datePicker";
import AppInput from "../common/appInput";
import Label from "../common/inputLabel";
import CustomLoader from "../loading";

import ArrowDropdown from "../../assets/logos/arrow-dropdown.svg?react";

import { createProjectTask } from "../../api/projects/projectTasks/createProjectTask";

import styles from "./style.module.css";

const AddTaskPopup = (props) => {
  const {
    open,
    setAddTaskPopupOpen,
    cardId,
    setSnackbarState,
    setSeverity,
    setMessage,
  } = props;

  const dispatch = useDispatch();

  // Add Task State
  const [name, setTask] = useState("");
  const [assignedTo, setAssignedTo] = useState(null);
  const [employeeName, setEmployeeName] = useState(null);
  const [startDate, setFromDate] = useState(null);
  const [endDate, setToDate] = useState(null);
  const [description, setDescription] = useState("");
  // Loading Stat
  const [isCreating, setIsCreating] = useState(false);

  const employees = [
    { name: "Employee 1", id: 0 },
    { name: "Employee 2", id: 1 },
    { name: "Employee 3", id: 2 },
  ];

  const handleClose = () => {
    setAddTaskPopupOpen(false);
    setTask("");
    setAssignedTo(null);
    setFromDate(null);
    setToDate(null);
    setDescription("");
  };

  const handleAdd = () => {
    setIsCreating(true);

    const body = {
      cardId,
      name,
      assignedTo,
      startDate,
      endDate,
      description,
    };

    createProjectTask(
      body,
      dispatch,
      setMessage,
      setSnackbarState,
      setSeverity,
      setIsCreating,
      handleClose
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiModal-backdrop": {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <Box className={styles.box_container}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          className={`inter-semibold ${styles.create_task}`}
        >
          Create Task
        </Typography>

        <Grid container>
          <Grid item md={6} xs={12} className={styles.grid_item_p_right}>
            <AppInput
              onChange={(e) => setTask(e.target.value)}
              id="create task"
              label="Task name:"
              placeholder="Enter task name"
              value={name}
              normalFont
              paddingLeft="21px"
            />
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
            className={styles.grid_item_p_left}
            sx={{ marginBottom: "30px" }}
          >
            <Label label="Assign To:" normalFont />

            <Autocomplete
              options={employees}
              getOptionLabel={(option) => option.name}
              value={employeeName}
              onChange={(_, newValue) => {
                setAssignedTo(newValue.id);
                setEmployeeName(newValue);
              }}
              id="highlights-demo"
              renderInput={(params) => (
                <TextField {...params} placeholder="Select Employee" />
              )}
              popupIcon={<ArrowDropdown />}
              fullWidth
              disableClearable // Add this line to disable the clear button
              sx={{
                padding: "0 !important",

                "& .MuiOutlinedInput-root": {
                  padding: "0 !important",
                  color: "#888888",
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",

                  "& .MuiAutocomplete-input": {
                    height: "auto",
                    lineHeight: "17px",
                  },

                  "& fieldset": {
                    borderColor: "#E4E4E4 !important",
                    borderWidth: "1px !important",
                  },
                },
              }}
            />
          </Grid>

          <Grid item md={6} xs={12} className={styles.grid_item_p_right}>
            <Picker
              label="From"
              normalFont
              onChange={(date) => setFromDate(date.toISOString())}
            />
          </Grid>

          <Grid item md={6} xs={12} className={styles.grid_item_p_left}>
            <Picker
              label="To"
              normalFont
              onChange={(date) => setToDate(date.toISOString())}
            />
          </Grid>

          <Grid item xs={12} sx={{ my: "30px" }}>
            <Label label="Description" normalFont />

            <TextareaAutosize
              placeholder="Add description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`inter-regular ${styles.textarea}`}
            />
          </Grid>

          <Grid item xs={6}>
            <Button
              onClick={handleClose}
              className={`inter-semibold ${styles.cancel}`}
            >
              Cancel
            </Button>
          </Grid>

          <Grid item xs={6} display={"flex"} justifyContent={"end"}>
            <Button
              onClick={handleAdd}
              className={`inter-semibold ${styles.create}`}
              disabled={isCreating}
            >
              {isCreating ? <CustomLoader /> : "Create"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddTaskPopup;
