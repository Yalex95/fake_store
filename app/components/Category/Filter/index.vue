<template>
  <div class="w-1/4">
    <div class="flex justify-center items-center">
      <div class="flex justify-center">
        <div class="mx-auto xl:w-11/12 py-16 sm:py-24 lg:w-11/12">
          <SectionHeader title="Categories" />

          <div
            class="mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
          >
            <!-- <UCheckboxGroup v-model="selectedCategories" :items="categories" /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Category {
  name: string;
}

const categories = ref<string[]>([]);
const selectedCategories = ref<string[]>([]);
const {data: categoriesData,status,pending,error} = await useFetch<Category[]>(`/api/categories`)
// console.log(categoriesData)
if (categoriesData.value) {
  categories.value = categoriesData.value.map(cat => cat.name);
}
</script>
