import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import database from "./config/mongoose.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json({ limit: "50mb" }));
app.use(cors({ methods: ["GET", "PUT", "POST", "DELETE"] }));
app.use("/", router);
app.get("/", async (req, res) => {
  res.status(200).send("Welcome to the backend");
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}.`);
});
export default app;
