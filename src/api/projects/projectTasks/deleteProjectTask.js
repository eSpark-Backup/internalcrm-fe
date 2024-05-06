import axiosInstance from "../../axiosInstance";
import API_ENDPOINTS from "../../endpoints";

import { deleteProjectTaskReducer } from "../../../redux/reducers/projectSlice";

export const deleteProjectTask = async (
  taskId,
  dispatch,
  setMessage,
  setSnackbarState,
  setSeverity,
  setCardLoading,
  handleClose
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
      dispatch(deleteProjectTaskReducer(taskId));

      setSnackbarState(true);
      setMessage(response?.data?.message);
      setSeverity("success");

      setCardLoading(false);
      handleClose();
    }

    return response;
  } catch (error) {
    setSnackbarState(true);
    setMessage(error.response?.data?.message);
    setSeverity("error");
    setCardLoading(false);

    return error.response;
  }
};
