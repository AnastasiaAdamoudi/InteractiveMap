import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { userModel } from "../models/models.js";
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

    // Save the user data to a cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(Date.now() + 3600000), // 1 hour expiration
      });
      res.cookie('userData', JSON.stringify({
        userId: savedUser._id,
        userFirstname: savedUser.userFirstname,
        userSurname: savedUser.userSurname,
        username: savedUser.username,
        userEmail: savedUser.userEmail,
      }), {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(Date.now() + 3600000), // 1 hour expiration
      });

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

    // Check if all required fields are present
    if (!username || !password) {
      return res
        .status(400)
        .json({
          status: "error",
          message: "Username and password are required",
        });
    }

    // Check if the user exists
    const user = await userModel.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found." });
    }

    console.log("User found:", user);

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid password." });
    }

    console.log("Password is valid");

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    }); // 1 hour expiration time for jwt token

    console.log("Token for the logged in user generated:", token);

    const userData = {
      userId: user._id,
      userFirstname: user.userFirstname,
      userSurname: user.userSurname,
      username: user.username,
      userEmail: user.userEmail,
    };

    console.log('UserData to set in cookie:', userData);

    // Set the token and user data as cookies
    res.cookie('token', token, {
        httpOnly: false,
        secure: true,
        sameSite: 'strict',
        expires: new Date(Date.now() + 3600000), // 1 hour expiration
      });

      res.cookie('userData', JSON.stringify(userData), {
        httpOnly: false,
        secure: true,
        sameSite: 'strict',
        expires: new Date(Date.now() + 3600000), // 1 hour expiration
      });

      console.log('Response headers after setting cookies:', res.getHeaders());

    // Return a success response
    res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
      userData,
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
        // Clear the cookies
        res.clearCookie('token');
        res.clearCookie('userData');

    // Return a success response
    res
      .status(200)
      .json({ status: "success", message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export const forgotPassword = async (req, res) => {
    try {
        const { userEmail } = req.body;
    
        // Check if the email exists
        const user = await userModel.findOne({
            userEmail,
            });

        if (!user) {
            return res
            .status(404)
            .json({ status: "error", message: "User not found." });
        }

        console.log("User found:", user);

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
            expiresIn: "1h",
        }); // 1 hour expiration time for jwt token

        console.log("Token for the user generated:", token);

        // Send an email to the user with the token
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: "Password Reset",
            text: `Click <a href="http://localhost:3000/reset-password/${token}">here</a> to reset your password.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                res.status(500).json({ status: "error", message: "Internal server error" });
            } else {
                console.log("Email sent: " + info.response);
                res.status(200).json({ status: "success", message: "Email sent successfully" });
            }
        });

    }
    catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};