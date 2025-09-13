<template>
  <div v-for="product in products" :key="product.id" class="hover:border-[1px] hover:border-black">
    <ClientOnly>
      <a
        v-if="product?.id"
        :href="product?.variant.slug"
        class="cursor-pointer "
      >
       <div class="relative group ">
         <!-- image  -->
        <img
          :src="product?.variant.image || '/images/no_image.png'"
          :alt="product.name"
          :class="[
            '  w-full h-56 group-hover:hidden',
            !product?.variant.image ? 'object-fit p-5' : 'object-cover',
          ]"
        />
        <div class=" group-hover:block hidden">
          <img
            v-for="variant in product.variants"
            :src="variant.gallery[0].image_url"
            :alt="variant.name"
            :class="[' w-full h-56 object-cover',variant.id==product.variant.id?'block':'hidden']"
          />
          <div class="flex gap-2 mt-2">
            <img 
              v-for="variant in product.variants"
              :src="variant.image"
              :class="['w-10 h-10 object-cover',variant.id==product.variant.id?'border-b-2 border-black order-first':'']"
              :alt="variant.name"
            />
          </div>
        </div>
       </div>
        <!-- image  end -->
        <div class="flex justify-start flex-col p-3 text-md">
          <p class="font-bold text-gray-600">
            ${{
              product.variant.standardPrice == product.variant.salePrice
                ? product.variant.standardPrice
                : product.variant.salePrice
            }}
          </p>
          <p class="text-gray-600 m-0">
            {{ product.name }}
          </p>
          <p class="text-gray-500 m-0">
            <span v-for="cat in product.categories">{{
              ` ${cat.category.name}`
            }}</span>
          </p>
          <p v-if="product.variants.length > 1">
            {{ product.variants.length }} Colors
          </p>
        </div>
      </a>
    </ClientOnly>
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
  id: string;
  standardPrice: string;
  salePrice: string;
  image: string;
}
interface prod_category {
  parent: parent;
  name: string;
}
interface parent {
  name: string;
}
interface Product {
  id: string;
  name: string;
  prod_category: prod_category;
  description: string;
  rating: string;
  slug: string;
  variant: variant;
}

const router = useRouter();

const { setStars } = useProduct();

const viewProduct = (productId: string) => {
  router.push(`/product/${productId}`);
};
</script>
