// src/api/marsApiCalls.js
const fetchMarsRoverPhotos = async (sol) => {
  const apiKey = process.env.API_KEY;
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Mars Rover photos:', error);
  }
};

export { fetchMarsRoverPhotos };
