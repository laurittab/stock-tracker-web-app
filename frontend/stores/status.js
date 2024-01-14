// EXAMPLE ONLY useState implemented instead
import { defineStore } from "pinia";

export const useStatusStore = defineStore("status", () => {
  const addStockIsOpen = ref(false);
  function openAddStock() {
    this.addStockIsOpen = true;
  }
  function closeAddStock() {
    this.addStockIsOpen = false;
  }
  const addStockStatus = computed(() => addStockIsOpen);

  return { addStockIsOpen, addStockStatus, openAddStock, closeAddStock };
});
