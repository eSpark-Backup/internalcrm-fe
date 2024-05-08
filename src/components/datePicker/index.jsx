import { useRef } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Label from "../common/inputLabel";

import Calender from "../../assets/logos/calender.svg?react";

const Picker = (props) => {
  const { label, placeholder, normalFont } = props;
  const datePickerRef = useRef(null);

  const handleInputClick = () => {
    console.log(datePickerRef.current);
  };

  return (
    <>
      <Label label={label} />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="date_picker"
          slots={{
            openPickerIcon: Calender,
            leftArrowIcon: () => "<",
            rightArrowIcon: () => ">",
          }}
          dayOfWeekFormatter={(date) => {
            return date.format("dd");
          }}
          format={placeholder}
          ref={datePickerRef}
          disableFuture
          slotProps={{
            textField: {
              placeholder: placeholder,
              onClick: () => handleInputClick(),
              sx: {
                width: "100%",

                "& .MuiOutlinedInput-root": {
                  paddingRight: "18px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  borderRadius: "5px",
                  backgroundColor:"white",

                  "&.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#029894 !important",
                    },
                  },
                },

                "& fieldset": {
                  borderColor: "#e4e4e4 !important",
                  borderWidth: "1px",
                },

                "& .MuiOutlinedInput-input": {
                  fontSize: normalFont ? "16px" : "14px",
                  lineHeight: "17px",
                  color: "#595959",
                  padding: "14px 12px",
                  height: "auto",

                  "&::placeholder": {
                    color: "#838383",
                    fontSize: normalFont ? "16px" : "14px",
                    lineHeight: "17px",
                  },

                  "@media only screen and (max-width: 1536px)": {
                    padding: "13px 14px",
                  },

                  "@media only screen and (max-width: 1366px)": {
                    padding: "11px 10px",
                  },
                },
              },
            },

            layout: {
              sx: {
                "& .MuiDayCalendar-weekDayLabel": {
                  fontSize: 14,
                  fontFamily: "Inter, sans-serif",
                  color: "#171717",
                  fontWeight: 600,
                },
              },
            },

            day: {
              sx: {
                color: "#002F49",
                fontSize: 12,
                fontFamily: "Poppins, sans-serif",
                backgroundColor: "transparent !important",
                margin: "0px 5px",
                width: 30,
                height: 20,

                "&.Mui-selected": {
                  color: "#e4e4e4",
                  backgroundColor: "#068987 !important",
                },

                "&.Mui-disabled:not(.Mui-selected)": {
                  color: "rgba(0, 47, 73, 0.20)",
                },
              },
            },

            calendarHeader: {
              sx: {
                position: "relative",
                marginTop: "5px",
                marginBottom: 0,

                "& .MuiPickersArrowSwitcher-root": {
                  width: 0,
                },

                "& .MuiPickersCalendarHeader-labelContainer": {
                  margin: "auto",
                },

                "& .MuiIconButton-edgeEnd": {
                  position: "absolute",
                  left: "38px",
                  top: 0,
                  bottom: 0,
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "15px",
                  color: "#171717",
                  fontWeight: 600,
                },

                "& .MuiIconButton-edgeStart": {
                  position: "absolute",
                  right: "38px",
                  top: 0,
                  bottom: 0,
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "15px",
                  color: "#171717",
                  fontWeight: 600,
                },

                "& .MuiPickersCalendarHeader-label": {
                  marginRight: "0px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#171717",
                },

                "& .MuiPickersCalendarHeader-switchViewButton": {
                  display: "none !important",
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default Picker;
