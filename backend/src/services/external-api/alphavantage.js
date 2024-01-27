import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const companyOverviewService = async (symbol) => {
  const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;
  const res = axios.get(url);
  console.log(
    "services-external-api-aphavantage-companyOverviewService-data",
    res
  );
  return res;
};
