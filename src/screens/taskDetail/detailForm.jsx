import { useState } from "react";

import {
  Grid,
  Typography,
  FormControl,
  InputBase,
  Stack,
  Button,
} from "@mui/material";

import AppSelect from "../../components/common/appSelect";
import Picker from "../../components/datePicker";
import RichEditor from "./richEditor";
import AppDialog from "../../components/common/appDialog";

import Edit from "../../assets/logos/edit.svg?react";
import Close from "../../assets/logos/close.svg?react";
// import Delete from "../../assets/logos/delete.svg?react";
import DeleteColored from "../../assets/logos/delete-colored.svg?react";

import { statusList } from "../../constants/statusList";

import { capitalizeString } from "../../utils/capitalizeFirstLetter";

import styles from "./style.module.css";

const DetailForm = ({ taskDetail }) => {
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
    startComment: false,
    performAction: true,
    editDropdown: true,
  });

  const [modalState, setModalState] = useState({
    deleteComment: false,
    cardLoading: false,
  });

  const handleClose = () => {
    setModalState({
      deleteComment: false,
      cardLoading: false,
    });
  };

  const confirmDelete = () => {
    setModalState({
      deleteComment: false,
      cardLoading: false,
    });
  };

  const updateEditState = (newState) => {
    setEditState((prevState) => ({ ...prevState, ...newState }));
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
                  <div
                    className={`${styles.title_view} ${
                      !editState.editTitle ? "disabled-background" : ""
                    }`}
                  >
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
                  <div
                    className={`${styles.description_view} ${
                      !editState.editDescription ? "disabled-background" : ""
                    }`}
                  >
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
                  <Grid item xs={0.6}>
                    <div className={styles.avatar_container}>
                      <Typography
                        className={`${styles.comment_by} inter-medium`}
                      >
                        AN
                      </Typography>
                    </div>
                  </Grid>

                  <Grid item xs={11.4}>
                    {editState.startComment ? (
                      <RichEditor />
                    ) : (
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

                  {editState.startComment && (
                    <Grid item xs={12}>
                      <div className={styles.btn_container}>
                        <div
                          className={styles.outlined_container}
                          onClick={() =>
                            setModalState((prevState) => ({
                              ...prevState,
                              deleteComment: true,
                            }))
                          }
                        >
                          <DeleteColored />
                        </div>

                        <Button
                          className="inter-semibold"
                          onClick={() =>
                            updateEditState({ startComment: false })
                          }
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
