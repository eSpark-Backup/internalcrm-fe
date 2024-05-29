import { Link } from "react-router-dom";

import {
  Button,
  Grid,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import DynamicCard from "../../components/card";

import styles from "./style.module.css";

const buttonStyles = {
  padding: "5px 35px",
  borderRadius: "30px",
  backgroundColor: "#E6F5F4",
  border: "2px solid #068987",
  color: "#068987",
  marginTop: "10px",
  textTransform: "capitalize",
  opacity: "0",
  transition: "opacity 0.3s ease",
};

// Menu Popup Styles
const popup_styles = {
  "& .MuiPopover-paper": {
    width: "80px",
    filter: "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))",
    boxShadow: "none",
    borderRadius: "5px",
    backgroundColor: "#FFFFFF !important",
    border: "1px solid #E4E4E4",

    "& .MuiMenuItem-root": {
      backgroundColor: "#FFFFFF !important",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.04) !important",
      },
    },
  },
};

const LeadView = (props) => {
  const {
    isLoading,
    teamLeadView,
    setTeamId,
    teamId,
    handleMenuOpen,
    anchorEl,
    handleMenuClose,
    onEdit,
    onDelete,
    role,
  } = props;

  return (
    <Grid container item xs={12} spacing={2}>
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <Grid item xs={12} sm={4} key={index} className={styles.grid_style}>
              <DynamicCard member={true} card_style="card_style">
                <Skeleton variant="text" height="40px" />
                <Skeleton variant="text" height="40px" />
                <Skeleton variant="text" height="40px" />
              </DynamicCard>
            </Grid>
          ))
        : teamLeadView?.map((team, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={6}
              md={4}
              className={styles.grid_style}
            >
              <DynamicCard
                member={true}
                card_style="card_style"
                onMouseEnter={() => {
                  setTeamId(team.id);
                }}
                onMouseLeave={() => {
                  setTeamId(null);
                }}
              >
                <Stack
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography className={`${styles.team_name} inter-semibold`}>
                    {team.name}
                  </Typography>

                  {teamId === team.id && (
                    <MoreVertIcon
                      onClick={(event) => handleMenuOpen(event, team.id)}
                      sx={{ cursor: "pointer" }}
                    />
                  )}

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl && teamId === team.id)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "top",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    sx={[
                      popup_styles,
                      {
                        "& .MuiPopover-paper": {
                          width: "80px",
                          marginLeft: "-22px",
                          marginTop: "10px",
                        },
                        "& ul": {
                          padding: "0px",
                        },

                        "& li": {
                          border: "1px solid #E4E4E4",
                          fontSize: "12px",
                          lineHeight: "15px",
                          color: "#595959",
                          padding: "10px 0px",
                          justifyContent: "center",
                        },
                      },
                    ]}
                  >
                    <MenuItem
                      onClick={() => onEdit(team)}
                      className="inter-regular"
                    >
                      Edit
                    </MenuItem>
                    <MenuItem onClick={onDelete} className="inter-regular">
                      Delete
                    </MenuItem>
                  </Menu>
                </Stack>

                <Typography
                  className={`${styles.team_description} inter-regular`}
                >
                  Head: {team.head}
                </Typography>

                <Typography
                  className={`${styles.team_description} inter-regular`}
                  sx={{ mt: 1 }}
                >
                  Members: {team.members}
                </Typography>

                <div className={styles.button_container}>
                  <Button
                    component={Link}
                    to="/teams/team-details"
                    state={{ role: role }}
                    className="view_button inter-medium"
                    variant="contained"
                    sx={buttonStyles}
                  >
                    View Team
                  </Button>
                </div>
              </DynamicCard>
            </Grid>
          ))}
    </Grid>
  );
};

export default LeadView;
