import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Typography, Button } from "@mui/material";

import AppDialog from "../../components/common/appDialog";
import CustomizedSnackbars from "../../components/toast";
import DetailForm from "./detailForm";

import { deleteProjectTask } from "../../api/projects/projectTasks/deleteProjectTask";

import { storeChildData } from "../../redux/reducers/headerSlice";

import styles from "./style.module.css";

const TaskDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(
      storeChildData({
        title: state.projectDetail?.name,
        singleButton: true,
        singleButtonText: "Back",
        handleClick,
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [deleteTask, setDeleteTask] = useState(false);
  const [deletingTask, setDeletingTask] = useState(false);
  // Snackbar State
  const [message, setMessage] = useState("");
  const [snackbarState, setSnackbarState] = useState(false);
  const [severity, setSeverity] = useState("");

  const handleClose = () => {
    setDeleteTask(false);
  };

  const confirmDelete = () => {
    setDeletingTask(true);
    const taskId = state?.taskDetail?.id;

    deleteProjectTask(
      taskId,
      dispatch,
      setMessage,
      setSnackbarState,
      setSeverity,
      setDeletingTask,
      handleClose,
      handleClick
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.button_container}>
        <Typography variant="h5" className={`${styles.title} inter-semibold`}>
          {state.cardDetail?.name}
        </Typography>

        <Button
          className={`${styles.delete_task} inter-semibold`}
          onClick={setDeleteTask}
        >
          Delete Task
        </Button>
      </div>

      <DetailForm
        taskDetail={state.taskDetail}
        setMessage={setMessage}
        setSnackbarState={setSnackbarState}
        setSeverity={setSeverity}
      />

      {/* Delete Task Modal */}
      <AppDialog
        open={deleteTask}
        padding="32px 38px"
        heading="Delete Task"
        textBox={true}
        text="Are you sure you want to delete your task?"
        doubleButton={true}
        leftText="No"
        rightText="Yes"
        textClass={styles.text_class}
        weight="regular"
        margin="47px 0px"
        handleClose={handleClose}
        onClick={confirmDelete}
        loader={deletingTask}
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

export default TaskDetail;
