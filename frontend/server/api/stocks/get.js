export default defineEventHandler(async (event) => {
  //const { method } = event.context.params;
  const { stocksUri } = useRuntimeConfig();
  let finalData;
  const { data, error } = await $fetch(stocksUri /*{ method: method }*/).then(
    (data, error) => {
      //console.log("api-stocks-get-data", data, error);
      finalData = data;
    }
  );
  return finalData;
});
