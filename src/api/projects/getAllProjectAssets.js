import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

import { fetchAllProjectAssets } from "../../redux/reducers/projectSlice";

export const getAllProjectAssets = async (projectId, dispatch) => {
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
    console.log(response);

    if (response.status === 200) {
      dispatch(fetchAllProjectAssets(response.data));
    }

    return response.data;
  } catch (error) {
    return error.response;
  }
};
