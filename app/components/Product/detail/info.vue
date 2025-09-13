<template>
  <div class=" flex flex-col gap-3">
    <!-- <h1 class="text-3xl font-bold">{{ productInfo.product.title }}</h1>
        <span
          >{{ productInfo.product.rating }}
          <!-- <UIcon
            v-for="i in 5"
            :name="setStars(i, productInfo.product.rating)"
            class="size-4"/> -->
      <!-- </span>  -->
      <!-- <span>SKU: {{ productInfo.data.skus }}</span> -->
        
        <div class="deal f">
          <!-- <span class="bg-red-600 text-white text-xl font-bold rounded-md px-3 py-1 "
              >On promotion</span
            > -->
          <div
            class="flex items-center gap-3 mt-3"
          >
            <!-- <span class="text-red-600 font-thin text-2xl rounded-md "
              >{{ productInfo.percentageOff }}%</span
            > -->
            <span class="text-2xl font-semibold">
              <sup>$</sup>
              {{
                productInfo.data.salePrice
              }}</span
            >
          </div>
          <span
            class="text-sm text-gray-500 flex items-center gap-1 mt-2"
            >${{
              productInfo.data.standardPrice
            }}
            <!-- <UIcon name="material-symbols:info" class="w-4 h-4"
          /> -->
        </span>
        </div>
        
        <p v-for="variantSize in productInfo.data.skus"><span class="font-semibold">Size:</span> {{ variantSize.size }}</p>
        <div class="flex items-center gap-2">
          <p class="font-semibold">Color:{{ productInfo.data.color }}</p>
          <!-- <span class="rounded-full border-1 w-5 h-5 p-2" :style="{backgroundColor:productInfo.color}"></span> -->
        </div>

  </div>
</template>
<script setup>
const props = defineProps({
  productInfo:{
    type:Object,
    default:{}
  },
})
const { setStars } = useProduct();
console.log(props.productInfo)
</script>