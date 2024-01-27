<template>
  <div>
    <h1 class="mb-8 ml-4">Stocks table</h1>

    <div>
      <div class="flex justify-between">
        <div class="flex">
          <div
            class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
          >
            <USelectMenu
              v-model="selectColumns"
              :options="columns"
              multiple
              placeholder="Columns"
            />
          </div>
          <div
            class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
          >
            <UInput v-model="filter" placeholder="Filter stocks..." />
          </div>
          <div
            class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
          >
            <UButton
              icon="i-mdi-file-document-plus-outline"
              label="Add stock"
              @click="openForm()"
              :disabled="selected.length !== 0"
              color="teal"
              :ui="{
                color: {
                  teal: {
                    solid:
                      'shadow-sm ring-1 ring-inset ring-teal-400 dark:ring-gray-700 text-teal-800 dark:text-gray-200 bg-teal-300 hover:bg-teal-400 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
                  },
                },
              }"
            />
            <UModal v-model="openStatus">
              <div class="p-4">
                <StockForm :details="selected[0]" />
              </div>
            </UModal>
          </div>
          <div
            class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
          >
            <UButton
              icon="i-mdi-delete-outline"
              label="Remove stock"
              @click="removeStocks(selected)"
              :disabled="selected.length < 1"
              color="red"
              :ui="{
                color: {
                  red: {
                    solid:
                      'shadow-sm ring-1 ring-inset ring-red-400 dark:ring-gray-700 text-red-800 dark:text-gray-200 bg-red-300 hover:bg-red-400 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
                  },
                },
              }"
            />
          </div>
          <div
            class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
          >
            <UButton
              icon="i-mdi-pencil-outline"
              label="Edit stock"
              @click="openForm"
              :disabled="selected.length !== 1"
              color="blue"
              :ui="{
                color: {
                  blue: {
                    solid:
                      'shadow-sm ring-1 ring-inset ring-blue-400 dark:ring-gray-700 text-blue-800 dark:text-gray-200 bg-blue-300 hover:bg-blue-400 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
                  },
                },
              }"
            />
          </div>
        </div>

        <div
          class="content-end px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
        >
          <UPagination
            v-model="page"
            :page-count="pageCount"
            :total="currentStocks.length"
          />
        </div>
      </div>

      <div>
        <UTable
          :key="currentStocks"
          :ui="{
            wrapper: 'relative overflow-hidden hover:overflow-x-scroll',
            base: 'max-w-fit table-fixed',
          }"
          :loading="pending"
          :empty-state="{
            icon: 'i-heroicons-circle-stack-20-solid',
            label: 'No items.',
          }"
          v-model="selected"
          :rows="filteredRows(currentStocks)"
          :columns="selectColumns"
          @select="select"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const { loggedIn, login, loggedInStatus } = useAuthStore();
console.log("index-loggedInStatus.value:", loggedInStatus.value);
if (!loggedInStatus.value) {
  await navigateTo("/login");
}
const loginToken = useCookie("access-token");
if (!loginToken.value) {
  await navigateTo("/signup");
}
const { openForm, setStocks, openStatus, currentStocks } = useTableStore();
const filter = useStockFilter();
const page = useStockPage();
const pageCount = 10;
const pending = false; //const { pending, data: stockDetails } = await useLazyAsyncData('stockDetails', () => $fetch('/api/stock-details'))
const selected = useSelectedStocks();
const selectColumns = ref([...columns]); //use store or possibly shallow ref
const { stocks } = await getStocks();
const filteredRows = (stockList) => {
  if (!filter.value) {
    return stockList.slice(
      (page.value - 1) * pageCount,
      page.value * pageCount
    );
  }
  return stockList
    .filter((stock) => {
      return Object.values(stock).some((value) => {
        return String(value).toLowerCase().includes(filter.value.toLowerCase());
      });
    })
    .slice((page.value - 1) * pageCount, page.value * pageCount);
};
const removeStocks = async (stockSelection) => {
  const { stocks, message, color } = await deleteStock(stockSelection);
  selected.value = [];
  setStocks(stocks);
  createToast(message, color);
};
function select(row) {
  const index = selected.value.findIndex((item) => item.id === row.id);
  if (index === -1) {
    selected.value.push(row);
  } else {
    selected.value.splice(index, 1);
  }
}
setStocks(stocks);
</script>

<style scoped></style>
