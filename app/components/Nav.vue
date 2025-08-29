<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
const { data: categories, status, pending, error } = await useFetch('/api/categories', {
  method: 'GET',
})

const product_categories = categories.value?.map((prodcategory:any)=>{
  return{
    label: prodcategory.name,
    to:{path:'/explore',query:{category:prodcategory.name}},
  }
})
const items = ref<NavigationMenuItem[]>([
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Products',
    children: product_categories || [],
  },
  {
    label: 'Contact',
    to: '/',
    active: true,
  },
])

</script>

<template>
  <div class="flex xl:w-8/12 lg:w-10/12 mx-auto py-3 gap-10">
    <div class="logo">
      <img src="/images/logos/logo_shop_inline.webp" alt="Online Shop Logo" class="h-20" />
    </div>
    <div class="flex justify-between items-center w-full">
      <UNavigationMenu :items="items" class="w-full justify-center " color="neutral" variant="link" content-orientation="vertical"/>
      <!-- <UButton icon="material-symbols-light:shopping-bag-sharp" size="md" color="primary" variant="solid"></UButton> -->
      <UButton icon="material-symbols-light:login" size="md" color="neutral" class="bg-amber-500" variant="solid">Login</UButton>
    </div>
  </div>
</template>
