# Mawaqit Prayer Times Viewer

A React application that displays live prayer times from Mawaqit for Moskee Al Fajr in Amsterdam.

## Features

- Display mosque name and location
- Show all five daily prayer times
- Highlight the next upcoming prayer
- Show additional information like Jumua (Friday prayer) times
- Automatic data refresh every 5 minutes
- Responsive design for all device sizes

## Technical Details

This project is built with:
- React
- JavaScript (ES6+)
- CSS3
- Axios for API requests

The application uses a component-based architecture with each component having its own CSS for easy maintenance and styling.

## Project Structure

```
src/
  ├── api/
  │   └── prayerTimesAPI.js    # API service for fetching prayer times
  ├── components/
  │   ├── Header/              # Mosque name and location
  │   ├── PrayerTimes/         # Display for the five daily prayers
  │   └── MosqueInfo/          # Additional mosque information
  ├── App.js                   # Main application component
  ├── App.css                  # Application-wide styles
  └── index.js                 # Application entry point
```

## Installation

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm start`

## Implementation Notes

In a production environment, you would need to set up a proxy server to handle CORS issues when fetching data from the Mawaqit website. Currently, the application uses mock data for demonstration purposes.

## License

MIT
