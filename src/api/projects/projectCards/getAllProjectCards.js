import axiosInstance from "../../axiosInstance";
import API_ENDPOINTS from "../../endpoints";

import { fetchAllProjectCards } from "../../../redux/reducers/projectSlice";

export const getAllProjectCards = async (
  dispatch,
  setMessage,
  setSnackbarState,
  setSeverity,
  projectId
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(
      `${API_ENDPOINTS.PROJECTS.CARDS}?projectId=${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      dispatch(fetchAllProjectCards(response.data));
    }

    return response.data;
  } catch (error) {
    setMessage(error.response?.data?.message);
    setSnackbarState(true);
    setSeverity("error");

    return error.response;
  }
};
