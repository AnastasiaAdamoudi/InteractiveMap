import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { beaconRouter, userRouter } from "./routes/routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;
const mongoUri = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());
// app.use(cors({
//   origin: 'https://www.lightabeacon.com/'
// }));

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
app.use("/", userRouter);
