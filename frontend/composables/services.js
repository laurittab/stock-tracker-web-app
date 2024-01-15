export const createToast = (message, color) => {
  const toast = useToast();
  toast.add({
    title: "<b>Server response</b>",
    description: `<u>message</u>: ${message}`,
    timeout: 3500,
    color: color,
  });
};

export const getStocks = async () => {
  const {
    data: {
      value: { stocks, message, color },
    },
    error,
  } = await useFetch(`/api/stocks/get`);
  console.log("getStocks response:", stocks.length, message, color, error);
  return { stocks, message, color };
};

export const addStock = async (reqBody) => {
  const {
    data: {
      value: { stocks, message, color },
    },
    error,
  } = await useFetch(`/api/stocks/post`, {
    method: "post",
    body: reqBody,
  });
  console.log("addStocks response:", stocks.length, message, color, error);
  return { stocks, message, color };
};

export const updateStock = async (reqBody) => {
  const {
    data: {
      value: { stocks, message, color },
    },
    error,
  } = await useFetch(`/api/stocks/put`, {
    method: "put",
    body: reqBody,
  });
  console.log("updateStock response:", stocks.length, message, color, error);
  return { stocks, message, color };
};

export const deleteStock = async (selection) => {
  let params = {};
  let count = 1;
  console.log("deleteStock-selection.length", selection.length);
  for (const stock of selection) {
    params[`id${count}`] = stock.id;
    count++;
  }
  console.log("deleteStock-params", params);
  const {
    data: {
      value: { stocks, message, color },
    },
    error,
  } = await useFetch(`/api/stocks/delete`, {
    method: "delete",
    query: params,
  });
  console.log("deleteStock response:", stocks.length, message, color, error);
  return { stocks, message, color };
};
