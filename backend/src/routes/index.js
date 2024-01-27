import express from "express";
import StocksAPI from "./stock.js";
import UserAPI from "./user/index.js";

const router = express.Router();
router.use(StocksAPI);
router.use("/user", UserAPI);

export default router;
