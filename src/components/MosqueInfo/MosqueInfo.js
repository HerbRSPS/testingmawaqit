import React from 'react';
import './MosqueInfo.css';

const MosqueInfo = ({ additionalInfo }) => {
  // Filter out date and hijriDate which are now displayed in TimeDisplay
  const filteredInfo = { ...additionalInfo };
  delete filteredInfo.date;
  delete filteredInfo.hijriDate;
  
  return (
    <div className="mosque-info">
      <h3>Additional Information</h3>
      <div className="info-container">
        {Object.entries(filteredInfo || {}).map(([key, value]) => (
          <div key={key} className="info-item">
            <span className="info-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
            <span className="info-value">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MosqueInfo; 