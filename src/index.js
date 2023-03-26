import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import pictureOTD from './api/potdApiCall.js';


pictureOTD.getPicture()
  .then((data) => {
    if(data.result === "error") {
      const errorMessage = `An error occured while fetching the currency data: ${data["error-type"]}`;
      const errorElement = document.getElementById("error");
      errorElement.innerHTML = errorMessage;
      throw new Error(errorMessage);
    }
   let vid = document.querySelector('#source')
   vid.setAttribute("src", data.url);
  });
    
