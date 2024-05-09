import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import TopButton from "./components/TopButton"
import Input from "./components/Input";
import TimeLocation from "./components/TimeLocation";
import TemperatureDetails from "./components/TemperatureDetails";
import Forecast from "./components/Forecast.jsx";
import getFormattedWeatherData from "./services/Service";


function App() {
  const [query, setQuery] = useState({ q: "" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";
      toast.info("Fetching weather for " + message);
      await getFormattedWeatherData({ ...query, units })
        .then((data) => {
          toast.success(
            `Successfully fetched weather for ${data.name}, ${data.country}.`
          );
          setWeather(data);
          console.log("finaldata", data);
        })
        .catch((error) => {
          toast.error("Error fetching weather data: " + error.message);
        });
    };
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";
    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >

      <TopButton setQuery={setQuery} />
      <Input setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && (
        <div>

          <TimeLocation weather={weather} />
          <TemperatureDetails weather={weather} weather_root={weather} />
          <Forecast title={"Forecast"} items={weather} />
        </div>
      )}
      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
