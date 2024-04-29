import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

export const deleteProjectAsset = async (projectId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.PROJECTS.DELETE_PROJECT_ASSET}/${projectId}`,
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
