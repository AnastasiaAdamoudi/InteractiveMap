import express from 'express';
import * as beaconControllers from "../controllers/beacon-controllers.js"

const beaconRouter = express.Router();

beaconRouter.post('/beacons', beaconControllers.addBeacon);
beaconRouter.get('/beacons', beaconControllers.getAllBeacons);

export { beaconRouter };