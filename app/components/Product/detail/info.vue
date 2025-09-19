<template>
  <div class="flex flex-col gap-3">
    <span class="flex justify-end items-center"
      ><Icon
        v-for="i in 5"
        :name="setStars(i, productInfo.product.rating)"
        class="size-4"
      />{{ productInfo.product.rating }}</span
    >
    <h1 class="text-3xl font-bold uppercase">{{ productInfo.name }}</h1>
    <span class="text-xl font-bold">
      $
      {{ productInfo.salePrice }}</span
    >

    <span class="text-sm text-gray-500 flex items-center gap-1 mt-2"
      >${{ productInfo.standardPrice }}
    </span>
    <p class="font-bold text-md">Colors</p>
    <div class="grid grid-cols-5 gap-1">
      <a                                                                                                                                                                                                                            
        :href="variant.slug"
        class=""
        v-for="variant in productInfo.product.variants"
      >
        <img :src="variant.image" :alt="variant.name" />
      </a>
      <span class="col-span-5">
        <span v-for="(variant_color, index) in productInfo.product.variants">{{
          productInfo.product.variants.length > index + 1
            ? ` ${variant_color.color}`
            : `/${variant_color.color} `
        }}</span>
      </span>
    </div>
    <p class="font-bold text-md">Sizes</p>

    <div class="grid grid-cols-4 gap-1">
      <span
        v-for="variantSize in productInfo.skus"
        :class="[
          'bg-gray-200 px-3 py-2 text-sm cursor-pointer',
          variantSize.stock > 0 ? '' : ' line-through opacity-25',
        ]"
        >MX
        {{ variantSize.size }}
      </span>
    </div>
    <div>
      <UITwButton
        buttonId="addCart"
        buttonClass="bg-black-500"
        rounded=""
        buttonTextClass="text-white"
        buttonText=""
      />
      <UITwButton />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  productInfo: {
    type: Object,
    default: {},
  },
});
const { setStars } = useProduct();
</script>
