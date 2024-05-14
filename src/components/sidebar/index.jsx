import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import AppHeader from "../header";

import Logo from "../../assets/logos/eSpark-logo.svg?react";

import { sidebar_links } from "../../constants/sidebar";

import styles from "./style.module.css";
import InnerHeader from "../common/innerHeader";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const token = localStorage.getItem("token");

  const childData = useSelector((state) => state.header.childData);

  const { window, children } = props;

  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <div className={styles.sidebar_logo}>
        <Logo />
      </div>

      <List>
        {sidebar_links.map((Text) => (
          <ListItem
            key={Text.id}
            disablePadding
            onClick={() => navigate(Text.route)}
          >
            <ListItemButton
              className={`${styles.item_button} ${
                location?.pathname.includes(Text.route)
                  ? styles.active_link
                  : Text.route.includes("lead-sources") &&
                    (location.pathname.includes("lead") ||
                      location.pathname.includes("status"))
                  ? styles.active_link
                  : ""
              }`}
            >
              <ListItemIcon>
                <Text.icon />
              </ListItemIcon>
              <ListItemText
                primary={Text.heading}
                className={`${styles.item_text} inter-medium`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Stack sx={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <CssBaseline />

      <Stack
        className={styles.inner_header_container}
        sx={{
          marginLeft: {
            xs: 0,
            md: childData?.login ? "0px" : `${drawerWidth}px`,
          },
        }}
      >
        <InnerHeader />
      </Stack>

      <AppHeader handleDrawerToggle={handleDrawerToggle} />

      {token && (
        <Stack
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", md: "none", zIndex: "900000" },

              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                border: "none",
              },
            }}
          >
            {drawer}
          </Drawer>

          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },

              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                border: "none",
                boxShadow: "4px 0px 15px rgba(0, 0, 0, 0.1)",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Stack>
      )}

      <Stack
        component="main"
        className={styles.main_comp}
        sx={{
          width: {
            sm: "100%",
            md: token ? `calc(100% - ${drawerWidth}px)` : "100%",
          },
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
}

export default ResponsiveDrawer;
