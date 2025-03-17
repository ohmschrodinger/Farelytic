import React, { useState, useEffect, useRef, useCallback } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import "../index.css";

const LocationSearch = ({ onSearch }) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [selectedDropoff, setSelectedDropoff] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mapsLoading, setMapsLoading] = useState(true);
  const [error, setError] = useState(null);

  const pickupAutocompleteRef = useRef(null);
  const dropoffAutocompleteRef = useRef(null);
  const pickupInputRef = useRef(null);
  const dropoffInputRef = useRef(null);

  const handlePlaceSelect = useCallback((place, setSelected, setInputValue) => {
    if (!place.geometry) {
      console.log("No location data available for this place");
      setError("Invalid location selected. Please try again.");
      return;
    }

    const locationData = {
      name: place.formatted_address || place.name,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      placeId: place.place_id,
    };

    // Update the selected location data
    setSelected(locationData);
    
    // Update the input field value with the formatted address
    setInputValue(locationData.name);
  }, []);

  const initializePlacesAutocomplete = useCallback(() => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      setError("Google Maps Places API not available");
      return;
    }

    const initAutocomplete = (inputRef, setSelected, setInputValue) => {
      if (inputRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ["geocode", "establishment"],
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          handlePlaceSelect(place, setSelected, setInputValue);
        });

        return autocomplete;
      }
    };

    pickupAutocompleteRef.current = initAutocomplete(pickupInputRef, setSelectedPickup, setPickup);
    dropoffAutocompleteRef.current = initAutocomplete(dropoffInputRef, setSelectedDropoff, setDropoff);
  }, [handlePlaceSelect]);

  useEffect(() => {
    if (!apiKey) {
      setError("Google Maps API key is missing. Please check your environment variables.");
      setMapsLoading(false);
      return;
    }

    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load()
      .then(() => {
        initializePlacesAutocomplete();
        setMapsLoading(false);
      })
      .catch(err => {
        console.error("Error loading Google Maps:", err);
        setError("Failed to load Google Maps. Please check your internet connection or disable ad blockers.");
        setMapsLoading(false);
      });

    return () => {
      if (pickupAutocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(pickupAutocompleteRef.current);
      }
      if (dropoffAutocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(dropoffAutocompleteRef.current);
      }
    };
  }, [apiKey, initializePlacesAutocomplete]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedPickup && selectedDropoff) {
      onSearch({
        pickup: selectedPickup,
        dropoff: selectedDropoff,
      });
    } else {
      setError("Please select valid locations before searching.");
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (!window.google || !window.google.maps) {
          setError("Google Maps not loaded yet");
          setIsLoading(false);
          return;
        }

        const geocoder = new window.google.maps.Geocoder();
        const latlng = { lat: latitude, lng: longitude };

        geocoder.geocode({ location: latlng }, (results, status) => {
          setIsLoading(false);
          if (status === "OK" && results[0]) {
            const place = results[0];
            setPickup(place.formatted_address);
            setSelectedPickup({
              name: place.formatted_address,
              lat: latitude,
              lng: longitude,
              placeId: place.place_id,
            });
          } else {
            setError("Couldn't determine your address.");
          }
        });
      },
      (error) => {
        setIsLoading(false);
        console.error("Geolocation error:", error);
        setError("Location access denied. Please enable location services.");
      }
    );
  };

  return (
    <div className="location-search-container">
      <h2 className="search-title">Where to?</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSearch}>
        <div className="location-input-group">
          <div className="input-with-icon">
            <input
              ref={pickupInputRef}
              type="text"
              className="location-input"
              placeholder={mapsLoading ? "Loading maps..." : "Enter pickup location"}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                if (e.target.value === '') {
                  setSelectedPickup(null);
                }
              }}
              disabled={mapsLoading}
              required
            />
            <button
              type="button"
              className="current-location-btn"
              onClick={getCurrentLocation}
              title="Use current location"
              disabled={isLoading || mapsLoading}
            >
              {isLoading ? "📍..." : "📍"}
            </button>
          </div>
        </div>

        <div className="location-input-group">
          <input
            ref={dropoffInputRef}
            type="text"
            className="location-input"
            placeholder={mapsLoading ? "Loading maps..." : "Enter drop location"}
            value={dropoff}
            onChange={(e) => {
              setDropoff(e.target.value);
              if (e.target.value === '') {
                setSelectedDropoff(null);
              }
            }}
            disabled={mapsLoading}
            required
          />
        </div>

        <button type="submit" className="search-btn" disabled={mapsLoading}>
          {mapsLoading ? "Loading..." : "Find Rides"}
        </button>
      </form>
    </div>
  );
};

export default LocationSearch;