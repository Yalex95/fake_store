<template>
  <div
    v-for="product in products"
    :key="product.id"
    class="  border-2 border-solid rounded-xl border-gray-200 px-5 pt-5 pb-3"
  >
  <!-- image and favorite icon -->
    <div
      class="rounded-xl  lg:aspect-auto lg:h-80 text-center container flex items-center overflow-hidden relative"
    >
      <!-- favorite -->
      <ULink as="button" class="group absolute top-1 right-1 cursor-pointer ">
        <UIcon
          name="material-symbols:favorite-outline"
          class="size-8 group-hover:hidden block"
        />
        <UIcon
          name="material-symbols:favorite"
          class="size-8 group-hover:block hidden text-red-500"
        />
      </ULink>
      <!-- image -->
      <img
        v-show="product?.defaultVariant && product?.defaultVariant?.image_url"
        :src="product?.defaultVariant?.image_url"
        :alt="product.title"
        class="rounded-md bg-gray-200 group-hover:opacity-75 w-full h-full object-cover"
      />
    </div>
  <!-- image and favorite icon end -->

    <div class="flex justify-start gap-3 flex-col pb-6 mt-3">
      <div >
        <p class="text-gray-400 mb-0 text-sm">
          <span class="font-semibold">SKU:</span>
          <span class="">{{ product?.defaultVariant?.sku }}</span>
        </p>
        <h3 class="text-lg text-sky-600 uppercase font-bold mt-2">
          {{ product.title }}
        </h3>
      </div>
      <div class="flex justify-start gap-1">
        <UIcon
          v-for="i in 5"
          :name="setStars(i, product.rating)"
          class="size-6"
        />
      </div>
      <div class="flex justify-start gap-1 overflow-hidden">
        <NuxtLink
          v-for="i in product.availableColors"
          :to="`/products/${i.variantID}`"
          class="rounded-full border-1 border-gray-600 w-5 h-5 p-2"
          :style="{ backgroundColor: i?.color }"
        >
        </NuxtLink>
      </div>
     <div class="flex justify-between items-end">
      <div class="flex flex-col w-fit">
         <p class="text-base  text-gray-500 line-through">
        ${{ product.defaultVariant?.price }}
      </p>
       <p class="text-lg font-semibold  text-gray-900">
        ${{ product.defaultVariant?.finalPrice }}
      </p>
      </div>
      <div v-if="product?.defaultVariant?.percentageOff" class="bg-red-500 flex gap-1 items-center text-white rounded-full px-2 py-1 text-xs w-1/3 h-8 justify-center ">
        <UIcon
          name="ic:round-discount"
          class="size-3 hover:hidden block"
        />
        - {{ product?.defaultVariant?.percentageOff }}%
      </div>
     </div>
      
    </div>
    <div class="flex gap-3 border-gray-200 pt-3 border-t-2">
      
      <UButton
        size="lg"
        class="w-2/3 flex text-center justify-center bg-[#134197] hover:bg-green-700  font-bold rounded-md"
        
        >Buy</UButton
      >
      <UButton
        icon="qlementine-icons:add-to-cart-16"
        size="lg"
        class="w-1/3 flex text-center justify-center bg-[#134197] hover:bg-green-700 font-bold rounded-md"
        
        ></UButton
      >
    </div>
  </div>
</template>
<script setup lang="ts">
  import * as z from 'zod'
  import type { FormSubmitEvent } from '@nuxt/ui'
const props = defineProps({
  products: {
    type: Array,
    default: () => [],
  },
});
const setStars = (index: number, productRating: float) => {
  return index <= Math.floor(Number(productRating))
    ? "material-symbols:star-rate"
    : index - productRating < 1
    ? "material-symbols:star-half"
    : "material-symbols:star-outline";
};


</script>
