<template>
  <div>
    <h1 class="mb-8 ml-4">Global Stock News</h1>
    <div v-for="item in news">
      <div><NewsCard :newsItem="item" /></div>
    </div>
  </div>
</template>

<script setup>
const {
  data: {
    value: { marketStatus, newsSentiment },
  },
} = await useFetch("/api/news/global");
const news = newsSentiment.feed;
//console.log("**************************", news);
</script>

<style scoped></style>
//{ data: { marketStatus, newsSentiment },}
