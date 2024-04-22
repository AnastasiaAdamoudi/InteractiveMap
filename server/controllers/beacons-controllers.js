import { BeaconModel } from "../models/models.js";

export async function addBeacon(req, res) {
  const { creatorName, creatorEmail, beaconName, beaconLocation, beaconLatitude, beaconLongitude, beaconDescription } = req.body;

  if (!creatorName || !creatorEmail || !beaconName || !beaconLocation || !beaconLatitude || !beaconLongitude || !beaconDescription) {
    return res.status(400).json({ status: "error", message: "All fields are required" });
  }

  try {
    const beaconsData = await BeaconModel.create(req.body);
    res.status(201).json({ status: "success", data: beaconsData });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
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
