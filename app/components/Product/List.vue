<template>
  <div class=" flex justify-center">
    <div class="mx-auto w-8/12  py-16 sm:py-24 lg:w-8/12 ">
      
        <SectionHeader title="Our Featured Products"/>

      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
        <ProductItem :products="productsList"/>
      </div>
     <div class="flex justify-center items center mt-5">
       <UPagination v-model:page="page" 
       :items-per-page="limit" :total="productsData.length" :to="to"  :sibling-count="1" show-edges/>
     </div>
    </div>
  </div>
</template>

<script setup >
const route = useRoute();
const limit =ref(8)



const page = computed(()=>Number(route.query.page) || 1);
const {data: productsData} = await useFetch('https://fakestoreapi.com/products',{
  method:'GET'
})
const {data: productsList, status, pending,error, refresh} = await useFetch('https://fakestoreapi.com/products',{
method:'GET',
params: {
  limit,
  page
}
})
console.log(productsList.value)
function to(page) {
  return {
    query: {
      page
    },
  }
}
</script>