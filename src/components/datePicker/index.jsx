import { InputLabel } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Calender from "../../assets/logos/calender.svg?react";
import { useRef } from "react";

const Picker = (props) => {
  const { normalFont, label, placeholder } = props;
  const datePickerRef = useRef(null);

  const handleInputClick = () => {
    console.log(datePickerRef.current);
  };

  return (
    <>
      <InputLabel
        className={`inter-medium`}
        sx={{ fontSize: normalFont ? "16px !important" : "14px !important" }}
      >
        {label}
      </InputLabel>

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
            // popper: {
            //   sx: {
            //     width: "23.85%",
            //   },
            // },
            textField: {
              placeholder: placeholder,
              onClick: () => handleInputClick(),
            },

            layout: {
              sx: {
                "& .MuiDayCalendar-weekDayLabel": {
                  fontSize: 14,
                  fontFamily: "Inter, sans-serif",
                  color: "#171717",
                  fontWeight: 600,
                },

                // "& .MuiDateCalendar-root": {
                //   width: "100%",
                // },

                // "& .MuiDayCalendar-header": {
                //   justifyContent: "space-evenly",
                // },

                // "& .MuiDayCalendar-weekContainer": {
                //   justifyContent: "space-evenly",
                // },
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
                height: 30,

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
