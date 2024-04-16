import { useState } from "react";

import Select from "react-select";

import InputLabel from "@mui/material/InputLabel";

import ArrowDropdown from "../../assets/logos/arrow-dropdown.svg?react";

import styles from "./style.module.css";

const selectStyles = (isMenuOpen, normalFont) => {
  return {
    container: (baseStyles, state) => ({
      ...baseStyles,
      filter:
        state.selectProps.menuIsOpen &&
        "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25))",
    }),
    control: (baseStyles) => ({
      ...baseStyles,
      padding: "5.5px 15px 5.5px 14px",
      borderColor: isMenuOpen ? "#068987 !important" : "#E4E4E4 !important",
      boxShadow: "none",
      borderRadius: isMenuOpen ? "5px 5px 0px 0px" : "5px",
    }),
    valueContainer: (baseStyles) => ({
      ...baseStyles,
      padding: "0px",
    }),
    indicatorsContainer: () => ({
      display: "none",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      // transition: "height 1s ease-in-out",
      // height: state.selectProps.menuIsOpen ? "200px" : "0px",
      overflow: "hidden",
      marginTop: "0px",
      borderRadius: "0px 0px 5px 5px",
    }),
    option: (provided, { isSelected }) => ({
      ...provided,
      cursor: "pointer",
      backgroundColor: isSelected ? "#E6F5F4" : "transparent",
      fontFamily: "Inter, sans-serif !important",
      padding: "14px 20px",
      color: isSelected ? "#068987" : "#595959",
      fontSize: normalFont ? "16px" : "14px",
      transition: "all 0.3s ease-in-out",
      borderLeft: isSelected ? "3px solid #068987" : "none",
      fontWeight: isSelected ? 500 : 400,

      ":not(:last-child)": {
        borderBottom: "1px solid #e4e4e4",
      },
      ":hover": {
        backgroundColor: "#E6F5F4",
        fontWeight: 500,
      },
    }),
  };
};

const CustomDropdownButton = ({ isMenuOpen }) => {
  return (
    <span
      className={`${styles.custom_dropdown_button} ${
        isMenuOpen ? styles.open : ""
      }`}
    >
      <ArrowDropdown className={styles.arrow} />
    </span>
  );
};

const AppSelect = (props) => {
  const { onChange, label, value, list, normalFont, placeholder } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <InputLabel
        id="label"
        className={`inter-medium ${styles.input_label}`}
        sx={{ fontSize: normalFont ? "16px !important" : "14px !important" }}
      >
        {label}
      </InputLabel>

      <Select
        value={value}
        onChange={onChange}
        options={list}
        styles={selectStyles(isMenuOpen, normalFont)}
        components={{
          DropdownIndicator: () => (
            <CustomDropdownButton isMenuOpen={isMenuOpen} />
          ),
        }}
        onMenuOpen={handleMenuOpen}
        onMenuClose={handleMenuClose}
        menuIsOpen={isMenuOpen}
        placeholder={placeholder}
      />
    </>
  );
};

export default AppSelect;
