<template>
  <div v-for="product in products" :key="product.id" class="group relative border-2 border-solid rounded-xl border-gray-200 px-5 py-8">
          <div class="rounded-xl  p-5 lg:aspect-auto lg:h-80  text-center container flex items-center overflow-hidden">
           <div class=" "> <img :src="product.image" :alt="product.title" class="rounded-md bg-gray-200 group-hover:opacity-75 " /></div>
          </div>
          <div class="flex justify-between">
            <div class="flex justify-center items-center gap-2">
              <p class="mt-1 text-sm text-gray-500">{{ product.rating.rate }}</p>
              <Icon name="heroicons:star-16-solid" style=""/>
            </div>
              <div class="flex justify-center items-center">
                <p class="mt-1 text-sm text-gray-500">{{ product.rating.count }}</p>
              </div>
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <a :href="product.href">
                  {{ product.title }}
                </a>
              </h3>
              
            </div>
            <div class="flex gap-2 justify-centet items-center">
              <Icon name="heroicons:currency-dollar"/>
              <p class="text-sm font-medium text-gray-900"> {{ product.price }}</p>
            </div>
          </div>
          <!-- <Button  :buttonId="product.id" :rounded="true" buttonText="add to cart" :isVariant="true" variant="light-blue"/> -->
          <UButton icon="i-lucide-rocket" size="md" color="primary" variant="solid">Button</UButton>
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