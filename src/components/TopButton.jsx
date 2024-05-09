import React from 'react';

const TopButton = ({ setQuery }) => {
  const cities = [
    {
      id: 1,
      title: "London",
    },
    {
      id: 2,
      title: "New Delhi",
    },
    {
      id: 3,
      title: "New York",
    },
    {
      id: 4,
      title: "Tokyo",
    },
    {
      id: 5,
      title: "Beijing",
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-lg font-medium m-2"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
};

export default TopButton;
