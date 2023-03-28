// src/marsData/marsData.js
import { fetchMarsRoverPhotos } from '../api/marsApiCalls';

const displayMarsRoverPhotos = (photos) => {
  // Code to display the fetched photos on the page
};

const getAndDisplayMarsRoverPhotos = async (sol) => {
  const data = await fetchMarsRoverPhotos(sol);
  const photos = data.photos;
  displayMarsRoverPhotos(photos);
};

getAndDisplayMarsRoverPhotos(1000);
