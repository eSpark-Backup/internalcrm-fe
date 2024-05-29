import axiosInstance from "../../axiosInstance";
import API_ENDPOINTS from "../../endpoints";

import { fetchAllProjectTaskComments } from "../../../redux/reducers/projectSlice";

export const getAllProjectTaskComments = async (
  taskId,
  dispatch,
  setMessage,
  setSnackbarState,
  setSeverity
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(
      `${API_ENDPOINTS.PROJECTS.TASKS}/${taskId}/comments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      dispatch(fetchAllProjectTaskComments(response.data));
    }

    return response.data;
  } catch (error) {
    setMessage(error.response?.data?.message);
    setSnackbarState(true);
    setSeverity("error");

    return error.response;
  }
};
