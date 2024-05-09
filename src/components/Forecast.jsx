import React, { useState, useEffect } from 'react';
import ForecastDetail from './ForecastDetails';

const Forecast = ({ title, items }) => {
  const [groupedData, setGroupedData] = useState([]);

  const groupItemsByDate = (items) => {
    const grouped = {};
    items.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });
    return Object.values(grouped);
  };

  const renderForecast = () => {
    return groupedData.map((dayData, index) => (
      <div key={index} className="flex flex-col items-center justify-center mx-4 my-4 md:my-0">
        <ForecastDetail data={dayData} />

      </div>
    ));
  };

  useEffect(() => {
    if (items && items.list) {
      const grouped = groupItemsByDate(items.list);
      setGroupedData(grouped);
    }
  }, [items]);

  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
        <div></div>
      </div>
      <hr className="my-2" />
      <div className="flex flex-wrap items-center justify-center md:justify-between text-white">
        {renderForecast()}
      </div>
    </div>
  );
};

export default Forecast;
