const axios = require('axios');

class RideScraper {
    constructor() {
        // Base rates for different services
        this.rates = {
            uber: { base: 50, perKm: 12, perMin: 2, avgEta: [5, 12] },
            ola: { base: 45, perKm: 11, perMin: 1.8, avgEta: [8, 15] },
            rapido: { base: 30, perKm: 8, perMin: 1.5, avgEta: [10, 18] }
        };
    }

    getRandomEta(range) {
        const [min, max] = range;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async getAllPrices(source, destination) {
        try {
            // Simulate a fixed distance and duration for demo
            const distance = 7.6; // km
            const duration = 35; // minutes

            const prices = [
                await this.getUberPrices(distance, duration),
                await this.getOlaPrices(distance, duration),
                await this.getRapidoPrices(distance, duration)
            ];

            return {
                source,
                destination,
                timestamp: new Date().toISOString(),
                prices: prices.filter(price => price !== null)
            };
        } catch (error) {
            console.error('Error fetching all ride prices:', error);
            throw error;
        }
    }

    async getUberPrices(distance, duration) {
        try {
            const rate = this.rates.uber;
            const price = Math.round(rate.base + (distance * rate.perKm) + (duration * rate.perMin));
            const eta = this.getRandomEta(rate.avgEta);
            
            return {
                service: 'Uber',
                price: price,
                currency: '₹',
                duration: duration,
                distance: distance,
                eta: eta,
                totalTime: duration + eta,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error calculating Uber prices:', error);
            return null;
        }
    }

    async getOlaPrices(distance, duration) {
        try {
            const rate = this.rates.ola;
            const price = Math.round(rate.base + (distance * rate.perKm) + (duration * rate.perMin));
            const eta = this.getRandomEta(rate.avgEta);
            
            return {
                service: 'Ola',
                price: price,
                currency: '₹',
                duration: duration,
                distance: distance,
                eta: eta,
                totalTime: duration + eta,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error calculating Ola prices:', error);
            return null;
        }
    }

    async getRapidoPrices(distance, duration) {
        try {
            const rate = this.rates.rapido;
            const price = Math.round(rate.base + (distance * rate.perKm) + (duration * rate.perMin));
            const eta = this.getRandomEta(rate.avgEta);
            
            return {
                service: 'Rapido',
                price: price,
                currency: '₹',
                duration: duration,
                distance: distance,
                eta: eta,
                totalTime: duration + eta,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error calculating Rapido prices:', error);
            return null;
        }
    }
}

module.exports = RideScraper;

// Example usage
if (require.main === module) {
    (async () => {
        const scraper = new RideScraper();
        try {
            const results = await scraper.getAllPrices(
                'Mumbai Central, Mumbai',
                'Bandra West, Mumbai'
            );
            console.log(JSON.stringify(results, null, 2));
        } catch (error) {
            console.error('Error:', error);
        }
    })();
} 