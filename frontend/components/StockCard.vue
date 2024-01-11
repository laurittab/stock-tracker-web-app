<template>
  <div class="card text-center">
    <img
      :src="product.image"
      :alt="`image of ${product.title}`"
      class="thumb"
    />
    <p class="font-bold text-grey-500 m4 truncate">{{ product.title }}</p>
    <NuxtLink :to="`/stocks/${product.id}`"
      ><p class="btn my-4">View details</p>
    </NuxtLink>
  </div>
</template>

<script setup>
const { product } = defineProps(["product"]);
</script>

<style scoped>
.thumb {
  max-height: 120px;
  max-width: 70%;
  margin: 0 auto;
}
</style>
