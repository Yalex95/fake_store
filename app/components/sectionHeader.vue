<template>
  <div :class="wrapperClass">
    <h2  :class="textClass">
       {{ title }} </h2>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'New Arrivals',
  },
  textClass:{
    type: String,
    default:"text-2xl font-bold text-gray-900 uppercase"
  },
  wrapperClass:{
    type: String,
    default:"flex justify-start"
  },
})

</script>