import Stock from "../models/stock.js";
import Overview from "../models/overview.js";
const compileStocksData = async () => {
  const stockData = [];
  try {
    const stocks = await Stock.find({}).exec();
    //console.log("stocks", stocks);
    for (const stock of stocks) {
      const compiledStock = {};
      const { id, symbol, comments, target_price, bottom_price } = stock;
      //console.log("symbol", symbol);
      const data = await Overview.find({
        symbol: symbol,
      }).exec();
      const {
        fundamentals: {
          Name,
          Currency,
          Description,
          DividendYield,
          PEGRatio,
          EPS,
        },
        createdAt,
      } = data[0];
      compiledStock.id = id;
      compiledStock.symbol = symbol;
      compiledStock["name"] = Name;
      compiledStock["currency"] = Currency;
      compiledStock["description"] = Description;
      compiledStock.comments = comments;
      compiledStock["dividend"] = DividendYield;
      compiledStock["peg"] = PEGRatio;
      compiledStock["eps"] = EPS;
      compiledStock.target_price = target_price;
      compiledStock.bottom_price = bottom_price;
      compiledStock["createdAt"] = createdAt;
      stockData.push(compiledStock);
    }
    //console.log("stockData", stockData);
    return stockData;
  } catch (error) {
    console.log("error compiling stock data", error);
  }
};

export default compileStocksData;
