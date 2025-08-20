import React, { useState, useEffect } from "react";

const Dashboard: React.FC = () => {
  const [place, setPlace] = useState("");
  const [days, setDays] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        setUserName(JSON.parse(user).name);
      } catch {
        setUserName("");
      }
    }
  }, []);

  const handlePlan = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("⏳ Generating itinerary...");

    try {
      const res = await fetch("http://localhost:5000/api/travel/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ place, days }),
      });

      const data = await res.json();

      if (res.ok) {
        setItinerary(data.itinerary);
        setMessage("");
      } else {
        setMessage("❌ " + (data.error || "Something went wrong"));
      }
    } catch (err) {
      console.error("Plan error:", err);
      setMessage("❌ Server error, please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-2">🌍 Travel Planner</h1>
      <h2 className="text-xl mb-6">Welcome, {userName || "User"}.</h2>
      <form onSubmit={handlePlan} className="bg-white p-6 rounded shadow-md w-full max-w-md mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Place</label>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Days</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Generate Itinerary
        </button>
      </form>

      {message && <p className="mb-4 text-sm">{message}</p>}

      {itinerary && (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl whitespace-pre-wrap">
          <h2 className="text-xl font-bold mb-4">✈️ Your Itinerary</h2>
          <p>{itinerary}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
