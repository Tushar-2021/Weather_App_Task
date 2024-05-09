import { DateTime } from "luxon";

const API_KEY = "d778d3479303ea651e2bd09fbdab7f96";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getweatherData = (infoType, searchParams) => {
  const url = new URL(`${BASE_URL}${infoType}`);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(`${url.origin}${url.pathname}${url.search}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      throw error;
    });
};

const formatcurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

// const formatForecastWeather = (data) => {
//   console.log("data", data);
//   let { timezone } = data;

//   return { timezone };
// };

const getFormattedWeatherData = async (searchParams) => {

  if (searchParams.q === "") {
    searchParams.q = "delhi";
  }
  const formattedcurrentWeather = await getweatherData(
    "weather",
    searchParams
  ).then(formatcurrentWeather);
  const { lat, lon } = formattedcurrentWeather;

  const formattedForecastWeather = await getweatherData("forecast", {
    lat,
    lon,
  });
  return { ...formattedForecastWeather, ...formattedcurrentWeather };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc,dd LLL yyyy' | Local time:'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
