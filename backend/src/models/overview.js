import mongoose, { Schema } from "mongoose";

const overviewSchema = new Schema(
  {
    symbol: { type: String, lowercase: true }, // String is shorthand for {type: String}
    fundamentals: Object,
  },
  { timestamps: true }
);

const Overview = mongoose.model("Overview", overviewSchema);
export default Overview;
