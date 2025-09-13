<template>
  <div class="flex items-center justify-center">
    <div class="w-11/12 flex ">
      <!-- Product Images -->
      <div class="flex w-3/4 ">
        <!-- selected image -->
        <div class="grid grid-cols-2">
          <img v-for="prod in productDetails.gallery"
            :src="
              prod.image_url || '/images/no_image.png'
            "
            :alt="prod.id"
            class="w-[500px] h-[400px]  object-cover aspect-[1/1]"
          />
        </div>
      </div>
      <!-- Product deatils info-->
      <div class="w-1/4">
        <ProductDetailInfo
          :product-info="productDetails"
        />
        <!-- <ProductVariants
          :variants="productDetails.product.availableVariants"
          :selectedVariant="productDetails.id"
        /> -->
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  productDetails: {
    type: Object,
    default: {},
  },
});
console.log(props.productDetails)
</script>
