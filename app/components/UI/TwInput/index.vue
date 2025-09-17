<template>
  <div :class="['container-tw-input', containerInputClass]">
    <label
      v-if="inputLabel"
      :for="inputId"
      :class="[
        'form-tw-input-label mb-1 block font-bold leading-6',
        inputLabelClass,
      ]"
      >{{ inputLabel }}</label
    >
    <div
      :class="[{'border-red':inputError},
        'form-tw-input-group border border-gray-300 rounded-md bg-white',
        containerInputGroupClass
      ]"
    >
      <div v-if="inputIcon" class="form-tw-input-icon-wrap">
        <slot name="input-icon"></slot>
      </div>
      <input
        :id="inputId"
        :name="inputName"
        :type="inputType"
        :value="props.inputValue"
        :placeholder="inputPlaceholder"
        :autocomplete="inputAutocomplete"
        :disabled="inputDisabled"
        :class="[
          'form-tw-input focus:ring-0 sm:leading-6',
          `form-tw-input-placeholder-${placeholderVariant}`,
          inputClass,
        ]"
        :autofocus="inputAutoFocus"
        @input="onChangeInput($event.target.value)"
        @keydown.enter="
          $emit('on-input-key-down-enter', $event, $event.target.value)
        "
      />
      <a
        v-if="initialType == 'password' && !showPassword"
        :class="[
          'tw-input-password-icon flex items-center justify-center text-dark-blue-600 hover-text-dark-blue-900 w-8',
          !inputDisabled ? 'cursor-pointer ' : 'cursor-default bg-disabled',
          inputPasswordClass,
        ]"
        :disabled="inputDisabled"
        href="#"
        @click="onShowPassword()"
        ><Icon name="heroicons:eye" class="h-5 w-5"
      /></a>
      <a
        v-if="initialType == 'password' && showPassword" href="#"
        :class="[
          'tw-input-password-icon  text-dark-blue-600 hover-text-dark-blue-900',
          !inputDisabled ? 'cursor-pointer' : 'cursor-default bg-disabled',
          inputPasswordClass,
        ]"
        :disabled="inputDisabled"
        @click="onShowPassword()"
        ><Icon name="heroicons:eye-slash" class="h-5 w-5"
      /></a>
    </div>
        <UIValidationMsg :errorMsg="inputError"/>

  </div>
</template>

<script setup>
import "@/assets/css/input.css";
import { onMounted } from "vue";


const props = defineProps({
  inputId: {
    default: "",
    type: String,
  },
  inputName: {
    default: "",
    type: String,
  },
  inputType: {
    default: "text",
    type: String,
  },
  inputLabel: {
    default: "",
    type: String,
  },
  inputValue: {
    default: null,
  },
  inputPlaceholder: {
    default: null,
    type: String,
  },
  inputAutocomplete: {
    default: false,
    type: Boolean,
  },
  inputIcon: {
    default: false,
    type: Boolean,
  },
  containerInputClass: {
    default: "",
    type: [String, Array],
  },
  containerInputGroupClass: {
    default: "",
    type: [String, Array],
  },
  inputClass: {
    type: [String, Array],
  },
  inputLabelClass: {
    type: [String, Array],
  },
  inputPasswordClass: {
    type: [String, Array],
    default: "border-medium-blue-600",
  },
  placeholderVariant: {
    type: [String],
  },
  inputAutoFocus: {
    default: false,
    type: Boolean,
  },
  inputMask: {
    default: null,
  },
  inputDisabled: {
    default: false,
    type: Boolean,
  },
  inputError:{
    default: null,
    type: [String,Object],
    required:false,

  },
  
});
const emit = defineEmits([
  "update:inputValue",
  "on-input-key-down-enter",
  "on-click-password",
]);

let showPassword = false;
const initialType = props.inputType;

const onChangeInput = (value) => {
  emit("update:inputValue", value);
  
};

const onShowPassword = () => {
  if (!props.inputDisabled) {
    showPassword = showPassword ? false : true;
    emit("on-click-password", showPassword);
  }
};

const onSetInputFocus = () => {
  const inputEl = document.getElementById(props.inputId);
  inputEl ? inputEl.focus() : "";
};

onMounted(async () => {
  if (props.inputAutoFocus) {
    onSetInputFocus();
  }
});
</script>
<style scoped>
.border-red{
  border-color: red !important;
}
</style>