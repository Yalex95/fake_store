<template>
  <div v-for="product in products" :key="product.id"
    class="  border-2 border-solid rounded-xl border-gray-200  px-5 pt-5 pb-3">
    <a v-if="product?.id" :href="`/product/${product?.defaultVariant?.id}`" class=" cursor-pointer">
      <!-- image and favorite icon -->
      <div class="rounded-xl  lg:aspect-auto lg:h-56 text-center container flex items-center overflow-hidden relative">
        <!-- favorite -->
        <NuxtLink as="button" class="group absolute top-1 right-1 cursor-pointer ">
          <!-- <UIcon name="material-symbols:favorite-outline" class="size-8 group-hover:hidden block" />
          <UIcon name="material-symbols:favorite" class="size-8 group-hover:block hidden text-red-500" /> -->
        </NuxtLink>
        <!-- image -->
        <img :src="product?.defaultVariant?.image_url || '/images/no_image.png'" :alt="product.title"
          :class="['rounded-md bg-gray-200 group-hover:opacity-75 w-full h-56', !product?.defaultVariant?.image_url ? 'object-fit p-5' : 'object-cover']"
          class="rounded-md bg-gray-200 group-hover:opacity-75 " />

      </div>
      <!-- image and favorite icon end -->

      <div class="flex justify-start gap-3 flex-col pb-6 mt-3">
        <div>
          <p class="text-gray-400 mb-0 text-sm">
            <span class="font-semibold">SKU:</span>
            <span class="">{{ product?.defaultVariant?.sku }}</span>
          </p>
          <h3 class="text-lg text-sky-600 uppercase font-bold mt-2">
            {{ product.title }}
          </h3>
        </div>
        <div class="flex justify-start gap-1">
          <!-- <UIcon v-for="i in 5" :name="setStars(i, product.rating)" class="size-6" /> -->
        </div>
        <div class="flex justify-start gap-1 overflow-hidden">
          <button v-for="i in product.availableColors" @on-button-click="viewProduct(i.variantID)" :key="i.variantID"
            class="rounded-full border-1 border-gray-600 w-5 h-5 p-2" :style="{ backgroundColor: i?.color }">
          </button>
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
          <div v-if="product?.defaultVariant?.percentageOff"
            class="bg-red-500 flex gap-1 items-center text-white rounded-full px-2 py-1 text-xs w-1/3 h-8 justify-center ">
            <!-- <UIcon name="ic:round-discount" class="size-3 hover:hidden block" /> -->
            - {{ product?.defaultVariant?.percentageOff }}%
          </div>
        </div>

      </div>
    </a>
    <div class="flex gap-3 border-gray-200 pt-3 border-t-2 ">

      <button size="lg"
        class="w-2/3 flex text-center justify-center bg-[#134197] hover:bg-green-700  font-bold rounded-md">Buy
      </button>
      <button icon="qlementine-icons:add-to-cart-16" size="lg"
        class="w-1/3 flex text-center justify-center bg-[#134197] hover:bg-green-700 font-bold rounded-md"></button>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  products: {
    type: Array as PropType<Product[]>,
    default: () => [],
  },
});
interface Variant {
  id:string;
  image_url: string;
  percentageOff: number;
  finalPrice: number;
  sku: string;
  price: number;
}
interface Colors{
  color: string;
}
interface Product {
  id: string;
  title: string;
  defaultVariant?:Variant; 
  rating: number;
  // availableColors: Colors;
}

 const router = useRouter();

const {setStars}= useProduct();

const viewProduct=(productId: string)=>{
 router.push(`/product/${productId}`)
}
</script>
