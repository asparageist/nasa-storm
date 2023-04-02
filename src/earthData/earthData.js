import earthPictureData from "../api/earthPicApiCall";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

let handleEarthPic = (event) => {
  event.preventDefault();
  let year = document.querySelector("#year").value;
  let month = document.querySelector("#month").value;
  let day = document.querySelector("#day").value;

  earthPictureData.getEarthPictureData(year, month, day)
    .then((data) => {
      if(data.result === "error") {
        const errorMessage = `An error occured while fetching the currency data: ${data["error-type"]}`;
        const errorElement = document.getElementById("error");
        errorElement.innerHTML = errorMessage;
        throw new Error(errorMessage);
      }
      
      let img = document.querySelector('.slideshow-image');
      img.setAttribute("src", `https://api.nasa.gov/EPIC/archive/natural/${year}/${month}/${day}/png/${data[0].image}.png?api_key=${process.env.API_KEY}`);
    });
};

window.addEventListener("load", () => { 
  document.querySelector('form').addEventListener("submit", handleEarthPic);
});
