import express from "express";
import {
  getHomeController,
  createRideController,
  getRidesController,
  getRidesControllerWithId,
  getRideWithIdController
} from "../controllers/rideController.js";

const router = express.Router();

router.get("/", getHomeController);
router.get("/getRides/:id", getRidesControllerWithId);
router.get("/getRides", getRidesController);
router.get("/getRideWithId/:id", getRideWithIdController);
router.post("/createRide", createRideController);

export { router };
