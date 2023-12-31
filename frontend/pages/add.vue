<template>
  <div>
    <h1>Add</h1>
    <p>This is the main view where add version will be</p>
    <div>{{ data }}</div>
  </div>
</template>

<script setup>
const { data } = await useFetch("/api/rita?name=lauritta", {
  method: "post",
  body: {
    age: 50,
  },
});
//const { data } = await useFetch("/api/rita")  for api call with private
</script>

<style scoped></style>
