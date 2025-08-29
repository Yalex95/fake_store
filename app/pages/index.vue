<template>
  <div>
    <NuxtLayout name="custom">
      <!-- <template #header> Some header template content. </template> -->

      <div class="hero flex w-full justify-center items-center">
        <img
          src="/images/hero_banner.webp"
          class="object-cover w-full h-auto"
          alt="monday super sale"
        />
      </div>

      <!-- Categories -->
      <div class="flex">
        <div class="w-1/4">
          <div class="flex justify-center items-center">
            <div class="flex justify-center">
              <div class="mx-auto xl:w-11/12 py-16 sm:py-24 lg:w-11/12">
                <SectionHeader title="Categories" />

                <div
                  class="mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full">
          <div class="flex justify-center items-center">
            <ProductList />
          </div>
        </div>
      </div>
      <!-- Offers -->
      <!-- recomended -->
    </NuxtLayout>
  </div>
</template>
<script setup>
definePageMeta({
  layout: false,
});
// const appConfig = useAppConfig()
</script>
