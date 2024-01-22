import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userId: String,
    email: { type: String, lowercase: true },
    password: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
