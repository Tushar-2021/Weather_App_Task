import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudShowersHeavy, faCloud } from '@fortawesome/free-solid-svg-icons';
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const ForecastDetail = ({ data }) => {
  console.log(data);
  var main = data[0].main;
  var d = new Date(data[0].dt_txt);
  var dayname = weekday[d.getDay()];
  if (data[0].weather[0].main === "Rain") {
    var iconClassn = faCloudShowersHeavy;
  } else if (data[0].weather[0].main === "Clouds") {
    var iconClassn = faCloud
  } else if (data[0].weather[0].main === "Clear") {
    var iconClassn = faSun
  }
  return (
    <>
      <div class="cards" id="weather-cards"><div class="card">
        <h2 class="day-name">{dayname}</h2>
        <div class="card-icon">

          <FontAwesomeIcon icon={iconClassn} />

        </div>
        <div class="day-temp">
          <h2 class="temp">{toCel(main.feels_like - 204.8).toFixed(2)}</h2>
          <span class="temp-unit">°C</span>
        </div>
      </div></div>
    </>
  );


}

function toCel(temp) {
  return (temp - 32) / 1.8;
}


export default ForecastDetail