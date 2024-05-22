import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

import { fetchAllSources } from "../../redux/reducers/leadSourcesSlice";

export const getAllLeadSources = async (
  dispatch,
  setMessage,
  setSnackbarState,
  setSeverity
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(API_ENDPOINTS.LEAD_SOURCES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      dispatch(fetchAllSources(response.data));
    }
    return response.data;
  } catch (error) {
    setSnackbarState(true);
    setMessage(error.response?.data?.message);
    setSeverity("error");

    return error.response;
  }
};
