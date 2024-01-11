//import axios from "axios";
import marketStatus from "./marketStatus.js";
import newsSentiment from "./newsSentiment.js";

export default defineEventHandler(
  /*async*/ (event) => {
    const getUpdates = (uri) => {
      try {
        return $fetch(uri);
      } catch (error) {
        console.log(error);
      }
    };
    const tickers = [];
    const news = {};
    //const { alphaVantageKey } = useRuntimeConfig();
    //const marketStatusUri = `https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=${alphaVantageKey}`;
    //const newSentimentUri = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${alphaVantageKey}`;
    //news.marketStatus = await getUpdates(marketStatusUri);
    //news.newSentiment = await getUpdates(newSentimentUri);
    news.marketStatus = marketStatus;
    news.newsSentiment = newsSentiment;
    //console.log("*****************", news);
    return news;
  }
);
