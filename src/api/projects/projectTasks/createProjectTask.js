import axiosInstance from "../../axiosInstance";
import API_ENDPOINTS from "../../endpoints";

import { createUpdateProjectTask } from "../../../redux/reducers/projectSlice";

export const createProjectTask = async (
  body,
  dispatch,
  setMessage,
  setSnackbarState,
  setSeverity,
  setIsCreating,
  handleClose
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.post(
      API_ENDPOINTS.PROJECTS.TASKS,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201 || response.status === 200) {
      dispatch(createUpdateProjectTask(response.data.data));

      setSnackbarState(true);
      setMessage(response?.data?.message);
      setSeverity("success");

      setIsCreating(false);
      handleClose();
    }

    return response;
  } catch (error) {
    setSnackbarState(true);
    setMessage(error.response?.data?.message);
    setSeverity("error");
    setIsCreating(false);

    return error.response;
  }
};
