import fetch from "node-fetch";

import pkg from "scramjet";
const { StringStream } = pkg;

const get = async (url, options = {}) => (await fetch(url, options)).json;

StringStream.from(
  // fetch your API to a scramjet stream
  () =>
    get(
      `https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    )
)
  .setOptions({ maxParallel: 4 }) // set your options
  .lines() // split the stream by line
  .parse((line) => {
    // parse strings to data
    const [symbol, name, exchange, assetType, ipoDate, delistingDate, status] =
      line.split(",");
    return {
      symbol,
      name,
      exchange,
      assetType,
      ipoDate,
      delistingDate,
      status,
    };
  })
  //.map(async (myShow) =>
  //   get({
  //     // use asynchronous mapping (for example send requests)
  //     uri: `http://api.local/set/${myShow.id}`,
  //      body: JSON.stringify(myShow),
  //    })
  //  )
  .stringify((resp) => `+ Updated "${resp}"`)
  .catch((err) => `! Error occured ${err.uri}`) // handle errors
  .append("\n")
  .pipe(process.stdout); // use any stream

/*import axios from "axios";
import dotenv from "dotenv";
import { symbols, Overview } from "../database/index.js";

dotenv.config();

console.log("symbols", symbols);
console.log(String(symbols));

const getTickers = async () => {
  const url = `https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;
  const tickersObject = {};
  let count = 0;
  await axios
    .get(
      "https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=demo"
    )
    .pipe(new StringStream())
    .CSVParse() // parse CSV output into row objects
    .consume((object) => console.log("Row:", object))
    .then(() => console.log("success"));
  
  // parse CSV output into row objects
  const { data } = await axios
    .get(url)
    .pipe(new StringStream())
    .CSVParse()
    .consume((object) => {
      tickersObject[`row${count}`] = object;
      count++;
      console.log("Row:", object);
    })
    .then(() => console.log("success: tickersObject ->", tickersObject));
  console.log("outside success: tickersObject ->", tickersObject);
  console.log(data);
  return data;
  //let newOverview = Overview({
  //  symbol: symbol,
  //  fundamentals: data,
  // });
  // const saved = await newOverview.save();
  // console.log("saved", saved);
  
};
//export default getTickers;
await getTickers();
*/
