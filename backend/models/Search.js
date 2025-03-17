// models/Search.js
const searchSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pickupLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
    dropoffLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
    distance: { type: Number }, // in kilometers
    timestamp: { type: Date, default: Date.now }
  });
  
  const Search = mongoose.model('Search', searchSchema);