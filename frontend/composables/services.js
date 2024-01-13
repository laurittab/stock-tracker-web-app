function createToast(message) {
  const tableKey = useTableKey();
  const toast = useToast();
  toast.add({
    title: "<b>Server response</b>",
    description: `<u>message</u>: ${message}`,
    timeout: 1500,
  });
  tableKey.value++;
}

export const getStocks = async () => {
  const {
    data: {
      value: { stocks, message },
    },
    error,
  } = await useFetch(`/api/stocks/get`);
  console.log("getStocks:", message, error);
  //if (process.client) createToast(message);
  return stocks;
};

export const addStock = async (reqBody) => {
  const {
    data: {
      value: { message },
    },
    error,
  } = await useFetch(`/api/stocks/post`, {
    method: "post",
    body: reqBody,
  });
  console.log("addStocks", message, error);
  if (process.client) createToast(message);
  getStocks();
};

export const updateStock = async (reqBody) => {
  const {
    data: {
      value: { message },
    },
    error,
  } = await useFetch(`/api/stocks/put`, {
    method: "put",
    body: reqBody,
  });
  console.log("updateStock:", message, error);
  if (process.client) createToast(message);
  getStocks();
};

export const deleteStock = async (selection) => {
  let params = {};
  let count = 1;
  console.log("selection", selection);
  for (const stock of selection) {
    params[`id${count}`] = stock.id;
    count++;
  }
  console.log("params", params);
  const {
    data: {
      value: { message },
    },
    error,
  } = await useFetch(`/api/stocks/delete`, {
    method: "delete",
    query: params,
  });
  console.log("deleteStock", message, error);
  if (process.client) createToast(message);
  getStocks();
};
