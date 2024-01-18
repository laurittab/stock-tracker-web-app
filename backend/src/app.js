import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import "./database/index.js";
//import "./services/fundamentals.js";
import compileStocksData from "./services/compileStockData.js";
import { Stock, Overview, User } from "./database/index.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";

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
    console.log("get-stocks");
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
    console.log("get-stocks-id", id);
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
    console.log("post-stocks-saved", saved);
    const stocks = await compileStocksData();
    res.status(200).send({
      stocks,
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
  console.log(
    "put-stocks-destructured-req.body",
    id,
    symbol,
    comments,
    target_price,
    bottom_price
  );
  try {
    const data = await Stock.findByIdAndUpdate(id, {
      symbol,
      comments,
      target_price,
      bottom_price,
    }).exec();
    console.log("put-stocks-data", data);
    const stocks = await compileStocksData();
    res.status(200).send({
      stocks,
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
  console.log("delete-stocks-params", params);
  try {
    for (const param in params) {
      count++;
      console.log("deleting stock id:", params[param]);
      await Stock.findByIdAndDelete(params[param]);
    }
    const stocks = await compileStocksData();
    res.status(200).send({
      stocks,
      message: `${count} stock(s) deleted`,
      color: "teal",
    });
  } catch (error) {
    res.send("Error deleting stocks");
  }
});
app.post("/signup/", async (req, res) => {
  const { email, password } = req.body;
  console.log("signup-password", password);
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = uuidv4();
  const token = nanoid(256);
  try {
    const checkUser = await User.findOne({ email: email }); //.exec();
    console.log("signup-checkUser:", checkUser);
    if (checkUser) {
      return res.status(200).send({
        message: "This email has already been registered, please go to login",
        color: "red",
      });
      return;
    }
    let newUser = User({
      userId: userId,
      email: email,
      password: hashedPassword,
    });

    const saved = await newUser.save();
    console.log("signup-saved", saved, "token", token);
    res.status(200).send({
      token: token,
      message: `Your new login is username: ${email} and the password you entered`,
      color: "teal",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
app.get("/login/", async (req, res) => {
  const { email, password } = req.query;
  console.log("login-destructured-params", email, password);
  try {
    const checkUser = await User.findOne({ email: email });
    console.log("login-checkUser", checkUser);
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    console.log("login-checkPassword", checkPassword);
    if (checkUser && checkPassword) {
      //const userId = uuidv4();
      const token = nanoid(256);
      return res.status(200).send({
        token: token,
        message: `You are now logged in with username ${email}`,
        color: "teal",
      });
    }
    res.status(200).send({
      message: "Either your username or password are incorrect",
      color: "red",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}.`);
});
export default app;
