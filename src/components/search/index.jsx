import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Button,
} from "@mui/material";

import Search from "../../assets/logos/small-search.svg?react";
import SearchDark from "../../assets/logos/search-dark.svg?react";

import styles from "./style.module.css";

const SearchBar = (props) => {
  const {
    name,
    jobTitle,
    btn,
    btnText,
    handleSearchName,
    handleSearchJobTitle,
    onClick,
  } = props;

  return (
    <Stack flexDirection="row" justifyContent="space-between">
      <Stack flexDirection="row">
        <div>
          <TextField
            placeholder="Search by team name"
            variant="outlined"
            onChange={handleSearchName}
            value={name}
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

          <TextField
            placeholder="Search by job title"
            variant="outlined"
            onChange={handleSearchJobTitle}
            value={jobTitle}
            className={styles.textfield}
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
        </div>

        <IconButton className={styles.search_container}>
          <Search style={{ color: "white" }} />
        </IconButton>
      </Stack>

      {btn && (
        <Button
          className={`${styles.action_btn} inter-semibold`}
          onClick={onClick}
        >
          {btnText}
        </Button>
      )}
    </Stack>
  );
};

export default SearchBar;
