<template>
  <div class="text-red-600 flex items-center gap-2" v-if="errorMsg && errorMsg.length">
    <Icon name="heroicons:exclamation-circle" class="h-5 w-5" />
    <span class="text-xs italic">{{ errorMsg }}</span>
  </div>
</template>
<script setup>
const props = defineProps({
  errorMsg: { 
    type: String,
     default: "" ,
  },
});
</script>