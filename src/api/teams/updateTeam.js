import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

import { createUpdateTeam } from "../../redux/reducers/teamSlice";

export const updateTeamDetails = async (
  teamId,
  body,
  dispatch,
  setMessage,
  setSnackbarState,
  setSeverity,
  setIsDoingAction,
  handleClose
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.patch(
      `${API_ENDPOINTS.TEAMS}/${teamId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    if (response.status === 201 || response.status === 200) {
      dispatch(createUpdateTeam(response.data.data));

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
