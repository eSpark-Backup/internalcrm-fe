import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import {
  Grid,
  Typography,
  FormControl,
  InputBase,
  Stack,
  Button,
  IconButton,
  Skeleton,
} from "@mui/material";

import AppSelect from "../../components/common/appSelect";
import Picker from "../../components/datePicker";
import RichEditor from "./richEditor";
import AppDialog from "../../components/common/appDialog";

import Edit from "../../assets/logos/edit.svg?react";
import Close from "../../assets/logos/close.svg?react";
// import Delete from "../../assets/logos/delete.svg?react";
import DeleteColored from "../../assets/logos/delete-colored.svg?react";

import { createProjectTaskComment } from "../../api/projects/projectTaskComments/createProjectTaskComment";
import { getAllProjectTaskComments } from "../../api/projects/projectTaskComments/getAllProjectTaskComments";
import { updateProjectTaskComment } from "../../api/projects/projectTaskComments/updateProjectTaskComment";
import { deleteProjectTaskComment } from "../../api/projects/projectTaskComments/deleteProjectTaskComment";

import { capitalizeString } from "../../utils/capitalizeFirstLetter";
import { convertDate } from "../../utils/formatdate";

import { statusList } from "../../constants/statusList";

import styles from "./style.module.css";

const DetailForm = (props) => {
  const { taskDetail, setMessage, setSnackbarState, setSeverity } = props;

  const dispatch = useDispatch();
  const allProjectTaskComments = useSelector(
    (state) => state.projects.allProjectTaskComments
  );

  const { isLoading, refetch } = useQuery({
    queryFn: () =>
      getAllProjectTaskComments(
        taskDetail.id,
        dispatch,
        setMessage,
        setSnackbarState,
        setSeverity
      ),
  });

  const [editState, setEditState] = useState({
    name: taskDetail?.name,
    description: taskDetail?.description,
    comment: "",
    status: {
      label: capitalizeString(taskDetail?.status),
      value: taskDetail?.status,
    },
    editTitle: false,
    editDescription: false,
    editComment: false,
    performAction: true,
    editDropdown: true,
    startComment: false,
    onComment: false,
  });

  const [modalState, setModalState] = useState({
    deleteComment: false,
    cardLoading: false,
  });
  const [commentId, setCommentId] = useState(null);

  const handleClose = () => {
    setModalState({
      deleteComment: false,
      cardLoading: false,
    });
  };

  const updateEditState = (newState) => {
    setEditState((prevState) => ({ ...prevState, ...newState }));
  };

  const onSaveComment = () => {
    updateEditState({ onComment: true });

    const body = {
      taskId: taskDetail?.id,
      comment: editState.comment,
    };

    createProjectTaskComment(
      body,
      dispatch,
      setMessage,
      setSnackbarState,
      setSeverity,
      updateEditState,
      refetch
    );
  };

  const onEditComment = () => {
    updateEditState({ onComment: true });

    const body = {
      comment: editState.comment,
    };

    updateProjectTaskComment(
      commentId,
      body,
      dispatch,
      setMessage,
      setSnackbarState,
      setSeverity,
      setCommentId,
      updateEditState,
      refetch
    );
  };

  const confirmDelete = () => {
    setModalState((prevState) => ({ ...prevState, cardLoading: true }));
    updateEditState({ editComment: true });

    deleteProjectTaskComment(
      commentId,
      dispatch,
      setMessage,
      setSnackbarState,
      setSeverity,
      setModalState,
      updateEditState
    );
  };

  const extractTextFromHtml = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className={styles.detail_container}>
      <form className={styles.form_container}>
        <Grid container spacing={2.5}>
          <Grid item lg={10} xs={12}>
            <Stack>
              <div className={styles.item_container}>
                <div className={styles.header_container}>
                  <Typography
                    variant="h5"
                    className={`${styles.title} inter-semibold`}
                  >
                    Title
                  </Typography>

                  {editState?.editTitle ? (
                    <div
                      className={`${styles.icon_container} ${styles.icon_container_close}`}
                      onClick={() =>
                        updateEditState({
                          editTitle: false,
                          performAction: true,
                        })
                      }
                    >
                      <Close />
                    </div>
                  ) : (
                    <div
                      className={styles.icon_container}
                      onClick={() =>
                        updateEditState({
                          editTitle: true,
                          performAction: false,
                        })
                      }
                    >
                      <Edit />
                    </div>
                  )}
                </div>

                {editState.editTitle ? (
                  <>
                    <FormControl className={styles.form_control}>
                      <InputBase
                        placeholder="Title"
                        value={editState.name}
                        onChange={(e) =>
                          updateEditState({ name: e.target.value })
                        }
                      />
                    </FormControl>

                    {/* <div className={styles.btn_container}>
                      <div className={styles.outlined_container}>
                        <DeleteColored />
                      </div>

                      <Button
                        className="inter-semibold"
                        onClick={() => updateEditState({ editTitle: false })}
                      >
                        Save
                      </Button>
                    </div> */}
                  </>
                ) : (
                  <div className={`${styles.title_view}`}>
                    <Typography variant="h6" className="inter-medium">
                      {taskDetail?.name}
                    </Typography>
                  </div>
                )}
              </div>

              <div className={styles.item_container}>
                <div className={styles.header_container}>
                  <Typography
                    variant="h5"
                    className={`${styles.title} inter-semibold`}
                  >
                    Description
                  </Typography>

                  {editState?.editDescription ? (
                    <div
                      className={`${styles.icon_container} ${styles.icon_container_close}`}
                      onClick={() =>
                        updateEditState({
                          editDescription: false,
                          performAction: true,
                        })
                      }
                    >
                      <Close />
                    </div>
                  ) : (
                    <div
                      className={styles.icon_container}
                      onClick={() =>
                        updateEditState({
                          editDescription: true,
                          performAction: false,
                        })
                      }
                    >
                      <Edit />
                    </div>
                  )}
                </div>

                {editState.editDescription ? (
                  <>
                    <FormControl className={styles.form_control}>
                      <InputBase
                        placeholder="Description"
                        value={editState.description}
                        onChange={(e) =>
                          updateEditState({ description: e.target.value })
                        }
                      />
                    </FormControl>

                    {/* <div className={styles.btn_container}>
                      <div className={styles.outlined_container}>
                        <DeleteColored />
                      </div>

                      <Button
                        className="inter-semibold"
                        onClick={() =>
                          updateEditState({ editDescription: false })
                        }
                      >
                        Save
                      </Button>
                    </div> */}
                  </>
                ) : (
                  <div className={`${styles.description_view}`}>
                    <Typography variant="h6" className="inter-medium">
                      {taskDetail?.description}
                    </Typography>
                  </div>
                )}
              </div>

              <div className={styles.item_container}>
                <div className={styles.header_container}>
                  <Typography
                    variant="h5"
                    className={`${styles.title} inter-semibold`}
                  >
                    Comments
                  </Typography>
                </div>

                <Grid container alignItems={"center"}>
                  <Grid item xl={0.6} lg={0.8} xs={1.6}>
                    <div className={styles.avatar_container}>
                      <Typography
                        className={`${styles.comment_by_av} inter-medium`}
                      >
                        AN
                      </Typography>
                    </div>
                  </Grid>

                  <Grid item xl={11.4} lg={11.2} xs={10.4}>
                    {isLoading ? (
                      <Skeleton height="100px" />
                    ) : editState.startComment ? (
                      // Show Editor If There is no Comment, And Want To Add Comment
                      <RichEditor
                        handleChange={(html) =>
                          updateEditState({ comment: html })
                        }
                        comment={editState.comment}
                      />
                    ) : allProjectTaskComments?.length ? (
                      //  Show Comment If There Is A Comment
                      <div>
                        {allProjectTaskComments?.map((comment) => (
                          <div key={comment?.id}>
                            <div className={styles.comment_header}>
                              {/* <div
                                dangerouslySetInnerHTML={{
                                  __html: comment.comment,
                                }}
                              /> */}

                              <div className={styles.comment_by}>
                                <Typography
                                  variant="h5"
                                  className="inter-medium"
                                  textTransform={"capitalize"}
                                >
                                  {comment.userId.firstName}
                                </Typography>

                                <Typography
                                  variant="h5"
                                  className={`${styles.date} inter-medium`}
                                >
                                  {convertDate(comment.createdAt)}
                                </Typography>
                              </div>

                              {editState?.editComment ? (
                                <div
                                  className={`${styles.icon_container} ${styles.icon_container_close}`}
                                  onClick={() => {
                                    setCommentId(null);

                                    updateEditState({
                                      editComment: false,
                                    });
                                  }}
                                >
                                  <Close />
                                </div>
                              ) : (
                                <div
                                  className={styles.icon_container}
                                  onClick={() => {
                                    setCommentId(comment.id);

                                    updateEditState({
                                      editComment: true,
                                      comment: extractTextFromHtml(
                                        comment.comment
                                      ),
                                    });
                                  }}
                                >
                                  <Edit />
                                </div>
                              )}
                            </div>

                            {editState.editComment ? (
                              <FormControl className={styles.form_control}>
                                <InputBase
                                  placeholder="Comment"
                                  value={editState.comment}
                                  onChange={(e) =>
                                    updateEditState({ comment: e.target.value })
                                  }
                                />
                              </FormControl>
                            ) : (
                              <div className={`${styles.show_comment}`}>
                                <Typography
                                  variant="h6"
                                  className="inter-medium"
                                >
                                  {extractTextFromHtml(comment.comment)}
                                </Typography>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      // If There Is No Comment, Show Placeholder
                      <div
                        className={styles.comment}
                        onClick={() => updateEditState({ startComment: true })}
                      >
                        <Typography variant="h6" className="inter-medium">
                          Write a comment...
                        </Typography>
                      </div>
                    )}
                  </Grid>

                  {(editState.startComment || editState.editComment) && (
                    <Grid item xs={12}>
                      <div className={styles.btn_container}>
                        {editState.editComment && (
                          <IconButton
                            className={styles.outlined_container}
                            onClick={() => {
                              setModalState((prevState) => ({
                                ...prevState,
                                deleteComment: true,
                              }));
                            }}
                            disabled={editState.onComment}
                          >
                            <DeleteColored />
                          </IconButton>
                        )}

                        <Button
                          className={`inter-semibold ${
                            editState.onComment ? styles.disabled : ""
                          }`}
                          onClick={
                            editState.editComment
                              ? onEditComment
                              : onSaveComment
                          }
                          disabled={editState.onComment}
                        >
                          Save
                        </Button>
                      </div>
                    </Grid>
                  )}
                </Grid>
              </div>
            </Stack>
          </Grid>

          <Grid item lg={2} xs={12}>
            <Stack className={styles.dropdown_container}>
              {!editState?.editDropdown ? (
                <div
                  className={`${styles.icon_container} ${styles.icon_container_close} ${styles.icon_container_dropdown}`}
                  onClick={() =>
                    updateEditState({
                      editDropdown: true,
                      performAction: true,
                    })
                  }
                >
                  <Close />
                </div>
              ) : (
                <div
                  className={`${styles.icon_container} ${styles.icon_container_dropdown}`}
                  onClick={() =>
                    updateEditState({
                      editDropdown: false,
                      performAction: false,
                    })
                  }
                >
                  <Edit />
                </div>
              )}
              <div className={styles.right_item_container}>
                <AppSelect
                  label="Assigned to:"
                  marginBottom="6px"
                  placeholder="Select"
                  isDisabled={editState?.editDropdown}
                />
              </div>

              <div className={styles.right_item_container}>
                <AppSelect
                  label="Change task status"
                  marginBottom="6px"
                  placeholder="Select"
                  list={statusList}
                  value={editState.status}
                  onChange={(e) => updateEditState({ status: e })}
                  isDisabled={editState?.editDropdown}
                />
              </div>

              <div className={styles.right_item_container}>
                <AppSelect
                  label="Move task to"
                  marginBottom="6px"
                  placeholder="Select"
                  isDisabled={editState?.editDropdown}
                />
              </div>

              <div className={styles.right_item_container}>
                <Picker
                  label="Due date"
                  marginBottom="6px"
                  disabled={editState?.editDropdown}
                />
              </div>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <div className={styles.btn_container}>
              <Button
                className={`inter-semibold ${
                  editState.performAction ? styles.disabled : ""
                }`}
                onClick={() => console.log("save")}
                disabled={editState.performAction}
              >
                Save
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>

      {/* Delete Comment Modal */}
      <AppDialog
        open={modalState.deleteComment}
        padding="32px 38px"
        heading="Delete Comment"
        textBox={true}
        text="Are you sure you want to delete this comment?"
        doubleButton={true}
        leftText="No"
        rightText="Yes"
        textClass={styles.text_class}
        weight="regular"
        margin="47px 0px"
        handleClose={handleClose}
        onClick={confirmDelete}
        loader={modalState.cardLoading}
      />
    </div>
  );
};

export default DetailForm;
