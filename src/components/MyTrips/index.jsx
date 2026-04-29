import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tripsApi } from "@/service/backendApi";
import { useAuth } from "@/context/AuthContext";

function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    tripsApi
      .getAll()
      .then((res) => setTrips(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Delete this trip?")) return;
    await tripsApi.delete(id);
    setTrips((prev) => prev.filter((t) => t.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading your trips...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">My Trips</h1>
          <Link
            to="/create-trip"
            className="bg-[#DE3163] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#f04370] transition"
          >
            + New Trip
          </Link>
        </div>

        {trips.length === 0 ? (
          <div className="text-center py-24 text-gray-400 text-lg">
            <p className="mb-4">No trips yet.</p>
            <Link
              to="/create-trip"
              className="text-[#DE3163] underline font-medium"
            >
              Plan your first trip →
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => {
              const sel = JSON.parse(trip.userSelection);
              return (
                <div
                  key={trip.id}
                  onClick={() => navigate(`/view-trip/${trip.id}`)}
                  className="cursor-pointer bg-white rounded-2xl border border-gray-200 shadow hover:shadow-lg transition transform hover:-translate-y-1 p-6 space-y-3 relative"
                >
                  <button
                    onClick={(e) => handleDelete(trip.id, e)}
                    className="absolute top-4 right-4 text-gray-300 hover:text-red-500 text-xl font-bold"
                    title="Delete trip"
                  >
                    ×
                  </button>

                  <h2 className="text-xl font-bold text-[#A91D3A] pr-6">
                    {sel.location || "Unknown"}
                  </h2>

                  <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                    <span className="bg-pink-50 border border-pink-200 rounded-full px-3 py-1">
                      {sel.noOfDays} days
                    </span>
                    <span className="bg-pink-50 border border-pink-200 rounded-full px-3 py-1">
                      {sel.budget}
                    </span>
                    <span className="bg-pink-50 border border-pink-200 rounded-full px-3 py-1">
                      {sel.traveler}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400">
                    {trip.createdAt
                      ? new Date(trip.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : ""}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
