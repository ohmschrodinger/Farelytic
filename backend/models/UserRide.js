// models/UserRide.js - for tracking user's selected/booked rides
const userRideSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    search: { type: mongoose.Schema.Types.ObjectId, ref: 'Search', required: true },
    ridePrice: { type: mongoose.Schema.Types.ObjectId, ref: 'RidePrice', required: true },
    status: { 
      type: String, 
      enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
      default: 'pending'
    },
    bookingId: { type: String }, // external booking ID from the provider
    feedback: { type: Number }, // rating 1-5
    feedbackText: { type: String }, // user comments
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  // Pre-save middleware to update timestamps
  userRideSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
  
  const UserRide = mongoose.model('UserRide', userRideSchema);
  
  module.exports = {
    User,
    Location,
    Search,
    RideProvider,
    RideType,
    RidePrice,
    UserRide
  };