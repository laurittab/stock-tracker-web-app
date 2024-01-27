import express from "express";
import * as StockController from "../controllers/stock.js";

const router = express.Router();
router
  .route("/stocks")
  .get(StockController.getStocks)
  .post(StockController.addStock)
  .put(StockController.updateStock)
  .delete(StockController.deleteStock);

export default router;
