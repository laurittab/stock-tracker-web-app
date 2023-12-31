<template>
  <div>
    <div class="grid grid-cols-4 gap-5">
      <div v-for="p in products">
        <!-- remove this so not just outputting a link any mroe <NuxtLink :to="`/stocks/${p.id}`">{{ p.title }}</NuxtLink>  -->
        <StockCard :product="p" />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "stocks",
});
// fetch products, an array of objecys
const { data: products } = await useFetch("https://fakestoreapi.com/products");
useHead({
  title: "Rita's Stock | items",
  meta: [{ name: "description", content: "a closer look" }],
});
</script>

<style scoped></style>
