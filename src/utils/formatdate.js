import dayjs from "dayjs";
import "dayjs/locale/en"; // Import English locale (or any other locale you prefer)

export const formatDate = (dateString) => {
  // Parse the input date string using Day.js
  const date = dayjs(dateString);

  // Format the date
  const formattedDate = date.format("D MMMM, YY"); // '26 April, 24'

  return formattedDate;
};

export const convertDate = (dateString) => {
  const date = dayjs(dateString);

  const formattedDate = date.format("DD MMM [at] HH:mm");

  return formattedDate;
};
