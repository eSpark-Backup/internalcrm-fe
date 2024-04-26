import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";

import AppInput from "./appInput";

import styles from "./style.module.css";

export default function AppDialog(props) {
  const {
    open,
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
    singleInput,
    label,
    placeholder,
    value,
    textClass,
    weight,
    margin,
    handleClose,
    onClick,
    dialog_content_custom,
  } = props;

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

        <DialogContent
          className={`${styles.dialog_content} ${dialog_content_custom}`}
          sx={{ margin }}
        >
          {textBox ? (
            <DialogContentText
              id="alert-dialog-slide-description"
              className={`inter-${weight} ${styles.dialog_description} ${textClass}`}
            >
              {text}
            </DialogContentText>
          ) : null}

          {multiInputs && (
            <form noValidate autoComplete="off" className={styles.form}>
              {changePasswordFields?.map((field) => {
                return (
                  <AppInput
                    onChange={(e) => onChange(field.name, e.target.value)}
                    key={field.id}
                    id={field.id}
                    sx={{ marginTop: field.id !== 0 ? "15px" : "0px" }}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={muliStates[field.name]}
                  />
                );
              })}
            </form>
          )}

          {singleInput && (
            <AppInput
              onChange={onChange}
              label={label}
              placeholder={placeholder}
              value={value}
            />
          )}
        </DialogContent>

        <DialogActions className={styles.dialog_actions}>
          {doubleButton ? (
            <Stack
              sx={{ display: "block" }}
              className={styles.double_button_box}
            >
              <Button
                className={`inter-semibold ${styles.outlined_button}`}
                onClick={handleClose}
              >
                {leftText}
              </Button>

              <Button
                className={`inter-semibold ${styles.filled_button}`}
                onClick={onClick}
              >
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
