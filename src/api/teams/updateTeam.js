import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

export const updateTeamDetails = async (teamId, body) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.patch(
      `${API_ENDPOINTS.TEAMS}/${teamId}`,
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
    console.log(error);
  }
};
