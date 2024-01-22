import dotenv from "dotenv";
dotenv.config();
const database = {
  host: process.env.DB_HOSTNAME /*|| "127.0.0.1"*/,
  port: process.env.DB_HOSTPORT /*|| 27017*/,
  dialect: "mongodb",
  database: process.env.DB_NAME /*|| "stock_app"*/,
};

export default database;
