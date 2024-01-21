<template>
  <div class="card m-4">
    <div class="grid grid-cols-4 grid-rows-4 gap-4 text-gray-900">
      <img
        :src="newsItem.banner_image"
        :alt="`image of ${newsItem.title}`"
        class="pics row-span-full col-span-1"
      />
      <p class="col-span-3 row-span-1 font-bold text-violet-900">
        {{ newsItem.title }}
      </p>
      <p class="col-span-3 row-span-2">
        {{ newsItem.summary }}
      </p>
      <p class="col-span-1 row-span-1">
        {{ newsItem.source }}
      </p>
      <p class="col-span-1 row-span-1">
        {{ moment(newsItem.time_published).format("MMMM Do YYYY, h:mm:ss a") }}
      </p>
      <NuxtLink
        :to="recreateSourceLink(newsItem.source_domain)"
        external
        target="_blank"
        class="col-span-1 row-span-1 hover:text-indigo-900"
      >
        {{ newsItem.source_domain }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
const { newsItem } = defineProps(["newsItem"]);
const recreateSourceLink = (domain) => {
  return "http://" + domain;
};
</script>

<style scoped>
.pics {
  max-height: 120px;
  max-width: 70%;
  margin: 0 auto;
}
</style>
