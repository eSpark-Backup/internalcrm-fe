import axiosInstance from "../../axiosInstance";
import API_ENDPOINTS from "../../endpoints";

// import { createUpdateProjectAsset } from "../../../redux/reducers/projectSlice";

export const uploadProjectAsset = async (
  body,
  dispatch,
  setMessage,
  setSnackbarState,
  setSeverity,
  setLoadingState,
  handleCloseAttachModal,
  refetch
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.post(
      `${API_ENDPOINTS.PROJECTS.UPLOAD_ASSETS}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 201 || response.status === 200) {
      // dispatch(createUpdateProjectAsset(response.data.data));
      refetch();

      setSnackbarState(true);
      setMessage(response?.data?.message);
      setSeverity("success");

      setLoadingState(false);
      handleCloseAttachModal();
    }

    return response;
  } catch (error) {
    setSnackbarState(true);
    setMessage(error.response?.data?.message);
    setSeverity("error");
    setLoadingState(false);

    return error.response;
  }
};
