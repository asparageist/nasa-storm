// import earthPictureData from "../api/earthPicApiCall";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

let handleEarthPic = (event) => {
  event.preventDefault();
  let year = document.querySelector("#year").value;
  console.log(year);
};

window.addEventListener("load", () => { 
  document.querySelector('form').addEventListener("submit", handleEarthPic);
});
