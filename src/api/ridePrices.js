const express = require('express');
const router = express.Router();
const RideScraper = require('../scrapers/rideScraper');

const scraper = new RideScraper();

router.get('/', async (req, res) => {
    try {
        const { source, destination } = req.query;
        
        if (!source || !destination) {
            return res.status(400).json({ 
                error: 'Source and destination are required',
                details: {
                    source: !source ? 'Source location is required' : undefined,
                    destination: !destination ? 'Destination location is required' : undefined
                }
            });
        }

        console.log('Received request for prices:', { source, destination });
        const prices = await scraper.getAllPrices(source, destination);
        
        if (!prices || !prices.prices || prices.prices.length === 0) {
            return res.status(404).json({
                error: 'No ride prices found',
                message: 'Could not find any ride prices for the given locations'
            });
        }
        
        console.log('Prices fetched successfully:', prices);
        res.json(prices);
    } catch (error) {
        console.error('Error in /api/prices:', error);
        res.status(500).json({ 
            error: 'Failed to fetch ride prices',
            message: error.message || 'An unexpected error occurred while fetching prices'
        });
    }
});

module.exports = router;

// Example usage:
// GET /api/prices?source=Mumbai Central&destination=Bandra West 