import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { Grid } from "@mui/material";

import SearchBar from "../../components/search";
import CustomizedSnackbars from "../../components/toast";
import AppDialog from "../../components/common/appDialog";
import LeadView from "./leadView";

import { getAllTeams } from "../../api/teams/getAllTeams";
import { createTeam } from "../../api/teams/createTeam";
import { updateTeamDetails } from "../../api/teams/updateTeam";
import { deleteTeam } from "../../api/teams/deleteTeam";

import { storeChildData } from "../../redux/reducers/headerSlice";

import { teamLeadView } from "../../constants/teams";

import styles from "./style.module.css";
import AdminTeamView from "./adminView";

const initialState = {
  name: "",
  description: "no required field",
  head: 0,
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

  const [role] = useState("lead");

  const [searchTeam, setSearchTeam] = useState("");
  const [searchJobTitle, setSearchJobTitle] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [state, setState] = useState(initialState);
  // Dialog States
  const [openTeamPopup, setOpenTeamPopup] = useState(false);
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [deleteTeamPopup, setDeleteTeamPopup] = useState(false);
  const [isDoingAction, setIsDoingAction] = useState(false);
  // Snackbar States
  const [snackbarState, setSnackbarState] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const { isLoading } = useQuery({
    queryFn: () =>
      getAllTeams(dispatch, setMessage, setSnackbarState, setSeverity),
  });

  const handleInputChange = (key, value) => {
    setState((state) => ({ ...state, [key]: value }));
  };

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

  const onAddTeam = () => {
    setOpenTeamPopup(true);
  };

  const addTeam = () => {
    setIsDoingAction(true);

    createTeam(
      state,
      dispatch,
      setMessage,
      setSnackbarState,
      setSeverity,
      setIsDoingAction,
      handleClose
    );
  };

  const editTeam = () => {
    setIsDoingAction(true);

    updateTeamDetails(
      teamId,
      state,
      dispatch,
      setMessage,
      setSnackbarState,
      setSeverity,
      setIsDoingAction,
      handleClose
    );
  };

  const confirmDelete = () => {
    setIsDoingAction(true);

    deleteTeam(
      teamId,
      dispatch,
      setMessage,
      setSnackbarState,
      setSeverity,
      setIsDoingAction,
      handleClose
    );
  };

  const handleMenuOpen = (event, id) => {
    setTeamId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setTeamId(null);
  };

  const onEdit = (team) => {
    handleInputChange("name", team.name);

    handleMenuClose();
    setIsEditingTeam(true);
    setOpenTeamPopup(true);
  };

  const onDelete = () => {
    handleMenuClose();
    setDeleteTeamPopup(true);
  };

  const handleClose = () => {
    setOpenTeamPopup(false);
    setDeleteTeamPopup(false);
    setTeamId(null);
    setAnchorEl(null);

    setTimeout(() => {
      setIsEditingTeam(false);
      setState(initialState);
    }, 500);
  };

  return (
    <div style={{ height: "100%" }}>
      <Grid item xs={12}>
        <SearchBar
          onNameSearch={handleSearchTeam}
          onMonthSearch={handleSearchJobTitle}
          searchTextOne="Search by name"
          searchTextTwo="Search by job title"
          btn={true}
          btnText="Add team"
          onClick={onAddTeam}
        />
      </Grid>

      {role === "admin" ? (
        <div className={`${styles.container} ${styles.table_view_container}`}>
          <AdminTeamView
            onEdit={onEdit}
            onDelete={onDelete}
            setTeamId={setTeamId}
            role={role}
          />
        </div>
      ) : (
        <div className={styles.container}>
          <LeadView
            isLoading={isLoading}
            teamLeadView={teamLeadView}
            setTeamId={setTeamId}
            teamId={teamId}
            handleMenuOpen={handleMenuOpen}
            anchorEl={anchorEl}
            handleMenuClose={handleMenuClose}
            onEdit={onEdit}
            onDelete={onDelete}
            role={role}
          />
        </div>
      )}

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
        value={state.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        placeholder="Enter team name"
        id="team name"
        type="text"
        sx={{
          marginBottom: "12px",
        }}
        paddingLeft="21px"
        loader={isDoingAction}
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
        onClick={confirmDelete}
        loader={isDoingAction}
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
