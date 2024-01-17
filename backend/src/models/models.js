import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  tripId: {
    type: String,
    required: true,
    unique: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  driverName: {
    type: String,
    required: true,
  },
  driverPhoneNumber: {
    type: String,
    required: true,
  },
  cabNumber: {
    type: String,
    required: true,
  },
  startLatitude: {
    type: Number,
    required: true,
  },
  startLongitude: {
    type: Number,
    required: true,
  },
  endLatitude: {
    type: Number,
    required: true,
  },
  endLongitude: {
    type: Number,
    required: true,
  },
  currentLatitude: {
    type: Number,
  },
  currentLongitude: {
    type: Number,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

const Ride = mongoose.model("Ride", rideSchema);

export { Ride };
