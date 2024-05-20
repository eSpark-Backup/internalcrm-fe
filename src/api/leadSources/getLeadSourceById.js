import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

// import { fetchAllSources } from "../../redux/reducers/leadSourcesSlice";

export const getLeadSourceById = async (
  // dispatch,
  setMessage,
  setSnackbarState,
  setSeverity,
  sourceId
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(
      `${API_ENDPOINTS.PROJECTS.CARDS}/${sourceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);

    if (response.status === 200) {
      // dispatch(fetchAllProjectCards(response.data));
    }

    return response.data;
  } catch (error) {
    console.log(error);
    console.log(error.response);
    console.log(error.response?.data);

    setSnackbarState(true);
    setMessage(error.response?.data?.message);
    setSeverity("error");

    return error.response;
  }
};
