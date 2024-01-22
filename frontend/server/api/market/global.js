export default defineEventHandler(async (event) => {
  const { alphaVantageKey } = useRuntimeConfig();
  const uri = `https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=${alphaVantageKey}`;
  const { markets } = await $fetch(uri);
  return { markets };
});
