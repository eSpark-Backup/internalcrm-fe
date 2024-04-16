import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button, Grid, Stack } from "@mui/material";

import CustomizedSteppers from "../../../components/stepper";
import AppInput from "../../../components/common/appInput";
import AppSelect from "../../../components/common/appSelect";
import Picker from "../../../components/datePicker";

import {
  addMemberBasicInfo,
  addMemberCredentials,
} from "../../../constants/member";

import { storeChildData } from "../../../redux/reducers/headerSlice";

import styles from "./style.module.css";

const AddEditMember = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    gender: null,
    dob: "",
    phone_number: "",
    job_title: "",
    employee_id: "",
    role: null,
    image: "",
  });

  const handleClick = () => {
    if (activeStep === 0) {
      navigate(-1);
    }
  };

  const handleInputChange = (key, value) => {
    setState((state) => ({ ...state, [key]: value }));
  };

  const selectHandler = (selectedOption, key) => {
    setState((state) => ({ ...state, [key]: selectedOption }));
  };

  useEffect(() => {
    dispatch(
      storeChildData({
        title: "Add Member",
        singleButton: true,
        singleButtonText: "Back",
        handleClick,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack sx={{ paddingBottom: "67px", height: "100%" }}>
      <Stack className={styles.add_member_form}>
        <CustomizedSteppers activeStep={activeStep} />

        <form>
          <Grid container spacing={5}>
            {activeStep === 0 &&
              addMemberBasicInfo?.map((field) => {
                return (
                  <Grid item md={4} key={field.id}>
                    {field.type === "text" && (
                      <AppInput
                        key={field.id}
                        label={field.label}
                        placeholder={field.placeholder}
                        type="text"
                        onChange={(e) =>
                          handleInputChange(field.name, e.target.value)
                        }
                        value={state[field.name]}
                      />
                    )}

                    {field.type === "dropdown" && (
                      <AppSelect
                        id={field.id}
                        label={field.label}
                        list={field.list}
                        placeholder={field.placeholder}
                        onChange={(select) => selectHandler(select, field.name)}
                        value={state[field.name]}
                      />
                    )}

                    {field.type === "date" && (
                      <Picker
                        label={field.label}
                        placeholder={field.placeholder}
                      />
                    )}
                  </Grid>
                );
              })}

            {activeStep === 1 &&
              addMemberCredentials?.map((field) => {
                return (
                  <Grid item md={4} key={field.id}>
                    {field.type === "text" && (
                      <AppInput
                        key={field.id}
                        label={field.label}
                        placeholder={field.placeholder}
                        type="text"
                        onChange={(e) =>
                          handleInputChange(field.name, e.target.value)
                        }
                        value={state[field.name]}
                      />
                    )}
                  </Grid>
                );
              })}

            <Grid
              item
              xs={12}
              display="flex"
              justifyContent={activeStep === 0 ? "end" : "space-between"}
            >
              {activeStep > 0 && (
                <Button
                  className={`inter-semibold ${styles.action_button} ${styles.back}`}
                  onClick={() => setActiveStep((activeStep) => activeStep - 1)}
                >
                  Back
                </Button>
              )}
              <Button
                className={`inter-semibold ${styles.action_button} ${styles.next_btn}`}
                onClick={() => setActiveStep((activeStep) => activeStep + 1)}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      </Stack>
    </Stack>
  );
};

export default AddEditMember;
