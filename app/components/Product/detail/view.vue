<template>
  <div class="my-20">
    <div class="flex items-center justify-center">
      <div class="flex gap-10 pe-10">
        <!-- Product Images -->
        <div class="flex flex-col w-3/4">
          <!-- selected image -->
          <div class="grid grid-cols-2 gap-[1px]">
            <img
              v-for="prod in productDetails.gallery"
              :src="prod.image_url || '/images/no_image.png'"
              :alt="prod.id"
              class="w-[500px] h-[400px] object-cover aspect-[1/1]"
            />
          </div>

          <div class="flex flex-col ms-5 mt-5">
            <UIAccordion
              :disclosure="disclosure"
              headerClass="rounded-lg  text-left text-sm font-medium px-4 py-2  focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
              panelClass="px-4 pb-2 pt-4 text-sm"
            />
          </div>
          <!-- variants -->
        </div>
        <!-- Product deatils info-->
        <div class="w-1/4">
          <ProductDetailInfo :product-info="productDetails" />
        </div>
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
const disclosure = [
  { header: "Descripcion", content: props.productDetails.product.description },
  { header: "Valoraciones", content: "" },
];
</script>
