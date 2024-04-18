import { useEffect } from "react";
import { useDispatch } from "react-redux";

import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { storeChildData } from "../../redux/reducers/headerSlice";
import DynamicCard from "../../components/card";
import styles from "./style.module.css";
import { Search } from "@mui/icons-material";
import SearchBar from "../../components/search";

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

  const [searchTeam, setSearchTeam] = useState("");
  const [searchJobTitle, setSearchJobTitle] = useState("");

  const teams = [
    { name: "React", head: "Rohail Zafar", members: 10 },
    { name: "React", head: "Rohail Zafar", members: 10 },
    { name: "React", head: "Rohail Zafar", members: 10 },
    { name: "React", head: "Rohail Zafar", members: 10 },
    { name: "React", head: "Rohail Zafar", members: 10 },
    { name: "Vue", head: "Jane Smith", members: 12 },
  ];

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

  const filteredTeams = teams.filter((team) => {
    return (
      team.name.toLowerCase().includes(searchTeam.toLowerCase()) &&
      team.head.toLowerCase().includes(searchJobTitle.toLowerCase())
    );
  });

  const chunkArray = (array, chunkSize) => {
    return Array(Math.ceil(array.length / chunkSize))
      .fill()
      .map((_, index) => index * chunkSize)
      .map((begin) => array.slice(begin, begin + chunkSize));
  };

  const teamsChunks = chunkArray(filteredTeams, 3);

  return (
    <div>
      <div style={{ display: "flex", marginTop: "20px" }}>
        {/* Render the SearchBar component for team name */}
        <SearchBar
          placeholder="Search by team name"
          onSearch={handleSearchTeam}
        />
       
      </div>
      {teamsChunks.map((chunk, index) => (
        <div key={index} className={styles.container_style}>
          {chunk.map((team, idx) => (
            <div key={idx} className="card_style">
              <DynamicCard member>
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
                    className="view_button"
                    variant="contained"
                    sx={buttonStyles}
                  >
                    View Team
                  </Button>
                </div>
              </DynamicCard>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Teams;
