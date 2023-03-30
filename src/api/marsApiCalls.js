// src/api/marsApiCalls.js
const fetchMarsRoverPhotos = async (sol) => {
  const apiKey = process.env.MARS_API_KEY;
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Mars Rover photos:', error);
  }
};

const fetchMarsWeatherData = async () => {
  const apiKey = process.env.MARS_API_KEY;
  const url = `https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Mars weather data:', error);
    return null;
  }
};


export { fetchMarsRoverPhotos, fetchMarsWeatherData };
