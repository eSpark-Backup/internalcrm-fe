import React from "react";

import {
  Stack,
  Typography,
  Grid,
  Button,
  IconButton,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import DynamicCard from "../../components/card";
import SearchBar from "../../components/search";

import WithHeader from "../../layout/withHeader";

import Edit from "../../assets/logos/edit.svg?react";

import { allMembers } from "../../helper/members";

import styles from "./style.module.css";

const Members = () => {
  const [isActive, setIsActive] = React.useState(true);
  const [hovered, setHovered] = React.useState(false);
  const [hoveredItemId, setHoveredItemId] = React.useState(null);

  const [name, setName] = React.useState("");
  const [joTitle, setJobTitle] = React.useState("");

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
      transitionDuration: "300ms",
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
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    <WithHeader
      title="Members"
      isActive={isActive}
      setIsActive={setIsActive}
      dualButton={true}
      handleActive={handleActive}
      handleInactive={handleInactive}
      dualButtonText1="Active"
      dualButtonText2="Inactive"
    >
      <SearchBar
        btn={true}
        btnText="Add Member"
        name={name}
        setName={setName}
        joTitle={joTitle}
        handleSearchName={handleSearchName}
        handleSearchJobTitle={handleSearchJobTitle}
      />

      <Grid container spacing={4} className={styles.container_style}>
        {allMembers.map((member) => {
          return (
            <Grid item md={6} lg={4} xl={3} key={member.id}>
              <DynamicCard
                member={true}
                card={{ boxShadow: "none" }}
                card_style={styles.card_style}
                card_content={styles.card_content}
                onMouseEnter={() => {
                  setHoveredItemId(member.id);
                  setHovered(true);
                }}
                onMouseLeave={() => {
                  setHoveredItemId(null);
                  setHovered(false);
                }}
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
                    <div className={styles.user_image}></div>
                    <Typography
                      variant="h6"
                      className={`${styles.name_heading} inter-semibold`}
                    >
                      {member.name}
                    </Typography>
                  </Stack>

                  <FormGroup>
                    <FormControlLabel
                      control={<IOSSwitch defaultChecked />}
                      label=""
                      sx={{
                        "&.MuiFormControlLabel-root": {
                          marginRight: "0px !important",
                        },
                      }}
                    />
                  </FormGroup>
                </Stack>

                <Typography
                  my="8px"
                  className={`${styles.member_detail} inter-regular`}
                >
                  Id: {member.memberId}
                </Typography>

                <Typography className={`${styles.member_detail} inter-regular`}>
                  Email: {member.memberEmail}
                </Typography>

                <Typography
                  variant="h2"
                  className={`${styles.title} inter-semibold`}
                >
                  {member.jobTitle}
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
                    <Button className="inter-medium">View as Areeba</Button>
                  </div>

                  <IconButton
                    className={`${styles.edit} ${
                      hovered && member.id === hoveredItemId
                        ? "opacity-1"
                        : "opacity-0"
                    }`}
                  >
                    <Edit />
                  </IconButton>
                </Stack>
              </DynamicCard>
            </Grid>
          );
        })}
      </Grid>
    </WithHeader>
  );
};

export default Members;
