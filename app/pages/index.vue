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

      <!-- Product List -->
      <div >
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
