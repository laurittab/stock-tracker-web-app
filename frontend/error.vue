<template>
  <div class="mt-7 max-w-sm mx-auto text-center card">
    <p class="mt-7 text-7xl font-bold">{{ error.statusCode }}</p>
    <p class="mt-7 text-6xl">Oh dear...</p>
    <p class="mt-7">
      <b>{{ error.message }}</b>
    </p>
    <p class="mt-7">{{ error }}</p>
    <button class="btn my-7" @click="handleClearError">Back to home...</button>
  </div>
</template>

<script setup>
defineProps(["error"]);
const handleClearError = () => clearError({ redirect: "/" });
</script>
<style scoped></style>
