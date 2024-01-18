<template>
  <div>
    <Head>
      <Title>R's stock item | {{ product.title }}</Title>
      <Meta name="description" :content="product.description" />
    </Head>
    <StockDetails :product="product" />
  </div>
</template>

<script setup>
const { id } = useRoute().params;
const { loggedIn, login, loggedInStatus } = useAuthStore();
console.log("stock-id-loggedInStatus.value:", loggedInStatus.value);
if (!loggedInStatus.value) {
  await navigateTo("/login");
}
const loginToken = useCookie("access-token");
if (!loginToken.value) {
  await navigateTo("/signup");
}
const uri = "https://fakestoreapi.com/products/" + id;
const { data: product } = await useFetch(uri, { key: id });
if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Product not found",
    fatal: true,
  });
}
definePageMeta({
  //layout: "stocks",
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
