import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

import { deleteSource } from "../../redux/reducers/leadSourcesSlice";

export const deleteLeadSource = async (
  sourceId,
  dispatch,
  setMessage,
  setSnackbarState,
  setSeverity,
  setIsDoingAction,
  closeSourcePopup
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.LEAD_SOURCES}/${sourceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      dispatch(deleteSource(sourceId));

      setSnackbarState(true);
      setMessage(response?.data?.message);
      setSeverity("success");

      setIsDoingAction(false);
      closeSourcePopup();
    }

    return response;
  } catch (error) {
    setSnackbarState(true);
    setMessage(error.response?.data?.message);
    setSeverity("error");
    setIsDoingAction(false);

    return error.response;
  }
};
