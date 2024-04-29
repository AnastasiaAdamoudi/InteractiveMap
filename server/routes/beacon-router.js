import express from 'express';
import * as beaconControllers from "../controllers/beacon-controllers.js"

const beaconsRouter = express.Router();

beaconRouter.post('/', beaconControllers.addBeacon);
beaconRouter.get('/', beaconControllers.getAllBeacons);

export { beaconRouter };