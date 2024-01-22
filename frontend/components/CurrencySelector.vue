<template>
  <div class="items-center">
    <UDropdown
      mode="hover"
      block
      :items="items"
      :popper="{ placement: 'bottom-start' }"
      :ui="{
        font: 'hover:text-violet-100',
        width: 'w-24',
        item: { active: 'bg-violet-100' },
      }"
      ><UButton
        label="choose currency"
        size="sm"
        trailing-icon="i-mdi-chevron-down"
        :ui="{
          variant: 'soft bg-white',
          hover: 'bg-violet-50',
          width: 'w-24',
          font: 'text-sm hover:text-violet-900',
        }"
      />
    </UDropdown>
  </div>
</template>

<script setup>
const currency = useCookie("currency", { expires: setExpiration(90) });
const items = [
  [
    {
      label: "GBP",
      icon: "i-mdi-currency-gbp", //
      click: () => {
        currency.value = "GBP";
      },
    },
  ],
  [
    {
      label: "USD",
      icon: "i-mdi-currency-usd",
      click: () => {
        currency.value = "USD";
      },
    },
  ],
  [
    {
      label: "EUR",
      icon: "i-mdi-currency-eur",
      click: () => {
        currency.value = "EUR";
      },
    },
  ],
  [
    {
      label: "YEN",
      icon: "i-mdi-currency-jpy", //
      click: () => {
        currency.value = "YEN";
      },
    },
  ],
];
</script>

<style scoped></style>
