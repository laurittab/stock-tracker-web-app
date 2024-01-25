import express from "express";

//imports all routes for table through exported router
import StocksAPI from "./stock.js";
import UserAPI from "./user/index.js";

const router = express.Router();

router.use(StocksAPI);
router.use("/user", UserAPI);

// This route is using for healthcheck in Azure
router.get("/ping", async (req, res) => {
  res.send("Server up and running!!!");
});

router.get("/test-error", (req, res, next) => {
  try {
    throw new /*Custom*/ Error(`{ message: "test", code: 500 }`);
  } catch (error) {
    next(error);
  }
});

export default router;
