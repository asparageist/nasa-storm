// src/marsData/marsData.js
import { fetchMarsRoverPhotos } from '../api/marsApiCalls';
import './marsData.css';

let currentPhotoIndex = 0;

const showPhoto = (photos, index) => {
  const container = document.getElementById('mars-photo-container');
  container.innerHTML = '';

  const photo = photos[index];
  const img = document.createElement('img');
  img.src = photo.img_src;
  img.alt = `Mars Rover Photo taken on sol ${photo.sol}`;
  img.className = 'mars-photo';

  container.appendChild(img);
  container.style.display = 'block';
};

const getAndDisplayMarsRoverPhotos = async (sol) => {
  const data = await fetchMarsRoverPhotos(sol);
  const photos = data.photos;

  if (photos.length > 0) {
    showPhoto(photos, currentPhotoIndex);
    document.getElementById('prev-photo').addEventListener('click', () => {
      currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
      showPhoto(photos, currentPhotoIndex);
    });
    document.getElementById('next-photo').addEventListener('click', () => {
      currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
      showPhoto(photos, currentPhotoIndex);
    });
  } else {
    const container = document.getElementById('mars-photo-container');
    container.innerHTML = '<p>No photos found for the given sol.</p>';
    container.style.display = 'block';
  }
};

getAndDisplayMarsRoverPhotos(1000);
