const express = require('express');
const router = express.Router();
const RideScraper = require('../scrapers/rideScraper');

const scraper = new RideScraper();

router.get('/prices', async (req, res) => {
    try {
        const { source, destination } = req.query;
        
        if (!source || !destination) {
            return res.status(400).json({ 
                error: 'Source and destination are required' 
            });
        }

        console.log('Received request for prices:', { source, destination });
        const prices = await scraper.getAllPrices(source, destination);
        console.log('Prices fetched successfully:', prices);
        
        res.json(prices);
    } catch (error) {
        console.error('Error in /api/prices:', error);
        res.status(500).json({ 
            error: error.message || 'Failed to fetch ride prices' 
        });
    }
});

module.exports = router;

// Example usage:
// GET /api/prices?source=Mumbai Central&destination=Bandra West 