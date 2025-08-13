<template>
  <div class="flex items-center justify-center">
    <div class="w-10/12 flex gap-20">
      <!-- Product Images -->
      <div class="flex w-1/2 gap-20 h-auto">
        <!-- images grid -->
        <div
          v-if="productDetails.product_images.length > 0"
          class="w-20 p-3 items-center overflow-y-scroll overflow-x-hidden flex flex-col gap-4"
        >
          <div
            v-for="images in productDetails.product_images"
            class="w-10 h-10 border-1 border-gray-300 rounded-md flex justify-center items-center hover:bg-gray-300"
          >
            <img
              :src="images.image_url || '/images/no_image.png'"
              :alt="productDetails.title"
              class="object-contain"
            />
          </div>
        </div>
        <!-- selected image -->
        <div class="w-full">
          <img
            :src="
              productDetails.image_url || '/images/no_image.png'
            "
            :alt="productDetails.title"
          />
        </div>
      </div>
      <!-- Product deatils info-->
      <div class="w-1/2">
        <ProductDetailInfo
          :product-info="productDetails"
        />
        <ProductVariants
          :variants="productDetails.product.availableVariants"
          :selectedVariant="productDetails.id"
        />
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

</script>
