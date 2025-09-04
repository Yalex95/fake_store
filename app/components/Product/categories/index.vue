<template>
  <div class="flex justify-center items-center  ">
    <!-- categores -->
    <div class="container  max-w-[1000px] flex justify-between py-5 px-3 rounded-lg">
      <NuxtLink v-for="category in categories" :key="category.id"
        class="text-lg font-semibold uppercase flex flex-col gap-4 items-center justify-center p-10 hover:bg-gray-100 "
        :to="{path:`/explore`,query:{category:category.name}}">
        <!-- <UIcon :name="icons[category.name ?? ''] || 'mdi:help-circle'" class="size-12 inline-block" /> -->
        <p>{{ category.name }}</p>
      </NuxtLink>

    </div>
  </div>

</template>
<script setup lang="ts">

const { data: categories, status, pending, error } = await useFetch('/api/categories', {
  method: 'GET',
})
const icons: Record<string, string> = {
  Beauty: "mdi:lipstick",
  Grocery: "mdi:food",
  Electronics: "mdi:cellphone",
  Outdoors: "mdi:campfire",
}
</script>