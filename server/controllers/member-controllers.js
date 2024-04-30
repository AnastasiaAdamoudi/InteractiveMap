import { memberModel, beaconModel } from "../models/models.js";

export async function joinBeacon(req, res) {
  const { memberName, memberEmail } = req.body;
  const { beaconId } = req.params;

  try {
    // Check if all required fields are present
    if (!memberName || !memberEmail || !beaconId) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields are required" });
    }

    // Check if the beacon exists
    const existingBeacon = await beaconModel.findOne({ _id: beaconId });
    if (!existingBeacon) {
      return res
        .status(404)
        .json({ status: "error", message: "Beacon not found" });
    }

      // Check if the member already exists for this beacon
      const existingMember = await memberModel.findOne({
        memberName,
        memberEmail,
        beacon: beaconId,
      });
      if (existingMember) {
        return res.status(400).json({
          status: "error",
          message: "Member already exists for this beacon.",
    })
}

    // Create new member
    const memberData = await memberModel.create({
      memberName,
      memberEmail,
      beacon: beaconId,
    });

    // Update the beacon with the new member
    existingBeacon.members.push(memberData._id);
    await existingBeacon.save();

    res.status(201).json({ status: "success", data: memberData });

  } catch (error) {
    // Handle specific types of errors
    if (error.name === "ValidationError") {
      // Mongoose validation error
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ status: "error", message: errors });
    } else {
      // Generic server error
      console.error("Error joining beacon:", error);
      return res
        .status(500)
        .json({ status: "error", message: "Failed to join beacon" });
    }
  }
}

export async function getMembersByBeacon(req, res) {
  const { beaconId } = req.params;

  try {
    // Check if the beacon exists
    const existingBeacon = await beaconModel.findById(beaconId);
    if (!existingBeacon) {
      return res.status(404).json({ status: "error", message: "Beacon not found" });
    }

    // Get all members of the beacon
    const membersData = await memberModel.find({ beacon: beaconId });
    res.status(200).json(membersData);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function getBeaconsByMember(req, res) {
  const { memberId } = req.params;

  try {
    // Check if the member exists
    const existingMember = await memberModel.findById(memberId);
    if (!existingMember) {
      return res.status(404).json({ status: "error", message: "Member not found" });
    }

    // Get all beacons associated with the member
    const beaconsData = await beaconModel.find({ members: memberId });
    res.status(200).json(beaconsData);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function getAllMembers(req, res) {
  try {
    const membersData = await memberModel.find();
    res.status(200).json(membersData);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}
