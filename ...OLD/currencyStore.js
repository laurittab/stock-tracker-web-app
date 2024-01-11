/*
import { defineStore } from "pinia";

export const useCurrencyStore = defineStore("currency", {
  state: () => ({
    currency: "GBP",
  }),
  actions: {
    selectCurrency(currency) {
      this.currency = currency;
      this.saveCurrency();
    },
    saveCurrency() {
      localStorage.setItem("currency", this.currency);
    },
    getLSCurrency() {
      let lsCurrency = localStorage.getItem("currency");
      this.currency = lsCurrency;
    },
  },
  getters: {
    getCurrency: (state) => state.currency,
    hasError: (state) => state.error,
  },
});
*/
