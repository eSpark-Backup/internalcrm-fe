import axiosInstance from "../../axiosInstance";
import API_ENDPOINTS from "../../endpoints";

import { deleteProjectTaskCommentReducer } from "../../../redux/reducers/projectSlice";

export const deleteProjectTaskComment = async (
  commentId,
  dispatch,
  setMessage,
  setSnackbarState,
  setSeverity,
  setModalState,
  updateEditState
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.PROJECTS.ADD_TASKS_COMMENTS}/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    if (response.status === 200) {
      dispatch(deleteProjectTaskCommentReducer(commentId));

      setSnackbarState(true);
      setMessage(response?.data?.message);
      setSeverity("success");

      setModalState({ cardLoading: false, deleteComment: false });
      updateEditState({ editComment: false });
    }

    return response;
  } catch (error) {
    setModalState({ cardLoading: false });
    updateEditState({ editComment: false });

    setSnackbarState(true);
    setMessage(error.response?.data?.message);
    setSeverity("error");

    return error.response;
  }
};
