import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

import { fetchAllTeams } from "../../redux/reducers/teamSlice";

export const getAllTeams = async (
  dispatch,
  setMessage,
  setSnackbarState,
  setSeverity
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(API_ENDPOINTS.TEAMS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      dispatch(fetchAllTeams(response.data));
    }

    return response.data;
  } catch (error) {
    setMessage(error.response?.data?.message);
    setSnackbarState(true);
    setSeverity("error");

    return error.response;
  }
};
