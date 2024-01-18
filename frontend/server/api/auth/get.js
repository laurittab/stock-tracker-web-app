export default defineEventHandler(async (event) => {
  const user = getQuery(event);
  const { loginUri } = useRuntimeConfig();
  let finalData;
  console.log("api-auth-get-user", user);
  const { data, error } = await $fetch(loginUri, {
    method: "get",
    query: user,
  }).then((data, error) => {
    //console.log("api-auth-get-data", data, error);
    finalData = data;
  });
  return finalData;
});
