import axiosInstance from "../../axiosInstance";
import API_ENDPOINTS from "../../endpoints";

export const deleteProjectCard = async (cardId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.PROJECTS.CARDS}/${cardId}`,
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
