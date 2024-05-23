import express from 'express';
import * as profileControllers from "../controllers/profile-controllers.js"
import { authenticateUser, verifyPassword } from "../middleware/authMiddleware.js";

const profileRouter = express.Router();

// Profile routes
profileRouter.put('/edit-profile', authenticateUser, verifyPassword, profileControllers.editProfile);
profileRouter.delete('/delete-profile', authenticateUser, verifyPassword, profileControllers.deleteProfile);

export { profileRouter };