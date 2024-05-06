import axiosInstance from "../../axiosInstance";
import API_ENDPOINTS from "../../endpoints";

import { fetchAllProjectTasks } from "../../../redux/reducers/projectSlice";

export const getAllProjectTasks = async (
  cardId,
  dispatch,
  setMessage,
  setSnackbarState,
  setSeverity
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(
      `${API_ENDPOINTS.PROJECTS.GET_TASKS_BY_CARD}/${cardId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    // if (response.status === 200) {
    //   dispatch(fetchAllProjectTasks(response.data));
    // }

    return response.data;
  } catch (error) {
    setMessage(error.response?.data?.message);
    setSnackbarState(true);
    setSeverity("error");

    return error.response;
  }
};
