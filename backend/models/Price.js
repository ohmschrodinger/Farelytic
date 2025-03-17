// models/RidePrice.js
const ridePriceSchema = new mongoose.Schema({
    search: { type: mongoose.Schema.Types.ObjectId, ref: 'Search', required: true },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'RideProvider', required: true },
    rideType: { type: mongoose.Schema.Types.ObjectId, ref: 'RideType', required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    estimatedTime: { type: Number }, // in minutes
    discount: { type: Number, default: 0 }, // discount amount
    finalPrice: { type: Number }, // after discount
    timestamp: { type: Date, default: Date.now }
  });

  const RidePrice = mongoose.model('RidePrice', ridePriceSchema);

  