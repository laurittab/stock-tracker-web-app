<template>
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup v-if="details?.id" label="ID:" name="id">
      <UInput v-model="state.id" />
    </UFormGroup>
    <UFormGroup label="Stock symbol:" name="symbol">
      <UInput v-model="state.symbol" />
    </UFormGroup>
    <UFormGroup label="Comments:" name="comments">
      <UInput v-model="state.comments" />
    </UFormGroup>
    <UFormGroup label="Target price:" name="target_price">
      <UInput v-model="state.target_price" />
    </UFormGroup>
    <UFormGroup label="Bottom price:" name="bottom_price">
      <UInput v-model="state.bottom_price" />
    </UFormGroup>
    <UButton type="submit"> Submit </UButton>
  </UForm>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
const isOpen = useOpenStockForm();
//const { data } = await useFetch("/api/stocks/post"); //"http://localhost:4000/stocks";
//const uri = data.value
const { details } = defineProps(["details"]);
const state = reactive({
  id: details?.id || undefined,
  symbol: details?.symbol || undefined,
  comments: details?.comments || undefined,
  target_price: details?.target_price || undefined,
  bottom_price: details?.bottom_price || undefined,
});
const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.symbol)
    errors.push({ path: "symbol", message: "A stock symbol is required" });
  if (!state.target_price)
    errors.push({
      path: "target_price",
      message: "A target price is required",
    });
  if (!state.bottom_price)
    errors.push({
      path: "bottom_price",
      message: "A bottom price is required",
    });
  return errors;
};
async function onSubmit(event: FormSubmitEvent<any>) {
  const reqBody = {
    id: event.data.id,
    symbol: event.data.symbol,
    comments: event.data.comments,
    target_price: event.data.target_price,
    bottom_price: event.data.bottom_price,
  };
  if (details) {
    updateStock(reqBody);
  } else {
    addStock(reqBody);
  }
  isOpen.value = false;
}
</script>
