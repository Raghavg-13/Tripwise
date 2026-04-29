import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tripsApi } from "@/service/backendApi";
import Footer from "./view-trip-sections/Footer";
import Hotels from "./view-trip-sections/Hotels";
import InfoSection from "./view-trip-sections/InfoSection";
import PlacesToVisit from "./view-trip-sections/PlacesToVisit";

function Viewtrip() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    tripsApi
      .getById(id)
      .then((res) => {
        const raw = res.data;
        setTrip({
          userSelection: JSON.parse(raw.userSelection),
          tripData: JSON.parse(raw.tripData),
        });
      })
      .catch(() => setError("Could not load this trip."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading trip...
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        {error || "Trip not found."}
      </div>
    );
  }

  return (
    <div className="min-h-screen font-inter text-gray-800">
      <section className="bg-gradient-to-r from-slate-100 to-slate-300 py-10 px-5 md:px-20">
        <InfoSection trip={trip} />
      </section>

      <section className="bg-white py-10 px-5 md:px-20">
        <Hotels trip={trip} />
      </section>

      <section className="bg-slate-50 py-10 px-5 md:px-20">
        <PlacesToVisit trip={trip} />
      </section>

      <Footer />
    </div>
  );
}

export default Viewtrip;
