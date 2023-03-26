import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import pictureOTD from './api/potdApiCall.js';
// import * as THREE from 'three';

pictureOTD.getPicture()
  .then((data) => {
    if(data.result === "error") {
      const errorMessage = `An error occured while fetching the currency data: ${data["error-type"]}`;
      const errorElement = document.getElementById("error");
      errorElement.innerHTML = errorMessage;
      throw new Error(errorMessage);
    }
    let vid = document.querySelector('#potdVideo');
    vid.setAttribute("src", data.url);
    
    let title = document.querySelector('.potdTitle');
    title.innerText = data.title; 

    let date = document.querySelector('.potdDate');
    date.innerText = data.date; 
    
    let description = document.querySelector('.potdDescription');
    description.innerText = data.explanation;
  });
    
