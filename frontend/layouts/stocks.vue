<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4 flex justify-between">
        <NuxtLink to="/stocks" class="font-bold">All stocks</NuxtLink>
      </nav>
    </header>
    <!--output page content using slot -->
    <div class="container mx-auto p-4">
      <slot />
    </div>
    <footer class="container mx-auto p-4 flex justify-between border-t-2">
      <ul class="flex gap-4">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/add">Add</NuxtLink></li>
        <li><NuxtLink to="/edit">Edit</NuxtLink></li>
        <li><NuxtLink to="/stocks">Stocks</NuxtLink></li>
      </ul>
    </footer>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: #12b488;
}
</style>
