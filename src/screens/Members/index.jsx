import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Stack,
  Typography,
  Grid,
  Button,
  IconButton,
  FormGroup,
  FormControlLabel,
  Switch,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import DynamicCard from "../../components/card";
import SearchBar from "../../components/search";

import Edit from "../../assets/logos/edit.svg?react";

import { allMembers } from "../../constants/members";

import { storeChildData } from "../../redux/reducers/headerSlice";

import styles from "./style.module.css";

const Members = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const locationUrl = location.pathname;

  const [isActive, setIsActive] = React.useState(true);

  const [name, setName] = React.useState("");
  const [joTitle, setJobTitle] = React.useState("");
  const [state, setState] = React.useState({
    request: true,
    cancelRequest: false,
    requested: false,
  });
  const [requestText, setRequestText] = useState("Request");

  const handleActive = () => {
    setIsActive(true);
  };

  const handleInactive = () => {
    setIsActive(false);
  };

  const handleSearchName = (event) => {
    setName(event.target.value);
  };

  const handleSearchJobTitle = (event) => {
    setJobTitle(event.target.value);
  };

  useEffect(() => {
    dispatch(
      storeChildData({
        title: "Members",
        isActive,
        setIsActive,
        dualButton: true,
        handleActive,
        handleInactive,
        dualButtonText1: "Active",
        dualButtonText2: "Inactive",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = () => {
    navigate(`${locationUrl}/addMember`);
  };

  const requestHandler = () => {
    if (state.request) {
      setRequestText("Requested");
      setState({ request: false, requested: true });
    }

    if (state.requested) {
      setRequestText("Cancelled");

      setTimeout(() => {
        setRequestText("Request");
        setState({ request: true, requested: false });
      }, 1000);
    }
  };

  const onEdit = (data) => {
    navigate(`${locationUrl}/addMember`, { state: { data, edit: true } });
  };

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 44,
    height: 23,
    padding: 0,

    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "500ms",
      color: "#029E9C",

      "&.Mui-checked": {
        transform: "translateX(21px)",
        color: "#595959",

        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#E6F5F4" : "#E6F5F4",
          opacity: 1,
        },
      },

      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },

      "&.Mui-disabled .MuiSwitch-thumb": {
        color: "#029E9C",
      },
    },

    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 19,
      height: 19,
      boxShadow: "none",
    },

    "& .MuiSwitch-track": {
      borderRadius: "18px",
      border: "1px solid #E4E4E4",
      backgroundColor: theme.palette.mode === "light" ? "#E6F5F4" : "#E6F5F4",
      opacity: 1,
      transition: theme.transitions.create(["all"], {
        duration: 500,
      }),
    },

    "@media only screen and (max-width: 1199px)": {
      width: 43,
      height: 22,

      "& .MuiSwitch-thumb": {
        width: 18,
        height: 18,
      },
    },
  }));

  return (
    <>
      {/* <SearchBar
        btn={!!isActive}
        btnText="Add Member"
        name={name}
        setName={setName}
        joTitle={joTitle}
        searchTextOne={handleSearchName}
        searchTextTwo={handleSearchJobTitle}
        onClick={onClick}
      /> */}

      <SearchBar
        onNameSearch={handleSearchName}
        onMonthSearch={handleSearchJobTitle}
        searchTextOne="Search by name"
        searchTextTwo="Search by job title"
        btn={!!isActive}
        btnText="Add Member"
        onClick={onClick}
      />

      <Stack className={styles.container_style}>
        <Grid
          container
          spacing={4}
          sx={{
            justifyContent: {
              xs: "center",
              sm: "space-between",
              md: "flex-start",
            },
          }}
        >
          {allMembers.map((member) => {
            return (
              <Grid
                item
                md={6}
                lg={4}
                key={member.id}
                className={styles.grid_item}
              >
                <DynamicCard
                  member={true}
                  card={{ boxShadow: "none" }}
                  card_style={styles.card_style}
                  card_content={styles.card_content}
                >
                  <Stack
                    flexDirection="row"
                    justifyContent="space-between"
                    className={styles.header}
                  >
                    <Stack
                      flexDirection="row"
                      alignItems="center"
                      className={styles.member}
                    >
                      <Avatar className={styles.user_image} />
                      <Typography
                        variant="h6"
                        className={`${styles.name_heading} inter-semibold`}
                      >
                        {`${member.first_name} ${member.last_name}`}
                      </Typography>
                    </Stack>

                    {member.id === 1 && !isActive && (
                      <Button
                        className={`inter-medium ${styles.request}`}
                        onClick={requestHandler}
                        sx={{ cursor: "pointer !important" }}
                      >
                        {requestText}
                      </Button>
                    )}

                    {((member.id !== 1 && !isActive) || isActive) && (
                      <FormGroup>
                        <FormControlLabel
                          control={<IOSSwitch defaultChecked={!isActive} />}
                          label=""
                          sx={{
                            "&.MuiFormControlLabel-root": {
                              marginRight: "0px !important",
                            },
                          }}
                        />
                      </FormGroup>
                    )}
                  </Stack>

                  <Typography
                    my="8px"
                    className={`${styles.member_detail} inter-regular ${styles.member_id}`}
                  >
                    Id: {member.employee_id}
                  </Typography>

                  <Typography
                    className={`${styles.member_detail} inter-regular`}
                  >
                    Email: {member.email}
                  </Typography>

                  <Typography
                    variant="h2"
                    className={`${styles.title} inter-semibold`}
                  >
                    {member.job_title}
                  </Typography>

                  <Stack
                    flexDirection="row"
                    justifyContent="space-between"
                    mt="7px"
                  >
                    <div className={styles.footer_buttons}>
                      <Button className={`inter-medium ${styles.projects}`}>
                        {member.projectsLength} Projects
                      </Button>
                      {member.id !== 1 && (
                        <Button className="inter-medium">View as Areeba</Button>
                      )}
                    </div>

                    <IconButton
                      className={`${styles.edit} opacity-0`}
                      onClick={() => onEdit(member)}
                    >
                      <Edit />
                    </IconButton>
                  </Stack>
                </DynamicCard>
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </>
  );
};

export default Members;
