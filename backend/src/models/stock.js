import mongoose, { Schema } from "mongoose";

const stockSchema = new Schema(
  {
    symbol: { type: String, lowercase: true },
    comments: String,
    target_price: Number,
    bottom_price: Number,
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);
export default Stock;
