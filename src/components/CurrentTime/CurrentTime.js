import React, { useState, useEffect } from 'react';
import './CurrentTime.css';

const CurrentTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup the interval on unmount
    return () => clearInterval(timer);
  }, []);

  // Format hours and minutes with leading zeros
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return (
    <div className="current-time">
      <div className="time-display">
        <div className="hours-minutes">{hours}:{minutes}</div>
        <div className="seconds">:{seconds}</div>
      </div>
    </div>
  );
};

export default CurrentTime; 