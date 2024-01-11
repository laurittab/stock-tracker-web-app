/*
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
    <UButton
      type="submit"
      @click="
        stockDetailsUpdates.value = state;
        isOpen = false;
      "
    >
      Submit
    </UButton>
  </UForm>
</template>
<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
const { details } = defineProps(["details"]);
const isOpen = useOpenStockForm();
const state = reactive({
  id: details?.id || undefined,
  symbol: details?.symbol || undefined,
  comments: details?.comments || undefined,
  target_price: details?.target_price || undefined,
  bottom_price: details?.bottom_price || undefined,
});
//const {"id", "symbol", "name", "description", "comments", "dividends", "target_price", "bottom_price"} = state
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
const stockDetailsUpdates = useStockDetails();
stockDetailsUpdates.value = {};
async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  //const helloYou = state;
  const { data } = await useFetch("http://localhost:4000/stocks?id=state.id", {
    method: "post",
    body: {
      symbol: state.symbol,
      comments: state.comments,
      target_price: state.target_price,
      bottom_price: state.bottom_price,
    },
  });
  console.log("in the form", event.data);
  console.log("in the form", data);
}
</script>
*/
