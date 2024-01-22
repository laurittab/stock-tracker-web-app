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
//const { marketRoute } = useRoute().params;
const { marketStatus, setStatus, status } = useMarketsStore();
//const statusDetails = status.value;
const { loggedIn, login, loggedInStatus } = useAuthStore();
console.log("stock-id-loggedInStatus.value:", loggedInStatus.value);
if (!loggedInStatus.value) {
  await navigateTo("/login");
}
const loginToken = useCookie("access-token");
if (!loginToken.value) {
  await navigateTo("/signup");
}
/*
const uri = "https://fakestoreapi.com/products/" + id;
const { data: product } = await useFetch(uri, { key: id });
if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Product not found",
    fatal: true,
  });
}*/
definePageMeta({
  //layout: "",
});
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
