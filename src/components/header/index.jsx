import * as React from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";

import AppDialog from "../common/appDialog";

import AccountCircle from "../../assets/logos/profile.svg?react";
import NotificationsIcon from "../../assets/logos/notification.svg?react";
import SearchIcon from "../../assets/logos/search.svg?react";
import ChangePassword from "../../assets/logos/change-password.svg?react";
import Logout from "../../assets/logos/logout.svg?react";
import Delete from "../../assets/logos/delete.svg?react";
import Checked from "../../assets/logos/check.svg?react";
import Logo from "../../assets/logos/login-logo.svg?react";

import { changePasswordFields } from "../../constants/changePassword";
import { notifications } from "../../constants/notifications";

import styles from "./style.module.css";

const drawerWidth = 240;

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

export default function AppHeader({ handleDrawerToggle }) {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [logoutModal, setLogoutModal] = React.useState(false);
  const [changePasswordModal, setChangePasswordModal] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [hoveredId, setHoveredId] = React.useState(null);

  const [state, setState] = React.useState({
    current_password: "",
    new_password: "",
    retype_new_password: "",
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isNotificationOpen = Boolean(notificationAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleInputChange = (key, value) => {
    setState((state) => ({ ...state, [key]: value }));
  };

  // Menu Popup Styles
  const popup_styles = {
    "& .MuiPopover-paper": {
      top: "85px !important",
      right: "40px !important",
      left: "unset !important",
      width: "200px",
      backgroundColor: "#F4F6F9",
      border: "1px solid #E4E4E4",
      boxShadow: "0px 20px 20px rgba(0, 0, 0, 0.25)",
      borderRadius: "5px",
    },
  };

  // Desktop Menu Section End
  const menuId = "primary-search-account-menu";
  const renderMenu = (
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
      {/* <Divider /> */}
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
  // Desktop Menu Section End

  // Mobile Menu Section Start
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
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
  // Mobile Menu Section End

  // Notifications Section Start
  const notificationId = "primary-notification";
  const renderNotification = (
    <Menu
      anchorEl={notificationAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={notificationId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={[
        popup_styles,
        {
          "& .MuiPopover-paper": {
            right: "100px !important",
            width: "455px",
            scrollbarWidth: "none",
          },
          "& ul": {
            padding: "0px",

            "& li": {
              cursor: "default",
            },
          },
        },
      ]}
      open={isNotificationOpen}
      onClose={handleMenuClose}
    >
      <MenuItem className="notification_heading">
        <span className="inter-semibold notify">Notifications</span>
        <span className="inter-regular mark_read">Mark all as read</span>
      </MenuItem>

      <div className="all_notifications">
        {notifications?.map((notification) => (
          <div
            key={notification.id}
            className={`notification_box ${
              notification.isRead ? "read" : "unread"
            }`}
            onMouseEnter={() => {
              setHoveredId(notification.id);
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setHoveredId(null);
              setIsHovered(false);
            }}
          >
            <div className="action_button_parent flex-center">
              <IconButton
                className={`action_button checked ${
                  !notification.isRead ||
                  (isHovered && notification.id === hoveredId)
                    ? "d-none"
                    : ""
                }`}
              >
                <Checked />
              </IconButton>

              <IconButton
                className={`action_button delete ${
                  notification.isRead ? "" : "d-block"
                } ${
                  isHovered && notification.id === hoveredId ? "d-block" : ""
                }`}
              >
                <Delete />
              </IconButton>
            </div>

            <div>
              <Typography variant="h6" className="inter-regular">
                New {notification.type} {notification.name} is successfully{" "}
                {notification.action}
              </Typography>

              <Typography variant="body1" className="inter-light">
                {notification.createdAt}
              </Typography>
            </div>
          </div>
        ))}
      </div>

      <MenuItem className="notification_footer">
        <span className="inter-regular mark_read">View all notifications</span>
      </MenuItem>
    </Menu>
  );
  // Notifications Section End

  const handleClose = () => {
    setChangePasswordModal(false);
    setLogoutModal(false);
  };

  const onClick = () => {
    handleClose();
    navigate("/");
  };

  return (
    <Stack sx={{ flexGrow: 1, display: "block" }}>
      <AppBar
        position="fixed"
        sx={{
          width: {
            md: token ? `calc(100% - ${drawerWidth}px)` : "100%",
          },
          ml: {
            md: token ? `calc(100% - ${drawerWidth}px)` : "0px",
          },
        }}
        className={styles.app_header}
      >
        <Toolbar
          className={`${styles.app_header_toolbar} ${
            !token && styles.login_header
          }`}
        >
          {token && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: { xs: 1, sm: 2 },
                display: { md: "none" },
                marginTop: { xs: 0, sm: "12px" },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {token ? (
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
              className={`${styles.top_heading} inter-medium`}
            >
              Welcome, Admin
            </Typography>
          ) : (
            <Typography
              variant="h6"
              noWrap
              component="div"
              className={`${styles.top_heading} inter-bold ${styles.login_heading}`}
            >
              WELCOME TO <span>eSpark-Fusion</span>
            </Typography>
          )}

          <Stack
            sx={{
              flexGrow: 1,
              display: { xs: !token && "none", sm: "block" },
            }}
          />

          {token && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder=""
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          )}

          {token && (
            <Stack
              sx={{ display: { xs: "none", md: "flex" }, flexDirection: "row" }}
            >
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                edge="end"
                aria-controls={notificationId}
                aria-haspopup="true"
                sx={{ marginRight: 1.25 }}
                onClick={handleNotificationOpen}
                className={styles.icon_button}
              >
                <Badge
                  variant="dot"
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#FF0000",
                    },
                  }}
                >
                  <NotificationsIcon className={styles.notification} />
                </Badge>
              </IconButton>

              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                className={styles.icon_button}
              >
                <AccountCircle className={styles.account} />
              </IconButton>
            </Stack>
          )}

          {token && (
            <Stack sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Stack>
          )}

          {!token && (
            <Stack className={styles.logo}>
              <Logo />
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
      {renderNotification}

      <AppDialog
        open={changePasswordModal}
        setOpen={setChangePasswordModal}
        heading="Change Password"
        multiInputs={true}
        text="Are you sure you want to log out your account?"
        doubleButton={true}
        leftText="Cancel"
        rightText="Save"
        padding="30px 14px 30px 28px"
        changePasswordFields={changePasswordFields}
        muliStates={state}
        onChange={handleInputChange}
        handleClose={handleClose}
      />

      <AppDialog
        open={logoutModal}
        padding="32px 38px"
        heading="Log out"
        textBox={true}
        text="Are you sure you want to log out your account?"
        doubleButton={true}
        leftText="Cancel"
        rightText="Log out"
        textClass={styles.text_class}
        weight="regular"
        margin="43px 0px 50px"
        handleClose={handleClose}
        onClick={onClick}
        dialog_content_custom={styles.dialog_content_custom}
      />
    </Stack>
  );
}
