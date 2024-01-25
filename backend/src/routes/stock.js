import express from "express";

import * as StockController from "../controllers/stock.js";

//import authentication from "../../middlewares/authentication.js";
//import authorisation from "../../middlewares/agent/authorisation.js";

const router = express.Router();

router
  .route("/stocks")
  .get(StockController.getStocks)
  .post(StockController.addStock)
  .put(StockController.updateStock)
  .delete(StockController.deleteStock);

export default router;
