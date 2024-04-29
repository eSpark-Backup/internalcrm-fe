import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

export const FETCH_PROJECTS = "FETCH_PROJECTS";

export const getAllProjects = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(API_ENDPOINTS.PROJECTS.PROJECTS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error.response;
  }
};
