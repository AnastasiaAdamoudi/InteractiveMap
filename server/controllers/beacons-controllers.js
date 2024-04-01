import { BeaconModel } from "../models/models.js";

export async function addBeacon(req, res) {
  const newBeacon = req.body;
  try {
    const beaconsData = await BeaconModel.create(newBeacon);
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
