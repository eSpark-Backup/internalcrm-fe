import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

export const uploadProjectAsset = async (body) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.post(
      `${API_ENDPOINTS.PROJECTS.UPLOAD_ASSETS}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    return error.response;
  }
};
