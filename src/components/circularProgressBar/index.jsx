import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const CircularProgressBar = ({ value }) => {
    return (
        <div style={{ width: 100, height: 100 }}>
          <CircularProgressbar
            value={value}
            text={`${value}%`}
            strokeWidth={12}
            styles={buildStyles({
              strokeLinecap: 'butt', // Change this to 'butt' if you want the anti-clockwise direction
              textSize: '16px',
              pathTransitionDuration: 0.5,
              pathColor: `linear-gradient(90deg, red, yellow)`, // Use linear-gradient for gradient color
              textColor: '#f88',
              trailColor: '#d6d6d6',
              backgroundColor: 'linear-gradient(90deg, red, yellow)',
            })}
          />
        </div>
      );
}

export default CircularProgressBar

