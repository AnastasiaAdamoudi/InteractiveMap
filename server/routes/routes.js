import express from 'express';
import * as beaconsControllers from "../controllers/beacons-controllers.js"

const beaconsRouter = express.Router();

beaconsRouter.get('/', controllers.getAllBeacons);
beaconsRouter.post('/', controllers.addBeaconController);

export { beaconsRouter };