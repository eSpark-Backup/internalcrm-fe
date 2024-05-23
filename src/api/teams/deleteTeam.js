import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

import { deleteTeamReducer } from "../../redux/reducers/teamSlice";

export const deleteTeam = async (
  teamId,
  dispatch,
  setMessage,
  setSnackbarState,
  setSeverity,
  setIsDoingAction,
  handleClose
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.TEAMS}/${teamId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    if (response.status === 200) {
      dispatch(deleteTeamReducer(teamId));

      setSnackbarState(true);
      setMessage(response?.data?.message);
      setSeverity("success");

      setIsDoingAction(false);
      handleClose();
    }

    return response;
  } catch (error) {
    setIsDoingAction(false);
    setSnackbarState(true);
    setMessage(error.response?.data?.message);
    setSeverity("error");

    return error.response;
  }
};
