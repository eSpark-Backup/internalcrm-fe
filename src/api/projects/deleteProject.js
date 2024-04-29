import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

export const deleteProject = async (projectId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.PROJECTS.PROJECTS}/${projectId}`,
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
