import express from 'express';
import * as beaconsControllers from "../controllers/beacons-controllers.js"

const beaconsRouter = express.Router();

beaconsRouter.get('/', beaconsControllers.getAllBeacons);
beaconsRouter.post('/', beaconsControllers.addBeaconController);

export { beaconsRouter };