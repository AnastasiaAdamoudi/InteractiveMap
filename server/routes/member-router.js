import express from 'express';
import * as memberControllers from "../controllers/member-controllers.js"

const memberRouter = express.Router();

memberRouter.post('/:beaconId/join', memberControllers.joinBeacon);
memberRouter.get('/:beaconId', memberControllers.getMembersByBeacon);
memberRouter.get('/:memberId', memberControllers.getBeaconsByMember);
memberRouter.get('/', memberControllers.getAllMembers);

export { memberRouter };