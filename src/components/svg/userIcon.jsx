import React from "react";

export const UserIcon = () => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15" cy="15" r="15" fill="white" />
      <svg
        width="31"
        height="24"
        style={{ marginTop: "2px" }}
        viewBox="0 0 31 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 18C5 16.9391 5.42143 15.9217 6.17157 15.1716C6.92172 14.4214 7.93913 14 9 14H17C18.0609 14 19.0783 14.4214 19.8284 15.1716C20.5786 15.9217 21 16.9391 21 18C21 18.5304 20.7893 19.0391 20.4142 19.4142C20.0391 19.7893 19.5304 20 19 20H7C6.46957 20 5.96086 19.7893 5.58579 19.4142C5.21071 19.0391 5 18.5304 5 18Z"
          stroke="#595959"
          stroke-linejoin="round"
        />
        <path
          d="M13 10C14.6569 10 16 8.65685 16 7C16 5.34315 14.6569 4 13 4C11.3431 4 10 5.34315 10 7C10 8.65685 11.3431 10 13 10Z"
          stroke="#595959"
        />
      </svg>
    </svg>
  );
};
