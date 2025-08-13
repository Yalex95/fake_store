<template>
  <div class="">
    
    <ul class="inline-flex gap-2 mt-5">
      <li
        v-for="variant in variants"
        :key="variant.id"
        class="rounded border-1 border-gray-300 text-xs py-2 hover:border-gray-700"
        :class="[selectedVariant==variant.id?'border-gray-700':'']"
      >
        <NuxtLink :to="`/product/${variant.id}`" >
          <img
            :src="variant.image_url"
            alt="product image"
            class="w-20 h-20 object-contain px-2"
          />
          <hr class="my-1 text-gray-300" />
          <div class="px-2">
            <p class="font-semibold text-gray-700">${{ variant.finalPrice }}</p>
            <p class="text-gray-500">
              <s>${{ variant.price }}</s>
            </p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script setup>
const props = defineProps({
  variants: {
    type: Array,
    default: [],
  },
  selectedVariant:{
    type:String,
    default:""
  }

});
</script>
