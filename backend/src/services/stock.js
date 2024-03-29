import Stock from "../models/stock.js";
import Overview from "../models/overview.js";
import { companyOverviewService } from "./external-api/alphavantage.js";

export const removeStock = async (id) => {
  return Stock.findByIdAndDelete(id);
};
export const createStock = async (stock) => {
  const newStock = Stock(stock);
  return newStock.save();
};
export const editStock = async (id, stock) => {
  return Stock.findByIdAndUpdate(id, stock, {
    returnDocument: "after",
  }).exec();
};

export const compileStocksData = async () => {
  const stockData = [];
  try {
    const stocks = await Stock.find({}).exec();
    for (const stock of stocks) {
      const { id, symbol, comments, target_price, bottom_price } = stock;
      const [
        {
          fundamentals: {
            Name,
            Currency,
            Description,
            DividendYield,
            PEGRatio,
            EPS,
          },
          createdAt,
        },
      ] = await Overview.find({
        symbol: symbol,
      }).exec();

      const compiledStock = {
        id: id,
        symbol: symbol,
        name: Name,
        currency: Currency,
        description: Description,
        comments: comments,
        dividend: DividendYield,
        peg: PEGRatio,
        eps: EPS,
        target_price: target_price,
        bottom_price: bottom_price,
        createdAt: createdAt,
      };
      stockData.push(compiledStock);
    }
    //console.log("stockData", stockData);
    return stockData;
  } catch (error) {
    console.log("error compiling stock data", error);
  }
};

export const getFundamentals = async (symbol) => {
  try {
    const checkFundamentals = await Overview.findOne({ symbol: symbol }).exec();
    if (checkFundamentals) {
      console.log("getFundamentals - fundamentals already exist");
      return true;
    }
    const { data } = await companyOverviewService(symbol);
    console.log("services-getFundamentals-data", data);

    if (!Object.keys(data).length) {
      return false;
    }
    const newOverview = Overview({
      symbol: symbol,
      fundamentals: data,
    });
    const saved = await newOverview.save();
    console.log("services-stock-getFundamentals-saved", saved);
    return true;
  } catch (error) {
    console.log(error);
  }
};
