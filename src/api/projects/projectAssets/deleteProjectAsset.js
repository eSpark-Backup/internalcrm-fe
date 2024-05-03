import axiosInstance from "../../axiosInstance";
import API_ENDPOINTS from "../../endpoints";

import { deleteProjectAssetReducer } from "../../../redux/reducers/projectSlice";

export const deleteProjectAsset = async (
  assetId,
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
      `${API_ENDPOINTS.PROJECTS.DELETE_PROJECT_ASSET}/${assetId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      dispatch(deleteProjectAssetReducer(assetId));

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
  }
};
