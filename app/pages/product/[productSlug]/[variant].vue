<template>
  <div>
    <NuxtLayout name="custom">
      <ProductDetailView :productDetails="productDetails.data"/>
     <div class="">
     </div>

    </NuxtLayout>
  </div>
</template>
<script setup>
const route= useRoute();
const variantId = route.params.variant;

const {data: productDetails, status,error}=await useFetch(`/api/products/${variantId}`)
</script>