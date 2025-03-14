// models/RideProvider.js
const rideProviderSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // e.g., "Uber", "Ola", "Rapido"
    logo: { type: String }, // URL to the logo image
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
  });
  
  const RideProvider = mongoose.model('RideProvider', rideProviderSchema);