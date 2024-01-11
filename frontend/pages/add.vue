<template>
  <div>
    <h1 class="mb-8 ml-4">Add</h1>
    <p>
      This is the main view where add version will be badfsgbvad aeignig
      noengern goieangiea ngoiaengf engf oi enien oer newo fneri gnoeira the can
      be ngewaingoeagf neaoig niewaon giaoewn fwaeio nfoewrnfwiaenfowe nifoaweis
      fnwseian fiwsen woi fniwe nfseof
    </p>
    <ul>
      selectedColor.value
      {{
        selectedColor
      }}
      <li v-for="color in availableColors" :key="color">{{ color }}</li>
    </ul>
    >
    <div>{{ data }}</div>
  </div>
</template>

<script setup>
const { data } = await useFetch("/api/rita?name=lauritta", {
  method: "post",
  body: {
    age: 50,
  },
});
const selectedColor = useSelectorColor();
const availableColors = useAvailableColors();

selectedColor.value = "red";
availableColors.value.push("pink");
//const { data } = await useFetch("/api/rita")  for api call with private
</script>

<style scoped></style>
