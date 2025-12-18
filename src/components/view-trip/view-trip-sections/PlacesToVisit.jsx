import React, { useState, useEffect } from "react";

function PlacesToVisit({ trip }) {
  const [placeImages, setPlaceImages] = useState({});
  const itinerary = trip?.tripData?.itinerary || {};

  useEffect(() => {
    // Handle both old format (direct arrays) and new format (with activities)
    const allPlaces = Object.values(itinerary).flatMap((dayData) => {
      // If dayData has activities array, use it; otherwise use dayData itself
      return Array.isArray(dayData?.activities)
        ? dayData.activities
        : Array.isArray(dayData)
        ? dayData
        : [];
    });

    allPlaces.forEach(async (place) => {
      if (place?.placeName && !placeImages[place.placeName]) {
        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=${
            place.placeName
          }&client_id=${
            import.meta.env.VITE_UNSPLASH_API_KEY
          }&orientation=landscape`
        );
        const data = await res.json();
        setPlaceImages((prev) => ({
          ...prev,
          [place.placeName]: data.results[0]?.urls?.regular,
        }));
      }
    });
  }, [itinerary]);

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">📍 Places to Visit</h2>
      {Object.entries(itinerary).map(([day, dayData], idx) => {
        const places = dayData?.activities || dayData;
        const isArray = Array.isArray(places);

        return (
          <div key={idx} className="mb-10">
            <h3 className="text-2xl font-bold text-pink-700 mb-4">
              Day {idx + 1}
              {dayData?.theme && (
                <span className="text-lg font-normal text-gray-600 ml-2">
                  - {dayData.theme}
                </span>
              )}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isArray &&
                places.map((item, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps?q=${item.placeName}`,
                        "_blank"
                      )
                    }
                    className="cursor-pointer bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-transform hover:scale-105"
                  >
                    <img
                      src={
                        placeImages[item.placeName] ||
                        "https://placehold.co/600x400"
                      }
                      alt={item.placeName}
                      className="w-full h-48 object-cover rounded-t-xl"
                      loading="lazy"
                      onLoad={(e) => e.target.classList.add("opacity-100")}
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold">
                        {item.placeName}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.placeDetails}
                      </p>
                      <div className="mt-2 text-yellow-500 text-sm">
                        ⭐ {item.rating}
                      </div>
                      <div className="text-pink-700 font-semibold mt-1">
                        {item.ticketPricing}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        ⏰ {item.time}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PlacesToVisit;
