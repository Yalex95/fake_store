<template>
  <div>
    <h2>Categories</h2>
    <div class="flex justify-center items-center  ">
      <!-- categores -->
      <div class="container bg-[#1B8BCA] max-w-[1000px] flex justify-between p-3 rounded-lg">
         <div v-for="category in categories" :key="category" class="container flex flex-col items-center gap-4  w-fit px-3 py-5">
        
        <NuxtLink class="text-lg font-semibold uppercase text-white" to="#">{{ category }}</NuxtLink>
       </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

const {data:categories,status,pending,error}=await useFetch('https://fakestoreapi.com/products/categories')
</script>