import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

export const getAllTeams = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(API_ENDPOINTS.TEAMS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
  }
};
