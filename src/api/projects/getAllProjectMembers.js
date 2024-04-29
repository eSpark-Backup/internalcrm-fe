import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

export const getAllProjectMembers = async (projectId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(
      `${API_ENDPOINTS.PROJECTS.GET_PROJECT_MEMBERS}/${projectId}/members`,
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
