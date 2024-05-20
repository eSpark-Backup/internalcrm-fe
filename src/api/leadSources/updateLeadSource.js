import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

import { createUpdateSource } from "../../redux/reducers/leadSourcesSlice";

export const updateLeadSource = async (
  sourceId,
  body,
  dispatch,
  setMessage,
  setSnackbarState,
  setSeverity,
  setCardLoading,
  handleClose
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.patch(
      `${API_ENDPOINTS.LEAD_SOURCES}/${sourceId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    if (response.status === 200) {
      dispatch(createUpdateSource(response.data.data));

      setSnackbarState(true);
      setMessage(response?.data?.message);
      setSeverity("success");

      setCardLoading(false);
      handleClose();
    }

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
