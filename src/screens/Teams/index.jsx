import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Typography } from "@mui/material";

import { storeChildData } from "../../redux/reducers/headerSlice";

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

  return (
    <>
      <Typography variant="h1">Teams</Typography>
    </>
  );
};

export default Teams;
