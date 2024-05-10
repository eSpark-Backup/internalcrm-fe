import React from "react";
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Button,
} from "@mui/material";
import SearchDark from "../../assets/logos/search-dark.svg?react";
import styles from "./style.module.css";
import { Search } from "@mui/icons-material";
import Picker from "../datePicker/index";

const SearchBar = ({
  onNameSearch,
  onMonthSearch,
  hideJobTitleSearch,
  hideStatusSearch,
  btn,
  btnText,
  onClick,
  searchTextOne,
  searchTextTwo,
}) => {
  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      sx={{ display: { xs: "block", lg: "flex" } }}
    >
      <Stack flexDirection="row">
      <div style={{ display: hideStatusSearch ? "flex" : "" }}>
          <TextField
          sx={{marginRight:"10px"}}
            placeholder={searchTextOne}
            variant="outlined"
            onChange={(e) => onNameSearch(e.target.value)} // Handle team name search
            className={styles.textfield}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchDark />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {hideStatusSearch && (
            <div className="date_status">
              <Picker placeholder="Search from" />
            </div>
          )}
          {hideStatusSearch && (
            <div className="date_status">
              <Picker placeholder="Search from" />
            </div>
          )}
          {!hideJobTitleSearch && (
            <TextField
              placeholder={searchTextTwo}
              variant="outlined"
              onChange={(e) => onMonthSearch(e.target.value)} // Handle job title search
              className={`${styles.textfield} ${styles.right_textfield}`}
              sx={{ marginLeft: "35px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchDark />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </div>

        <IconButton className={styles.search_container}>
          <Search style={{ color: "white" }} />
        </IconButton>
      </Stack>
      {btn && (
        <div className={styles.btn_container}>
          <Button
            className={`${styles.action_btn} inter-semibold`}
            onClick={onClick}
          >
            {btnText}
          </Button>
        </div>
      )}
    </Stack>
  );
};

export default SearchBar;
