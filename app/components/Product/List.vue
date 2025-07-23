<template>
  <div class=" flex justify-center">
    <div class="mx-auto w-8/12  py-16 sm:py-24 lg:w-8/12 ">
      
        <SectionHeader title="Our Products"/>

      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
        <ProductItem :products="productsList.data"/>
      </div>
     <div class="flex justify-center items center mt-5">
       <UPagination v-model:page="page" 
       :items-per-page="limit"
        :total="productsList.meta.total"
         />
     </div>
    </div>
  </div>
</template>

<script setup >
const route = useRoute();
const router = useRouter();
const limit =ref(3)
const  page = ref(parseInt(route.query.page) || 1);



const {data: productsList, status, pending,error, refresh} = await useFetch(`/api/products?limit=${limit.value}`,{
method:'GET',
query:{
  page,
},
})

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