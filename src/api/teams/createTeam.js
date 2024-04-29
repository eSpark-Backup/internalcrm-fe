import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

export const createTeam = async (body) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.post(API_ENDPOINTS.TEAMS, body, {
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
