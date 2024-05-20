import axiosInstance from "../../axiosInstance";
import API_ENDPOINTS from "../../endpoints";

import { createUpdateProjectCard } from "../../../redux/reducers/projectSlice";

export const updateProjectCardDetails = async (
  cardId,
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
      `${API_ENDPOINTS.PROJECTS.CARDS}/${cardId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      dispatch(createUpdateProjectCard(response.data.data));

      setSnackbarState(true);
      setMessage(response?.data?.message);
      setSeverity("success");

      setCardLoading(false);
      handleClose();
    }

    return response;
  } catch (error) {
    setSnackbarState(true);
    setMessage(error.response?.data?.message);
    setSeverity("error");
    setCardLoading(false);

    return error.response;
  }
};
