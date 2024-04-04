import * as React from "react";

import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";

import AppHeader from "../header";

import Logo from "../../assets/logos/eSpark-logo.svg?react";

import { sidebar_links } from "../../helper/sidebar";

import styles from "./style.module.css";
import { useLocation } from "react-router-dom";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window, children } = props;

  const location = useLocation();

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
          <ListItem key={Text.id} disablePadding>
            <ListItemButton
              className={`${styles.item_button} ${
                Text.route === location?.pathname ? styles.active_link : ""
              }`}
            >
              <ListItemIcon>
                <Text.icon />
              </ListItemIcon>
              <ListItemText
                primary={Text.heading}
                className={`${styles.item_text} `}
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
    <Stack sx={{ display: "flex" }}>
      <CssBaseline />

      <AppHeader handleDrawerToggle={handleDrawerToggle} />

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
            display: { xs: "block", sm: "none" },
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
            display: { xs: "none", sm: "block" },

            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Stack>

      <Stack
        component="main"
        sx={{
          flexGrow: 1,
          padding: { xs: "0px 18px", md: "0px 40px" },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: "block",
          marginLeft: { xs: "0px", sm: "auto" },
        }}
      >
        <Toolbar
          sx={{
            height: { xs: "100px", md: "149px" },
          }}
        />
        {children}
      </Stack>
    </Stack>
  );
}

export default ResponsiveDrawer;
