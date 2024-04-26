import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  FormControl,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./styles.module.css";

// Import dropdown icon from Material-UI icons
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "10px !important",
    minWidth: 120,
    display: "block !important", // Ensure each form control takes up full width
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  option: {
    display: "flex",
    justifyContent: "space-between",
  },
  // Add custom styles for the button
}));

const OverviewPopup = ({ isOpen, onClose }) => {
  const [dropdownValue1, setDropdownValue1] = useState("");
  const [dropdownValue2, setDropdownValue2] = useState("");
  const [dropdownValue3, setDropdownValue3] = useState("");
  const [dropdownValue4, setDropdownValue4] = useState("");
  const [isDropdown1Expanded, setIsDropdown1Expanded] = useState(false);
  const [isDropdown2Expanded, setIsDropdown2Expanded] = useState(false);
  const [isDropdown3Expanded, setIsDropdown3Expanded] = useState(false);
  const [isDropdown4Expanded, setIsDropdown4Expanded] = useState(false);

  const handleDropdownChange1 = () => {
    setIsDropdown1Expanded((prevState) => !prevState);
    if (!isDropdown1Expanded) {
      setDropdownValue1("");
    }
  };

  const handleDropdownChange2 = () => {
    setIsDropdown2Expanded((prevState) => !prevState);
    if (!isDropdown2Expanded) {
      setDropdownValue2("");
    }
  };

  const handleDropdownChange3 = () => {
    setIsDropdown3Expanded((prevState) => !prevState);
    if (!isDropdown3Expanded) {
      setDropdownValue3("");
    }
  };

  const handleDropdownChange4 = () => {
    setIsDropdown4Expanded((prevState) => !prevState);
    if (!isDropdown4Expanded) {
      setDropdownValue4("");
    }
  };

  const handleSubmit = () => {
    // Handle submission logic here
    onClose(); // Close the dialog after submission
  };

  const classes = useStyles();

  return (
    <div>
      <Dialog
        PaperProps={{
          sx: {
            width: "60%",
            maxWidth: "none",
            padding: "0px 10px 20px 10px",
            borderRadius: "10px",
          },
        }}
        open={isOpen}
        onClose={onClose}
      >
        <DialogTitle
          sx={{
            fontSize: "20px",
            fontFamily: "Inter",
            fontWeight: "700",
            color: "#595959",
            padding: "10px 24px 0px 24px",
            marginLeft: "-10px",
          }}
        >
          Overview
        </DialogTitle>
        <DialogContent sx={{ padding: "20px 12px 0px 12px" }}>
          <FormControl className={classes.formControl}>
            <Button
              variant="contained"
              onClick={handleDropdownChange1}
              className={styles.dropdown_button}
            >
              Lead Status
              {isDropdown1Expanded ? (
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.70832 7.70734C7.52079 7.89481 7.26648 8.00013 7.00132 8.00013C6.73616 8.00013 6.48185 7.89481 6.29432 7.70734L0.63732 2.05034C0.541809 1.9581 0.465627 1.84775 0.413218 1.72575C0.360809 1.60374 0.333223 1.47252 0.332069 1.33974C0.330915 1.20696 0.356217 1.07529 0.406498 0.952389C0.456779 0.829493 0.531032 0.71784 0.624925 0.623948C0.718817 0.530055 0.830469 0.455802 0.953365 0.405521C1.07626 0.35524 1.20794 0.329939 1.34072 0.331092C1.4735 0.332246 1.60472 0.359833 1.72672 0.412242C1.84873 0.464651 1.95907 0.540832 2.05132 0.636343L7.00132 5.58634L11.9513 0.636343C12.1399 0.454185 12.3925 0.35339 12.6547 0.355669C12.9169 0.357947 13.1677 0.463116 13.3531 0.648524C13.5385 0.833932 13.6437 1.08474 13.646 1.34694C13.6483 1.60914 13.5475 1.86174 13.3653 2.05034L7.70832 7.70734Z"
                    fill="#595959"
                  />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.26824 0.623712C6.45577 0.436241 6.71008 0.330925 6.97524 0.330925C7.24041 0.330925 7.49472 0.436241 7.68224 0.623712L13.3392 6.28071C13.4348 6.37296 13.5109 6.4833 13.5633 6.60531C13.6158 6.72731 13.6433 6.85853 13.6445 6.99131C13.6456 7.12409 13.6203 7.25577 13.5701 7.37867C13.5198 7.50156 13.4455 7.61321 13.3516 7.70711C13.2577 7.801 13.1461 7.87525 13.0232 7.92553C12.9003 7.97581 12.7686 8.00112 12.6358 7.99996C12.5031 7.99881 12.3718 7.97122 12.2498 7.91881C12.1278 7.8664 12.0175 7.79022 11.9252 7.69471L6.97524 2.74471L2.02524 7.69471C1.83664 7.87687 1.58404 7.97766 1.32184 7.97539C1.05965 7.97311 0.808832 7.86794 0.623425 7.68253C0.438017 7.49712 0.332847 7.24631 0.330568 6.98411C0.32829 6.72192 0.429084 6.46931 0.611242 6.28071L6.26824 0.623712Z"
                    fill="#595959"
                  />
                </svg>
              )}
            </Button>
            {isDropdown1Expanded && (
              <div>
                <MenuItem
                  className={styles.dropdown_options}
                  onClick={() => handleDropdownChange1("Not Yet Connected")}
                >
                  <span>Not Yet Connected</span>
                  <span>2</span>
                </MenuItem>
                <MenuItem
                  className={styles.dropdown_options}
                  onClick={() => handleDropdownChange1("Not Interested")}
                >
                  <span>Not Interested</span>
                  <span>2</span>
                </MenuItem>
                <MenuItem
                  className={styles.dropdown_options}
                  onClick={() => handleDropdownChange1("Voice Mail")}
                >
                  <span>Voice Mail</span>
                  <span>2</span>
                </MenuItem>
                <MenuItem
                  className={styles.dropdown_options}
                  onClick={() => handleDropdownChange1("Connected")}
                >
                  <span>Connected</span>
                  <span>0</span>
                </MenuItem>
                <MenuItem
                  className={styles.dropdown_options}
                  onClick={() => handleDropdownChange1("Follow Up")}
                >
                  <span>Follow Up</span>
                  <span>0</span>
                </MenuItem>
                <MenuItem
                  className={styles.dropdown_options}
                  onClick={() => handleDropdownChange1("Converted")}
                >
                  <span>Converted</span>
                  <span>0</span>
                </MenuItem>
              </div>
            )}
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button
              variant="contained"
              onClick={handleDropdownChange2}
              className={styles.dropdown_button}
            >
              Email Send
              {isDropdown2Expanded ? (
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.70832 7.70734C7.52079 7.89481 7.26648 8.00013 7.00132 8.00013C6.73616 8.00013 6.48185 7.89481 6.29432 7.70734L0.63732 2.05034C0.541809 1.9581 0.465627 1.84775 0.413218 1.72575C0.360809 1.60374 0.333223 1.47252 0.332069 1.33974C0.330915 1.20696 0.356217 1.07529 0.406498 0.952389C0.456779 0.829493 0.531032 0.71784 0.624925 0.623948C0.718817 0.530055 0.830469 0.455802 0.953365 0.405521C1.07626 0.35524 1.20794 0.329939 1.34072 0.331092C1.4735 0.332246 1.60472 0.359833 1.72672 0.412242C1.84873 0.464651 1.95907 0.540832 2.05132 0.636343L7.00132 5.58634L11.9513 0.636343C12.1399 0.454185 12.3925 0.35339 12.6547 0.355669C12.9169 0.357947 13.1677 0.463116 13.3531 0.648524C13.5385 0.833932 13.6437 1.08474 13.646 1.34694C13.6483 1.60914 13.5475 1.86174 13.3653 2.05034L7.70832 7.70734Z"
                    fill="#595959"
                  />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.26824 0.623712C6.45577 0.436241 6.71008 0.330925 6.97524 0.330925C7.24041 0.330925 7.49472 0.436241 7.68224 0.623712L13.3392 6.28071C13.4348 6.37296 13.5109 6.4833 13.5633 6.60531C13.6158 6.72731 13.6433 6.85853 13.6445 6.99131C13.6456 7.12409 13.6203 7.25577 13.5701 7.37867C13.5198 7.50156 13.4455 7.61321 13.3516 7.70711C13.2577 7.801 13.1461 7.87525 13.0232 7.92553C12.9003 7.97581 12.7686 8.00112 12.6358 7.99996C12.5031 7.99881 12.3718 7.97122 12.2498 7.91881C12.1278 7.8664 12.0175 7.79022 11.9252 7.69471L6.97524 2.74471L2.02524 7.69471C1.83664 7.87687 1.58404 7.97766 1.32184 7.97539C1.05965 7.97311 0.808832 7.86794 0.623425 7.68253C0.438017 7.49712 0.332847 7.24631 0.330568 6.98411C0.32829 6.72192 0.429084 6.46931 0.611242 6.28071L6.26824 0.623712Z"
                    fill="#595959"
                  />
                </svg>
              )}
            </Button>
            {isDropdown2Expanded && (
              <div>
                <MenuItem
                  className={styles.dropdown_options}
                  onClick={() => handleDropdownChange2("Yes")}
                >
                  <span>Yes</span>
                  <span>2</span>
                </MenuItem>
                <MenuItem
                  className={styles.dropdown_options}
                  onClick={() => handleDropdownChange2("No")}
                >
                  <span>No</span>
                  <span>0</span>
                </MenuItem>
              </div>
            )}
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button
              variant="contained"
              onClick={handleDropdownChange3}
              className={styles.dropdown_button}
            >
              Sales Person
              {isDropdown3Expanded ? (
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.70832 7.70734C7.52079 7.89481 7.26648 8.00013 7.00132 8.00013C6.73616 8.00013 6.48185 7.89481 6.29432 7.70734L0.63732 2.05034C0.541809 1.9581 0.465627 1.84775 0.413218 1.72575C0.360809 1.60374 0.333223 1.47252 0.332069 1.33974C0.330915 1.20696 0.356217 1.07529 0.406498 0.952389C0.456779 0.829493 0.531032 0.71784 0.624925 0.623948C0.718817 0.530055 0.830469 0.455802 0.953365 0.405521C1.07626 0.35524 1.20794 0.329939 1.34072 0.331092C1.4735 0.332246 1.60472 0.359833 1.72672 0.412242C1.84873 0.464651 1.95907 0.540832 2.05132 0.636343L7.00132 5.58634L11.9513 0.636343C12.1399 0.454185 12.3925 0.35339 12.6547 0.355669C12.9169 0.357947 13.1677 0.463116 13.3531 0.648524C13.5385 0.833932 13.6437 1.08474 13.646 1.34694C13.6483 1.60914 13.5475 1.86174 13.3653 2.05034L7.70832 7.70734Z"
                    fill="#595959"
                  />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.26824 0.623712C6.45577 0.436241 6.71008 0.330925 6.97524 0.330925C7.24041 0.330925 7.49472 0.436241 7.68224 0.623712L13.3392 6.28071C13.4348 6.37296 13.5109 6.4833 13.5633 6.60531C13.6158 6.72731 13.6433 6.85853 13.6445 6.99131C13.6456 7.12409 13.6203 7.25577 13.5701 7.37867C13.5198 7.50156 13.4455 7.61321 13.3516 7.70711C13.2577 7.801 13.1461 7.87525 13.0232 7.92553C12.9003 7.97581 12.7686 8.00112 12.6358 7.99996C12.5031 7.99881 12.3718 7.97122 12.2498 7.91881C12.1278 7.8664 12.0175 7.79022 11.9252 7.69471L6.97524 2.74471L2.02524 7.69471C1.83664 7.87687 1.58404 7.97766 1.32184 7.97539C1.05965 7.97311 0.808832 7.86794 0.623425 7.68253C0.438017 7.49712 0.332847 7.24631 0.330568 6.98411C0.32829 6.72192 0.429084 6.46931 0.611242 6.28071L6.26824 0.623712Z"
                    fill="#595959"
                  />
                </svg>
              )}
            </Button>
            {isDropdown3Expanded && (
              <div>
                <MenuItem
                  className={styles.dropdown_options}
                  onClick={() => handleDropdownChange3("M. Shayan")}
                >
                  <span>M. Shayan</span>
                  <span>0</span>
                </MenuItem>
                <MenuItem
                  className={styles.dropdown_options}
                  onClick={() => handleDropdownChange3("Tuba")}
                >
                  <span>Tuba</span>
                  <span>0</span>
                </MenuItem>
              </div>
            )}
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button
              variant="contained"
              onClick={handleDropdownChange4}
              className={styles.dropdown_button}
            >
              Call Make
              {isDropdown4Expanded ? (
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.70832 7.70734C7.52079 7.89481 7.26648 8.00013 7.00132 8.00013C6.73616 8.00013 6.48185 7.89481 6.29432 7.70734L0.63732 2.05034C0.541809 1.9581 0.465627 1.84775 0.413218 1.72575C0.360809 1.60374 0.333223 1.47252 0.332069 1.33974C0.330915 1.20696 0.356217 1.07529 0.406498 0.952389C0.456779 0.829493 0.531032 0.71784 0.624925 0.623948C0.718817 0.530055 0.830469 0.455802 0.953365 0.405521C1.07626 0.35524 1.20794 0.329939 1.34072 0.331092C1.4735 0.332246 1.60472 0.359833 1.72672 0.412242C1.84873 0.464651 1.95907 0.540832 2.05132 0.636343L7.00132 5.58634L11.9513 0.636343C12.1399 0.454185 12.3925 0.35339 12.6547 0.355669C12.9169 0.357947 13.1677 0.463116 13.3531 0.648524C13.5385 0.833932 13.6437 1.08474 13.646 1.34694C13.6483 1.60914 13.5475 1.86174 13.3653 2.05034L7.70832 7.70734Z"
                    fill="#595959"
                  />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.26824 0.623712C6.45577 0.436241 6.71008 0.330925 6.97524 0.330925C7.24041 0.330925 7.49472 0.436241 7.68224 0.623712L13.3392 6.28071C13.4348 6.37296 13.5109 6.4833 13.5633 6.60531C13.6158 6.72731 13.6433 6.85853 13.6445 6.99131C13.6456 7.12409 13.6203 7.25577 13.5701 7.37867C13.5198 7.50156 13.4455 7.61321 13.3516 7.70711C13.2577 7.801 13.1461 7.87525 13.0232 7.92553C12.9003 7.97581 12.7686 8.00112 12.6358 7.99996C12.5031 7.99881 12.3718 7.97122 12.2498 7.91881C12.1278 7.8664 12.0175 7.79022 11.9252 7.69471L6.97524 2.74471L2.02524 7.69471C1.83664 7.87687 1.58404 7.97766 1.32184 7.97539C1.05965 7.97311 0.808832 7.86794 0.623425 7.68253C0.438017 7.49712 0.332847 7.24631 0.330568 6.98411C0.32829 6.72192 0.429084 6.46931 0.611242 6.28071L6.26824 0.623712Z"
                    fill="#595959"
                  />
                </svg>
              )}
            </Button>
            {isDropdown4Expanded && (
              <div>
                <MenuItem
                  className={styles.dropdown_options}
                  onClick={() => handleDropdownChange4("Yes")}
                >
                  <span>Yes</span>
                  <span>0</span>
                </MenuItem>
                <MenuItem
                  className={styles.dropdown_options}
                  onClick={() => handleDropdownChange4("No")}
                >
                  <span>No</span>
                  <span>0</span>
                </MenuItem>
              </div>
            )}
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "left" }}>
          <Button
            sx={{
              backgroundColor: "#029894",
              borderRadius: "5px",
              width: "120px",
              height: "40px",
              color: "#fff",
              textTransform: "capitalize",
              fontFamily: "Inter",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#029894",
              },
            }}
            onClick={onClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OverviewPopup;
