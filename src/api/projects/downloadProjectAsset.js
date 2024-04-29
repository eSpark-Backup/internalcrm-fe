import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

export const downloadProjectAsset = async (projectId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(
      `${API_ENDPOINTS.PROJECTS.DOWNLOAD_PROJECT_ASSET}/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
  }
};
