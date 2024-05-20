import axiosInstance from "../../axiosInstance";
import API_ENDPOINTS from "../../endpoints";

import { deleteProjectCardReducer } from "../../../redux/reducers/projectSlice";

export const deleteProjectCard = async (
  cardId,
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
      `${API_ENDPOINTS.PROJECTS.CARDS}/${cardId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      dispatch(deleteProjectCardReducer(cardId));

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
