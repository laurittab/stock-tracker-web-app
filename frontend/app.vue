<template>
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
</template>
<script setup>
//const notification = useMessageToast();
//const notificationTitle = notification.value;
//const toast = useToast();
//toast.add({ title: notificationTitle });
</script>
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
