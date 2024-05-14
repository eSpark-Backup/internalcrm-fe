import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
} from "@mui/material";

import Down from "../../assets/logos/down-arrow.svg?react";
import Up from "../../assets/logos/up-arrow.svg?react";

import { overview } from "../../constants/overview";

import styles from "./styles.module.css";

const OverviewPopup = ({ isOpen, onClose }) => {
  const [expandedDropdownId, setExpandedDropdownId] = useState(null);

  const handleDropdownChange = (id) => {
    setExpandedDropdownId((prevId) => (prevId === id ? null : id));
  };

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
        <DialogTitle className={`inter-bold ${styles.title}`}>
          Overview
        </DialogTitle>

        <DialogContent sx={{ padding: "20px 12px 0px 12px" }}>
          {overview?.map((item) => (
            <div className={styles.formControl} key={item.id}>
              <Button
                variant="contained"
                onClick={() => handleDropdownChange(item.id)}
                className={`inter-medium ${styles.dropdown_button}`}
              >
                {item.heading}
                {expandedDropdownId === item.id ? <Up /> : <Down />}
              </Button>

              {expandedDropdownId === item.id && (
                <div>
                  {item.status?.map((status) => (
                    <MenuItem
                      key={status.id}
                      className={`inter-regular ${styles.dropdown_options}`}
                    >
                      <span>{status.label}</span>
                      <span>{status.value}</span>
                    </MenuItem>
                  ))}
                </div>
              )}
            </div>
          ))}
        </DialogContent>

        <DialogActions sx={{ justifyContent: "left" }}>
          <Button
            className={`inter-semibold ${styles.close}`}
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
