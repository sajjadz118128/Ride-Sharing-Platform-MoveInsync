import { Ride } from "../models/models.js";

const getHomeController = (req, res) => {
  res.status(200).send("Hello from home route");
};

const createRideController = async (req, res) => {
  const {
    tripId,
    customerId,
    driverName,
    driverPhoneNumber,
    cabNumber,
    startLatitude,
    startLongitude,
    endLatitude,
    endLongitude,
    isActive,
  } = req.body;
  const newRide = new Ride({
    currentLatitude: startLatitude,
    currentLongitude: startLongitude,
    tripId,
    driverName,
    driverPhoneNumber,
    cabNumber,
    startLatitude,
    startLongitude,
    endLatitude,
    endLongitude,
    customerId,
    isActive,
  });
  await newRide.save();
  res.json(newRide);
};

const getRidesController = async (req, res) => {
  const allRides = await Ride.find({});

  res.json(allRides);
};

const getRidesControllerWithId = async (req, res) => {
  const allRidesOfCustomer = await Ride.find({customerId : req.params.id});

  res.json(allRidesOfCustomer);
};

const getRideWithIdController = async (req, res) => {
  const rideId = req.params.id;

  const rideWithGivenId = await Ride.find({ tripId: rideId }).exec();
  res.json(rideWithGivenId);
};

const change = 0.00002;

const automaticupdate = async (req, res) => {
  const rideId = req.params.id;
  setInterval(() => {
    Ride.findOneAndUpdate(
      { tripId: rideId },
      { $inc: { currentLatitude: change, currentLongitude: change } },
      { new: true }
    )
      .exec()
      .catch((err) => {
        console.log(err);
      });
  }, 2000);
};

export {
  getHomeController,
  createRideController,
  getRidesController, getRidesControllerWithId,
  getRideWithIdController,
};
