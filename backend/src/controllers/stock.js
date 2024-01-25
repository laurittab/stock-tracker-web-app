import * as StockService from "../services/stock.js";
export const getStocks = async (req, res, next) => {
  try {
    const stocks = await StockService.compileStocksData(); //Overview.find({}).exec(); //compileStocksData();
    res.status(200).send({
      stocks: stocks,
      message: `${stocks.length} stocks retrieved`,
      color: "teal",
    });
  } catch (error) {
    console.log(error);
  }
};
export const addStock = async (req, res, next) => {
  const { symbol, comments, target_price, bottom_price } = req.body;
  let stocks;
  try {
    let fundamentals = await StockService.getFundamentals(symbol);
    if (!fundamentals) {
      stocks = await StockService.compileStocksData();
      return res.status(200).send({
        stocks: stocks,
        message: `${symbol} has not been saved, as there's not enough data available for this stock`,
        color: "red",
      });
    }
    const saved = await StockService.createStock({
      symbol,
      comments,
      target_price,
      bottom_price,
    });
    console.log("controllers-stock-addStock-saved", saved);
    stocks = await StockService.compileStocksData();
    res.status(200).send({
      stocks: stocks,
      message: `stock ${symbol} with ID ${saved.id} has been added`,
      color: "teal",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const updateStock = async (req, res, next) => {
  const { id, symbol, comments, target_price, bottom_price } = req.body;
  try {
    const data = await StockService.editStock(id, {
      symbol,
      comments,
      target_price,
      bottom_price,
    });
    console.log("controllers-stock-updateStock-data", data);
    const stocks = await StockService.compileStocksData();
    res.status(200).send({
      stocks,
      message: `stock ${symbol} has been updated`,
      color: "teal",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const deleteStock = async (req, res, next) => {
  let count = 0;
  const params = req.query;
  console.log("controllers-stock-deleteStock-params", params);
  try {
    for (const param in params) {
      count++;
      console.log("deleting stock id:", params[param]);
      await StockService.removeStock(params[param]);
    }
    const stocks = await StockService.compileStocksData();
    res.status(200).send({
      stocks,
      message: `${count} stock(s) deleted`,
      color: "teal",
    });
  } catch (error) {
    res.send("Error deleting stocks");
  }
};
