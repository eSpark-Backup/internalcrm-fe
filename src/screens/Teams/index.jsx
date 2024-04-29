import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import { Button, Grid, Typography, Skeleton } from "@mui/material";

import DynamicCard from "../../components/card";
import SearchBar from "../../components/search";

import { getAllTeams } from "../../api/teams/getAllTeams";

import { storeChildData } from "../../redux/reducers/headerSlice";

import styles from "./style.module.css";

const Teams = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      storeChildData({
        title: "Teams",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, isLoading } = useQuery({
    queryFn: () => getAllTeams(),
  });

  const [searchTeam, setSearchTeam] = useState("");
  const [searchJobTitle, setSearchJobTitle] = useState("");

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

  const handleSearchTeam = (value) => {
    setSearchTeam(value);
  };

  const handleSearchJobTitle = (value) => {
    setSearchJobTitle(value);
  };

  const filteredTeams = data?.data?.filter((team) => {
    return (
      team.name.toLowerCase().includes(searchTeam.toLowerCase()) &&
      team.head.toLowerCase().includes(searchJobTitle.toLowerCase())
    );
  });

  return (
    <div style={{ height: "100%" }}>
      <Grid item xs={12}>
        <SearchBar
          onNameSearch={handleSearchTeam}
          onMonthSearch={handleSearchJobTitle}
          searchTextOne="Search by name"
          searchTextTwo="Search by job title"
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
                  <Skeleton
                    variant="rounded"
                    height={180}
                    sx={{ borderRadius: 2.5 }}
                  />
                </Grid>
              ))
            : filteredTeams.map((team, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  className={styles.grid_style}
                >
                  <DynamicCard member={true} card_style="card_style">
                    <Typography
                      sx={{
                        color: "#595959",
                        fontWeight: "bold",
                        fontSize: "25px",
                      }}
                    >
                      {team.name}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#595959",
                        fontWeight: "normal",
                        fontSize: "18px",
                      }}
                    >
                      Head: {team.head} <br /> Members: {team.members}
                    </Typography>

                    <div className={styles.button_container}>
                      <Button
                        component={Link}
                        to="/team-details"
                        className="view_button"
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
    </div>
  );
};

export default Teams;
