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
// import Delete from "../../assets/logos/delete.svg?react";
import DeleteColored from "../../assets/logos/delete-colored.svg?react";

import styles from "./style.module.css";

const DetailForm = () => {
  const [editState, setEditState] = useState({
    name: "UX/UI",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    comment: "",
    editTitle: false,
    editDescription: false,
    startComment: false,
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

                  <div
                    className={styles.icon_container}
                    onClick={() => updateEditState({ editTitle: true })}
                  >
                    <Edit />
                  </div>
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

                    <div className={styles.btn_container}>
                      {/* <div className={styles.outlined_container}>
                        <DeleteColored />
                      </div> */}

                      <Button
                        className="inter-semibold"
                        onClick={() => updateEditState({ editTitle: false })}
                      >
                        Save
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className={styles.title_view}>
                    <Typography variant="h6" className="inter-medium">
                      UX/UI
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

                  <div
                    className={styles.icon_container}
                    onClick={() => updateEditState({ editDescription: true })}
                  >
                    <Edit />
                  </div>
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

                    <div className={styles.btn_container}>
                      {/* <div className={styles.outlined_container}>
                        <DeleteColored />
                      </div> */}

                      <Button
                        className="inter-semibold"
                        onClick={() =>
                          updateEditState({ editDescription: false })
                        }
                      >
                        Save
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className={styles.description_view}>
                    <Typography variant="h6" className="inter-medium">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor
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
              <div className={styles.right_item_container}>
                <AppSelect
                  label="Assigned to:"
                  marginBottom="6px"
                  placeholder="Select"
                />
              </div>

              <div className={styles.right_item_container}>
                <AppSelect
                  label="Change task status"
                  marginBottom="6px"
                  placeholder="Select"
                />
              </div>

              <div className={styles.right_item_container}>
                <AppSelect
                  label="Move task to"
                  marginBottom="6px"
                  placeholder="Select"
                />
              </div>

              <div className={styles.right_item_container}>
                <Picker label="Due date" marginBottom="6px" />
              </div>
            </Stack>
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
