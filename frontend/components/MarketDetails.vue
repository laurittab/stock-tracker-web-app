<template>
  <div class="card">
    <div class="grid grid-cols-2 gap-10">
      <div class="p-7">
        <img
          :src="`/flags/${status.region}.png`"
          :alt="`image of ${status.region} flag`"
          class="mx-auto my-7"
        />
      </div>
      <div class="p">
        <h2 class="text-5xl mb4 pb-2">{{ status.region }}</h2>
        <p class="text-xl mb4 pb-2">Market type: {{ status.market_type }}</p>
        <h3 class="font-bold border-b-2">Primary exchanges:</h3>
        <p class="">{{ status.primary_exchanges }}</p>
        <h3 class="font-bold border-b-2">Local opening time:</h3>
        <p class="">{{ status.local_open }}</p>
        <h3 class="font-bold border-b-2">Local closing time:</h3>
        <p class="">{{ status.local_close }}</p>
        <h3 class="font-bold border-b-2" v-if="status.notes">Further info:</h3>
        <p class="" v-if="status.notes">{{ status.notes }}</p>
        <NuxtLink to="/markets" class="btn w-fit flex mt-4">
          <Icon name="i-mdi-arrow-back" color="#585659" />
          <span class="ml-4">Back to Markets</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { marketStatus, status } = useMarketsStore();
</script>

<style scoped>
img {
  max-width: 400px;
}
</style>
