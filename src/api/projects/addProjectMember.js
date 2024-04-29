import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

export const addProjectMembers = async (body) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.post(
      `${API_ENDPOINTS.PROJECTS.ADD_PROJECT_MEMBERS}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("response", response);

    return response;
  } catch (error) {
    return error.response;
  }
};
