import React from 'react';
import './TimeDisplay.css';
import CurrentTime from '../CurrentTime/CurrentTime';

const TimeDisplay = ({ date, hijriDate }) => {
  return (
    <div className="time-display-container">
      <CurrentTime />
      {date && <div className="date">{date}</div>}
      {hijriDate && <div className="hijri-date">{hijriDate}</div>}
    </div>
  );
};

export default TimeDisplay; 