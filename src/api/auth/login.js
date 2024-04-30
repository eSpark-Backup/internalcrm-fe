import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

import { loginUser } from "../../redux/reducers/authSlice";

export const loginAdmin = async (body, dispatch) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH, body);

    if (response.status == 200) {
      dispatch(loginUser(response.data.data));

      localStorage.setItem("token", response.data.data.token);
    }

    return response;
  } catch (error) {
    return error.response;
  }
};
