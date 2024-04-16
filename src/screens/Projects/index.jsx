import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Typography } from "@mui/material";

import { storeChildData } from "../../redux/reducers/headerSlice";

const Projects = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      storeChildData({
        title: "Projects",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography variant="h1">Projects</Typography>
    </>
  );
};

export default Projects;
