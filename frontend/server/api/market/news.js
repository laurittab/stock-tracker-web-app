export default defineEventHandler(async (event) => {
  const { alphaVantageKey } = useRuntimeConfig();
  const uri = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${alphaVantageKey}`;
  const { feed } = await $fetch(uri);
  return { feed };
});
