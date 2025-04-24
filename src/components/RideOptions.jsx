import React, { useState, useEffect } from 'react';
import { getRidePrices } from '../services/rideService';
import RouteMap from './RouteMap';
import { generateUberDeeplink, generateOlaDeeplink, generateRapidoDeeplink, openDeeplink } from '../utils/deeplinks';
import './RideOptions.css';

const RideOptions = ({ source, destination }) => {
    const [rideData, setRideData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedPickup, setSelectedPickup] = useState(null);
    const [selectedDropoff, setSelectedDropoff] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

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
                
                // Set locations for the map
                setSelectedPickup({ name: source });
                setSelectedDropoff({ name: destination });
            } catch (err) {
                console.error('Error fetching ride prices:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRidePrices();
    }, [source, destination]);

    const handleServiceSelect = (service) => {
        setSelectedService(service);
        setShowConfirmation(true);
    };

    const handleBooking = (service, pickup, dropoff) => {
        setShowConfirmation(false);
        let links;
        switch (service.toLowerCase()) {
            case 'uber':
                links = generateUberDeeplink(pickup, dropoff);
                break;
            case 'ola':
                links = generateOlaDeeplink(pickup, dropoff);
                break;
            case 'rapido':
                links = generateRapidoDeeplink(pickup, dropoff);
                break;
            default:
                console.error('Unknown service:', service);
                return;
        }
        
        openDeeplink(links.appLink, links.webLink);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Finding the best rides for you...</p>
                <p className="loading-details">Comparing prices across services</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">{error}</p>
                <p className="error-details">Please try again in a few moments</p>
                <button 
                    className="book-now-btn"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </button>
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

            {selectedPickup && selectedDropoff && (
                <RouteMap pickup={selectedPickup} dropoff={selectedDropoff} />
            )}

            <div className="ride-options-grid">
                {rideData.prices.map((service, index) => (
                    <div 
                        key={`${service.service}-${index}`} 
                        className={`ride-option-card ${selectedService?.service === service.service ? 'selected' : ''}`}
                    >
                        <h3 data-service={service.service}>{service.service}</h3>
                        {service.error ? (
                            <p className="error-message">{service.error}</p>
                        ) : (
                            <div className="price-details">
                                <div className="price">₹{service.price}</div>
                                <div className="ride-info">
                                    <div className="time-info">
                                        <span className="eta" title="Time for ride to arrive">
                                            {service.eta} mins to arrive
                                        </span>
                                        <span className="duration" title="Journey duration">
                                            {service.duration} mins journey
                                        </span>
                                    </div>
                                    <span className="distance">{service.distance} km</span>
                                </div>
                                <div className="total-time">
                                    Total time: {service.totalTime} mins
                                </div>
                                <button 
                                    className="book-now-btn"
                                    onClick={() => handleBooking(
                                        service.service,
                                        { name: source },
                                        { name: destination }
                                    )}
                                >
                                    Book {service.service} Now
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {showConfirmation && selectedService && (
                <div className="booking-confirmation">
                    <div className="confirmation-content">
                        <h3>Confirm your ride with {selectedService.service}</h3>
                        <p>Price: ₹{selectedService.price}</p>
                        <p>ETA: {selectedService.eta} mins</p>
                        <p>Journey Duration: {selectedService.duration} mins</p>
                        <p>Total Time: {selectedService.totalTime} mins</p>
                        <p>Distance: {selectedService.distance} km</p>
                        <div className="confirmation-buttons">
                            <button 
                                className="confirm-btn"
                                onClick={() => handleBooking(
                                    selectedService.service,
                                    { name: source },
                                    { name: destination }
                                )}
                            >
                                Confirm Booking
                            </button>
                            <button 
                                className="cancel-btn"
                                onClick={() => {
                                    setSelectedService(null);
                                    setShowConfirmation(false);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RideOptions; 