import * as React from "react";

import { styled } from "@mui/material/styles";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";

import styles from "./style.module.css";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2.5),
  },
  "& .MuiInputBase-input": {
    borderRadius: 5,
    position: "relative",
    backgroundColor: "#ffffff",
    border: "1px solid",
    borderColor: "#E4E4E4",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
  },
}));

export default function AppDialog(props) {
  const {
    open,
    setOpen,
    heading,
    textBox,
    text,
    doubleButton,
    leftText,
    rightText,
    singleButtonText,
    multiInputs,
    padding,
    changePasswordFields,
    onChange,
    muliStates,
  } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className="box_style"
        sx={{
          "& .MuiDialog-paper": {
            padding: padding,
          },
        }}
      >
        <DialogTitle className={`inter-semibold ${styles.dialog_title}`}>
          {heading}
        </DialogTitle>

        <DialogContent className={styles.dialog_content}>
          {textBox ? (
            <DialogContentText
              id="alert-dialog-slide-description"
              className={`inter-regular ${styles.dialog_description}`}
            >
              {text}
            </DialogContentText>
          ) : null}

          {multiInputs ? (
            <form noValidate autoComplete="off" className={styles.form}>
              {changePasswordFields?.map((field) => {
                return (
                  <FormControl
                    variant="standard"
                    className={styles.form_control}
                    key={field.id}
                    sx={{ marginTop: field.id !== 0 ? "15px" : "0px" }}
                  >
                    <InputLabel
                      shrink
                      htmlFor="bootstrap-input"
                      className={`inter-medium ${styles.input_label}`}
                    >
                      {field.label}
                    </InputLabel>

                    <BootstrapInput
                      placeholder={field.placeholder}
                      value={muliStates[field.name]}
                      id="bootstrap-input"
                      className="inter-regular"
                      onChange={(e) => onChange(field.name, e.target.value)}
                    />
                  </FormControl>
                );
              })}
            </form>
          ) : null}
        </DialogContent>

        <DialogActions className={styles.dialog_actions}>
          {doubleButton ? (
            <Stack
              sx={{ display: "block" }}
              className={styles.double_button_box}
            >
              <Button className={`inter-semibold ${styles.outlined_button}`}>
                {leftText}
              </Button>

              <Button className={`inter-semibold ${styles.filled_button}`}>
                {rightText}
              </Button>
            </Stack>
          ) : (
            <Stack sx={{ display: "block" }}>
              <Button className={`inter-semibold ${styles.filled_button}`}>
                {singleButtonText}
              </Button>
            </Stack>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
