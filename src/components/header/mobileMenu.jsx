import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import Button from "@mui/material/Button";

import AccountCircle from "../../assets/logos/profile.svg?react";
import NotificationsIcon from "../../assets/logos/notification.svg?react";
import ChangePassword from "../../assets/logos/change-password.svg?react";
import Logout from "../../assets/logos/logout.svg?react";

const MobileMenu = (props) => {
  const {
    mobileMoreAnchorEl,
    mobileMenuId,
    popup_styles,
    isMobileMenuOpen,
    handleMobileMenuClose,
    setChangePasswordModal,
    setLogoutModal,
  } = props;

  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={popup_styles}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem className="mobile_menu_item">
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          className="mobile_icon_button"
        >
          <Badge variant="dot" color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem
        className="mobile_menu_item"
        // onClick={handleProfileMenuOpen}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          className="mobile_icon_button"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>

      <MenuItem
        onClick={() => {
          setChangePasswordModal(true);
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

export default MobileMenu;
