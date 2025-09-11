<template>
  <div>
    <NuxtLayout name="custom">
      <!-- <template #header> Some header template content. </template> -->

      <div class="hero flex w-full justify-center items-center">
        <img
          src="/images/hero_banner.webp"
          class="object-cover w-full h-auto"
          alt="monday super sale"
        />
      </div>

      <!-- Categories -->
      <div class="flex justify-between   gap-x-20">
        <div class="w-1/4 border-r-1 border-gray-100 pt-10 ps-10">
          <p class="font-bold text-lg">Filter By</p>
          <!-- <Filter url="categories" filterName="Categories"/> -->
              <!-- <hr class="text-gray-200 "/> -->
          <!-- <Filter url="brands" filterName="Brands"/> -->
        </div>
       
        <ProductList />
      </div>
      <!-- Offers -->
      <!-- recomended -->
    </NuxtLayout>
  </div>
</template>
<script setup>
definePageMeta({
  layout: false,
});
// const appConfig = useAppConfig()
</script>
