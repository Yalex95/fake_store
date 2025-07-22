<template>
  <div
    v-for="product in products"
    :key="product.id"
    class="group relative border-2 border-solid rounded-xl border-gray-200 px-5 py-8 "
  >
    <div
      class="rounded-xl p-5 lg:aspect-auto lg:h-80 text-center container flex items-center overflow-hidden relative"
    >
    <ULink as="button" class="absolute top-0 right-0">  
      <UIcon name="material-symbols:favorite-outline" class="size-5 hover:hidden block" />
      <UIcon name="material-symbols:favorite" class="size-5 hover:block hidden text-red-500" />
    </ULink>
      <div class=" ">
        <img
          :src="product.image_url"
          :alt="product.title"
          class="rounded-md bg-gray-200 group-hover:opacity-75 w-full h-full  object-contain"
        />
      </div>
    </div>
  
    <div class="flex justify-start gap-3 flex-col">
      <h3 class="text-lg text-sky-600 uppercase font-bold mt-4">
        {{ product.title }}
      <!-- <a :href="product.href" class="line-clamp-1">
        {{ product.title }}
      </a> -->
    </h3>
    <p class="text-xl font-light text-gray-900"> $ {{ product.price }}</p>
    <UButton icon="qlementine-icons:add-to-cart-16" size="lg" class="w-full flex text-center justify-center  hover:bg-green-700 font-bold rounded-md"   color="success"
      >Add to cart</UButton
    >
    </div>
      
  </div>
</template>
<script setup>
const props = defineProps({
  products: {
    type: Array,
    default: () => [],
  },
});
</script>
