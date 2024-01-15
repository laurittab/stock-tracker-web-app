<template>
  <div class="">
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
            <UInput v-model="updatedFilters" placeholder="Filter stocks..." />
          </div>
          <div
            class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
          >
            <UButton
              label="Add stock"
              @click="openForm"
              :disabled="selection.length !== 0"
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
                <StockForm :details="selection[0]" />
              </div>
            </UModal>
          </div>
          <div
            class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
          >
            <UButton
              label="Remove stock"
              @mousedown="removeStocks(selection)"
              @mouseup="reRenders()"
              :disabled="selection.length < 1"
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
              label="Edit stock"
              @click="openForm"
              :disabled="selection.length !== 1"
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
          v-model="selection"
          :rows="filteredRows(updatedFilters, currentStocks)"
          :columns="selectColumns"
          @select="select"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
//selectable, row listener, empty, searchable, sortable, selectMenue, pagination, loading
import { useTableStore } from "@/stores/table";
const {
  tableKey,
  stockDetailss,
  filters,
  reRenders,
  select,
  openForm,
  setStocks,
  removeStocks,
  incrementKey,
  updatedKey,
  selection,
  openStatus,
  currentStocks,
  updatedFilters,
} = useTableStore();
const { stocks } = await getStocks();
setStocks(stocks);
const selectColumns = ref([...columns]); //use store or possibly shallow ref
const page = useStockPage();
const pageCount = 10;
const pending = false; //const { pending, data: stockDetails } = await useLazyAsyncData('stockDetails', () => $fetch('/api/stock-details'))
const filteredRows = (aFilter, stockList) => {
  if (!aFilter) {
    return stockList.slice(
      (page.value - 1) * pageCount,
      page.value * pageCount
    );
  }
  return stockList
    .filter((stock) => {
      return Object.values(stock).some((value) => {
        return String(value).toLowerCase().includes(aFilter.toLowerCase());
      });
    })
    .slice((page.value - 1) * pageCount, page.value * pageCount);
};
</script>

<style scoped></style>
