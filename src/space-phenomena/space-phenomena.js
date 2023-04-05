import spacePhenomena from '../api/space-phenomenaApiCall.js';
import '../space-phenomena/css/space.css';


const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');

const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', () => {
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;

  spacePhenomena.getSpace(startDate, endDate)
    .then((data) => {
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '';

      const selectedStartDate = new Date(startDate).toISOString().substring(0, 10);
      const selectedEndDate = new Date(endDate).toISOString().substring(0,10);

      data.forEach((item) => {
        const flrDate = new Date(item.beginTime).toISOString().substring(0, 10); // Convert beginTime to ISO string format
        if (flrDate >= selectedStartDate && flrDate <= selectedEndDate) {
          const newDiv = document.createElement('div');
          newDiv.innerHTML = `<p>Start Time: ${item.beginTime}</p>
                              <p>Peak Time: ${item.peakTime}</p>
                              <p>End Time: ${item.endTime}</p>
                              <p>Intensity: ${item.classType}</p>
                              <p>Link: <a href="${item.link}" target="_blank">${item.link}</a></p>`;
          resultsDiv.appendChild(newDiv);
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
});

/* global YT */

function onYouTubeIframeAPIReady() {
  new YT.Player('video-background', {
    videoId: 'Sv3eXRN7hLo',
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






