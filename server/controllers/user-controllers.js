import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { beaconModel, userModel } from "../models/models.js";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {

  try {
    const { userFirstname, userSurname, username, password, userEmail } =
      req.body;

    // Check if all required fields are present
    if (
      !userFirstname ||
      !userSurname ||
      !username ||
      !password ||
      !userEmail
    ) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields are required" });
    }

    // Check if the username or email already exists
    const existingUser = await userModel.findOne({
      $or: [{ username }, { userEmail }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ status: "error", message: "Username or email already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log("Hashed password:", hashedPassword);

    // Create a new user
    const newUser = new userModel({
      userFirstname,
      userSurname,
      username,
      password: hashedPassword,
      userEmail,
    });

    console.log("New user:", newUser);

    // Save the new user to the database
    const savedUser = await newUser.save();

    console.log("User saved to the database:", savedUser);

    // Return a success response
    res.status(201).json({ status: "success", message: "User registered successfully", user: savedUser, });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  console.log('Login request received');
  console.log('Request body:', req.body);
  try {
    const { username, password } = req.body;

    console.log("Username from req.body:", username);
    console.log("Password from req.body:", password);

    // Check if all required fields are present
    if (!username || !password) {
      return res
        .status(400)
        .json({
          status: "error",
          message: "Username and password are required",
        });
    }

    console.log("Username and password are present");

    // Check if the user exists
    const user = await userModel.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid username" });
    }

    console.log("User found:", user);

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid password" });
    }

    console.log("Password is valid");

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    }); // 1 hour expiration time for jwt token

    console.log("Token for the logged in user generated:", token);

    // // Attach the token to a cookie
    // res.cookie('token', token, { httpOnly: true });

    // Return a success response
    res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
      user: {
        userId: user._id,
        userFirstname: user.userFirstname,
        userSurname: user.userSurname,
        username: user.username,
        userEmail: user.userEmail,
      },
    });

    console.log("Login successful");
    console.log(`User data: ${user}`);

  } catch (error) {
    next(error);
    console.error("Error logging in user:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    // Clear the token from the client-side
    res.clearCookie("token");

    // Return a success response
    res
      .status(200)
      .json({ status: "success", message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export async function joinBeacon(req, res) {
  const { beaconId } = req.params;
  const userId = req.user._id; // Assuming the authenticated user is attached to req.user by the middleware

  try {
    // Check if the beacon exists
    const existingBeacon = await beaconModel.findOne({ _id: beaconId });
    if (!existingBeacon) {
      return res
        .status(404)
        .json({ status: "error", message: "Beacon not found" });
    }

    // Check if the user is already joined to this beacon
    const existingUser = await userModel.findOne({
      _id: userId,
      beacon: beaconId,
    });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "User already joined this beacon.",
      });
    }

    // Update the user with the beacon reference
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { beacon: beaconId } },
      { new: true }
    );

    // Update the beacon with the new user
    existingBeacon.members.push(userId);
    await existingBeacon.save();

    res.status(201).json({
      status: "success",
      message: "User joined the beacon successfully.",
      data: updatedUser,
    });
  } catch (error) {
    // Handle errors
    console.error("Error joining beacon:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to join beacon" });
  }
}

export async function unjoinBeacon(req, res) {
  const { beaconId } = req.params;
  const userId = req.user._id; // Assuming the authenticated user is attached to req.user by the middleware

  try {
    // Check if the beacon exists
    const existingBeacon = await beaconModel.findById(beaconId);
    if (!existingBeacon) {
      return res
        .status(404)
        .json({ status: "error", message: "Beacon not found" });
    }

    // Check if the user has joined the beacon
    const existingUser = await userModel.findOne({
      _id: userId,
      beacon: beaconId,
    });
    if (!existingUser) {
      return res.status(400).json({
        status: "error",
        message: "User has not joined this beacon.",
      });
    }

    // Remove the beacon from the user's document
    await userModel.findByIdAndUpdate(userId, {
      $pull: { beacon: beaconId },
    });

    // Remove the user from the beacon's members array
    existingBeacon.members = existingBeacon.members.filter(
      (user) => user.toString() !== userId.toString()
    );
    await existingBeacon.save();

    res
      .status(200)
      .json({
        status: "success",
        message: "User unjoined the beacon successfully",
      });
  } catch (error) {
    console.error("Error unjoining beacon:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to unjoin beacon" });
  }
}

export async function updateUserProfile(req, res) {
  const userId = req.user._id;

  try {
    // Check if the user exists
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    // Check if the new username or email already exists for another user
    const existingUsernameOrEmail = await userModel.findOne({
      $and: [
        { _id: { $ne: userId } },
        {
          $or: [
            { username: req.body.username },
            { userEmail: req.body.userEmail },
          ],
        },
      ],
    });

    if (existingUsernameOrEmail) {
      return res
        .status(409)
        .json({ status: "error", message: "Username or email already exists" });
    }

    // Update the user document
    existingUser.userFirstname =
      req.body.userFirstname || existingUser.userFirstname;
    existingUser.userSurname = req.body.userSurname || existingUser.userSurname;
    existingUser.username = req.body.username || existingUser.username;
    existingUser.userEmail = req.body.userEmail || existingUser.userEmail;

    const updatedUser = await existingUser.save();

    res.status(200).json({ status: "success", data: updatedUser });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to update user profile" });
  }
}

export async function deleteUserAccount(req, res) {
  const userId = req.user._id;

  try {
    // Check if the user exists
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    // Get all beacons the user has joined
    const joinedBeacons = await beaconModel.find({ members: userId });

    // Remove the user from all joined beacons
    for (const beacon of joinedBeacons) {
      beacon.members = beacon.members.filter(
        (user) => user.toString() !== userId.toString()
      );
      await beacon.save();
    }

    // Remove the user's beacon references
    await userModel.findByIdAndUpdate(userId, { $set: { beacon: [] } });

    // Delete the user document
    await userModel.findByIdAndDelete(userId);

    res
      .status(200)
      .json({
        status: "success",
        message: "User account deleted successfully",
      });
  } catch (error) {
    console.error("Error deleting user account:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to delete user account" });
  }
}

export async function getMembersByBeacon(req, res) {
  const { beaconId } = req.params;

  try {
    // Check if the beacon exists
    const existingBeacon = await beaconModel
      .findById(beaconId)
      .populate("members");
    if (!existingBeacon) {
      return res
        .status(404)
        .json({ status: "error", message: "Beacon not found" });
    }

    // Get all members of the beacon with populated details
    const membersData = existingBeacon.members;
    res.status(200).json(membersData);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function getBeaconsByUser(req, res) {
  const { userId } = req.params;

  try {
    // Check if the user exists
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    // Get all beacons associated with the user
    const beaconsData = await beaconModel.find({ members: userId });
    res.status(200).json(beaconsData);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function getAllUsers(req, res) {
  try {
    const usersData = await userModel.find();
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}
