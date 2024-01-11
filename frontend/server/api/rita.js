export default defineEventHandler(async (event) => {
  const { name } = getQuery(event);
  const { age } = await readBody(event);
  //api call with private key
  //const { data } = await $fetch(
  //  "someendpoint?apikey=somekeyinfotobekeptprivate"
  // );
  console.log(age, name);
  return {
    message: `Hello ${name} aged ${age}`,
  };
  //return data
});
