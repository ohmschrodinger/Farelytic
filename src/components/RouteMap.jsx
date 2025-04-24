import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const RouteMap = ({ pickup, dropoff }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        const loader = new Loader({
            apiKey,
            version: 'weekly',
            libraries: ['places']
        });

        loader.load().then(() => {
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: 18.5204, lng: 73.8567 }, // Pune center coordinates
                zoom: 12,
                styles: [
                    {
                        featureType: 'poi',
                        elementType: 'labels',
                        stylers: [{ visibility: 'off' }]
                    }
                ]
            });

            const directionsRenderer = new window.google.maps.DirectionsRenderer({
                map,
                suppressMarkers: false,
                polylineOptions: {
                    strokeColor: '#2ecc71',
                    strokeWeight: 5
                }
            });

            setMap(map);
            setDirectionsRenderer(directionsRenderer);
        });
    }, [apiKey]);

    useEffect(() => {
        if (map && directionsRenderer && pickup && dropoff) {
            const directionsService = new window.google.maps.DirectionsService();

            directionsService.route(
                {
                    origin: pickup.name,
                    destination: dropoff.name,
                    travelMode: window.google.maps.TravelMode.DRIVING
                },
                (result, status) => {
                    if (status === 'OK') {
                        directionsRenderer.setDirections(result);
                        
                        // Fit the map to the route bounds
                        const bounds = new window.google.maps.LatLngBounds();
                        result.routes[0].legs[0].steps.forEach((step) => {
                            bounds.extend(step.start_location);
                            bounds.extend(step.end_location);
                        });
                        map.fitBounds(bounds);
                    } else {
                        console.error('Directions request failed:', status);
                    }
                }
            );
        }
    }, [map, directionsRenderer, pickup, dropoff]);

    return (
        <div className="route-map-container">
            <div 
                ref={mapRef} 
                style={{ 
                    width: '100%', 
                    height: '300px', 
                    borderRadius: '12px',
                    marginTop: '20px',
                    marginBottom: '20px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }} 
            />
        </div>
    );
};

export default RouteMap; 