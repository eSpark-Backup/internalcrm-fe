import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

import styles from "./style.module.css";

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#068987",
    },
  },

  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: "#029E9C",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ ownerState }) => ({
  backgroundColor: "#CFF0F0",
  zIndex: 1,
  color: "#595959",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  lineHeight: "19px",
  border: "1px solid #029E9C",
  ...(ownerState.active && {
    backgroundColor: "#068987",
    color: "#ffffff",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, className } = props;

  const icons = {
    1: 1,
    2: 2,
    3: 3,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ["Basic information", "Credentials", "Permissions"];

export default function CustomizedSteppers({ activeStep }) {
  return (
    <Stack spacing={4} className={styles.stepper_stack}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={ColorlibStepIcon}
              className={styles.step_label}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
