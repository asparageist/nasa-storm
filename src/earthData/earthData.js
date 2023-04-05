import earthPictureData from "../api/earthPicApiCall";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './earthData.css';

let photoIndex = 0;

let handleEarthPic = (event) => {
  event.preventDefault();
  photoIndex = 0;
  gatherInfo();
};

let gatherInfo = () => {
  let year = document.querySelector("#year").value;
  let month = document.querySelector("#month").value;
  let day = document.querySelector("#day").value;

  if (year === "" || month === "" || day === "") {
    changePic(2022, "06", 20);
  }

  if (year < 24) {
    year = 20 + year;
  }

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }
  changePic(year, month, day);

};

let changePic = (year, month, day) => {
  earthPictureData.getEarthPictureData(year, month, day)
    .then((data) => {
      if(data.result === "error") {
        const errorMessage = `An error occured while fetching the currency data: ${data["error-type"]}`;
        const errorElement = document.getElementById("error");
        errorElement.innerHTML = errorMessage;
        throw new Error(errorMessage);

      }

      if (photoIndex >= data.length) {
        photoIndex = 0;
      }

      if (photoIndex < 0) {
        photoIndex = data.length - 1;
      }

      if (data.length < 1) {
        document.querySelector(".title").innerText = "There are no pictures for that date. Enter a new day";
      }

      let img = document.querySelector('.slideshow-image');
      img.setAttribute("src", `https://api.nasa.gov/EPIC/archive/natural/${year}/${month}/${day}/png/${data[photoIndex].image}.png?api_key=${process.env.API_KEY}`);

      let displayDate = document.querySelector('.title');
      displayDate.innerText = `Earth on ${data[photoIndex].date}`;

      let picNum = document.querySelector('.picNum');
      picNum.innerText = `${photoIndex + 1} / ${data.length}`;
    });
};

let changeIndex = () => {
  photoIndex++;
  gatherInfo();
};

let prevIndex = () => {
  photoIndex--;
  gatherInfo();
};

window.addEventListener("load", () => { 
  document.querySelector('form').addEventListener("submit", handleEarthPic);
});

window.addEventListener('load', () => {
  document.querySelector('#next-photo').addEventListener('click', function() {
    changeIndex();
  });
});

window.addEventListener('load', () => {
  document.querySelector('#prev-photo').addEventListener('click', function() {
    prevIndex();
  });
});

changePic(2022, "06", 20);
