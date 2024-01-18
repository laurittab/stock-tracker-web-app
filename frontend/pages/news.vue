<template>
  <div>
    <h1 class="mb-8 ml-4">Global Stock News</h1>
    <div v-for="item in news">
      <div><NewsCard :newsItem="item" /></div>
    </div>
  </div>
</template>

<script setup>
const { loggedIn, login, loggedInStatus } = useAuthStore();
console.log("news-loggedInStatus.value:", loggedInStatus.value);
if (!loggedInStatus.value) {
  await navigateTo("/login");
}
const loginToken = useCookie("access-token");
if (!loginToken.value) {
  await navigateTo("/signup");
}
const {
  data: {
    value: { marketStatus, newsSentiment },
  },
} = await useFetch("/api/news/global");
const news = newsSentiment.feed;
</script>

<style scoped></style>
//{ data: { marketStatus, newsSentiment },}
