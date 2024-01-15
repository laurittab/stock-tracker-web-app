import { defineStore } from "pinia";

export const useTableStore = defineStore("table", () => {
  const tableKey = ref(0);
  const stockDetailss = ref([]);
  const selecteds = ref([]);
  const isOpens = ref(false);
  const filter = ref("");
  const page = ref(1);
  const pageCount = 10;
  const filters = ref("");

  function setStocks(stocks) {
    console.log("store-setStocks-stocks.length", stocks.length);
    this.stockDetailss = stocks;
    this.tableKey++;
    return "setStock just now";
  }
  function incrementKey() {
    this.tableKey++;
  }
  function openForm() {
    this.isOpens = true;
  }
  function closeForm() {
    this.isOpens = false;
    this.tableKey++;
  }
  const removeStocks = async (aSelection) => {
    console.log("store-removeStock-aSelection", aSelection);
    const { message, color } = await deleteStock(aSelection);
    console.log("store-removeStock-message", message, color);
    createToast(message, color);
  };
  async function reRenders() {
    console.log("table-reRenders");
    let data;
    await getStocks().then((results) => {
      data = results;
      console.log("data = results", data);
    });
    const { stocks, message, color } = data;
    createToast(message, color);
    this.stockDetailss = stocks;
    console.log("table-reRenders-stocks", stocks);
    this.selecteds = [];
    this.tableKey++;
    //return stocks;
  }
  function select(row) {
    console.log("store-table-select", row);
    const index = this.selecteds.findIndex((item) => item.id === row.id);
    //console.log(`item.id ${item.id} row.id ${row.id}`);
    if (index === -1) {
      this.selecteds.push(row);
    } else {
      this.selecteds.splice(index, 1);
    }
  }
  const updatedKey = computed(() => tableKey);
  const updatedFilters = computed(() => filters);
  const selection = computed(() => selecteds);
  const openStatus = computed(() => isOpens);
  const currentStocks = computed(() => stockDetailss);
  const filteredRowss = computed(() => {
    if (!this.filter) {
      return this.stockDetailss.slice(
        (this.page - 1) * this.pageCount,
        this.page * this.pageCount
      );
    }
    return this.stockDetailss
      .filter((person) => {
        return Object.values(person).some((value) => {
          return String(value)
            .toLowerCase()
            .includes(this.filter.toLowerCase());
        });
      })
      .slice((this.page - 1) * this.pageCount, this.page * this.pageCount);
  });

  return {
    tableKey,
    stockDetailss,
    selecteds,
    isOpens,
    filter,
    filters,
    page,
    pageCount,
    reRenders,
    select,
    openForm,
    closeForm,
    setStocks,
    removeStocks,
    incrementKey,
    filteredRowss,
    updatedKey,
    selection,
    openStatus,
    currentStocks,
    updatedFilters,
  };
});
