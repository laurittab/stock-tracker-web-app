import axios from "axios";
import dotenv from "dotenv";
import { symbols, Overview } from "../database/index.js";

dotenv.config();

console.log("symbols", symbols);
console.log(String(symbols));

const getFundamentals = async (tickers) => {
  for (const symbol of tickers) {
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;
    const { data } = await axios.get(url);
    let newOverview = Overview({
      symbol: symbol,
      fundamentals: data,
    });
    const saved = await newOverview.save();
    console.log("saved", saved);
  }
};
//await getFundamentals(symbols);
