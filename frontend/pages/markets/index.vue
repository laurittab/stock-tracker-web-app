<template>
  <div>
    <h1 class="mb-8 ml-4">Global Market Status</h1>
    <div class="grid grid-cols-10 grid-rows-2 gap-6">
      <div class="col-span-2" v-for="m in markets">
        <div><MarketCard :market="m" /></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $localStore } = useNuxtApp();
const { loggedIn, login, loggedInStatus } = useAuthStore();
console.log("index-loggedInStatus.value:", loggedInStatus.value);
if (!loggedInStatus.value) {
  await navigateTo("/login");
}
const loginToken = useCookie("access-token");
if (!loginToken.value) {
  await navigateTo("/signup");
}
const checkStatus = useCookie("status-is-current");
console.log("markets-checkStatus.value", checkStatus.value);
const updateStatus = async (cookie) => {
  if (!cookie.value) {
    console.log("markets-checkStatus-cookie.value", cookie.value);
    const statusCookie = useCookie("status-is-current", {
      expires: setExpiration(1),
    });
    statusCookie.value = "yes-true";
    const {
      data: {
        value: { markets },
      },
    } = await useFetch("/api/market/global");
    console.log("markets-updateStatus-updating status in local storage");
    $localStore.setItem("markets-update", JSON.stringify(markets));
    return markets;
  }
  console.log("updateStatus-getting existing status from local storage");
  const markets = JSON.parse($localStore.getItem("markets-update"));
  return markets;
};
const markets = await updateStatus(checkStatus);
useHead({
  title: "Global Market | status",
  meta: [{ name: "description", content: "a closer look" }],
});
</script>

<style scoped></style>
