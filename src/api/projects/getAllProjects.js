import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

import { fetchAllProjects } from "../../redux/reducers/projectSlice";

export const FETCH_PROJECTS = "FETCH_PROJECTS";

export const getAllProjects = async (
  dispatch,
  setMessage,
  setSnackbarState,
  setSeverity
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(API_ENDPOINTS.PROJECTS.PROJECTS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      dispatch(fetchAllProjects(response.data));
    }
    return response.data;
  } catch (error) {
    setMessage(error.response?.data?.message);
    setSnackbarState(true);
    setSeverity("error");

    return error.response;
  }
};
