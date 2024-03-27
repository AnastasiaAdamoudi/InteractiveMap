import { BeaconsModel } from "../models/models.js";

export async function addBeaconController(req, res) {
  const newBeacon = req.body;
  try {
    const beaconsData = await BeaconsModel.create(newBeacon);
    res.status(201).json({ status: "success", data: beaconsData });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function getAllBeacons(req, res) {
  try {
    const beaconsData = await BeaconsModel.find();
    res.status(200).json(beaconsData);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}
