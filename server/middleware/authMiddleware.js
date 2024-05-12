import jwt from "jsonwebtoken";
import { userModel } from "../models/models.js";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export const authenticateUser = async (req, res, next) => {
    try {
      // Get the Authorization header from the request object
      const authorizationHeader = req.headers.authorization;
  
      if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ status: "error", message: "Invalid authorization header" });
      }
  
      console.log("Authorization header:", req.headers.authorization);
  
      // Split the Authorization header to get the token
      const token = req.headers.authorization.split(" ")[1];
  
      console.log("Token:", token);
  
      // Verify the token
      let decodedToken;
      try {
        decodedToken = jwt.verify(token, SECRET_KEY);
  
        console.log("Decoded token:", decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
        return res
          .status(401)
          .json({ status: "error", message: "Invalid token" });
      }
  
      // Log the decoded token for debugging
      console.log("Decoded token:", decodedToken);
  
      // Find the user by the userId in the decoded token
      const user = await userModel.findById(decodedToken.userId);
  
      // If user not found
      if (!user) {
        return res
          .status(401)
          .json({
            status: "error",
            message: "There is no user with this access token",
          });
      }
  
      // Attach the user to the request object
      req.user = user; // This will be used by other middleware functions to perform actions on behalf of the user
  
      // Call the next middleware function
      next(); // This will call the next middleware function in the chain
  
      res
        .status(200)
        .json({ status: "success", message: "User authenticated successfully" });
    } catch (error) {
      console.error("Error authenticating user:", error);
      res.status(401).json({ status: "error", message: "Invalid token" });
    }
  };