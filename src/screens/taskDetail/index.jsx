import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Typography, Button } from "@mui/material";

import AppDialog from "../../components/common/appDialog";

import DetailForm from "./detailForm";

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
  const [cardLoading, setCardLoading] = useState(false);

  const handleClose = () => {
    setDeleteTask(false);
  };

  const confirmDelete = () => {
    setCardLoading(false);
    setDeleteTask(false);
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

      <DetailForm taskDetail={state.cardDetail} />

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
        loader={cardLoading}
      />
    </div>
  );
};

export default TaskDetail;
