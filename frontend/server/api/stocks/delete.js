export default defineEventHandler(async (event) => {
  const params = getQuery(event);
  const { stocksUri } = useRuntimeConfig();
  let finalData;
  const { data, error } = await $fetch(stocksUri, {
    method: "delete",
    query: params,
  }).then((data, error) => {
    //console.log("api-stocks-delete-data", data, error);
    finalData = data;
  });
  return finalData;
});
