import mongoose from "mongoose";
const db = mongoose
  .connect("mongodb://127.0.0.1:27017/stock_app")
  .then(() => console.log("Connected to stock-app database"))
  .catch((error) => console.log("Error connecting to database:", error));

const { Schema } = mongoose;

const stockSchema = new Schema(
  {
    symbol: String, // String is shorthand for {type: String}
    comments: String,
    target_price: Number,
    bottom_price: Number,
  },
  { timestamps: true }
);

const overviewSchema = new Schema(
  {
    symbol: String, // String is shorthand for {type: String}
    fundamentals: Object,
  },
  { timestamps: true }
);
export const Stock = mongoose.model("Stock", stockSchema);
export const Overview = mongoose.model("Overview", overviewSchema);
//await Stock.findByIdAndDelete("659ee5c2d3480e8eb990a8e8");
//const { symbol } = Stock.symbol;

export const symbols = await Stock.distinct("symbol"); //find all symbols
export default db;

//const peak = await Stock.find({});
//const peak = await Stock.findById("659d343fe6157a4e35522466").exec();
//const peak = await Overview.findOne({ symbol: "ai" }).exec();
//const peak = await Stock.findByIdAndDelete("659fc976dbb86bcce82b3318").exec();
//console.log("peak", peak);