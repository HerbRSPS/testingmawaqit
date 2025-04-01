import React from 'react';
import './PrayerTimes.css';

const PrayerTimes = ({ prayerTimes }) => {
  // Map of prayer names to display names
  const displayNames = {
    fajr: 'Fadjr',
    dhuhr: 'Dhoehr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Ishaa'
  };

  // Function to determine if a prayer is the next upcoming prayer
  const isNextPrayer = (prayerName, time) => {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    
    const [hours, minutes] = time.split(':').map(Number);
    
    // Convert to minutes since midnight for easier comparison
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;
    const prayerTimeInMinutes = hours * 60 + minutes;
    
    return prayerTimeInMinutes > currentTimeInMinutes;
  };

  // Find the next prayer
  const findNextPrayer = () => {
    if (!prayerTimes) return null;
    
    // Only consider the actual prayer times, not the iqama times
    const prayers = Object.entries(prayerTimes).filter(([key]) => !key.includes('_iqama'));
    const now = new Date();
    const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
    
    for (const [name, time] of prayers) {
      const [hours, minutes] = time.split(':').map(Number);
      const prayerTimeInMinutes = hours * 60 + minutes;
      
      if (prayerTimeInMinutes > currentTimeInMinutes) {
        return name;
      }
    }
    
    // If all prayers have passed for today, return the first prayer for tomorrow
    return prayers[0][0];
  };
  
  const nextPrayer = findNextPrayer();
  
  // Filter out prayer times (not iqama times) for display
  const prayerTimesFiltered = prayerTimes ? 
    Object.entries(prayerTimes).filter(([key]) => !key.includes('_iqama')) : [];

  return (
    <div className="prayer-times">
      <h3>Prayer Times</h3>
      <div className="times-container">
        {prayerTimesFiltered.map(([name, time]) => {
          // Get the corresponding iqama time if available
          const iqamaTime = prayerTimes[`${name}_iqama`];
          
          return (
            <div 
              key={name} 
              className={`time-item ${nextPrayer === name ? 'next-prayer' : ''}`}
            >
              <span className="prayer-name">{displayNames[name] || name}</span>
              <div className="time-details">
                <span className="prayer-time">{time}</span>
                {iqamaTime && (
                  <span className="iqama-time">
                    <span className="iqama-label">Iqama:</span> {iqamaTime}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrayerTimes; 