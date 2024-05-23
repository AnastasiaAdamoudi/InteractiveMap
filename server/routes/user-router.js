import express from 'express';
import * as userControllers from "../controllers/user-controllers.js"
import { authenticateUser } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// User routes
userRouter.post('/beacons/:beaconId/join', authenticateUser, userControllers.joinBeacon);
userRouter.delete('/beacons/:beaconId/unjoin', authenticateUser, userControllers.unjoinBeacon);
userRouter.get('/beacons/:beaconId/users', authenticateUser, userControllers.getMembersByBeacon);
userRouter.get('/users/:userId/beacons', authenticateUser, userControllers.getBeaconsByUser);
userRouter.get('/users', userControllers.getAllUsers);

export { userRouter };