<template>
  <div v-for="product in products" :key="product.id"
    class="  border-2 border-solid rounded-xl border-gray-200  px-5 pt-5 pb-3">
    <ClientOnly>
      <a v-if="product?.id" :href="product?.variant.slug" class=" cursor-pointer">
      <!-- image and favorite icon -->
      <div class="rounded-xl  lg:aspect-auto lg:h-56 text-center container flex items-center overflow-hidden relative">
        <!-- favorite -->
        <NuxtLink as="button" class="group absolute top-1 right-1 cursor-pointer ">
          <Icon name="material-symbols:favorite-outline" class="size-8 group-hover:hidden block" />
          <Icon name="material-symbols:favorite" class="size-8 group-hover:block hidden text-red-500" />
        </NuxtLink>
        <!-- image -->
        <img :src="product?.variant.image || '/images/no_image.png'" :alt="product.name"
          :class="['rounded-md bg-gray-200 group-hover:opacity-75 w-full h-56', !product?.variant.image ? 'object-fit p-5' : 'object-cover']"
          class="rounded-md bg-gray-200 group-hover:opacity-75 " />

      </div>
      <!-- image and favorite icon end -->

      <div class="flex justify-start gap-3 flex-col pb-6 mt-3">
        <div>
          <!-- <p class="text-gray-400 mb-0 text-sm">
            <span class="font-semibold">SKU:</span>
            <span class="">{{ product?.defaultVariant?.sku }}</span>
          </p> -->
          <h3 class="text-lg text-sky-600 uppercase font-bold mt-2">
            {{ product.name }}
          </h3>
        </div>
        <!-- <div class="flex justify-start gap-1">
          <Icon v-for="i in 5" :name="setStars(i, product.rating)" class="size-6" />
        </div> -->
        <!-- <div class="flex justify-start gap-1 overflow-hidden">
          <button v-for="i in product.availableColors" @on-button-click="viewProduct(i.variantID)" :key="i.variantID"
            class="rounded-full border-1 border-gray-600 w-5 h-5 p-2" :style="{ backgroundColor: i?.color }">
          </button>
        </div> -->
        <div class="flex justify-between items-end">
          <div class="flex flex-col w-fit">
            
            <p class="text-base  text-gray-500 line-through">
              ${{ product.variant.standardPrice}}
            </p>
            <p class="text-lg font-semibold  text-gray-900">
              ${{ product.variant?.salePrice }}
            </p>
            <p v-for="cat in  product.categories" class="text-lg font-semibold  text-gray-600">
              {{ cat.category.name }} 
            </p>
          </div>
          <!-- <div v-if="product?.defaultVariant?.percentageOff"
            class="bg-red-500 flex gap-1 items-center text-white rounded-full px-2 py-1 text-sm font-semibold w-fit h-8 justify-center ">
            <Icon name="ic:round-discount" class="size-4 hover:hidden block" />
            - {{ product?.defaultVariant?.percentageOff }}%
          </div> -->
        </div>

      </div>
    </a>
    </ClientOnly>
    <!-- <div class="flex gap-3 border-gray-200 pt-3 border-t-2 ">

      <NuxtLink to="#" 
        class="w-full flex text-white text-center justify-center bg-[#134197] hover:bg-green-700  font-bold rounded-md py-2 text-lg uppercase">Buy
      </NuxtLink>
      <UITwButton 
      @on-button-click=""
      button-id="add-cart"
      buttonClass="justify-center w-1/3 flex bg-[#134197] hover:bg-green-700  rounded-md"
      buttonTextClass="text-center font-bold"
      buttonText=""
      :isVariant="true"
      variant="light-blue"
      :loading="false">
    <template v-slot:button-icon-right>
      <Icon  name="material-symbols:shopping-cart-outline" class="w-8 h-10 "/>
    </template>
    </UITwButton>
    </div> -->
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  products: {
    type: Array as PropType<Product[]>,
    default: () => [],
  },
});
interface variant {
  id:string;
  standardPrice: string,
  salePrice:string,
  image: string
}
interface prod_category{
  parent:parent,
  name:string
}
interface parent{
  name: string
}
interface Product {
  id: string;
  name: string;
  prod_category: prod_category,
  description: string,
  rating: string,
  slug: string,
  variant: variant
}

 const router = useRouter();

const {setStars}= useProduct();

const viewProduct=(productId: string)=>{
 router.push(`/product/${productId}`)
}
console.log(props.products);
</script>
