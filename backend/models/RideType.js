// models/RideType.js
const rideTypeSchema = new mongoose.Schema({
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'RideProvider', required: true },
    name: { type: String, required: true }, // e.g., "UberX", "OlaMini", "Rapido Bike"
    description: { type: String },
    capacity: { type: Number }, // number of passengers
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
  });


  const RideType = mongoose.model('RideType', rideTypeSchema);
  