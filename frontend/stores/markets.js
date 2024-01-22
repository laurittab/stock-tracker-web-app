import { defineStore } from "pinia";

export const useMarketsStore = defineStore("markets", () => {
  const marketStatus = ref("");
  function setStatus(status) {
    console.log("store-markets-setStatus", status);
    this.marketStatus = status;
  }
  const status = computed(() => marketStatus);
  return {
    marketStatus,
    setStatus,
    status,
  };
});
