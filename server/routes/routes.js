import express from 'express';
import * as beaconsControllers from "../controllers/beacons-controllers.js"

const beaconsRouter = express.Router();

beaconsRouter.post('/', beaconsControllers.addBeacon);
beaconsRouter.get('/', beaconsControllers.getAllBeacons);

export { beaconsRouter };