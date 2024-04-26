import { useEffect, useRef, useState } from "react";

import { Stack } from "@mui/material";

import Label from "../common/inputLabel";

import ArrowDropdown from "../../assets/logos/arrow-dropdown.svg?react";

import styles from "./style.module.css";

const MultiLevelSelect = (props) => {
  const { label, placeholder, options } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState("");
  const [selectedChild, setSelectedChild] = useState(placeholder);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const submenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleSubmenuItemSelect = (label, parentLabel) => {
    setSelectedChild(label);
    setSelectedParent(parentLabel);
    setIsOpen(false);
  };

  return (
    <Stack className={styles.container}>
      <Label label={label} />

      <div
        className={`${styles.custom_dropdown} ${isOpen ? styles.active : ""}`}
        ref={dropdownRef}
      >
        <button
          onClick={(event) => handleToggleDropdown(event)}
          className={styles.dropdown_toggle}
          ref={buttonRef}
        >
          <span>{selectedChild}</span> <ArrowDropdown />
        </button>

        {isOpen && (
          <ul
            ref={submenuRef}
            className={`${styles.dropdown_menu} ${
              isOpen ? "d-block" : "d-none"
            }`}
          >
            {options?.map((item) => {
              return (
                <li
                  className={`${styles.dropdown_item} ${
                    styles.dropdown_submenu
                  } ${selectedParent === item.label ? styles.selected : ""}`}
                  key={item.label}
                >
                  {item.label}
                  {item.children && (
                    <ul className={styles.submenu}>
                      {item?.children?.map((child) => {
                        return (
                          <li
                            key={child.label}
                            className={`${styles.dropdown_item} ${
                              selectedChild === child.label
                                ? styles.selected
                                : ""
                            }`}
                            onClick={() =>
                              handleSubmenuItemSelect(child.label, item.label)
                            }
                          >
                            {child.label}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Stack>
  );
};

export default MultiLevelSelect;
