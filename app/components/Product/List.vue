<template>
  <div class=" flex justify-center">
    <div class="mx-auto xl:w-11/12   py-16 sm:py-24 lg:w-11/12 ">
      
        <SectionHeader :title="title"/>

      <div class="mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
        <ProductItem 
        v-if="productsList.data.length > 0" :products="productsList?.data"/>
        <div v-else class="text-black-500">
          <p>No products to show.</p>
        </div>
      </div>
     <div v-if="productsList.data.length > 0 && productsList.data.length > limit" class="flex justify-center items center mt-5">
       <UPagination v-model:page="page" 
       :items-per-page="limit"
        :total="productsList.meta.total"
         />
     </div>
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
const query = computed(()=>{
  return {
    category: category.value,
    limit: props.limit,
    page: page.value
  }
})


const {data: productsList, status, pending,error, refresh} = await useFetch(`/api/products`,{
method:'GET',
query
})

// const { data: productsList, error, refresh } = await useAsyncData('products', () =>
//   $fetch('/api/products', { method: 'GET', query: query.value })
// )
watch(page,(newPage)=>{
  router.push({
    query:{
      ...route.query,
      page: newPage
    },
    // hash: route.hash
  })
})
</script>