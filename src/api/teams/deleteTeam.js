import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

export const deleteTeam = async (teamId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.TEAMS}/${teamId}`,
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
