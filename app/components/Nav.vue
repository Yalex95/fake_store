<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Home',
    icon: 'i-lucide-book-open',
    to: '/',
  },
  {
    label: 'Products',
    icon: 'i-lucide-database',
    to: '/',
    children: [
      {
        label: 'useToast',
        icon: 'i-lucide-file-text',
        description: '',
        to: '/'
      }
    ]
  },
  {
    label: 'contact',
    icon: 'i-lucide-box',
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
      <UNavigationMenu :items="items" class="w-full" />
      <UButton icon="material-symbols-light:shopping-bag-sharp" size="md" color="primary" variant="solid"></UButton>
    </div>
  </div>
</template>
