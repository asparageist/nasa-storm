// src/marsData/marsData.js
import { fetchMarsRoverPhotos } from '../api/marsApiCalls';

const displayMarsRoverPhotos = (photos) => {
  const container = document.getElementById('mars-photo-container');

  container.innerHTML = '';
  
  photos.forEach((photo) => {
    const img = document.createElement('img');
      img.src = photo.img_src;
      img.alt = `Mars Rover Photo taken on sol ${photo.sol}`;
      img.className = 'mars-photo';
  
      container.appendChild(img);
  });
};

const getAndDisplayMarsRoverPhotos = async (sol) => {
  const data = await fetchMarsRoverPhotos(sol);
  const photos = data.photos;
  displayMarsRoverPhotos(photos);
};

getAndDisplayMarsRoverPhotos(1000);
