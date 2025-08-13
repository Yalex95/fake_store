<template>
  <div>
    <NuxtLayout name="custom">
     <div class="my-20">
       <ProductDetailView :productDetails="productDetails"/>
     </div>

    </NuxtLayout>
  </div>
</template>
<script setup>
const route= useRoute();
const productId = route.params.product;
// console.log(route.params);
const {data: productDetails, status,error}=await useFetch(`/api/products/${productId}`)
</script>