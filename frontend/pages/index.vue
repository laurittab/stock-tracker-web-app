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
            <UInput v-model="filter" placeholder="Filter stocks..." />
          </div>
          <div
            class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
          >
            <UButton
              label="Add stock"
              @click="isOpen = true"
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
            <UModal v-model="isOpen">
              <div class="p-4">
                <StockForm :details="selected[0]" />
              </div>
            </UModal>
          </div>
          <div
            class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
          >
            <UButton
              label="Remove stock"
              @mousedown="removeStock(selected)"
              @mouseup="reRerender()"
              :disabled="selected.length < 1"
              color="red"
              :ui="{
                color: {
                  grey: {
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
              @click="isOpen = true"
              :disabled="selected.length !== 1"
              color="blue"
              :ui="{
                color: {
                  grey: {
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
            :total="stockDetails.length"
          />
        </div>
      </div>

      <div>
        <UTable
          :key="tableKey"
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
          :rows="filteredRows"
          :columns="selectColumns"
          @select="select"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
//selectable, row listener, empty, searchable, sortable, selectMenue, pagination, loading
const tableKey = useTableKey();
const reRerender = async () => {
  selected.value = [];
  const { stocks, message, color } = await getStocks();
  stockDetails.value = stocks;
  createToast(message, color);
  tableKey.value++;
  console.log("rerendering table", tableKey.value);
};
const stockDetails = useStockList();
const { stocks } = await getStocks();
stockDetails.value = stocks;
const selectColumns = ref([...columns]); //use store or possibly shallow ref
const selected = ref([]); //useSelectStocks();
const isOpen = useOpenStockForm();
const filter = useStockFilter();
const page = useStockPage();
const pageCount = 10;
const pending = false; //const { pending, data: stockDetails } = await useLazyAsyncData('stockDetails', () => $fetch('/api/stock-details'))
const removeStock = async (selection) => {
  const { message, color } = await deleteStock(selection);
  console.log("index-removeStock-message", message, color);
  createToast(message, color);
};
function select(row) {
  const index = selected.value.findIndex((item) => item.id === row.id);
  //console.log(`item.id ${item.id} row.id ${row.id}`);
  if (index === -1) {
    selected.value.push(row);
  } else {
    selected.value.splice(index, 1);
  }
}
const filteredRows = computed(() => {
  if (!filter.value) {
    return stockDetails.value.slice(
      (page.value - 1) * pageCount,
      page.value * pageCount
    );
  }
  return stockDetails.value
    .filter((person) => {
      return Object.values(person).some((value) => {
        return String(value).toLowerCase().includes(filter.value.toLowerCase());
      });
    })
    .slice((page.value - 1) * pageCount, page.value * pageCount);
});
</script>

<style scoped></style>
