import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

import { createUpdateProject } from "../../redux/reducers/projectSlice";

export const createProject = async (
  body,
  dispatch,
  setMessage,
  setSnackbarState,
  setSeverity,
  setIsCreating,
  handleStateAdterCreation
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.post(
      API_ENDPOINTS.PROJECTS.PROJECTS,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201 || response.status === 200) {
      dispatch(createUpdateProject(response.data.data));

      setSnackbarState(true);
      setMessage(response?.data?.message);
      setSeverity("success");

      setIsCreating(false);
      handleStateAdterCreation();
    }

    return response;
  } catch (error) {
    setSnackbarState(true);
    setMessage(error.response?.data?.message);
    setSeverity("error");

    return error.response;
  }
};
