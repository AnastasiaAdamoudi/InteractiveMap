import express from 'express';
import * as authControllers from "../controllers/auth-controllers.js"
import { authenticateUser } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

// Authentication routes
authRouter.post('/register', authControllers.registerUser);
authRouter.post('/login', authControllers.loginUser);
authRouter.post('/logout', authenticateUser, authControllers.logoutUser);
authRouter.post('/forgot-password', authControllers.forgotPassword);

export { authRouter };