import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/models.js";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

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
