const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all requests
app.use(cors());

// Route to fetch and scrape prayer times
app.get('/api/prayer-times', async (req, res) => {
  try {
    console.log('Starting to scrape data...');
    // URL of the Mawaqit website
    const url = 'https://mawaqit.net/nl/w/moskee-al-fajr-amsterdam-1103-ta-netherlands?showOnly5PrayerTimes=0';
    
    // Fetch the HTML content
    console.log('Fetching HTML content...');
    const response = await axios.get(url);
    const html = response.data;
    console.log('HTML content length:', html.length);
    
    // Load HTML into cheerio
    const $ = cheerio.load(html);
    
    // Extract mosque name and location from the h1 tag
    const mosqueNameFull = $('h1').text().trim();
    console.log('Mosque name full:', mosqueNameFull);
    const [mosqueName, location] = mosqueNameFull.split('-').map(part => part.trim());
    
    // Initialize data object
    const data = {
      mosque: {
        name: mosqueName || 'Moskee Al Fajr',
        location: location || 'AMSTERDAM'
      },
      prayerTimes: {},
      additionalInfo: {}
    };
    
    // Log all found prayers for debugging
    console.log('Found prayers:');
    $('.prayers > div').each((i, el) => {
      const name = $(el).find('.name').text();
      const time = $(el).find('.time div').text();
      const iqama = $(el).find('.iqama').text();
      console.log(`Prayer ${i + 1}: Name=${name}, Time=${time}, Iqama=${iqama}`);
    });
    
    // Extract the current date
    const date = $('.date').text().trim();
    const hijriDate = $('.hijriDate').text().trim();
    console.log('Date:', date);
    console.log('Hijri date:', hijriDate);
    
    data.additionalInfo.date = date;
    data.additionalInfo.hijriDate = hijriDate;
    
    // Extract Shoeroeq time
    const shoeroeqName = $('.shuruq .name').text().trim();
    const shoeroeqTime = $('.shuruq .time div').text().trim();
    console.log('Shoeroeq:', shoeroeqName, shoeroeqTime);
    data.additionalInfo.shoeroeq = `${shoeroeqName}: ${shoeroeqTime}`;
    
    // Extract Jumua time
    const jumuaName = $('.joumouaa .ar.name').text().trim();
    const jumuaTime = $('.joumouaa-id.time div').text().trim();
    console.log('Jumua:', jumuaName, jumuaTime);
    data.additionalInfo.jumua = `${jumuaName}: ${jumuaTime}`;

    // Let's try alternate selectors to find the prayer times
    console.log('Trying alternate selectors...');
    // Extract prayer times using the prayers class with different selectors
    const prayers = $('.prayers > div');
    
    prayers.each((index, element) => {
      const nameElement = $(element).find('.name');
      const timeElement = $(element).find('.time');
      const iqamaElement = $(element).find('.iqama');
      
      const name = nameElement.text().trim().toLowerCase();
      const time = timeElement.find('div').text().trim() || timeElement.text().trim();
      const iqama = iqamaElement.text().trim();
      
      console.log(`Found prayer: ${name}, time: ${time}, iqama: ${iqama}`);
      
      // Convert the prayer name to our format
      let prayerKey;
      switch (name) {
        case 'fadjr':
          prayerKey = 'fajr';
          break;
        case 'dhoehr':
          prayerKey = 'dhuhr';
          break;
        case "'asr":
          prayerKey = 'asr';
          break;
        case 'maghrib':
          prayerKey = 'maghrib';
          break;
        case "'ishaa":
          prayerKey = 'isha';
          break;
        default:
          prayerKey = name;
      }
      
      data.prayerTimes[prayerKey] = time;
      data.prayerTimes[`${prayerKey}_iqama`] = iqama;
    });
    
    // If we didn't find any prayer times, use the hard-coded values for demo
    if (Object.keys(data.prayerTimes).filter(key => !key.includes('_iqama')).length === 0) {
      console.log('No prayer times found, using hard-coded values');
      data.prayerTimes = {
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
      };
    }
    
    console.log('Scraped data:', data);
    res.json(data);
  } catch (error) {
    console.error('Error scraping prayer times:', error);
    res.status(500).json({ error: 'Failed to fetch prayer times data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
}); 