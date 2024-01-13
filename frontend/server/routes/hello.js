//export default defineEventHandler(() => "Hello World!");

export default defineEventHandler(async (event) => {
  // if (process.server) {
  const { stocksUri } = useRuntimeConfig();
  let passedObj;
  // const toast = useToast();
  const { data, error } = await $fetch(stocksUri).then((data, error) => {
    console.log("routes-data", data, error);
    passedObj = data;
  });
  //toast.add({
  //  title: "<b>Server response</b>",
  //  description: `<u>message</u>: ${data.value.length} stocks retrieved`,
  // });

  return passedObj;
  // }
});
