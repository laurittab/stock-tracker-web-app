export default defineEventHandler(async (event) => {
  const newStock = await readBody(event);
  const { stocksUri } = useRuntimeConfig();
  let finalData;
  const { data, error } = await $fetch(stocksUri, {
    method: "post",
    body: newStock,
  }).then((data, error) => {
    //console.log("api-post", data, error);
    finalData = data;
  });
  return finalData;
});