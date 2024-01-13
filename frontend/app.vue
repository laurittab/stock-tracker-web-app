<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications>
      <template #title="{ title }">
        <span v-html="title" />
      </template>
      <template #description="{ description }">
        <span v-html="description" />
      </template>
    </UNotifications>
  </div>
</template>
<script setup></script>
<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
