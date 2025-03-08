    // src/components/LocationSearch.jsx
import React, { useState } from "react";
import "../index.css";

const LocationSearch = ({ onSearch }) => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (pickup && dropoff) {
      onSearch({ pickup, dropoff });
    }
  };

  return (
    <div className="location-search-container">
      <h2 className="search-title">Where to?</h2>
      
      <form onSubmit={handleSearch}>
        <div className="location-input-group">
          <input
            type="text"
            className="location-input"
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
          />
        </div>
        
        <div className="location-input-group">
          <input
            type="text"
            className="location-input"
            placeholder="Enter drop location"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="search-btn">
          Find Rides
        </button>
      </form>
    </div>
  );
};

export default LocationSearch;