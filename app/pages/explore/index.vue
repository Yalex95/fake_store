<template>
 <NuxtLayout name="custom">
  <div class="flex w-full justify-center h-80 items-center">
    <h1 class="text-2xl font-bold">{{route.query.category}}</h1>
  </div>

  <ProductList :title="explore_filter"/>
 </NuxtLayout>
</template>\
<script setup>
const route = useRoute();
const explore_filter = route.query.category || null

</script>