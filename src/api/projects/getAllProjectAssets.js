import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

export const getAllProjectAssets = async (projectId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(
      `${API_ENDPOINTS.PROJECTS.GET_PROJECT_ASSETS}/${projectId}/assets`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    return response.data;
  } catch (error) {
    return error.response;
  }
};
