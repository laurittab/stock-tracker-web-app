<template>
  <div>
    <h1 class="mb-8 ml-4">Global Stock News</h1>
    <div v-for="item in feed">
      <div><NewsCard :newsItem="item" /></div>
    </div>
  </div>
</template>

<script setup>
const { $localStore } = useNuxtApp();
const { loggedIn, login, loggedInStatus } = useAuthStore();
console.log("news-loggedInStatus.value:", loggedInStatus.value);
if (!loggedInStatus.value) {
  await navigateTo("/login");
}
const loginToken = useCookie("access-token");
if (!loginToken.value) {
  await navigateTo("/signup");
}
const checkNews = useCookie("news-is-current");
console.log("news-checkNews.value", checkNews.value);
const updateNews = async (cookie) => {
  if (!cookie.value) {
    const updateCookie = useCookie("news-is-current", {
      expires: setExpiration(1),
    });
    updateCookie.value = "yes-true";
    const {
      data: {
        value: { feed },
      },
    } = await useFetch("/api/market/news");
    console.log("news-updateNews-updating news in local storage");
    $localStore.setItem("news-update", JSON.stringify(feed));
    return feed;
  }
  console.log("news-updateNews-getting existing feed from local storage");
  const feed = JSON.parse($localStore.getItem("news-update"));
  return feed;
};
const feed = await updateNews(checkNews);
</script>

<style scoped></style>
