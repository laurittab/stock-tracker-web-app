import { defineStore } from "pinia";

export const useTableStore = defineStore("table", () => {
  const stockDetails = ref([]);
  const isOpen = ref(false);
  function setStocks(stocks) {
    console.log("store-table-setStocks-stocks.length", stocks.length);
    this.stockDetails = stocks;
  }
  function openForm() {
    this.isOpen = true;
  }
  function closeForm() {
    this.isOpen = false;
  }
  const openStatus = computed(() => isOpen);
  const currentStocks = computed(() => stockDetails);
  return {
    isOpen,
    openForm,
    closeForm,
    setStocks,
    openStatus,
    currentStocks,
    stockDetails,
  };
});
