// src/marsData/marsData.js
import { fetchMarsRoverPhotos } from '../api/marsApiCalls';
import { fetchMarsWeatherData } from '../api/marsApiCalls';
import './marsData.css';

let currentPhotoIndex = 0;

const loadImage = (image) => {
  const img = new Image();
  img.src = image.dataset.src;
  img.onload = () => {
    image.src = img.src;
    image.classList.add('mars-photo--loaded');
  };
};

const showPhoto = (photos, index) => {
  const container = document.getElementById('mars-photo-container');
  container.innerHTML = '';

  const photo = photos[index];
  const img = document.createElement('img');
  img.dataset.src = photo.img_src;
  img.alt = `Mars Rover Photo taken on sol ${photo.sol}`;
  img.className = 'mars-photo';

  container.appendChild(img);
  container.style.display = 'block';

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImage(entry.target);
        observer.disconnect();
      }
    });
  });

  observer.observe(img);
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

//------- Mars Weather Data --------//

const displayMarsWeatherData = (data) => {
  console.log('Weather data:', data);
  if (!data) {
    return;
  }

  const weatherElement = document.getElementById('mars-weather');

  // Display the most recent sol data
  const latestSol = Object.keys(data)[0];
  const currentWeatherData = data[latestSol];

  if (!currentWeatherData || !currentWeatherData.AT || !currentWeatherData.HWS || !currentWeatherData.WD || !currentWeatherData.WD.most_common) {
    console.error('Incomplete weather data received:', currentWeatherData);
    return;
  }

  // Display current weather data
  const currentWeatherElement = document.createElement('div');
  currentWeatherElement.innerHTML = `
    <h2>Current Mars Weather</h2>
    <p>Sol: ${latestSol}</p>
    <p>Season: ${currentWeatherData.Season}</p>
    <p>Average Temperature: ${currentWeatherData.AT.av} °C</p>
    <p>Minimum Temperature: ${currentWeatherData.AT.mn} °C</p>
    <p>Maximum Temperature: ${currentWeatherData.AT.mx} °C</p>
    <p>Average Wind Speed: ${currentWeatherData.HWS.av} m/s</p>
    <p>Minimum Wind Speed: ${currentWeatherData.HWS.mn} m/s</p>
    <p>Maximum Wind Speed: ${currentWeatherData.HWS.mx} m/s</p>
    <p>Wind Direction: ${currentWeatherData.WD.most_common.compass_point}</p>
  `;
  weatherElement.appendChild(currentWeatherElement);
};

fetchMarsWeatherData()
  .then((data) => {
    console.log('Fetched weather data:', data);
    displayMarsWeatherData(data);
  });

getAndDisplayMarsRoverPhotos(1000);