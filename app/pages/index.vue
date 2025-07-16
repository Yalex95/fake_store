<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <div>
    <NuxtLayout name="custom">
      <!-- <template #header> Some header template content. </template> -->

      <div class="flex justify-center">
        <ProductList/>
      </div>
    </NuxtLayout>
  </div>
</template>
