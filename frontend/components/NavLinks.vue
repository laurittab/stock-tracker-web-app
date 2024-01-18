<template>
  <UVerticalNavigation
    :links="links"
    :ui="{
      wrapper: 'space-y-4',
      base: 'group block \*border-s*\ -ms-px lg:leading-6 before:hidden',
      padding: 'p-0 ps-4',
      active: 'text-violet-900 dark:text-violet-800 font-semibold',
      inactive:
        'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300',
    }"
  />
</template>

<script setup>
const links = [
  {
    label: "",
    to: "/signup",
  },
  {
    label: "",
    to: "/login",
  },
  {
    label: "Stocks table",
    to: "/",
  },
  {
    label: "Latest news",
    to: "/news",
  },
  {
    label: "Stocks in view",
    to: "/stocks",
  },
];
</script>

<style scoped></style>
