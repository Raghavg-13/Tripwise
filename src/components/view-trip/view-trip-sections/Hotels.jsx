import React, { useState, useEffect } from "react";

function Hotels({ trip }) {
  const [hotelImages, setHotelImages] = useState({});
  const apikey = "" //Enter your unsplash api key

  useEffect(() => {
    trip?.tripData?.hotels?.forEach(({ hotelName }) => {
      if (!hotelImages[hotelName]) {
        fetchHotelImage(hotelName);
      }
    });
  }, [trip]);

  const fetchHotelImage = async (name) => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${name}&client_id=${apiKey}`
      );
      const data = await res.json();
      setHotelImages((prev) => ({
        ...prev,
        [name]: data.results[0]?.urls?.small || "/path/to/placeholder.jpg",
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#151515] mb-6">
        Hotel Recommendations
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {trip?.tripData?.hotels?.map((hotel, i) => (
          <a
            key={i}
            href={`https://www.google.com/maps?q=${encodeURIComponent(
              `${hotel.hotelName}, ${hotel.hotelAddress}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <img
              src={hotelImages[hotel.hotelName] || "/path/to/placeholder.jpg"}
              alt={hotel.hotelName}
              className="w-full h-48 object-cover"
              loading="lazy"
              onLoad={(e) => e.target.classList.add("opacity-100")}
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold text-[#A91D3A]">
                {hotel.hotelName}
              </h3>
              <span className="text-yellow-500">⭐ {hotel.rating}</span>
              <p className="text-gray-600 text-sm">{hotel.description}</p>
              <p className="text-lg font-bold text-[#A91D3A]">{hotel.price}</p>
              <p className="text-sm text-gray-500">{hotel.hotelAddress}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
