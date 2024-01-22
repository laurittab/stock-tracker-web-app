import axios from "axios";
import dotenv from "dotenv";
import Overview from "../models/overview.js";

dotenv.config();

//console.log("symbols", symbols);
//console.log(String(symbols));

const getFundamentals = async (symbol) => {
  try {
    const checkFundamentals = await Overview.findOne({ symbol: symbol }).exec();
    if (checkFundamentals) {
      console.log("getFundamentals - fundamentals already exist");
      return true;
    }
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;
    const { data } = await axios.get(url);
    if (!Object.keys(data).length) {
      return false;
    }
    let newOverview = Overview({
      symbol: symbol,
      fundamentals: data,
    });
    const saved = await newOverview.save();
    console.log("saved", saved);
    return true;
    // }
  } catch (error) {
    console.log(error);
  }
};
export default getFundamentals;
