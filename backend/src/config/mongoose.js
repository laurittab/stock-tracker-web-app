import dotenv from "dotenv";
import mongoose from "mongoose";
import Database from "./database.js";

dotenv.config();

const mongodb = mongoose
  .connect(
    `${Database.dialect}://${Database.host}:${Database.port}/${Database.database}`
  )
  .then(() => console.log("Connected to stock-app database"))
  .catch((error) => console.log("Error connecting to database:", error));

export const { Schema } = mongoose;
export default mongodb;
