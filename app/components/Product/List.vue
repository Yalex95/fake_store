<template>
    <div class=" w-full py-20">
      
        <SectionHeader v-if="productsList?.data.length > 0" :title="title"/>

      <div :class="[productsList?.data.length > 0?'mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ':'flex justify-center']">
        <ProductItem 
        v-if="productsList?.data.length > 0" :products="productsList?.data"/>
        <div v-else class="text-black-500">
          <p>No products to show.</p>
        </div>
      </div>
     <div v-if="productsList?.data.length > 0 && productsList?.data.length > limit" class="flex justify-center items center mt-5">
       <!-- <UPagination v-model:page="page" 
       :items-per-page="limit"
        :total="productsList.meta.total"
         /> -->
     </div>
    </div>
 
</template>

<script setup >
const props = defineProps({
  title:{
    type: String,
    default: 'Our Products',
  },
  limit:{
    type: Number,
    default:10
  }
})
const route = useRoute();
const router = useRouter();
const  page = ref(parseInt(route.query.page) || 1);
const category = ref(route.query.category || null)

// const page = ref(parseInt(route.query.page) || 1)
// const category = ref(route.query.category || null)

// construimos la URL en base a los valores reactivos
// const url = computed(() => {
//   const params = new URLSearchParams({
//     page: page.value.toString(),
//     limit: props.limit.toString(),
//   })
//   if (category.value) {
//     params.append('category', category.value)
//   }
//   return `/api/products?${params.toString()}`
// })

// fetch automático cada vez que cambie la URL
const { data: productsList, status, pending, error } = await useFetch('/api/products', {
  immediate: true, // carga al inicio
})
console.log(productsList.value)
// const query = computed(()=>({
//     category: category.value,
//     limit: props.limit,
//     page: page.value
//   }))
// const url =computed(()=>`/api/products?category=${category.value}&page=${page.value}`)
// const {data: productsList, status, pending,error, refresh} = await useFetch(url,{
// method:'GET',
// })


</script>