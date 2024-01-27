export const addUser = async (reqBody) => {
  try {
    const {
      data: {
        value: { token, message, color },
      },
      error,
    } = await useFetch(`/api/auth/post`, {
      method: "post",
      body: reqBody,
    });
    console.log("addUser-response", token, message, color, error);
    return { token, message, color };
  } catch (error) {
    createToast(error.message, "red");
  }
};

export const findUser = async (params) => {
  //try with params, e.g. :id in backend server side
  console.log("findUser-params", params);
  try {
    const {
      data: {
        value: { token, message, color },
      },
      error,
    } = await useFetch(`/api/auth/get`, {
      method: "get",
      query: params,
    });
    console.log("findUser-response", token, message, color, error);
    return { token, message, color };
  } catch (error) {
    createToast(error.message, "red");
  }
};
