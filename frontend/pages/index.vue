<template>
  <div>
    <h1 class="mb-8 ml-4">Stocks table</h1>
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
          @click="deleteStock(selected)"
          :disabled="selected.length < 1"
        />
      </div>
      <div
        class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
      >
        <UButton
          label="Edit stock"
          @click="isOpen = true"
          :disabled="selected.length !== 1"
        />
      </div>
    </div>

    <UTable
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
    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="stockDetails.length"
      />
    </div>
  </div>
</template>

<script setup>
//selectable, row listener, empty, searchable, sortable, selectMenue, pagination, loading

const stockDetails = useStockList();
stockDetails.value = await getStocks();
const selectColumns = ref([...columns]); //use store or possibly shallow ref
const selected = ref([]); //useSelectStocks();
const isOpen = useOpenStockForm();
const filter = useStockFilter();
const page = useStockPage();
const pageCount = 5;
const pending = false; //const { pending, data: stockDetails } = await useLazyAsyncData('stockDetails', () => $fetch('/api/stock-details'))
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
