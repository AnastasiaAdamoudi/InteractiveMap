import { userModel } from "../models/models.js";

export const editProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { userFirstname, userSurname, username, userEmail } = req.body;

    console. log("User details from the request body:", req.body);
    console.log("User ID from the request:", userId);

    // Find the user by ID and update the details
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { userFirstname, userSurname, username, userEmail },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    console.log("User details updated:", updatedUser);
    
    return res.status(200).json({ status: "success", message: "User details updated", updatedUser });
  } catch (error) {
    console.error("Error updating user details:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};