<template>
  <div class="card text-center">
    <img
      :src="`/flags/${market.region}.png`"
      :alt="`image of ${market.region} flag`"
      class="thumb"
    />
    <p class="font-bold text-grey-500 m4 truncate">{{ market.region }}</p>
    <NuxtLink :to="`/markets/${marketRoute}`" @click="setStatus(market)"
      ><p class="btn my-4">View details</p>
    </NuxtLink>
  </div>
</template>

<script setup>
const { marketStatus, setStatus, status } = useMarketsStore();
const { market } = defineProps(["market"]);
const marketRoute = market.region.replace(" ", "-");
</script>

<style scoped>
.thumb {
  max-height: 120px;
  max-width: 70%;
  margin: 0 auto;
}
</style>
