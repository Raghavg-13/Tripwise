import React, { useState, useEffect } from "react";

function InfoSection({ trip }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const location = trip?.userSelection?.location;

      if (!location) return;

      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${location}&client_id=${
          import.meta.env.VITE_UNSPLASH_API_KEY
        }&orientation=landscape`
      );
      const data = await res.json();
      if (data.results.length) setImageUrl(data.results[0].urls.regular);
    };

    fetchImage();
  }, [trip]);

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl ">
      <img
        src={imageUrl || "https://placehold.co/1920x1080"}
        alt="Trip"
        className="w-full h-[70vh] object-cover brightness-75 mt-5"
        loading="lazy"
        onLoad={(e) => e.target.classList.add("opacity-100")}
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-md">
          {trip?.userSelection?.location || "Unknown Location"}
        </h1>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <span className="bg-black bg-opacity-50 rounded-full px-5 py-2 text-lg">
            {trip?.userSelection?.noOfDays || "N/A"} Days
          </span>
          <span className="bg-black bg-opacity-50 rounded-full px-5 py-2 text-lg">
            ₹{trip?.userSelection?.budget || "N/A"}
          </span>
          <span className="bg-black bg-opacity-50 rounded-full px-5 py-2 text-lg">
            {trip?.userSelection?.traveler || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
