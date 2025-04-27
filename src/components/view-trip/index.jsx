import Footer from "./view-trip-sections/Footer";
import Hotels from "./view-trip-sections/Hotels";
import InfoSection from "./view-trip-sections/InfoSection";
import PlacesToVisit from "./view-trip-sections/PlacesToVisit";

function Viewtrip({ trip }) {
  if (!trip) {
    return (
      <div className="text-center p-10 text-gray-500">
        No trip data available.
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
