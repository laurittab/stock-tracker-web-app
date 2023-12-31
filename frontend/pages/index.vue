<template>
  <div>
    <h2>Home</h2>
    <p>This is the main view</p>
    <div>{{ data }}</div>
  </div>
</template>

<script setup>
const { data } = await useFetch("/api/currency/GBP");
</script>

<style scoped></style>
