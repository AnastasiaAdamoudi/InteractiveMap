import { userModel, beaconModel } from "../models/models.js";

export async function addBeacon(req, res) {
  const { creatorName, creatorEmail, beaconName, beaconLocation, beaconLatitude, beaconLongitude, beaconDescription } = req.body;

  try {
    // Check if all required fields are present
    if (!creatorName || !creatorEmail || !beaconName || !beaconLocation || !beaconLatitude || !beaconLongitude || !beaconDescription) {
      return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    // Check if latitude and longitude are within valid ranges
    if (beaconLatitude < -90 || beaconLatitude > 90 || beaconLongitude < -180 || beaconLongitude > 180) {
      return res.status(400).json({ status: "error", message: "Latitude must be between -90 and 90, and longitude must be between -180 and 180" });
    }

    // Check if the same pair of latitude and longitude already exists
    const existingBeacon = await beaconModel.findOne({ beaconLatitude, beaconLongitude });

    let newLatitude = beaconLatitude;
    let newLongitude = beaconLongitude;

    if (existingBeacon) {
      newLatitude = beaconLatitude + 0.001;
      newLongitude = beaconLongitude + 0.001;
    };      

    // Create new beacon
    const beaconsData = await beaconModel.create({
      creatorName,
      creatorEmail,
      beaconName,
      beaconLocation,
      beaconLatitude: newLatitude,
      beaconLongitude: newLongitude,
      beaconDescription
    });

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


// export async function getAllBeacons(req, res) {
//   try {
//     const beaconsData = await beaconModel.find();
//     res.status(200).json(beaconsData);
//   } catch (error) {
//     res.status(500).json({ status: "error", message: error.message });
//   }
// }

export async function getAllBeacons(req, res) {
  try {
    const beaconsData = await beaconModel.find().populate({
      path: 'members',
      select: 'userName userEmail',
    });
    res.status(200).json(beaconsData);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}
