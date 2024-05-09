import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudShowersHeavy, faCloud } from '@fortawesome/free-solid-svg-icons';

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const ForecastDetail = ({ data }) => {

  const main = data[0].main;
  const d = new Date(data[0].dt_txt);
  const dayname = weekday[d.getDay()];
  let iconClassn;

  if (data[0].weather[0].main === "Rain") {
    iconClassn = faCloudShowersHeavy;
  } else if (data[0].weather[0].main === "Clouds") {
    iconClassn = faCloud;
  } else if (data[0].weather[0].main === "Clear") {
    iconClassn = faSun;
  }

  return (
    <>
      <div className="cards" id="weather-cards">
        <div className="card">
          <h2 className="day-name">{dayname}</h2>
          <div className="card-icon">
            <FontAwesomeIcon icon={iconClassn} />
          </div>
          <div className="day-temp">
            <h2 className="temp">{toCel(main.feels_like - 204.8).toFixed(2)}</h2>
            <span className="temp-unit">°C</span>
          </div>
        </div>
      </div>
    </>
  );
}

function toCel(temp) {
  return (temp - 32) / 1.8;
}

export default ForecastDetail;
