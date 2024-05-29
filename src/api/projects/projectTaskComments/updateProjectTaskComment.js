import axiosInstance from "../../axiosInstance";
import API_ENDPOINTS from "../../endpoints";

// import { createUpdateProjectTaskComment } from "../../../redux/reducers/projectSlice";

export const updateProjectTaskComment = async (
  commentId,
  body,
  dispatch,
  setMessage,
  setSnackbarState,
  setSeverity,
  setCommentId,
  updateEditState,
  refetch
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.patch(
      `${API_ENDPOINTS.PROJECTS.ADD_TASKS_COMMENTS}/${commentId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      // dispatch(createUpdateProjectTaskComment(response.data.data));
      refetch();

      setSnackbarState(true);
      setMessage(response?.data?.message);
      setSeverity("success");

      setCommentId(null);

      updateEditState({ onComment: false, editComment: false });
    }

    return response;
  } catch (error) {
    updateEditState({ onComment: false });

    setSnackbarState(true);
    setMessage(error.response?.data?.message);
    setSeverity("error");

    return error.response;
  }
};
