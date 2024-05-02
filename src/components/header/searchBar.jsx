import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

import SearchIcon from "../../assets/logos/search.svg?react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 5,
  marginRight: theme.spacing(3),
  marginLeft: 0,
  [theme.breakpoints.down("md")]: {
    marginRight: theme.spacing(0),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0, 0, 4.2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "@media only screen and (max-width: 1366px)": {
    padding: "0px 0px 0px 28px",

    "& svg": {
      width: "22px",
    },
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1.69, 1, 1.69, 8),
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: `calc(230px - ${theme.spacing(6.5)})`,
    },
    width: "100%",
    border: "1px solid #E4E4E4",
    borderRadius: "5px",
  },

  "@media only screen and (max-width: 1366px)": {
    "& .MuiInputBase-input": {
      padding: "11px 8px 11px 58px",
    },
  },

  "@media only screen and (max-width: 1199px)": {
    "& .MuiInputBase-input": {
      padding: "10px 8px 10px 58px",
    },
  },
}));

const SearchBar = () => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase placeholder="" inputProps={{ "aria-label": "search" }} />
    </Search>
  );
};

export default SearchBar;
