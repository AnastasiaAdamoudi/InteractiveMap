import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { beaconRouter, authRouter, userRouter, profileRouter } from "./routes/routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT;
const mongoUri = process.env.MONGO_URI;

app.use(express.json());
// app.use(cors());
// app.use(cors({
//   origin: 'https://www.lightabeacon.com/'
// }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Include cookies in CORS requests
}));
app.use(cookieParser());

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/", beaconRouter);
app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", profileRouter);
