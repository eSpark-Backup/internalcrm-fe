import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

export const updateProjectDetails = async (projectId, body) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.patch(
      `${API_ENDPOINTS.PROJECTS.PROJECTS}/${projectId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    return response;
  } catch (error) {
    return error.response;
  }
};
