import { Stack, Typography } from "@mui/material";

import View from "../../assets/logos/view.svg?react";

import styles from "./style.module.css";

const IndividualTaskCard = (props) => {
  const { onClick, description, name, status } = props;

  return (
    <div>
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography variant="h5" className={`${styles.task_name} inter-medium`}>
          {name}
        </Typography>

        <Stack flexDirection="row" alignItems="center">
          <Typography className={`${styles.task_status} inter-regular`}>
            {status}
          </Typography>

          <div
            className={`${styles.view_container} d-flex-center`}
            onClick={onClick}
          >
            <View />
          </div>
        </Stack>
      </Stack>

      <Typography className={`${styles.task_description} inter-regular`}>
        {description}
      </Typography>
    </div>
  );
};

export default IndividualTaskCard;
