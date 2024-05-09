import React, { useState, useEffect } from 'react';
import { UilSearch, UilLocationPoint, UilTimesCircle } from "@iconscout/react-unicons";
import { toast } from "react-toastify";

const Input = ({ setQuery, units, setUnits }) => {
  const [city, setCity] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) {
      setUnits(selectedUnit);
    }
  };

  const handleSearch = () => {
    if (city.trim() !== "") {
      setQuery({ q: city.trim() });
      updateSearchHistory(city.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching user's location.");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({ lat, lon });
      });
    }
  };

  const updateSearchHistory = (cityName) => {
    const updatedHistory = [cityName, ...searchHistory.filter(item => item !== cityName)];
    if (updatedHistory.length > 3) {
      updatedHistory.pop();
      toast.warning("You can't store more than 3 cities in history.");
    }
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    setSearchHistory(updatedHistory);
    setCity("");
  };

  const handleHistoryClick = (city) => {
    setCity(city);
    setQuery({ q: city });
  };

  const handleRemoveHistoryItem = (index) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    setSearchHistory(updatedHistory);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center my-6">
      <div className="flex flex-col md:flex-row w-full md:w-3/4 items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Search for a city..."
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder-lowercase"
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearch}
        />
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>
      <div className="flex flex-row w-full md:w-1/4 items-center justify-center mt-4 md:mt-0">
        <button
          name="metric"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button
          name="imperial"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
      {/* Search History Box */}
      <div className="flex flex-col w-full md:w-3/4 items-center justify-center mt-4 md:mt-0">
        <div className="border border-gray-300 rounded-md p-2 max-h-40 overflow-y-auto">
          {searchHistory.map((item, index) => (
            <div key={index} className="flex items-center">
              <button
                className="text-sm text-white font-light transition ease-out hover:scale-125 mx-1 mb-1 bg-gray-700 rounded-md px-2 py-1 capitalize"
                onClick={() => handleHistoryClick(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
              <UilTimesCircle
                size={20}
                className="text-red-500 cursor-pointer ml-2 hover:text-red-700"
                onClick={() => handleRemoveHistoryItem(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Input;
