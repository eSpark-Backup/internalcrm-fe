import axiosInstance from "../../axiosInstance";
import API_ENDPOINTS from "../../endpoints";

export const deleteProjectMember = async (projectId, userId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.PROJECTS.DELETE_PROJECT_MEMBER}/${projectId}/member/${userId}`,
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
