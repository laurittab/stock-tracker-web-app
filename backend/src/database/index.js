import mongoose from "mongoose";
const db = mongoose
  .connect("mongodb://127.0.0.1:27017/stock_app")
  .then(() => console.log("Connected to stock-app database"))
  .catch((error) => console.log("Error connecting to database:", error));

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userId: String,
    email: { type: String, lowercase: true },
    password: String,
  },
  { timestamps: true }
);
const stockSchema = new Schema(
  {
    symbol: { type: String, lowercase: true },
    comments: String,
    target_price: Number,
    bottom_price: Number,
  },
  { timestamps: true }
);

const overviewSchema = new Schema(
  {
    symbol: { type: String, lowercase: true }, // String is shorthand for {type: String}
    fundamentals: Object,
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);
export const Stock = mongoose.model("Stock", stockSchema);
export const Overview = mongoose.model("Overview", overviewSchema);
//await Stock.findByIdAndDelete("659ee5c2d3480e8eb990a8e8");
//const { symbol } = Stock.symbol;

export const symbols = await Stock.distinct("symbol"); //find all symbols
export default db;

//const peak = await Overview.findOne({ symbol: "ttdd" }).exec();
//const peak = await Stock.findById("65a9ae6526c171b3ddaf8113").exec();
//const peak = await Overview.findOne({ symbol: "ai" }).exec();
//const peak = await Overview.findByIdAndDelete(
//  "659d5a12139d41202f78eb76"
//).exec();
//console.log("peak", peak);
