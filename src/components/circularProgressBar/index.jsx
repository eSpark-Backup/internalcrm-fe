import { useState, useEffect } from "react";

import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const CircularProgressBar = ({ value }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    // On component mount, set the animatedValue to the specified value with a delay
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 500); // Adjust the delay as needed

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div
      style={{
        width: 150,
        padding: "10px 0px 15px",
      }}
    >
      <CircularProgressbar
        value={animatedValue}
        strokeWidth={15}
        counterClockwise={true}
        styles={buildStyles({
          strokeLinecap: "butt",
          textSize: "16px",
          pathTransitionDuration: 0.5,
          pathColor: `url(#gradient)`, // Use gradient for pathColor
          textColor: "#f88",
          trailColor: "#fff",
          backgroundColor: "transparent", // Set background color to transparent if you want the gradient to be visible
          rotation: 0.18,
        })}
      />
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id="gradient" x1="1" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#029E9C" />
            <stop offset="100%" stopColor="#9E9EA4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default CircularProgressBar;
