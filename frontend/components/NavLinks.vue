<template>
  <div>
    <div>
      <UVerticalNavigation
        :links="links"
        :ui="{
          wrapper: 'space-y-8',
          base: 'group block \*border-s*\ -ms-px lg:leading-6 before:hidden',
          active: 'text-violet-900 dark:text-violet-800 font-semibold',
          inactive:
            'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300',
        }"
      />
    </div>
    <div class="p-2"><SocialMedia /></div>
  </div>
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
    label: "Market status",
    to: "/markets",
  },
];
</script>

<style scoped></style>
