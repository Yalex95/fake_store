<template>
  <button
    :id="buttonId"
    type="button"
    :class="[
      { 'rounded-full': rounded },
      'tw-button flex justify-center items-center',
      buttonClass,
      'variant-' + variant,
    ]"
    :disabled="buttonDisabled"
    @click="handleClick"
  >

    <slot name="button-icon-left" v-if="!loading"></slot>
    <slot name="button-img" v-if="!loading"></slot>
    <span v-if="buttonText" :class="buttonTextClass">{{ buttonText }}</span>
    
      <UILoading v-if="loading" loadingClass="ml-3 w-5 h-5" loadingColor="#fff"/>
    
    <slot name="button-icon-right" v-if="!loading"></slot>
  </button>
</template>

<script setup>
import "@/assets/css/button.css";

const props = defineProps([
  "buttonId",
  "buttonClass",
  "rounded",
  "buttonTextClass",
  "buttonText",
  "buttonDisabled",
  "isVariant",
  "variant",
  "loading"
]);

const emit = defineEmits(["on-button-click"]);

function handleClick(event) {
  if (!props.loading) {
    emit("on-button-click", event);
  }
}
</script>
<style >

.loader {
    width: 10px;
    height: 10px;
    border: 1px solid #93bce0;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

</style>