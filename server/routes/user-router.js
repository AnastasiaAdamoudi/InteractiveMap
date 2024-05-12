import express from 'express';
import * as userControllers from "../controllers/user-controllers.js"
import { authenticateUser } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// Authentication routes
userRouter.post('/register', userControllers.registerUser);
userRouter.post('/login', userControllers.loginUser);
userRouter.post('/logout', authenticateUser, userControllers.logoutUser);

// User routes
userRouter.post('/beacons/:beaconId/join', authenticateUser, userControllers.joinBeacon);
userRouter.delete('/beacons/:beaconId/unjoin', authenticateUser, userControllers.unjoinBeacon);
userRouter.put('/users/:userId', authenticateUser, userControllers.updateUserProfile);
userRouter.delete('/users/:userId', authenticateUser, userControllers.deleteUserAccount);
userRouter.get('/beacons/:beaconId/users', authenticateUser, userControllers.getMembersByBeacon);
userRouter.get('/users/:userId/beacons', authenticateUser, userControllers.getBeaconsByUser);
userRouter.get('/users', userControllers.getAllUsers);

export { userRouter };