import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import Button from "@mui/material/Button";

import ChangePassword from "../../assets/logos/change-password.svg?react";
import Logout from "../../assets/logos/logout.svg?react";

const DesktopMenu = (props) => {
  const {
    anchorEl,
    menuId,
    popup_styles,
    isMenuOpen,
    handleMenuClose,
    setChangePasswordModal,
    setLogoutModal,
  } = props;

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={popup_styles}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          setChangePasswordModal(true);
          handleMenuClose();
        }}
        className="menu_item password_item"
      >
        <span className="menu_item_icon">
          <ChangePassword />
        </span>
        <span className="inter-medium">Change password</span>
      </MenuItem>

      <MenuItem className="menu_item">
        <Button
          className="inter-medium"
          onClick={() => {
            setLogoutModal(true);
            handleMenuClose();
          }}
        >
          <span className="menu_item_icon">
            <Logout />
          </span>
          <span>Logout</span>
        </Button>
      </MenuItem>
    </Menu>
  );
};

export default DesktopMenu;
