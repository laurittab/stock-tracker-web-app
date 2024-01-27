<template>
  <div>
    <Head>
      <Title>Market Status | {{ status.region }}</Title>
      <Meta name="description" :content="status.primary_exchanges" />
    </Head>
    <MarketDetails />
  </div>
</template>

<script setup>
const { marketStatus, status } = useMarketsStore();
const { loggedIn, loggedInStatus } = useAuthStore();
console.log("stock-id-loggedInStatus.value:", loggedInStatus.value);
if (!loggedInStatus.value) {
  await navigateTo("/login");
}
const loginToken = useCookie("access-token");
if (!loginToken.value) {
  await navigateTo("/signup");
}
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
