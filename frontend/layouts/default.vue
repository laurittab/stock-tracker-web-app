<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4 flex justify-between">
        <NuxtLink to="/" class="font-bold">Stocks App</NuxtLink>
        <ul class="flex gap-4">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/add">Add</NuxtLink></li>
          <li><NuxtLink to="/edit">Edit</NuxtLink></li>
          <li><NuxtLink to="/stocks" class="btn">Stocks</NuxtLink></li>
          <li><NuxtLink to="/stocks/blublu">Blu</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <!--output page content using slot -->
    <div class="container mx-auto p-4">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: #12b488;
}
h2 {
  margin-bottom: 20px;
  font-size: 36px;
}
p {
  margin: 20px;
}
</style>
