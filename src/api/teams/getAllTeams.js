import { fecthAllTeams } from "../../redux/reducers/teamSlice";
import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

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
      dispatch(fecthAllTeams(response.data));
    }

    return response.data;
  } catch (error) {
    setMessage(error.response?.data?.message);
    setSnackbarState(true);
    setSeverity("error");

    return error.response;
  }
};
