<template>
  <div class="w-1/4">
    <div class="flex justify-center items-center">
      <div class="flex justify-center">
        <div class="mx-auto xl:w-11/12 py-16 sm:py-24 lg:w-11/12">
          <SectionHeader title="Categories" />

          <div
            class="mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
          >
            <UCheckboxGroup v-model="value" :items="items" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { CheckboxGroupItem, CheckboxGroupValue } from '@nuxt/ui'

const items = ref<CheckboxGroupItem[]>(['System', 'Light', 'Dark'])
const value = ref<CheckboxGroupValue[]>(['System'])

</script>
