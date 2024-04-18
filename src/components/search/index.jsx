import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = ({ placeholder, onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <TextField
      placeholder={placeholder}
      variant="outlined"
      onChange={handleSearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton>
              <Search />
            </IconButton>
          </InputAdornment>
        ),
        sx: {
          marginRight: "40px",
          height:"35px",
          backgroundColor:"#fff",
          fontSize:"14px",
          "& .MuiOutlinedInput-input": {
            padding: "10px", // Adjust the input padding as needed
          },
        },
      }}
    />
  );
};

export default SearchBar;
