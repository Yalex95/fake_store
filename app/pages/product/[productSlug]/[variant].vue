<template>
  <div>
    <NuxtLayout name="custom">
     <div class="my-20">
       <ProductDetailView :productDetails="productDetails.data"/>
     </div>

    </NuxtLayout>
  </div>
</template>
<script setup>
const route= useRoute();
console.log(route.params)
const variantId = route.params.variant;

const {data: productDetails, status,error}=await useFetch(`/api/products/${variantId}`)
</script>