const API_BASE_URL = 'http://localhost:3002';

export const getRidePrices = async (source, destination) => {
    try {
        console.log('Attempting to fetch ride prices for:', { source, destination });
        
        const response = await fetch(`${API_BASE_URL}/api/prices?source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Error response:', errorData);
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Successfully received ride prices:', data);
        return data;
    } catch (error) {
        console.error('Error in getRidePrices:', error);
        throw new Error(`Failed to fetch ride prices: ${error.message}`);
    }
}; 