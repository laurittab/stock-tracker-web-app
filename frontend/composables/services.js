export const stocksUri = "http://localhost:4000/stocks";

export const getStocks = async () => {
  const toast = useToast();
  const { data, error } = await useFetch(stocksUri);
  console.log(data, error);
  toast.add({
    title: "<b>Server response</b>",
    description: `<u>message</u>: ${data.value.length} stocks retrieved`,
  });
  return data;
};
export const addStock = async (reqMethod, reqBody) => {
  console.log("adding stock with reqMethod:", reqMethod);
  const toast = useToast();
  const { data, error } = await useFetch(stocksUri, {
    method: reqMethod,
    body: reqBody,
  });
  console.log(data, error);
  toast.add({
    title: "<b>Server response</b>",
    description: `<u>message</u>: ${data.value}`,
  });
};

export const updateStock = async (reqMethod, reqBody) => {
  console.log("updating stock with reqMethod:", reqMethod);
  const toast = useToast();
  const { data, error } = await useFetch(stocksUri, {
    method: reqMethod,
    body: reqBody,
  });
  console.log(data, error);
  toast.add({
    title: "<b>Server response</b>",
    description: `<u>message</u>: ${data.value}`,
  });
};

export const deleteStock = async (selection) => {
  const stockDetails = useStockList();
  const toast = useToast();
  let params = {};
  let count = 1;
  for (const stock of selection) {
    params[`id${count}`] = stock.id;
    count++;
  }
  console.log("params", params);
  const { data, error } = await useFetch(stocksUri, {
    method: "delete",
    query: params,
  });
  console.log(data, error);
  toast.add({
    title: "<b>Server response</b>",
    description: `<u>message</u>: ${data.value}`,
  });
  stockDetails.value = await getStocks();
};
