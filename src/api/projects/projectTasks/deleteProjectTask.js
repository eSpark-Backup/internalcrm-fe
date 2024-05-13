import axiosInstance from "../../axiosInstance";
import API_ENDPOINTS from "../../endpoints";

// import { deleteProjectTaskReducer } from "../../../redux/reducers/projectSlice";

export const deleteProjectTask = async (
  taskId,
  dispatch,
  setMessage,
  setSnackbarState,
  setSeverity,
  setDeletingTask,
  handleClose,
  handleClick
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.PROJECTS.TASKS}/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      // dispatch(deleteProjectTaskReducer(taskId));

      setSnackbarState(true);
      setMessage(response?.data?.message);
      setSeverity("success");

      setDeletingTask(false);
      handleClose();

      handleClick();
    }

    return response;
  } catch (error) {
    setSnackbarState(true);
    setMessage(error.response?.data?.message);
    setSeverity("error");
    setDeletingTask(false);

    return error.response;
  }
};
