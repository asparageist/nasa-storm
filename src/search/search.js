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
        
        imgElement.addEventListener("mouseover", () =>{

          NasaImagesApi.getImageMetadata(imageUrl)
            .then(metadata => {
              const tooltip = document.createElement("div");
              tooltip.className = "tooltip";
              tooltip.innerHTML = `<p>Date: ${metadata.date}</p>
            <p>Description: ${metadata.description}</p>`;

              tooltip.style.top = `${event.clientY + 10}px`;
              tooltip.style.left = `${event.clientX + 10}px`;

              document.body.appendChild(tooltip);
            });
        });
        imgElement.addEventListener("mouseout", () => {
          const tooltips = document.querySelectorAll(".tooltip");
          tooltips.forEach(tooltip => tooltip.remove());
        });
      });
    })
    .catch(error => {
      console.error(error);
    });
});

/* global YT */
let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-background', {
    videoId: 'YH3c1QZzRK4',
    width: window.innerWidth,
    height: window.innerHeight,
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 4,
      showinfo: 0,
      modestbranding: 1,
      mute: 0
    },
    events: {
      onReady: onPlayerReady
    }
  });
  player.playVideo();
}

function onPlayerReady(event) {
  event.target.playVideo();
}

const muteButton = document.querySelector('#mute-button');
muteButton.addEventListener('click', () => {
  toggleMute(player);
});


function toggleMute(player) {
  if (typeof player !== 'undefined' && player.isMuted()) {
    player.unMute();
    document.getElementById('mute-button').textContent = 'Mute';
  } else if (typeof player !== 'undefined') {
    player.mute();
    document.getElementById('mute-button').textContent = 'Unmute';
  }
}

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;