export default defineEventHandler(async (event) => {
  const newUser = await readBody(event);
  const { signupUri } = useRuntimeConfig();
  let finalData;
  const { data, error } = await $fetch(signupUri, {
    method: "post",
    body: newUser,
  }).then((data, error) => {
    //console.log("api-auth-post-data", data, error);
    finalData = data;
  });
  return finalData;
});
