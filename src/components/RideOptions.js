import React, { useState, useEffect } from 'react';
import { getRidePrices } from '../services/rideService';
import './RideOptions.css';

const RideOptions = ({ source, destination }) => {
    const [rideData, setRideData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRidePrices = async () => {
            if (!source || !destination) {
                console.log('Missing source or destination');
                return;
            }
            
            setLoading(true);
            setError(null);
            
            try {
                console.log('Fetching prices for:', { source, destination });
                const data = await getRidePrices(source, destination);
                console.log('Received data:', data);
                setRideData(data);
            } catch (err) {
                console.error('Error fetching ride prices:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRidePrices();
    }, [source, destination]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Fetching ride options...</p>
                <p className="loading-details">This might take a few seconds</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">{error}</p>
                <p className="error-details">Please try again in a few moments</p>
            </div>
        );
    }

    if (!rideData || !rideData.prices) {
        return null;
    }

    return (
        <div className="ride-options-container">
            <h2>Available Ride Options</h2>
            <div className="search-info">
                <p>From: {source}</p>
                <p>To: {destination}</p>
            </div>
            <div className="ride-options-grid">
                {rideData.prices.map((service, index) => (
                    <div key={`${service.service}-${index}`} className="ride-option-card">
                        <h3>{service.service}</h3>
                        {service.error ? (
                            <p className="error-message">{service.error}</p>
                        ) : (
                            <div className="price-details">
                                <div className="price">₹{service.price}</div>
                                <div className="ride-info">
                                    <span className="duration">{service.duration} mins</span>
                                    <span className="distance">{service.distance} km</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RideOptions; 