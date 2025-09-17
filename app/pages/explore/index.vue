<template>
 <NuxtLayout name="custom">
  <div class="flex w-full justify-center h-80 items-center">
    <h1 class="text-2xl font-bold">{{route.query.category}}</h1>
  </div>

  <div class="flex justify-center w-10/12 mx-auto">
    <ProductList :title="explore_filter"/>
  </div>
 </NuxtLayout>
</template>\
<script setup>
const route = useRoute();
const explore_filter = route.query.category || null

</script>