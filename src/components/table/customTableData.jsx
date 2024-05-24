import { TableCell, Typography } from "@mui/material";

import styles from "./style.module.css";

export const renderObject = (object, objectType) => {
  switch (objectType) {
    case "teamDetails":
      return (
        <>
          <TableCell className={styles.body_cell}>
            <div className={styles.image_div}>
              <img src={object.image} />
            </div>
          </TableCell>

          <TableCell className={styles.body_cell}>
            <Typography className={`${styles.body_detail} inter-regular`}>
              {object.name}
            </Typography>
          </TableCell>

          <TableCell className={styles.body_cell}>
            <Typography className={`${styles.body_detail} inter-regular`}>
              {object.member_id}
            </Typography>
          </TableCell>

          <TableCell className={styles.body_cell}>
            <Typography className={`${styles.body_detail} inter-regular`}>
              {object.job_title}
            </Typography>
          </TableCell>

          <TableCell className={styles.body_cell}>
            <Typography className={`${styles.body_detail} inter-regular`}>
              {object.role}
            </Typography>
          </TableCell>
        </>
      );
    case "teams":
      return (
        <>
          <TableCell className={styles.body_cell}>
            <Typography className={`${styles.body_detail} inter-regular`}>
              {object.teams_name}
            </Typography>
          </TableCell>

          <TableCell className={styles.body_cell}>
            <Typography className={`${styles.body_detail} inter-regular`}>
              {object.members}
            </Typography>
          </TableCell>

          <TableCell className={styles.body_cell}>
            <Typography className={`${styles.body_detail} inter-regular`}>
              {object.out_source}
            </Typography>
          </TableCell>

          <TableCell className={styles.body_cell}>
            <Typography className={`${styles.body_detail} inter-regular`}>
              {object.team_lead}
            </Typography>
          </TableCell>

          <TableCell className={styles.body_cell}>
            <Typography className={`${styles.body_detail} inter-regular`}>
              {object.on_going_projects}
            </Typography>
          </TableCell>

          <TableCell className={styles.body_cell}>
            <Typography className={`${styles.body_detail} inter-regular`}>
              {object.completed_projects}
            </Typography>
          </TableCell>
        </>
      );
    default:
      return null;
  }
};
