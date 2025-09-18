<template>
  <div class="w-full">
    <div class="mx-auto w-full rounded-2xl bg-white">
      <Disclosure
        v-for="(item, index) in disclosure"
        as="div"
        v-slot="{ open }"
        :class="[index == 0 ? '' : 'mt-2']"
      >
        <DisclosureButton
          :class="[headerTextColor,bgColor,headerClass,'flex w-full justify-between ']"
        >
          <span>{{ item.header }}</span>
          <Icon
            name="heroicons:chevron-up-16-solid"
            :class="[iconColor,open ? 'rotate-180 transform' : '']"
            class="h-5 w-5 "
          />
        </DisclosureButton>
        <DisclosurePanel :class="[textColor,panelClass]">
          {{ item.content }}
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

const props = defineProps({
  disclosure: {
    type: Array,
    default: [{ header: "header", content: "content" }],
  },
  iconColor: {
    type: String,
    default:'text-purple-500'
  },
  headerTextColor:{
    type:String,
    default:'text-gray-900'
  },
  headerClass:{
    type:String,
    default:''
  },
  panelClass:{
type:String,
default:''
  },
  textColor:{
    type:String,
    default:'text-gray-500'
  },
  bgColor:{
    type:String,
    default:'hover:bg-purple-200 bg-purple-100 '
  }
});
</script>
