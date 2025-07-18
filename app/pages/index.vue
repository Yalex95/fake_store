<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <div>
    <NuxtLayout name="custom">
      <!-- <template #header> Some header template content. </template> -->
       
       <div class="hero flex  w-full justify-center items-center">
        <img src="/images/hero_banner.webp" 
        class="object-cover w-full h-auto" alt="monday super sale">
        
       </div>

       <!-- Categories -->
        <ProductCategories/>

      <div class="flex justify-center">
        <ProductList/>
      </div>
    </NuxtLayout>
  </div>
</template>
