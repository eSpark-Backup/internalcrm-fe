import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import {
  Button,
  Grid,
  Typography,
  Skeleton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import DynamicCard from "../../components/card";
import SearchBar from "../../components/search";
import CustomizedSnackbars from "../../components/toast";
import AppDialog from "../../components/common/appDialog";

import { getAllTeams } from "../../api/teams/getAllTeams";

import { storeChildData } from "../../redux/reducers/headerSlice";

import { teamsData } from "../../constants/teams";

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

const Teams = () => {
  const dispatch = useDispatch();
  const allTeams = useSelector((state) => state.teams.allTeams);

  useEffect(() => {
    dispatch(
      storeChildData({
        title: "Teams",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [searchTeam, setSearchTeam] = useState("");
  const [searchJobTitle, setSearchJobTitle] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [name, setName] = useState("");
  // Dialog States
  const [openTeamPopup, setOpenTeamPopup] = useState(false);
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [deleteTeamPopup, setDeleteTeamPopup] = useState(false);
  // Snackbar States
  const [snackbarState, setSnackbarState] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const { isLoading } = useQuery({
    queryFn: () =>
      getAllTeams(dispatch, setMessage, setSnackbarState, setSeverity),
  });

  const handleSearchTeam = (value) => {
    setSearchTeam(value);
  };

  const handleSearchJobTitle = (value) => {
    setSearchJobTitle(value);
  };

  // eslint-disable-next-line no-unused-vars
  const filteredTeams = allTeams?.filter((team) => {
    return (
      team.name.toLowerCase().includes(searchTeam.toLowerCase()) &&
      team.head.toLowerCase().includes(searchJobTitle.toLowerCase())
    );
  });

  const onAddTeam = () => {};
  const addTeam = () => {};
  const editTeam = () => {};
  const handleClose = () => {};

  const handleMenuOpen = (event, id) => {
    setTeamId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setTeamId(null);
  };

  const handleEdit = () => {
    handleMenuClose();
  };

  const handleDelete = () => {
    handleMenuClose();
  };

  return (
    <div style={{ height: "100%" }}>
      <Grid item xs={12}>
        <SearchBar
          onNameSearch={handleSearchTeam}
          l
          onMonthSearch={handleSearchJobTitle}
          searchTextOne="Search by name"
          searchTextTwo="Search by job title"
          btn={false}
          btnText="Add team"
          onClick={onAddTeam}
        />
      </Grid>

      <div className={styles.container}>
        <Grid container item xs={12} spacing={2}>
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  key={index}
                  className={styles.grid_style}
                >
                  <DynamicCard member={true} card_style="card_style">
                    <Skeleton variant="text" height="40px" />
                    <Skeleton variant="text" height="40px" />
                    <Skeleton variant="text" height="40px" />
                  </DynamicCard>
                </Grid>
              ))
            : teamsData?.map((team, index) => (
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
                      <Typography
                        className={`${styles.team_name} inter-semibold`}
                      >
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
                          onClick={handleEdit}
                          className="inter-regular"
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={handleDelete}
                          className="inter-regular"
                        >
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
      </div>

      <AppDialog
        open={openTeamPopup}
        padding="31px 22px"
        heading={isEditingTeam ? "Edit Team" : "Add Team"}
        singleInput={true}
        doubleButton={true}
        leftText="Cancel"
        rightText={isEditingTeam ? "Save" : "Add"}
        weight="semibold"
        margin="40px 0px 32px"
        handleClose={handleClose}
        onClick={() => {
          isEditingTeam ? editTeam() : addTeam();
        }}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter source name"
        id="project name"
        type="text"
        sx={{
          marginBottom: "12px",
        }}
        paddingLeft="21px"
        // loader={isDoingAction}
      />

      <AppDialog
        open={deleteTeamPopup}
        padding="32px 38px"
        heading="Delete team"
        textBox={true}
        text="Are you sure you want to delete this team?"
        doubleButton={true}
        leftText="No"
        rightText="Yes"
        textClass={styles.text_class}
        weight="regular"
        margin="47px 0px"
        handleClose={() => setDeleteTeamPopup(false)}
        // onClick={confirmDelete}
        // loader={isDoingAction}
      />

      <CustomizedSnackbars
        message={message}
        open={snackbarState}
        setOpen={setSnackbarState}
        severity={severity}
      />
    </div>
  );
};

export default Teams;
