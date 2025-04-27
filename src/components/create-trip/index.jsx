import { Button } from "@/components/molecular/button";
import { Input } from "@/components/molecular/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelLists,
} from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useNavigate } from "react-router-dom";

function CreateTrip({ setTrip }) {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTraveler, setSelectedTraveler] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const apikey = "" //Enter your gemini api key
  const OnGenerateTrip = async () => {
    if (!formData?.noOfDays || isNaN(formData.noOfDays)) {
      alert("Please enter a valid number of days.");
      return;
    }

    if (formData.noOfDays > 5) {
      alert("Trip cannot be generated for more than 5 days.");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      place?.label || "No location selected"
    )
      .replace("{totalDays}", formData.noOfDays)
      .replace("{traveler}", formData.traveler || "Not specified")
      .replace("{budget}", formData.budget || "Not specified");

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false);

    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = (TripData) => {
    const tripObject = {
      userSelection: formData,
      tripData: JSON.parse(TripData),
    };
    setTrip(tripObject);
    navigate("/view-trip");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 py-10 px-4 flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 space-y-10">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-800">
            Plan Your Perfect Trip
          </h1>
          <p className="text-gray-500">
            Answer a few quick questions and let AI do the rest!
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Destination
            </label>
            <GooglePlacesAutocomplete
              apiKey={apikey}
              selectProps={{
                value: place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v);
                },
              }}
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Number of Days
            </label>
            <Input
              type="number"
              placeholder="e.g. 3"
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-4 text-center">
              Select Your Budget
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg text-center cursor-pointer transition-all border-2 ${
                    selectedBudget === item.title
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-gray-100 hover:bg-red-100 border-gray-300"
                  }`}
                  onClick={() => {
                    setSelectedBudget(item.title);
                    handleInputChange("budget", item.title);
                  }}
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-4 text-center">
              Number of Travelers
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {SelectTravelLists.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg text-center cursor-pointer transition-all border-2 ${
                    selectedTraveler === item.title
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-gray-100 hover:bg-red-100 border-gray-300"
                  }`}
                  onClick={() => {
                    setSelectedTraveler(item.title);
                    handleInputChange("traveler", item.title);
                  }}
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Button
              onClick={OnGenerateTrip}
              disabled={loading}
              className="w-full bg-black hover:bg-red-700 text-white text-lg py-3 rounded-xl shadow-md"
            >
              {loading ? "Generating..." : "Generate My Trip"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
