import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button, Grid, Stack, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import CustomizedSteppers from "../../../components/stepper";
import AppInput from "../../../components/common/appInput";
import AppSelect from "../../../components/common/appSelect";
import Picker from "../../../components/datePicker";

import Checked from "../../../assets/logos/checked.svg?react";
import Uncheck from "../../../assets/logos/uncheck.svg?react";

import {
  addMemberBasicInfo,
  addMemberCredentials,
  permissions,
} from "../../../constants/member";

import { storeChildData } from "../../../redux/reducers/headerSlice";

import styles from "./style.module.css";
import AppDialog from "../../../components/common/appDialog";
import MultiLevelSelect from "../../../components/multiLevelSelect";
import FileUpload from "../../../components/fileUpload";

const AddEditMember = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState({
    first_name: location?.state?.data?.first_name ?? "",
    last_name: location?.state?.data?.last_name ?? "",
    gender: null,
    dob: location?.state?.data?.dob ?? "",
    phone_number: location?.state?.data?.phone_number ?? "",
    job_title: location?.state?.data?.job_title ?? "",
    employee_id: location?.state?.data?.employee_id ?? "",
    role: null,
    image: location?.state?.data?.image ?? "",
    email: location?.state?.data?.email ?? "",
    password: location?.state?.data?.password ?? "",
    confirm_password: location?.state?.data?.confirm_password ?? "",
  });
  const [deleteModal, setDeleteModal] = useState(false);

  const handleClick = () => {
    navigate(-1);
  };

  const handleInputChange = (key, value) => {
    setState((state) => ({ ...state, [key]: value }));
  };

  const selectHandler = (selectedOption, key) => {
    setState((state) => ({ ...state, [key]: selectedOption }));
  };

  const deleteMember = () => {
    setDeleteModal(true);
  };

  const onClick = () => {
    handleClose();
    console.log(location?.state?.data?.employee_id);
  };

  const handleClose = () => {
    setDeleteModal(false);
  };

  useEffect(() => {
    dispatch(
      storeChildData({
        title: location?.state?.edit ? "Edit Member" : "Add Member",
        singleButton: true,
        singleButtonText: "Back",
        handleClick,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack className={styles.container}>
      <Stack className={styles.add_member_form}>
        <CustomizedSteppers activeStep={activeStep} />

        {location?.state?.edit && (
          <Button
            className={`inter-semibold ${styles.delete_member}`}
            onClick={deleteMember}
          >
            Delete Member
          </Button>
        )}

        <form className={styles.form}>
          <Grid container spacing={5}>
            {activeStep === 0 &&
              addMemberBasicInfo?.map((field) => {
                return (
                  <Grid
                    item
                    md={4}
                    key={field.id}
                    className={styles.grid_child}
                  >
                    {field.fieldType === "text" && (
                      <AppInput
                        key={field.id}
                        label={field.label}
                        placeholder={field.placeholder}
                        type={field.type}
                        onChange={(e) =>
                          handleInputChange(field.name, e.target.value)
                        }
                        value={state[field.name]}
                      />
                    )}

                    {field.fieldType === "dropdown" && (
                      <AppSelect
                        id={field.id}
                        label={field.label}
                        list={field.list}
                        placeholder={field.placeholder}
                        onChange={(select) => selectHandler(select, field.name)}
                        value={state[field.name]}
                      />
                    )}

                    {field.fieldType === "multidropdown" && (
                      <MultiLevelSelect
                        label={field.label}
                        placeholder={field.placeholder}
                        options={field.list}
                      />
                    )}

                    {field.fieldType === "date" && (
                      <Picker
                        label={field.label}
                        placeholder={field.placeholder}
                      />
                    )}

                    {field.fieldType === "image" && (
                      <FileUpload
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
                    {field.fieldType === "text" && (
                      <AppInput
                        key={field.id}
                        label={field.label}
                        placeholder={field.placeholder}
                        type={field.type}
                        onChange={(e) =>
                          handleInputChange(field.name, e.target.value)
                        }
                        value={state[field.name]}
                      />
                    )}
                  </Grid>
                );
              })}

            {activeStep === 2 && (
              <Stack sx={{ flex: 1 }}>
                {permissions.map((permission) => {
                  return (
                    <div
                      className={styles.permission_container}
                      key={permission.id}
                    >
                      <div className={styles.permission_item}>
                        <Typography variant="h5" className="inter-regular">
                          {permission.label}
                        </Typography>
                        <Checkbox
                          disableRipple
                          color="default"
                          checkedIcon={<Checked />}
                          icon={<Uncheck />}
                          className={styles.check}
                        />
                      </div>
                    </div>
                  );
                })}
              </Stack>
            )}
          </Grid>
        </form>

        <div
          className={styles.action_button}
          style={{ justifyContent: activeStep === 0 ? "end" : "space-between" }}
        >
          {activeStep > 0 && (
            <Button
              className={`inter-semibold ${styles.button} ${styles.back}`}
              onClick={() => setActiveStep((activeStep) => activeStep - 1)}
            >
              Back
            </Button>
          )}
          {location?.state?.edit ? (
            <Button
              className={`inter-semibold ${styles.button} ${styles.next_btn}`}
              onClick={() => {
                activeStep === 2
                  ? handleClick()
                  : setActiveStep((activeStep) => activeStep + 1);
              }}
            >
              Save
            </Button>
          ) : (
            <Button
              className={`inter-semibold ${styles.button} ${styles.next_btn}`}
              onClick={() => {
                activeStep === 2
                  ? handleClick()
                  : setActiveStep((activeStep) => activeStep + 1);
              }}
            >
              {activeStep === 2 ? "Add" : "Next"}
            </Button>
          )}
        </div>
      </Stack>

      <AppDialog
        open={deleteModal}
        padding="32px 38px"
        heading="Delete Member"
        textBox={true}
        text="Are you sure you want to delete your member?"
        doubleButton={true}
        leftText="No"
        rightText="Yes"
        textClass={styles.text_class}
        weight="regular"
        margin="43px 0px 50px"
        handleClose={handleClose}
        onClick={onClick}
      />
    </Stack>
  );
};

export default AddEditMember;
