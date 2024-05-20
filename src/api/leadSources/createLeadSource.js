import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

import { createUpdateSource } from "../../redux/reducers/leadSourcesSlice";

export const createLeadSource = async (
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
      API_ENDPOINTS.LEAD_SOURCES,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201 || response.status === 200) {
      dispatch(createUpdateSource(response.data.data));

      setSnackbarState(true);
      setMessage(response?.data?.message);
      setSeverity("success");

      setIsCreating(false);
      handleStateAdterCreation();
    }

    return response;
  } catch (error) {
    console.log(error);
    console.log(error.response);
    console.log(error.response?.data);

    setSnackbarState(true);
    setMessage(error.response?.data?.message);
    setSeverity("error");

    return error.response;
  }
};
