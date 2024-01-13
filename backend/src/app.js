import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import "./database/index.js";
//import "./services/fundamentals.js";
import compileStocksData from "./services/compileStockData.js";
import { Stock, Overview } from "./database/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: "50mb" }));
app.use(cors({ methods: ["GET", "PUT", "POST", "DELETE"] }));

app.get("/", async (req, res) => {
  res.status(200).send("Welcome to the backend");
});
app.get("/stocks", async (req, res) => {
  try {
    const stocks = await compileStocksData(); //Overview.find({}).exec(); //compileStocksData();
    console.log("all stocks retrieved");
    res.status(200).send({
      stocks: stocks,
      message: `${stocks.length} stocks retrieved`,
      color: "teal",
    });
  } catch (error) {
    console.log(error);
  }
});
app.get("/stocks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log("params", id);
    const stock = await Stock.findById(id).exec();
    res
      .status(200)
      .send({ stock: stock, message: `${stocks.id} retrieved`, color: "teal" });
  } catch (error) {
    console.log(error);
  }
});
app.post("/stocks/", async (req, res) => {
  const { symbol, comments, target_price, bottom_price } = req.body;
  try {
    let newStock = Stock({
      symbol,
      comments,
      target_price,
      bottom_price,
    });
    const saved = await newStock.save();
    console.log("saved stock", saved);
    res.status(200).send({
      message: `stock ${symbol} with ID ${saved.id} has been added`,
      color: "teal",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
app.put("/stocks/", async (req, res) => {
  const { id, symbol, comments, target_price, bottom_price } = req.body;
  //const update = req.body;
  console.log("put req.body", id, symbol, comments, target_price, bottom_price);
  try {
    const data = await Stock.findByIdAndUpdate(id, {
      symbol,
      comments,
      target_price,
      bottom_price,
    }).exec();
    console.log("updated stock", data);
    res.status(200).send({
      message: `stock ${symbol} has been updated`,
      color: "teal",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
app.delete("/stocks/", async (req, res) => {
  let count = 0;
  const params = req.query;
  console.log("params", params);
  try {
    for (const param in params) {
      count++;
      console.log("deleting stock id:", params[param]);
      await Stock.findByIdAndDelete(params[param]);
    }
    res.status(200).send({
      message: `${count} stock(s) deleted`,
      color: "teal",
    });
  } catch (error) {
    res.send("Error deleting stocks");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}.`);
});
export default app;
