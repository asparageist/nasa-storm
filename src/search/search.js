import NasaImagesApi from '../api/searchApiCall.js';
import '../search/css/styles.css';

const form = document.querySelector('#search-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchQuery = document.querySelector('#search-input').value;

  NasaImagesApi.searchImages(searchQuery)
    .then(imageUrls => {
      const gallery = document.querySelector('#gallery');
      gallery.innerHTML = '';

      imageUrls.forEach(imageUrl => {
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        gallery.appendChild(imgElement);
      });
    })
    .catch(error => {
      console.error(error);
    });
});

/* global YT */

function onYouTubeIframeAPIReady() {
  new YT.Player('video-background', {
    videoId: 'YH3c1QZzRK4',
    width: window.innerWidth,
    height: window.innerHeight,
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 1,
      showinfo: 0,
      modestbranding: 1
    },
    events: {
      onReady: onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  event.target.mute();
}

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;