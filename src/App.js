import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import TimeDisplay from './components/TimeDisplay/TimeDisplay';
import PrayerTimes from './components/PrayerTimes/PrayerTimes';
import MosqueInfo from './components/MosqueInfo/MosqueInfo';
import { fetchPrayerTimesData } from './api/prayerTimesAPI';

function App() {
  const [data, setData] = useState({
    mosque: { name: '', location: '' },
    prayerTimes: {},
    additionalInfo: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchPrayerTimesData();
        console.log('Data from server:', response);
        setData(response);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch prayer times data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();

    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="loading">Loading prayer times...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  console.log('Rendering with data:', data);

  return (
    <div className="App">
      <Header mosqueName={data.mosque.name} location={data.mosque.location} />
      <div className="container">
        <TimeDisplay 
          date={data.additionalInfo.date} 
          hijriDate={data.additionalInfo.hijriDate} 
        />
        <PrayerTimes prayerTimes={data.prayerTimes} />
        <MosqueInfo additionalInfo={data.additionalInfo} />
      </div>
    </div>
  );
}

export default App;
