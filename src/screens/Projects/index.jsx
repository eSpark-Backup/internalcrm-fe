import { useState } from "react";
import { Typography } from "@mui/material";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import DynamicCard from "../../components/card";
import styles from "./style.module.css";

const Projects = () => {
  const [hoveredCards, setHoveredCards] = useState([]);

  const handleMouseEnter = (index) => {
    setHoveredCards((prev) => {
      const newHoveredCards = [...prev];
      newHoveredCards[index] = true;
      return newHoveredCards;
    });
  };

  const handleMouseLeave = (index) => {
    setHoveredCards((prev) => {
      const newHoveredCards = [...prev];
      newHoveredCards[index] = false;
      return newHoveredCards;
    });
  };

  const projectData = [
    { name: "ABC Project", date: "12 September, 23" },
    { name: "ABC Project", date: "12 September, 23" },
    { name: "ABC Project", date: "12 September, 23" },
    { name: "ABC Project", date: "12 September, 23" },
    { name: "ABC Project", date: "12 September, 23" },
    { name: "ABC Project", date: "12 September, 23" },
  ];

  const chunkArray = (array, chunkSize) => {
    return Array(Math.ceil(array.length / chunkSize))
      .fill()
      .map((_, index) => index * chunkSize)
      .map((begin) => array.slice(begin, begin + chunkSize));
  };

  const teamsChunks = chunkArray(projectData, 3);

  return (
    <div>
      {teamsChunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex} style={{ display: "flex", marginBottom: "20px" }}>
          {chunk.map((project, index) => (
            <div
              key={index}
              className={styles.card_style}
              onMouseEnter={() => handleMouseEnter(index + chunkIndex * 3)}
              onMouseLeave={() => handleMouseLeave(index + chunkIndex * 3)}
            >
              <DynamicCard hideTitleAndHr>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <Typography
                      variant="h4"
                      sx={{ color: "#595959", fontWeight: "bold" }}
                    >
                      {project.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: "18px",
                        marginTop: "5px",
                      }}
                    >
                      Created on: <strong>{project.date}</strong>
                    </Typography>
                  </div>
                  <div
                    className={`${styles.launch_icon_container} ${
                      hoveredCards[index + chunkIndex * 3]
                        ? styles.show_icon
                        : ""
                    }`}
                  >
                    <LaunchRoundedIcon
                      style={{
                        fontSize: "50px",
                        marginLeft: "4px",
                        marginTop: "5px",
                        color: "#3BB4B2",
                      }}
                    />
                  </div>
                </div>
              </DynamicCard>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Projects;
