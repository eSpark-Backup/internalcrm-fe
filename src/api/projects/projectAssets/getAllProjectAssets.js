import axiosInstance from "../../axiosInstance";
import API_ENDPOINTS from "../../endpoints";

import { fetchAllProjectAssets } from "../../../redux/reducers/projectSlice";

export const getAllProjectAssets = async (
  projectId,
  dispatch,
  setMessage,
  setSnackbarState,
  setSeverity
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(
      `${API_ENDPOINTS.PROJECTS.GET_PROJECT_ASSETS}/${projectId}/assets`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      dispatch(fetchAllProjectAssets(response.data));
    }

    return response.data;
  } catch (error) {
    setMessage(error.response?.data?.message);
    setSnackbarState(true);
    setSeverity("error");
    return error.response;
  }
};
