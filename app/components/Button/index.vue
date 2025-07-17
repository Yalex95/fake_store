<template>

  <button
    :id="buttonId"
    type="button"
    :class="[
      { 'rounded-full': rounded },
      'tw-button',
      buttonClass,
      'variant-' + variant,
    ]"
    :disabled="buttonDisabled"
    @click="handleClick"
  >

    <slot name="button-icon-left" v-if="!loading"></slot>
    <slot name="button-img" v-if="!loading"></slot>
    <span v-if="buttonText" :class="buttonTextClass">{{ buttonText }}</span>
    <span  v-if="loading" class="loader">
     
    </span>
    <slot name="button-icon-right" v-if="!loading"></slot>
  </button>
</template>

<script setup>
import "@/assets/css/button.css";

const props = defineProps({
  
  buttonId:{
    type: Number,
    default:0
  },
  buttonClass:{
    type: String,
    default:""
  },
  rounded:{
    type: Boolean,
    default: false
  },
  buttonTextClass:{
    type: String,
    default:""
  },
  buttonText:{
    type: String,
    default: ""
  },
  buttonDisabled:{
    type: Boolean,
    default: false
  },
  isVariant:{
    type: Boolean,
    default: false
  },
  variant:{
    type: String,
    default: ""
  },
  loading:{
    type: Boolean,
    default: false
  },
  loadingText:{
    type: String,
    default:""
  },
});

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