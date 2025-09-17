<template>
  <div class="mt-3 flex flex-col gap-3 ">
    <p class="text-base font-bold">{{ filterName }}</p>
  <!-- <UCheckboxGroup v-model="selected" :items="items" /> -->
  </div>
  
</template>
<script setup>
const props = defineProps({
  url: {
    type: String,
    default: "/api/brands",
  },
  filterName:{
    type: String,
    default:""
  }
});
const { data: options } = await useFetch(`/api/${props.url}`);
const selected = ref([]);
const items = ref([]);
if (options.value) {
  items.value = options.value.map((op) => op.name);
}
</script>
