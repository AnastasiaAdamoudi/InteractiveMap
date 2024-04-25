import { BeaconModel } from "../models/models.js";

export async function addBeacon(req, res) {
  const { creatorName, creatorEmail, beaconName, beaconLocation, beaconLatitude, beaconLongitude, beaconDescription } = req.body;

  try {
    // Check if all required fields are present
    if (!creatorName || !creatorEmail || !beaconName || !beaconLocation || !beaconLatitude || !beaconLongitude || !beaconDescription) {
      return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    // Create new beacon
    const beaconsData = await BeaconModel.create(req.body);
    res.status(201).json({ status: "success", data: beaconsData });
  } catch (error) {
    // Handle specific types of errors
    if (error.name === 'ValidationError') {
      // Mongoose validation error
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ status: "error", message: errors });
    } else {
      // Generic server error
      console.error('Error adding beacon:', error);
      return res.status(500).json({ status: "error", message: "Failed to add beacon" });
    }
  }
}


export async function getAllBeacons(req, res) {
  try {
    const beaconsData = await BeaconModel.find();
    res.status(200).json(beaconsData);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}
