import * as React from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";

import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";

import AppDialog from "../common/appDialog";
import DesktopMenu from "./desktopMenu";
import MobileMenu from "./mobileMenu";
import SearchBar from "./searchBar";
import Notifications from "./notification";

import AccountCircle from "../../assets/logos/profile.svg?react";
import NotificationsIcon from "../../assets/logos/notification.svg?react";
import Logo from "../../assets/logos/login-logo.svg?react";

import { changePasswordFields } from "../../constants/changePassword";

import styles from "./style.module.css";

const drawerWidth = 240;

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
    <DesktopMenu
      anchorEl={mobileMoreAnchorEl}
      menuId={menuId}
      popup_styles={popup_styles}
      isMenuOpen={isMenuOpen}
      handleMenuClose={handleMenuClose}
      setChangePasswordModal={setChangePasswordModal}
      setLogoutModal={setLogoutModal}
    />
  );
  // Desktop Menu Section End

  // Mobile Menu Section Start
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <MobileMenu
      mobileMoreAnchorEl={mobileMoreAnchorEl}
      mobileMenuId={mobileMenuId}
      popup_styles={popup_styles}
      isMobileMenuOpen={isMobileMenuOpen}
      handleMobileMenuClose={handleMobileMenuClose}
      setChangePasswordModal={setChangePasswordModal}
      setLogoutModal={setLogoutModal}
    />
  );
  // Mobile Menu Section End

  // Notifications Section Start
  const notificationId = "primary-notification";
  const renderNotification = (
    <Notifications
      notificationAnchorEl={notificationAnchorEl}
      notificationId={notificationId}
      popup_styles={popup_styles}
      isNotificationOpen={isNotificationOpen}
      handleMenuClose={handleMenuClose}
      setHoveredId={setHoveredId}
      setIsHovered={setIsHovered}
      isHovered={isHovered}
      hoveredId={hoveredId}
    />
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

          {token && <SearchBar />}

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
        margin="47px 0px"
        handleClose={handleClose}
        onClick={onClick}
        dialog_content_custom={styles.dialog_content_custom}
      />
    </Stack>
  );
}
