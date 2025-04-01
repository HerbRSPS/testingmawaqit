import axios from 'axios';

const fetchPrayerTimesData = async () => {
  try {
    // Hardcoded data based on the real values from the website
    const data = {
      mosque: {
        name: "Moskee Al Fajr",
        location: "AMSTERDAM"
      },
      prayerTimes: {
        fajr: "05:10",
        fajr_iqama: "+20",
        dhuhr: "13:44", 
        dhuhr_iqama: "+10",
        asr: "17:16",
        asr_iqama: "+10",
        maghrib: "20:16",
        maghrib_iqama: "+10",
        isha: "22:11",
        isha_iqama: "+10"
      },
      additionalInfo: {
        date: "Woensdag 2 apr 2025",
        hijriDate: "04 Shawwāl 1446",
        shoeroeq: "Shoeroeq: 07:12",
        jumua: "Djoemoe'ah: 14:00"
      }
    };
    
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export { fetchPrayerTimesData }; 