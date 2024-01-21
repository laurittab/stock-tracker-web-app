<template>
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup label="Stock symbol:" name="symbol">
      <UInput v-model="state.symbol" />
    </UFormGroup>
    <UFormGroup label="Comments:" name="comments">
      <UInput v-model="state.comments" />
    </UFormGroup>
    <UFormGroup label="Target price:" name="target_price">
      <UInput v-model="state.target_price" type="number" />
    </UFormGroup>
    <UFormGroup label="Bottom price:" name="bottom_price" type="number">
      <UInput v-model="state.bottom_price" />
    </UFormGroup>
    <UButton type="submit"> Submit </UButton>
  </UForm>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import { useTableStore } from "@/stores/table";
const selected = useSelectedStocks();
const { stockDetails, currentStocks, setStocks, closeForm } = useTableStore();
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
const checkSymbol = (symbol: string, stocksList: Array<any>): any => {
  const result = stocksList.find((element) => element.symbol == symbol);
  console.log("stockform-checksymbol-result", !!result);
  return !!result;
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
    const { stocks, message, color } = await updateStock(reqBody);
    setStocks(stocks);
    createToast(message, color);
    selected.value = [];
  } else {
    const symbolCheck = checkSymbol(reqBody.symbol, currentStocks.value);
    if (symbolCheck) {
      createToast("This ticker is already in the stocks table", "red");
      closeForm();
      return;
    }
    const { stocks, message, color } = (await addStock(reqBody)) as any;
    setStocks(stocks);
    createToast(message, color);
  }
  closeForm();
}
</script>
