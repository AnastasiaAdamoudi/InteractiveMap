import express from 'express';
import * as memberControllers from "../controllers/member-controllers.js"

const memberRouter = express.Router();

memberRouter.post('/join', memberControllers.joinBeacon);
memberRouter.get('/:beaconId', memberControllers.getMembersByBeacon);
memberRouter.get('/', memberControllers.getAllMembers);

export { memberRouter };