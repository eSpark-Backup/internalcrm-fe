import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

import { fetchAllProjectMembers } from "../../redux/reducers/projectSlice";

export const getAllProjectMembers = async (projectId, dispatch) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(
      `${API_ENDPOINTS.PROJECTS.GET_PROJECT_MEMBERS}/${projectId}/members`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);

    if (response.status === 200) {
      dispatch(fetchAllProjectMembers(response.data));
    }

    return response.data;
  } catch (error) {
    return error.response;
  }
};
