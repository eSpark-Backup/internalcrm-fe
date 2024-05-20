import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

import { deleteSource } from "../../redux/reducers/leadSourcesSlice";

export const deleteLeadSource = async (
  sourceId,
  dispatch,
  setMessage,
  setSnackbarState,
  setSeverity,
  setCardLoading,
  handleClose
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

      setCardLoading(false);
      handleClose();
    }

    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
    console.log(error.response);
    console.log(error.response?.data);

    setSnackbarState(true);
    setMessage(error.response?.data?.message);
    setSeverity("error");
    setCardLoading(false);

    return error.response;
  }
};
