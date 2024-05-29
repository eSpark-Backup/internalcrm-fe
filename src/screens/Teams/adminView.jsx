import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { IconButton, Typography } from "@mui/material";

import { storeChildData } from "../../redux/reducers/headerSlice";

import TeamTable from "../../components/table";

import View from "../../assets/logos/small-eye.svg?react";
import Edit from "../../assets/logos/small-white-edit.svg?react";
import Delete from "../../assets/logos/delete-grey.svg?react";

import { adminTeamHeader, adminTeamsView } from "../../constants/teams";

import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";

const AdminTeamView = (props) => {
  const { onEdit, onDelete, setTeamId, role } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      storeChildData({
        title: "Teams",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderAction = (row) => (
    <div>
      <IconButton
        onClick={() => {
          setTeamId(row.id);
          onEdit({ name: row.teams_name });
        }}
        className={`${styles.edit}`}
      >
        <Edit />
      </IconButton>

      <IconButton
        onClick={() => {
          setTeamId(row.id);
          onDelete();
        }}
        className={`${styles.delete}`}
      >
        <Delete />
      </IconButton>

      <IconButton
        onClick={() => {
          navigate("/teams/team-details", { state: { role } });
        }}
        className={`${styles.view}`}
      >
        <View />
      </IconButton>
    </div>
  );

  return (
    <>
      <div className={styles.team_div}>
        <Typography
          variant="h5"
          className={`${styles.total_team_members} inter-bold`}
        >
          Teams ({adminTeamsView?.length})
        </Typography>
      </div>

      <TeamTable
        headers={adminTeamHeader}
        data={adminTeamsView}
        objectType="teams"
        renderActions={renderAction}
        container_classname={styles.container_classname}
      />
    </>
  );
};

export default AdminTeamView;
