export default defineEventHandler(async (event) => {
  const newStock = await readBody(event);
  const { stocksUri } = useRuntimeConfig();
  let finalData;
  const { data, error } = await $fetch(stocksUri, {
    method: "put",
    body: newStock,
  }).then((data, error) => {
    //console.log("api-stocks-put-data", data, error);
    finalData = data;
  });
  return finalData;
});
