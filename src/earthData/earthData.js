import earthPictureData from "../api/earthPicApiCall";
import astroidData from "../api/earthAstroidApiCall";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './earthData.css';


let photoIndex = 0;
let otherDay = 0;

let changeIndex = () => {
  photoIndex++;
  gatherInfo();
};

let prevIndex = () => {
  photoIndex--;
  gatherInfo();
};

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

  if (month.length < 2) {
    month = "0" + month;
  }

  if (day.length < 2) {
    day = "0" + day;
  }

  otherDay = parseInt(day);

  changePic(year, month, day);
  getAstroids(year, month, otherDay, day);
};

let getAstroids = (year, month, otherDay) => {
  astroidData.getAstroidData(year, month, otherDay)
    .then((data) => {
      if(data.result === "error") {
        const errorMessage = `An error occured while fetching the currency data: ${data["error-type"]}`;
        const errorElement = document.getElementById("error");
        errorElement.innerHTML = errorMessage;
        throw new Error(errorMessage);
      }
      let addOneDay = otherDay + 1;
      let totalAstroids = [];
      let fastestAstroid = [];

      if (otherDay < 10) {
        otherDay = "0" + otherDay.toString();
      }

      if (addOneDay < 10) {
        addOneDay = "0" + addOneDay;
      }

      let date_n1 = `${year}-${month}-${(addOneDay)}`;

      let date = `${year}-${month}-${otherDay}`;

      for (let i = 0; i < data.near_earth_objects[date].length; i++) {
        totalAstroids.push(data.near_earth_objects[date][i].close_approach_data[0].relative_velocity.miles_per_hour);
      }
      
      for (let i = 0; i < data.near_earth_objects[date_n1].length; i++) {
        totalAstroids.push(data.near_earth_objects[date_n1][i].close_approach_data[0].relative_velocity.miles_per_hour);

      }

      totalAstroids.sort((a,b) => b-a);

      fastestAstroid = totalAstroids.splice(0, 3);

      document.querySelector(".numOfAstroids").innerText = data.element_count + ` Astroids flew by from ${date} to ${date_n1}`;
      document.querySelector(".top1Astroids").innerText = `The fastest astroid was ${fastestAstroid[0]} mph`;
      document.querySelector(".top2Astroids").innerText = `The second fastest astroid was ${fastestAstroid[1]} mph`;
      document.querySelector(".top3Astroids").innerText = `The third fastest astroid was ${fastestAstroid[2]} mph`;
    });
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
