import * as React from "react";

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

import AccountCircle from "../../assets/logos/profile.svg?react";
import NotificationsIcon from "../../assets/logos/notification.svg?react";
import SearchIcon from "../../assets/logos/search.svg?react";
import ChangePassword from "../../assets/logos/change-password.svg?react";
import Logout from "../../assets/logos/logout.svg?react";

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
}));

export default function AppHeader({ handleDrawerToggle }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const popup_styles = {
    "& .MuiPopover-paper": {
      top: "85px !important",
      right: "40px !important",
      left: "unset !important",
      width: "200px",
      backgroundColor: "#F4F6F9",
      border: "2px solid #E4E4E4",
    },
  };

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
      <MenuItem onClick={handleMenuClose} className="menu_item password_item">
        <span className="menu_item_icon">
          <ChangePassword />
        </span>
        <span className="inter-medium">Change password</span>
      </MenuItem>
      {/* <Divider /> */}
      <MenuItem onClick={handleMenuClose} className="menu_item">
        <Button className="inter-medium">
          <span className="menu_item_icon">
            <Logout />
          </span>
          <span>Logout</span>
        </Button>
      </MenuItem>
    </Menu>
  );

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
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>

      <MenuItem onClick={handleMenuClose} className="menu_item password_item">
        <span className="menu_item_icon">
          <ChangePassword />
        </span>
        <span className="inter-medium">Change password</span>
      </MenuItem>
      {/* <Divider /> */}
      <MenuItem onClick={handleMenuClose} className="menu_item">
        <Button className="inter-medium">
          <span className="menu_item_icon">
            <Logout />
          </span>
          <span>Logout</span>
        </Button>
      </MenuItem>
    </Menu>
  );

  return (
    <Stack sx={{ flexGrow: 1, display: "block" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        className={styles.app_header}
      >
        <Toolbar className={styles.app_header_toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: { xs: 1, sm: 2 }, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            className={styles.top_heading}
          >
            Welcome, Admin
          </Typography>

          <Stack sx={{ flexGrow: 1, display: "block" }} />

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder=""
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Stack
            sx={{ display: { xs: "none", md: "flex" }, flexDirection: "row" }}
          >
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{ marginRight: 1.25 }}
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
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
            >
              <AccountCircle />
            </IconButton>
          </Stack>

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
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </Stack>
  );
}
