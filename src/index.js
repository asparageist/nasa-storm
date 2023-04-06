import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import pictureOTD from './api/potdApiCall.js';
import './marsData/marsData';

function updatePotdSection(data) {
  let mediaElement;
  if (data.media_type === "image") {
    mediaElement = document.createElement("img");
    mediaElement.setAttribute("src", data.url);
    mediaElement.setAttribute("alt", data.title);
  } else if (data.media_type === "video") {
    mediaElement = document.createElement("iframe");
    mediaElement.setAttribute("src", data.url);
    mediaElement.setAttribute("frameborder", "0");
    mediaElement.setAttribute("allowfullscreen", "true");
  }

  if (mediaElement) {
    const potdMediaContainer = document.querySelector(".potd-media");
    potdMediaContainer.appendChild(mediaElement);
  }

  let title = document.querySelector('.potdTitle');
  title.innerText = data.title;

  let date = document.querySelector('.potdDate');
  date.innerText = data.date;

  let description = document.querySelector('.potdDescription');
  description.innerText = data.explanation;
}
async function fetchPotd() {
  try {
    const data = await pictureOTD.getPicture();
    updatePotdSection(data);
  } catch (error) {
    const errorMessage = `An error occurred while fetching the picture data: ${error.message}`;
    const errorElement = document.getElementById("error");
    errorElement.innerHTML = errorMessage;
    throw new Error(errorMessage);
  }
}

const potdSection = document.querySelector('#potd-section');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      fetchPotd();
      observer.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px 0px 0px' });

observer.observe(potdSection);
