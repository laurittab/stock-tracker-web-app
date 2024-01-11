<template>
  <div>
    <h1 class="mb-8 ml-4">Stocks in view</h1>
    <div class="grid grid-cols-10 grid-rows-2 gap-6">
      <div class="col-span-2" v-for="p in productsTrunc">
        <!-- remove this so not just outputting a link any mroe <NuxtLink :to="`/stocks/${p.id}`">{{ p.title }}</NuxtLink>  -->
        <div><StockCard :product="p" /></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
definePageMeta({
  //layout: "stocks",
});
// fetch products, an array of objecys
let { data: products } = await axios.get("https://fakestoreapi.com/products");
let productsTrunc = products.slice(0, 10);
useHead({
  title: "Rita's Stock | items",
  meta: [{ name: "description", content: "a closer look" }],
});
</script>

<style scoped></style>
