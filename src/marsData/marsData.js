// src/marsData/marsData.js
import { fetchMarsRoverPhotos } from '../api/marsApiCalls';
import { fetchMarsWeatherData } from '../api/marsApiCalls';
import './marsData.css';
import Chart from 'chart.js/auto';

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

const sampleData = {
  1000: {
    AT: {av: -65.8},
  },
  1001: {
    AT: {av: -63.2},
  },
  1002: {
    AT: {av: -60.9},
  },
  1003: {
    AT: {av: -62.5},
  },
  1004: {
    AT: {av: -64.0},
  },
};

const isValidSolData = (data) => {
  if (data.sol_keys && data.sol_keys.length > 0) {
    const lastSol = data.sol_keys[data.sol_keys.length - 1];
    const validityCheck = data.validity_checks[lastSol];
    return validityCheck && validityCheck.AT.valid;
  }
  return false;
};

const displayMarsWeatherData = (data) => {
  console.log('Weather data:', data);
  if (!data) {
    return;
  }

  const labels = Object.keys(data);
  const temperatures = Object.values(data).map(d => d.AT.av);
  console.log('Labels:', labels);
  console.log('Temperatures:', temperatures);

  // Prepare data for the chart
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Average Air Temperature',
        data: temperatures,
        borderColor: 'black',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Seasonal Change in Elysium Planitia',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Sols',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
      },
    },
  };

  const ctx = document.getElementById('mars-weather-chart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: chartOptions,
  });
};

fetchMarsWeatherData()
  .then((data) => {
    console.log('Fetched weather data:', data);
    if (isValidSolData(data)) {
      displayMarsWeatherData(data);
    } else {
      console.warn('API returned invalid or empty sol data, using sample data.');
      displayMarsWeatherData(sampleData);
    }
  });

getAndDisplayMarsRoverPhotos(1000);