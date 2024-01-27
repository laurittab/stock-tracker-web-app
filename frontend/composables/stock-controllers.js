export const getStocks = async () => {
  try {
    const {
      data: {
        value: { stocks, message, color },
      },
      error,
    } = await useFetch(`/api/stocks/get`);
    console.log("getStocks-response", stocks.length, message, color, error);
    return { stocks, message, color };
  } catch (error) {
    createToast(error.message, "red");
  }
};

export const addStock = async (reqBody) => {
  try {
    const {
      data: {
        value: { stocks, message, color },
      },
      error,
    } = await useFetch(`/api/stocks/post`, {
      method: "post",
      body: reqBody,
    });
    console.log("addStocks-response", stocks.length, message, color, error);
    return { stocks, message, color };
  } catch (error) {
    createToast(error.message, "red");
  }
};

export const updateStock = async (reqBody) => {
  try {
    const {
      data: {
        value: { stocks, message, color },
      },
      error,
    } = await useFetch(`/api/stocks/put`, {
      method: "put",
      body: reqBody,
    });
    console.log("updateStock-response", stocks.length, message, color, error);
    return { stocks, message, color };
  } catch (error) {
    createToast(error.message, "red");
  }
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
  try {
    const {
      data: {
        value: { stocks, message, color },
      },
      error,
    } = await useFetch(`/api/stocks/delete`, {
      method: "delete",
      query: params,
    });
    console.log("deleteStock-response", stocks.length, message, color, error);
    return { stocks, message, color };
  } catch (error) {
    createToast(error.message, "red");
  }
};
