<template>
  <div class="select-none">
    <header class="p-4 flex">
      <div class="mx-auto">
        <CurrencySelector />
      </div>
      <div>
        <NuxtLink
          v-if="loggedInStatus"
          to="/login"
          type="submit"
          @click="logout"
          class="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Sign out</NuxtLink
        >
      </div>
    </header>
    <!--output page content using slot -->
    <div class="grid grid-cols-12 p-4">
      <div class="row-span-full col-span-10 container mx-auto">
        <slot />
      </div>
      <UDivider class="row-span-full" color="#585659" orientation="vertical"
        ><NuxtLink to="https://github.com/laurittab" external target="_blank"
          ><div>
            <Icon
              class="hover:animate-spin"
              name="i-mdi-github"
              color="#585659"
              width="30"
              height="30"
            /></div></NuxtLink
      ></UDivider>
      <div class="row-span-full col-span-2">
        <NavLinks />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from "@/stores/authentication";
const { loggedIn, logout, loggedInStatus } = useAuthStore();
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
  font-size: 36px;
}
p {
  margin: 20px;
}
</style>
