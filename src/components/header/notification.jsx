import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import Delete from "../../assets/logos/delete.svg?react";
import Checked from "../../assets/logos/check.svg?react";

import { notifications } from "../../constants/notifications";

const Notifications = (props) => {
  const {
    notificationAnchorEl,
    notificationId,
    popup_styles,
    isNotificationOpen,
    handleMenuClose,
    setHoveredId,
    setIsHovered,
    isHovered,
    hoveredId,
  } = props;

  return (
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
};

export default Notifications;
